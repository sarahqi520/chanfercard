"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Phone,
  Mail,
  Package,
} from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

export default function Header({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const nav = dict.nav as Record<string, string>;
  const topBar = dict.topBar as Record<string, string>;

  const navLinks = [
    { href: `/${locale}`, label: nav.home },
    { href: `/${locale}/solutions`, label: nav.solutions },
    { href: `/${locale}/machines`, label: nav.machines },
    { href: `/${locale}/about`, label: nav.about },
    { href: `/${locale}/contact`, label: nav.contact },
  ];

  return (
    <>
      {/* Top bar */}
      <div className="bg-primary text-white text-sm hidden md:block">
        <div className="max-w-7xl mx-auto px-6 py-1.5 flex justify-between items-center">
          <div className="flex gap-6 items-center">
            <a
              href="tel:+8613060985132"
              className="flex items-center gap-1.5 hover:text-accent transition-colors"
            >
              <Phone size={13} />
              +86 130 6098 5132
            </a>
            <a
              href="mailto:sarah@gzchanfer.com"
              className="flex items-center gap-1.5 hover:text-accent transition-colors"
            >
              <Mail size={13} />
              sarah@gzchanfer.com
            </a>
          </div>
          <div className="text-muted-foreground text-xs">
            {topBar.tagline}
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2 group">
            <Package
              size={26}
              className="text-accent"
              strokeWidth={2.2}
            />
            <span className="font-bold text-xl tracking-tight text-primary">
              CHANFER
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary rounded-md hover:bg-muted transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <LanguageSwitcher currentLocale={locale} />
            <Link
              href={`/${locale}/contact`}
              className="ml-3 px-5 py-2 bg-accent text-primary text-sm font-medium rounded-lg hover:bg-accent-dark transition-colors"
            >
              {nav.getQuote} →
            </Link>
          </nav>

          {/* Mobile toggle */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher currentLocale={locale} />
            <button
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-background animate-fade-in">
            <nav className="flex flex-col p-4 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-foreground/80 hover:text-primary rounded-lg hover:bg-muted transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={`/${locale}/contact`}
                onClick={() => setMobileOpen(false)}
                className="mt-2 px-4 py-3 bg-accent text-primary text-sm font-medium rounded-lg hover:bg-accent-dark transition-colors text-center"
              >
                {nav.getQuote}
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
