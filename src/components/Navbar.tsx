"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Project" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [isDarkZone, setIsDarkZone] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const io = new IntersectionObserver(
      ([entry]) => setIsDarkZone(entry.isIntersecting),
      { rootMargin: "-72px 0px 0px 0px", threshold: 0 }
    );
    io.observe(hero);

    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ${
        isDarkZone
          ? "text-paper"
          : "text-ink"
      }`}
    >
      <div
        className={`mx-auto max-w-8xl flex items-center justify-between px-6 md:px-10 h-[72px] transition-all duration-500 ${
          scrolled
            ? isDarkZone
              ? "backdrop-blur-md bg-dark/60 border-b border-dark-line"
              : "backdrop-blur-md bg-light-surface/70 border-b border-light-line"
            : "border-b border-transparent"
        }`}
      >
        <a href="#hero" className="font-display font-semibold tracking-tight text-lg">
          ZAP<span className="text-blue">.</span>
        </a>

        <nav className="hidden md:flex items-center gap-9 label-mono">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="opacity-70 hover:opacity-100 transition-opacity"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className={`label-mono px-4 py-2 rounded-full border transition-colors ${
            isDarkZone
              ? "border-paper/25 hover:bg-paper hover:text-dark"
              : "border-ink/20 hover:bg-ink hover:text-paper"
          }`}
        >
          Contact me
        </a>
      </div>
    </motion.header>
  );
}
