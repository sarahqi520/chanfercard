import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Video,
  Globe,
  Link2,
} from "lucide-react";
import { companyInfo } from "@/lib/data";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

export default function Footer({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const footer = dict.footer as Record<string, unknown>;
  const footerCta = footer.cta as Record<string, string>;
  const footerCompany = footer.company as Record<string, string>;
  const footerSolutions = footer.solutions as Record<string, string>;
  const footerQuickLinks = footer.quickLinks as Record<string, string>;
  const footerFriendLinks = footer.friendLinks as Record<string, string>;
  const nav = dict.nav as Record<string, string>;

  return (
    <footer className="bg-foreground text-background">
      {/* CTA strip */}
      <div className="bg-primary">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-white">
              {footerCta.title}
            </h3>
            <p className="text-white/80 text-sm mt-1">
              {footerCta.description}
            </p>
          </div>
          <Link
            href={`/${locale}/contact`}
            className="px-8 py-3 bg-accent text-primary font-bold rounded-lg hover:bg-accent-dark transition-colors shrink-0"
          >
            {footerCta.button}
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg">
                C
              </div>
              <div>
                <div className="font-bold text-lg text-background">CHANFER</div>
                <div className="text-[10px] text-background/50 tracking-wider uppercase">
                  {footerCompany.intelligentEquipment}
                </div>
              </div>
            </div>
            <p className="text-sm text-background/70 leading-relaxed mb-4">
              {footerCompany.description}
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="YouTube"
              >
                <Video size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Website"
              >
                <Globe size={16} />
              </a>
            </div>
          </div>

          {/* Packaging Solutions */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-background/90">
              {footerSolutions.title}
            </h4>
            <ul className="space-y-2.5 text-sm text-background/70">
              <li>
                <Link
                  href={`/${locale}/solutions#candy`}
                  className="hover:text-accent transition-colors"
                >
                  {footerSolutions.candy}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/solutions#self-adhesive`}
                  className="hover:text-accent transition-colors"
                >
                  {footerSolutions.selfAdhesive}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/solutions#four-sides`}
                  className="hover:text-accent transition-colors"
                >
                  {footerSolutions.fourSides}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/solutions#banding`}
                  className="hover:text-accent transition-colors"
                >
                  {footerSolutions.banding}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/solutions#heat-shrink`}
                  className="hover:text-accent transition-colors"
                >
                  {footerSolutions.heatShrink}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/solutions#three-dimensional`}
                  className="hover:text-accent transition-colors"
                >
                  {footerSolutions.threeDimensional}
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-background/90">
              {footerQuickLinks.title}
            </h4>
            <ul className="space-y-2.5 text-sm text-background/70">
              <li>
                <Link href={`/${locale}/machines`} className="hover:text-accent transition-colors">
                  {footerQuickLinks.machineCatalog}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/about`} className="hover:text-accent transition-colors">
                  {footerQuickLinks.aboutChanfer}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="hover:text-accent transition-colors">
                  {footerQuickLinks.contactUs}
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  {footerQuickLinks.downloadBrochure}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-background/90">
              {footer.contactTitle as string}
            </h4>
            <ul className="space-y-3 text-sm text-background/70">
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="mt-0.5 shrink-0 text-accent" />
                <span>
                  {companyInfo.address.street}, {companyInfo.address.district}
                  <br />
                  {companyInfo.address.city}, {companyInfo.address.province},{" "}
                  {companyInfo.address.country}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="shrink-0 text-accent" />
                <a
                  href={`tel:${companyInfo.contact.mobile.replace(/\s/g, "")}`}
                  className="hover:text-accent transition-colors"
                >
                  {companyInfo.contact.mobile}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="shrink-0 text-accent" />
                <a
                  href={`mailto:${companyInfo.contact.email}`}
                  className="hover:text-accent transition-colors"
                >
                  {companyInfo.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Friend Links */}
        <div className="mt-10 pt-6 border-t border-background/10">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-background/50 shrink-0">
              <Link2 size={14} className="text-accent" />
              {footerFriendLinks.title}
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-background/50">
              <a
                href="https://gzchanfer.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                {footerFriendLinks.mainSite}
              </a>
              <span className="text-background/20">|</span>
              <a
                href="https://chanferpack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                {footerFriendLinks.detergentLine}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 pt-6 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-background/40">
          <p>
            © {new Date().getFullYear()} {companyInfo.name}. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-accent transition-colors">
              {footer.privacyPolicy as string}
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              {footer.termsOfService as string}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
