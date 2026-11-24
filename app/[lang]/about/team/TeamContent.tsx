"use client";

import Link from "next/link";
import { Users, ArrowLeft } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import PhotoGallery from "@/components/PhotoGallery";
import { teamPhotos } from "@/lib/media";

/** 19 张团队照片，alt/caption 用中性英文，不点名客户、不含未经证实的数字。 */
const photos = teamPhotos;

export default function TeamContent({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const teamPage = dict.teamPage as Record<string, unknown>;
  const hero = teamPage.hero as Record<string, string>;
  const gallery = teamPage.gallery as Record<string, string>;
  const cta = teamPage.cta as Record<string, string>;
  const nav = dict.nav as Record<string, string>;

  return (
    <main>
      {/* Breadcrumb + Hero */}
      <section className="bg-muted hero-pattern py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href={`/${locale}`} className="hover:text-primary">
              {nav.home}
            </Link>
            <span>/</span>
            <Link href={`/${locale}/about`} className="hover:text-primary">
              {nav.about}
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">{hero.title}</span>
          </nav>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-accent/15 rounded-lg text-accent-dark">
              <Users size={26} />
            </div>
            <span className="text-accent-dark font-semibold text-sm tracking-wide uppercase">
              {hero.eyebrow}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-5">{hero.title}</h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl leading-relaxed">
            {hero.subtitle}
          </p>
        </div>
      </section>

      {/* Photo gallery with lightbox */}
      <PhotoGallery
        photos={photos}
        title={gallery.title}
        subtitle={gallery.subtitle}
        variant="team"
      />

      {/* Back / CTA */}
      <section className="py-12 md:py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{cta.title}</h2>
            <p className="text-muted-foreground max-w-xl">{cta.description}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/${locale}/about`}
              className="inline-flex items-center gap-2 px-5 py-3 border border-border rounded-lg font-medium hover:bg-background transition-colors"
            >
              <ArrowLeft size={16} />
              {nav.about}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-primary font-semibold rounded-lg hover:bg-accent-dark transition-colors"
            >
              {cta.button} →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
