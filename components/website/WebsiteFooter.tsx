import Link from "next/link";
import { FOOTER_LINKS } from "@/lib/website-constants";
import { AKLogo } from "./AKLogo";
import { NewsletterSignup } from "./NewsletterSignup";

export function WebsiteFooter() {
  return (
    <footer className="relative bg-ink-100 text-ink-30 overflow-hidden">
      {/* Gold gradient top edge */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      {/* Large brand watermark */}
      <div className="absolute bottom-0 right-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <span className="block font-display font-bold leading-none text-white/[0.02] translate-x-[12%] translate-y-[22%]" style={{ fontSize: "32rem" }}>
          AK
        </span>
      </div>

      <div className="w-container relative" style={{ paddingTop: "9rem", paddingBottom: "4rem" }}>
        {/* Newsletter */}
        <div className="pb-14 mb-14 border-b border-white/[0.06]">
          <div className="max-w-md">
            <h3 className="text-base font-semibold text-white mb-2" style={{ letterSpacing: "-0.01em" }}>
              Hold deg oppdatert
            </h3>
            <p className="text-sm text-ink-50 mb-5">
              Treningstips og nyheter rett i innboksen.
            </p>
            <NewsletterSignup />
          </div>
        </div>

        {/* 3-column links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand + Contact */}
          <div>
            <div className="flex items-center gap-2.5 mb-6">
              <AKLogo variant="gold" size={26} />
              <span className="text-sm font-semibold text-white" style={{ letterSpacing: "-0.01em" }}>
                AK Golf Group
              </span>
            </div>
            <p className="text-sm leading-relaxed text-ink-50 mb-8 max-w-[240px]">
              Premium golfutvikling for ambisiøse spillere som krever resultater.
            </p>
            <ul className="space-y-2.5 text-sm text-ink-50">
              <li>
                <a
                  href={`mailto:${FOOTER_LINKS.contact.email}`}
                  className="hover:text-white transition-colors duration-300"
                >
                  {FOOTER_LINKS.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${FOOTER_LINKS.contact.phone.replace(/\s/g, "")}`}
                  className="hover:text-white transition-colors duration-300"
                >
                  {FOOTER_LINKS.contact.phone}
                </a>
              </li>
              <li className="text-ink-60">{FOOTER_LINKS.contact.location}</li>
            </ul>
          </div>

          {/* Divisions */}
          <div>
            <h4 className="text-[10px] font-medium uppercase tracking-[0.1em] text-white/30 mb-6">
              Divisjoner
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.divisions.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink-50 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[10px] font-medium uppercase tracking-[0.1em] text-white/30 mb-6">
              Selskap
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink-50 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Separator */}
        <div className="h-px bg-white/[0.05] mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-ink-60">
            &copy; {new Date().getFullYear()} AK Golf Group. Alle rettigheter forbeholdt.
          </p>
          <p className="text-[10px] font-mono uppercase tracking-[0.1em] text-ink-70">
            Skarpnord Invest AS
          </p>
        </div>
      </div>
    </footer>
  );
}
