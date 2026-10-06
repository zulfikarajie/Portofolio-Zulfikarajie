"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";

const LINKS = [
  { href: "/#about", label: "About", panel: 1 },
  { href: "/#projects", label: "Project", panel: 2 },
  { href: "/#contact", label: "Contact", panel: 3 },
];

type NavbarProps = {
  /** Currently active crossfade panel index (home only). Drives active-link state. */
  activeIndex?: number;
  /** Jump to a panel via ScrollTrigger scroll offsets (home only). */
  onNavigate?: (index: number) => void;
};

/**
 * Navbar — always light (paper) text: every section behind it is dark-toned
 * (Hero plus the dark About/Projects/Contact surfaces), so the old
 * dark/light zone-switching is gone. Only the scrolled backdrop still changes.
 */
export default function Navbar({ activeIndex, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const go = (e: React.MouseEvent, index: number) => {
    if (onNavigate) {
      // Anchor scrolling can't work inside the pinned container, so jump
      // via the ScrollTrigger-computed offset owned by page.tsx.
      e.preventDefault();
      onNavigate(index);
    }
    // Without onNavigate (detail pages) the native anchor href applies.
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      className="fixed top-0 inset-x-0 z-50 text-paper transition-colors duration-500"
    >
      <div
        className={`mx-auto max-w-7xl flex items-center justify-between gap-3 px-4 sm:px-6 md:px-10 h-16 sm:h-[72px] transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-md bg-dark/60 border-b border-dark-line"
            : "border-b border-transparent"
        }`}
      >
        <Link
          href="/"
          onClick={(e) => {
            if (onNavigate) {
              e.preventDefault();
              onNavigate(0);
            }
          }}
          className="shrink-0 font-display font-semibold tracking-tight text-base sm:text-lg"
          aria-label="Back to top"
        >
          ZAP<span className="text-blue">.</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:flex items-center gap-9 label-mono">
          {LINKS.map((l) => {
            const isActive = activeIndex === l.panel;
            return (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => go(e, l.panel)}
                aria-current={isActive ? "true" : undefined}
                className={`transition-opacity ${
                  isActive ? "opacity-100 underline underline-offset-8 decoration-blue" : "opacity-70 hover:opacity-100"
                }`}
              >
                {l.label}
              </a>
            );
          })}
        </nav>

        <Link
          href="/#contact"
          onClick={(e) => go(e, 3)}
          className="label-mono shrink-0 whitespace-nowrap px-3 py-1.5 rounded-full border border-paper/25 transition-colors hover:bg-paper hover:text-dark sm:px-4 sm:py-2"
        >
          Contact me
        </Link>
      </div>
    </motion.header>
  );
}
