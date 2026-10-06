"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { projects } from "@/data/projects";

/**
 * Projects panel — compact list on mobile, spotlight + index rail on desktop.
 *
 * Mobile (<1024px) is normal stacked scroll: title-only rows that link
 * straight to the detail page — no big spotlight card, so 366px fits.
 * Desktop keeps the spotlight + rail pinned crossfade experience.
 * Each row keeps its `project-card-<slug>` test id at every breakpoint.
 */
export default function Projects() {
  const [active, setActive] = useState(0);
  const total = projects.length;
  const current = projects[active];

  const go = useCallback(
    (dir: 1 | -1) => setActive((i) => (i + dir + total) % total),
    [total]
  );

  return (
    <section id="projects" className="relative h-auto min-h-[100svh] scroll-mt-16 bg-section-alt text-paper sm:scroll-mt-[72px] lg:h-full">
      <div className="mx-auto flex h-auto w-full max-w-6xl flex-col justify-start px-5 pb-10 pt-24 sm:px-6 md:px-10 md:py-24 lg:h-full lg:justify-center lg:py-20 lg:pt-24">
        {/* ---------- header ---------- */}
        <div className="reveal-fb flex items-end justify-between gap-4">
          <div className="min-w-0">
            <p className="label-mono text-paper-muted">02 — My Projects</p>
            <h2 className="mt-2 font-display text-xl font-semibold tracking-tight sm:text-3xl lg:mt-3 lg:text-4xl">
              Selected work.
            </h2>
          </div>
          <div className="flex shrink-0 items-center gap-2 motion-reduce:hidden lg:gap-3">
            <p data-testid="project-counter" className="label-mono hidden text-paper-muted tabular-nums min-[420px]:block">
              {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </p>
            <button
              type="button"
              onClick={() => go(-1)}
              data-testid="panel-project-prev"
              aria-label="Show previous project"
              className="grid h-9 w-9 place-items-center rounded-full border border-paper/25 text-paper transition-colors hover:bg-paper hover:text-dark lg:h-10 lg:w-10"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              data-testid="panel-project-next"
              aria-label="Show next project"
              className="grid h-9 w-9 place-items-center rounded-full border border-paper/25 text-paper transition-colors hover:bg-paper hover:text-dark lg:h-10 lg:w-10"
            >
              →
            </button>
          </div>
        </div>

        {/* ---------- body: compact list on mobile, rail+spotlight on desktop ---------- */}
        <div className="mt-4 grid gap-4 lg:mt-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
          {/* Index rail — every row IS the detail link (keeps test ids visible). */}
          <ol className="reveal-fb flex flex-col divide-y divide-card-line border-y border-card-line">
            {projects.map((p, i) => {
              const isActive = i === active;
              return (
                <li key={p.id}>
                  <Link
                    href={`/projects/${p.slug}`}
                    data-testid={`project-card-${p.slug}`}
                    aria-label={`View details: ${p.title}`}
                    aria-current={isActive ? "true" : undefined}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className={`group flex items-center gap-3 py-2.5 text-left transition-colors lg:gap-4 lg:py-2.5 ${
                      isActive ? "text-paper" : "text-paper-muted hover:text-paper"
                    }`}
                  >
                    <span
                      className={`label-mono w-6 shrink-0 tabular-nums lg:w-7 ${
                        isActive ? "text-orange-glow" : "text-paper-muted"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {/* Compact row — wraps on mobile, single-line rail on desktop */}
                    <span className="min-w-0 flex-1">
                      <span className="block break-words font-display text-sm font-medium leading-snug line-clamp-2 lg:truncate lg:break-normal lg:text-[0.95rem]">
                        {p.title}
                      </span>
                      <span className="label-mono mt-0.5 block truncate text-paper-muted" style={{ fontSize: "0.62rem" }}>
                        {p.role} · {p.year}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border text-xs transition-all lg:h-8 lg:w-8 lg:text-sm ${
                        isActive
                          ? "rotate-45 border-paper bg-paper text-dark"
                          : "border-card-line text-paper-muted group-hover:rotate-45 group-hover:bg-paper group-hover:text-dark"
                      }`}
                    >
                      →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>

          {/* Spotlight — desktop only; mobile uses the compact list above. */}
          <article
            aria-live="polite"
            data-testid="project-spotlight"
            className="relative hidden min-h-0 flex-col justify-between overflow-hidden rounded-3xl border border-card-line bg-card p-4 lg:flex lg:p-7"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-blue/15 to-orange/15 blur-2xl"
            />
            <div key={current.id} className="relative">
              <p className="label-mono text-paper-muted">
                {current.role} · {current.year}
              </p>
              <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-paper">
                {current.title}
              </h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-paper-muted lg:mt-3 lg:text-[0.95rem]">
                {current.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5 lg:mt-5">
                {current.status.map((t) => (
                  <span
                    key={t}
                    className={`label-mono rounded-full px-2.5 py-1 ${
                      t === "Completed" ? "bg-green-700 text-white" : "bg-yellow-500 text-dark"
                    }`}
                  >
                    {t}
                  </span>
                ))}
                {current.tags.map((t) => (
                  <span
                    key={t}
                    className="label-mono rounded-full border border-card-line bg-dark px-2.5 py-1 text-paper-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative mt-4 lg:mt-6">
              <Link
                href={`/projects/${current.slug}`}
                data-testid="project-spotlight-link"
                className="label-mono inline-flex items-center gap-2 rounded-full bg-paper px-5 py-2.5 text-dark transition-colors hover:bg-blue-glow"
              >
                Open case study <span aria-hidden>→</span>
              </Link>
              {/* Segmented position indicator — echoes the loader's hairline bar */}
              <div className="mt-3 flex gap-1.5 lg:mt-5" aria-hidden>
                {projects.map((p, i) => (
                  <span
                    key={p.id}
                    className={`h-[3px] flex-1 rounded-full ${
                      i === active ? "bg-gradient-to-r from-blue to-orange" : "bg-card-line"
                    }`}
                  />
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
