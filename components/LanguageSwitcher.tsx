"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Globe, ChevronDown } from "lucide-react";
import { locales, localeNames, localeFlags, type Locale } from "@/lib/i18n/config";

export default function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function switchLocale(newLocale: Locale) {
    // Replace the current locale segment in the path
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
    setOpen(false);
  }

  const currentInfo = localeNames[currentLocale];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary rounded-md hover:bg-muted transition-colors"
        aria-label="Switch language"
        aria-expanded={open}
      >
        <Globe size={16} />
        <span className="hidden sm:inline">{currentInfo.native}</span>
        <ChevronDown size={12} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-48 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50 animate-fade-in">
          <div className="py-1">
            {locales.map((locale) => (
              <button
                key={locale}
                onClick={() => switchLocale(locale)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left hover:bg-muted transition-colors ${
                  locale === currentLocale
                    ? "bg-primary/5 text-primary font-medium"
                    : "text-foreground/80"
                }`}
              >
                <span className="text-base">{localeFlags[locale]}</span>
                <span>{localeNames[locale].native}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
