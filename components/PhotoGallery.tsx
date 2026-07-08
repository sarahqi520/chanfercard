"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { TeamPhoto, ClientPhoto } from "@/lib/media";

interface PhotoGalleryProps {
  photos: TeamPhoto[] | ClientPhoto[];
  title: string;
  subtitle?: string;
  /** Display variant: "team" for team photos, "clients" for client photos with names */
  variant?: "team" | "clients";
}

/**
 * Reusable photo gallery with lightbox.
 * - Responsive grid layout
 * - Click any photo to open full-screen lightbox with navigation
 * - Client photos show client name under each photo
 * - Gracefully handles missing images with fallback placeholder
 */
export default function PhotoGallery({
  photos,
  title,
  subtitle,
  variant = "team",
}: PhotoGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!photos || photos.length === 0) return null;

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const goPrev = () =>
    setLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + photos.length) % photos.length
    );
  const goNext = () =>
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % photos.length
    );

  return (
    <>
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">{title}</h2>
          {subtitle && (
            <p className="text-muted-foreground mb-8 max-w-2xl">{subtitle}</p>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo, i) => (
              <div
                key={i}
                onClick={() => openLightbox(i)}
                className="group cursor-pointer relative aspect-[4/3] rounded-xl overflow-hidden border border-border bg-muted"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  unoptimized
                  onError={(e) => {
                    // Hide broken image container gracefully
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    target.parentElement!.classList.add(
                      "flex", "items-center", "justify-center"
                    );
                  }}
                />
                {/* Overlay with caption */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  {variant === "clients" && (photo as ClientPhoto).clientName && (
                    <p className="text-white font-bold text-sm">
                      {(photo as ClientPhoto).clientName}
                    </p>
                  )}
                  {photo.caption && (
                    <p className="text-white/80 text-xs mt-0.5">{photo.caption}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && photos[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-10"
          >
            <X size={32} />
          </button>

          {/* Prev button */}
          {photos.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-4 text-white/80 hover:text-white transition-colors z-10"
            >
              <ChevronLeft size={40} />
            </button>
          )}

          {/* Image */}
          <div
            className="relative max-w-4xl max-h-[80vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden">
              <Image
                src={photos[lightboxIndex].src}
                alt={photos[lightboxIndex].alt}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            {/* Caption */}
            <div className="mt-4 text-center">
              {variant === "clients" && (photos[lightboxIndex] as ClientPhoto).clientName && (
                <p className="text-white font-bold">
                  {(photos[lightboxIndex] as ClientPhoto).clientName}
                </p>
              )}
              {photos[lightboxIndex].caption && (
                <p className="text-white/70 text-sm mt-1">
                  {photos[lightboxIndex].caption}
                </p>
              )}
            </div>
          </div>

          {/* Next button */}
          {photos.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-4 text-white/80 hover:text-white transition-colors z-10"
            >
              <ChevronRight size={40} />
            </button>
          )}

          {/* Counter */}
          {photos.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
              {lightboxIndex + 1} / {photos.length}
            </div>
          )}
        </div>
      )}
    </>
  );
}
