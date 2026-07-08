"use client";

import { useState } from "react";
import { PlayCircle, X } from "lucide-react";
import type { CustomerVideo, TrainingVideo } from "@/lib/media";

interface VideoGalleryProps {
  videos: CustomerVideo[] | TrainingVideo[];
  title: string;
  /** Optional subtitle/description shown below the title */
  subtitle?: string;
  /** Layout style: grid for landscape, strip for portrait, auto to mix */
  variant?: "grid" | "strip" | "auto";
}

/**
 * Reusable YouTube video gallery.
 * - Landscape videos → responsive grid of 16:9 embeds
 * - Portrait videos → horizontal scrollable strip of 9:16 embeds
 * - If no videos have YouTube IDs, renders nothing (section stays hidden until content is added)
 */
export default function VideoGallery({
  videos,
  title,
  subtitle,
  variant = "auto",
}: VideoGalleryProps) {
  const [activeVideo, setActiveVideo] = useState<{
    youtubeId: string;
    title: string;
  } | null>(null);

  // Filter to only videos with actual YouTube IDs
  const validVideos = videos.filter((v) => v.youtubeId && v.youtubeId.length > 0);

  // If no valid videos, don't render the section at all
  if (validVideos.length === 0) return null;

  const landscapeVideos = validVideos.filter(
    (v) => !("orientation" in v) || v.orientation === "landscape"
  );
  const portraitVideos = validVideos.filter(
    (v) => "orientation" in v && v.orientation === "portrait"
  );

  const showGrid = variant === "grid" || (variant === "auto" && landscapeVideos.length > 0);
  const showStrip = variant === "strip" || (variant === "auto" && portraitVideos.length > 0);

  return (
    <>
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">{title}</h2>
          {subtitle && (
            <p className="text-muted-foreground mb-8 max-w-2xl">{subtitle}</p>
          )}

          {/* Landscape videos — grid layout */}
          {showGrid && landscapeVideos.length > 0 && (
            <div className={`grid ${landscapeVideos.length > 1 ? "md:grid-cols-2" : ""} gap-6`}>
              {landscapeVideos.map((video) => (
                <div key={video.id} className="group">
                  <button
                    onClick={() =>
                      setActiveVideo({ youtubeId: video.youtubeId, title: video.title })
                    }
                    className="relative w-full aspect-video rounded-2xl overflow-hidden border border-border bg-black cursor-pointer"
                  >
                    {/* Thumbnail from YouTube */}
                    <img
                      src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                      alt={video.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      onError={(e) => {
                        // Fallback to hqdefault if maxres not available
                        const target = e.target as HTMLImageElement;
                        if (target.src.includes("maxresdefault")) {
                          target.src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PlayCircle className="w-16 h-16 text-white/90 group-hover:scale-110 transition-transform drop-shadow-lg" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                      <h3 className="text-white font-bold text-sm md:text-base line-clamp-1">
                        {video.title}
                      </h3>
                    </div>
                  </button>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {video.description}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Portrait videos — horizontal scrollable strip */}
          {showStrip && portraitVideos.length > 0 && (
            <div className="mt-8">
              <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin">
                {portraitVideos.map((video) => (
                  <div
                    key={video.id}
                    className="shrink-0 w-[220px] sm:w-[260px] snap-start group"
                  >
                    <button
                      onClick={() =>
                        setActiveVideo({ youtubeId: video.youtubeId, title: video.title })
                      }
                      className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden border border-border bg-black cursor-pointer"
                    >
                      <img
                        src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                        alt={video.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (target.src.includes("maxresdefault")) {
                            target.src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
                          }
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <PlayCircle className="w-12 h-12 text-white/90 group-hover:scale-110 transition-transform drop-shadow-lg" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-3 text-left">
                        <h3 className="text-white font-bold text-xs line-clamp-2">
                          {video.title}
                        </h3>
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Video Modal / Lightbox */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors flex items-center gap-1 text-sm"
            >
              <X size={20} /> Close
            </button>
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
