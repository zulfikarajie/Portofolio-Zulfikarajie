"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const SKILLS = [
  "Laravel","Vue.js", "PHP", "HTML", "CSS", "C++", "JavaScript", "Node.js", "Flutter", ".Dart", "GdScript", 
  "Postgre SQL", "MySQL", "RESTFUL API", "Git", "GitHub"
];

const EXPERIENCE = [
  {
    year: "September 2025 - November 2025",
    role: "IT Internship at Internal Division",
    company: "PDAM Surya Sembada Kota Surabaya",
  },
  {
    year: "2025 — 2026",
    role: "Head of Human Resources Division",
    company: "Himpunan Mahasiswa Informatika UPN Veteran Yogyakarta",
  },
  {
    year: "2024 — 2025",
    role: "Senior Staff of Human Resources Division",
    company: "Himpunan Mahasiswa Informatika UPN Veteran Yogyakarta",
  },
  {
    year: "2023 — 2024",
    role: "Junior Staff of Human Resources Division",
    company: "Himpunan Mahasiswa Informatika UPN Veteran Yogyakarta",
  },
];

export default function About() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el, i) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          delay: (i % 4) * 0.06,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={root}
      className="relative bg-light text-ink py-28 md:py-36"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <p className="reveal label-mono text-ink-muted mb-4">01 — About</p>

        <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-16">
          <div>
            <h2 className="reveal font-display text-3xl md:text-5xl font-semibold tracking-tight leading-[1.08] max-w-xl">
  Technology to create solutions that are{" "}
  <span className="text-blue">meaningful</span> and{" "}
  <span className="text-orange">impactful</span>.
</h2>

<p className="reveal mt-8 text-ink-muted text-base md:text-lg leading-relaxed max-w-lg">
  As an Informatics fresh graduate, I believe digitalization is not simply
  about implementing technology, but about understanding problems and
  transforming them into solutions that are simpler, more effective, and
  relevant. I continuously learn and adapt to the evolving technology
  landscape to build products that simplify workflows, improve efficiency,
  and create real impact — while maintaining quality, attention to detail,
  and professionalism.
</p>

            <div className="reveal mt-10 flex flex-wrap gap-2.5">
              {SKILLS.map((s) => (
                <span
                  key={s}
                  className="label-mono px-3.5 py-2 rounded-full border border-light-line bg-light-surface text-orange"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="reveal label-mono text-ink-muted mb-6">
              Experience
            </p>
            <ol className="space-y-8 border-l border-light-line pl-6">
              {EXPERIENCE.map((e) => (
                <li key={e.role} className="reveal relative">
                  <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full bg-gradient-to-br from-blue to-orange" />
                  <p className="label-mono text-ink-muted">{e.year}</p>
                  <p className="mt-1.5 font-display font-medium text-lg">
                    {e.role}
                  </p>
                  <p className="text-ink-muted text-sm">{e.company}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
