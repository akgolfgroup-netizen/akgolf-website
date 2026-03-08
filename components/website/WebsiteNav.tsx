"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { NAV_LINKS } from "@/lib/website-constants";
import { AKLogo } from "./AKLogo";

export function WebsiteNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrollY = useScrollPosition();
  const pathname = usePathname();
  const scrolled = scrollY > 20;

  // Prevent body scroll when mobile nav is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "shadow-[0_1px_0_rgba(10,25,41,0.04)]"
            : "bg-transparent"
        }`}
        style={{
          height: 56,
          ...(scrolled ? {
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
            background: "rgba(250,251,252,0.78)",
            borderBottom: "1px solid rgba(10,25,41,0.06)",
          } : {}),
        }}
      >
        <div className="w-container flex h-[56px] items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group" aria-label="AK Golf Group — Hjem">
            <AKLogo variant={scrolled ? "midnight" : "white"} size={28} />
            <span className={`font-display text-sm font-semibold tracking-tight transition-colors duration-300 group-hover:text-gold ${scrolled ? "text-ink-90" : "text-white"}`}>
              AK Golf Group
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-[14px] font-medium transition-colors duration-300 py-1 ${
                  pathname === link.href || pathname.startsWith(link.href + "/")
                    ? scrolled ? "text-ink-90" : "text-white"
                    : scrolled ? "text-ink-50 hover:text-ink-80" : "text-white/70 hover:text-white"
                }`}
                style={{ letterSpacing: "-0.01em" }}
              >
                {link.label}
                {(pathname === link.href || pathname.startsWith(link.href + "/")) && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-gold rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            <div className="flex items-center gap-4">
              <Link
                href="/portal"
                className={`text-[13px] font-medium transition-colors duration-300`}
                style={{ letterSpacing: "-0.01em" }}
              >
                <span className={scrolled ? "text-ink-50 hover:text-ink-80" : "text-white/60 hover:text-white"}>
                  Logg inn
                </span>
              </Link>
              <Link
                href="/coaching#apply"
                className="w-btn w-btn-gold text-[13px] !py-2 !px-5"
              >
                Book en time
              </Link>
            </div>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-11 h-11 gap-[5px] group"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Lukk meny" : "Åpne meny"}
          >
            <span
              className={`block h-[1.5px] w-5 transition-all duration-300 ${scrolled ? "bg-ink-80" : "bg-white"} ${
                mobileOpen ? "rotate-45 translate-y-[6.5px]" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-5 transition-all duration-300 ${scrolled ? "bg-ink-80" : "bg-white"} ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-5 transition-all duration-300 ${scrolled ? "bg-ink-80" : "bg-white"} ${
                mobileOpen ? "-rotate-45 -translate-y-[6.5px]" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-ink-100/97 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`font-display text-2xl font-semibold tracking-tight transition-colors ${
                      pathname === link.href
                        ? "text-white"
                        : "text-white/40 hover:text-white/80"
                    }`}
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                className="flex flex-col items-center gap-3 mt-4"
              >
                <Link
                  href="/coaching#apply"
                  onClick={() => setMobileOpen(false)}
                  className="w-btn w-btn-gold"
                >
                  Book en time
                </Link>
                <Link
                  href="/portal"
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-ink-40 hover:text-ink-60 transition-colors"
                >
                  Logg inn
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
