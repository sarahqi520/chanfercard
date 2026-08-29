"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function HeroCarousel({
  images,
  interval = 5000,
}: {
  images: string[];
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
    <div className="absolute inset-0 overflow-hidden">
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
    </div>
  );
}
