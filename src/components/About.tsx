"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { experiences } from "@/data/experience";

const SKILLS = [
  "Laravel", "PHP", "HTML", "CSS", "C++", "JavaScript", "Node.js", "Flutter", ".Dart", "GdScript",
  "Postgre SQL", "MySQL", "RESTFUL API", "Git", "GitHub"
];

export default function About() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // The pinned crossfade owns all panel motion, so inner blocks are kept
    // visible (reduced-motion shows them statically via CSS).
    const ctx = gsap.context(() => {
      gsap.set(".reveal", { opacity: 1, y: 0 });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={root}
      className="relative h-auto min-h-[100svh] scroll-mt-16 bg-section text-paper sm:scroll-mt-[72px] lg:h-full"
    >
      <div className="mx-auto flex h-auto w-full max-w-6xl flex-col justify-start px-5 pb-10 pt-24 sm:px-6 md:px-10 md:py-24 lg:h-full lg:justify-center lg:py-20 lg:pt-24">
        <p className="reveal label-mono text-paper-muted">01 — About</p>

        <div className="mt-4 grid gap-6 lg:mt-5 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          {/* ---------- left: statement + skills ---------- */}
          <div className="min-w-0">
            <h2 className="reveal font-display text-lg font-semibold tracking-tight leading-[1.15] sm:text-2xl md:text-3xl lg:text-[2rem]">
              Technology to create solutions that are{" "}
              <span className="text-blue">meaningful</span> and{" "}
              <span className="text-orange">impactful</span>.
            </h2>

            <p className="reveal mt-3 max-w-lg text-[13px] leading-relaxed text-paper-muted sm:text-sm md:text-[0.95rem] lg:mt-4">
              As an Informatics fresh graduate, I believe digitalization is not simply
              about implementing technology, but about understanding problems and
              transforming them into solutions that are simpler, more effective, and
              relevant. I continuously learn and adapt to the evolving technology
              landscape to build products that simplify workflows, improve efficiency,
              and create real impact — while maintaining quality, attention to detail,
              and professionalism.
            </p>

            <div className="reveal mt-3 flex flex-wrap gap-1.5 lg:mt-4">
              {SKILLS.map((s) => (
                <span
                  key={s}
                  className="label-mono rounded-full border border-card-line bg-card px-2.5 py-1 text-orange-glow"
                  style={{ fontSize: "0.62rem" }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* ---------- right: experience list ---------- */}
          <div className="min-w-0">
            <p className="reveal label-mono text-paper-muted">
              Experience
            </p>
            <ol className="mt-1 space-y-2 border-l border-card-line pl-3 sm:pl-4 lg:mt-3">
              {experiences.map((e) => (
                <li key={e.slug} className="reveal relative">
                  <span className="absolute -left-[17px] top-5 h-2 w-2 rounded-full bg-gradient-to-br from-blue to-orange sm:-left-[21px]" />
                  <Link
                    href={`/experience/${e.slug}`}
                    data-testid={`experience-card-${e.slug}`}
                    aria-label={`View details: ${e.role} at ${e.company}`}
                    className="group flex items-center justify-between gap-3 rounded-xl border border-card-line bg-card px-3 py-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-paper/30 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue sm:px-4 sm:py-2.5"
                  >
                    <span className="min-w-0">
                      <span className="label-mono block text-paper-muted" style={{ fontSize: "0.62rem" }}>
                        {e.period}
                      </span>
                      <span className="mt-0.5 block truncate font-display text-sm font-medium leading-snug sm:text-[0.95rem]">
                        {e.role}
                      </span>
                      <span className="block truncate text-xs text-paper-muted">
                        {e.company}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-card-line text-sm text-paper transition-all duration-300 group-hover:rotate-45 group-hover:bg-paper group-hover:text-dark"
                    >
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
