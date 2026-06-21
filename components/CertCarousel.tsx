"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CertCarouselProps {
  images: { src: string; alt: string }[];
}

export default function CertCarousel({ images }: CertCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateScrollButtons = useCallback(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  // Track active (most visible) card index
  useEffect(() => {
    updateScrollButtons();
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => {
      updateScrollButtons();
      const cardWidth = el.children[0]?.getBoundingClientRect().width ?? 0;
      if (cardWidth > 0) {
        const idx = Math.round(el.scrollLeft / (cardWidth + 12));
        setActiveIndex(Math.min(idx, images.length - 1));
      }
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [images.length, updateScrollButtons]);

  const scrollBy = (dir: -1 | 1) => {
    const el = containerRef.current;
    if (!el) return;
    const cardEl = el.children[0] as HTMLElement | undefined;
    const cardW = cardEl?.offsetWidth ?? 300;
    const gap = 12; // gap-3
    el.scrollBy({ left: dir * (cardW + gap), behavior: "smooth" });
  };

  // Auto-play: scroll right every 5 seconds
  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      scrollBy(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 rounded-xl border border-dashed border-border bg-muted text-muted-foreground text-sm">
        No certificate images yet
      </div>
    );
  }

  // Single image — just show it
  if (images.length === 1) {
    return (
      <div className="flex justify-center">
        <div className="relative max-w-sm rounded-xl border border-border bg-white shadow-sm aspect-[3/4] overflow-hidden">
          <Image
            src={images[0].src}
            alt={images[0].alt}
            fill
            className="object-contain p-3"
            unoptimized
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full select-none">
      {/* Scrollable track */}
      <div
        ref={containerRef}
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {images.map((img, i) => (
          <div
            key={img.src}
            className="flex-shrink-0 w-[260px] md:w-[320px] lg:w-[360px] snap-center"
          >
            <div className="relative rounded-xl border border-border bg-white shadow-sm aspect-[3/4] overflow-hidden transition-shadow hover:shadow-md">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-contain p-2 md:p-3"
                unoptimized
              />
              {/* Index badge */}
              <div className="absolute bottom-2.5 right-2.5 z-10 px-2 py-0.5 rounded-full bg-black/50 text-white text-[11px] font-medium backdrop-blur-sm">
                {i + 1} / {images.length}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Left / Right arrows */}
      <>
        <button
          onClick={() => scrollBy(-1)}
          aria-label="Previous certificate"
          disabled={!canScrollLeft}
          className={`absolute -left-3 md:-left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 md:w-10 md:h-10 rounded-full bg-white shadow-lg border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all ${
            !canScrollLeft ? "opacity-40 cursor-not-allowed" : ""
          }`}
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => scrollBy(1)}
          aria-label="Next certificate"
          disabled={!canScrollRight}
          className={`absolute -right-3 md:-right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 md:w-10 md:h-10 rounded-full bg-white shadow-lg border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all ${
            !canScrollRight ? "opacity-40 cursor-not-allowed" : ""
          }`}
        >
          <ChevronRight size={18} />
        </button>
      </>

      {/* Dot indicators */}
      <div className="flex justify-center gap-1.5 mt-4">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              const el = containerRef.current;
              const cardEl = el?.children[i] as HTMLElement | undefined;
              if (!cardEl || !el) return;
              const gap = 12;
              el.scrollTo({
                left: cardEl.offsetLeft - el.offsetLeft - gap,
                behavior: "smooth",
              });
            }}
            aria-label={`Go to certificate ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === activeIndex
                ? "w-5 bg-primary"
                : "w-1.5 bg-border hover:bg-primary/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
