"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";

export default function HeroCarousel({
  images,
  overlays,
  interval = 5000,
}: {
  images: string[];
  overlays?: ReactNode[];
  interval?: number;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <>
      {/* Background: rotating hero carousel */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="flex h-full w-full transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((src, i) => (
            <div key={src} className="relative h-full w-full shrink-0">
              <Image
                src={src}
                alt=""
                fill
                className="object-cover object-center"
                priority={i === 0}
                unoptimized
              />
            </div>
          ))}
        </div>
        {/* Dark left-to-right gradient so text stays legible */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1b3e]/92 via-[#0d1b3e]/65 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </div>

      {/* Foreground content synced to the active slide */}
      {overlays && (
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-28">
          {overlays.map((node, i) => (
            <div key={i} className={i === index ? "block" : "hidden"}>
              {node}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
