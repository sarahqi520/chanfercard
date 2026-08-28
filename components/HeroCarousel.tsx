'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface HeroCarouselProps {
  images: string[];
  interval?: number;
}

export default function HeroCarousel({ images, interval = 5000 }: HeroCarouselProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Slides */}
      <div
        className="flex h-full w-full transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((src, i) => (
          <div key={`${src}-${i}`} className="relative h-full w-full shrink-0">
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

      {/* Dark left-to-right gradient so text stays legible on every slide */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d1b3e]/92 via-[#0d1b3e]/65 to-transparent pointer-events-none" />

      {/* Bottom fade to page background */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </div>
  );
}
