"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { Project } from "@/data/projects";

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      data-testid={`project-card-${project.slug}`}
      aria-label={`View details: ${project.title}`}
      className="group block rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2"
    >
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: (index % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -6 }}
        className="relative flex flex-col justify-between rounded-3xl border border-card-line bg-card p-8 min-h-[280px] overflow-hidden transition-shadow duration-300 group-hover:shadow-lg"
      >
        {/* hover glow, echoes the hero lighting at small scale */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-blue/0 to-orange/0 group-hover:from-blue/20 group-hover:to-orange/20 blur-2xl transition-all duration-500" />

        <div className="relative flex items-start justify-between gap-4">
          <div>
            <p className="label-mono text-paper-muted">
              {project.role} &middot; {project.year}
            </p>
            <h3 className="mt-3 font-display text-2xl md:text-[1.7rem] font-semibold tracking-tight text-paper">
              {project.title}
            </h3>
          </div>
          <span
            aria-hidden
            className="shrink-0 grid place-items-center h-11 w-11 rounded-full border border-card-line text-paper transition-transform duration-300 group-hover:rotate-45"
          >
            &rarr;
          </span>
        </div>

        <div className="relative mt-8">
          <p className="text-paper-muted leading-relaxed max-w-md">
            {project.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.status.map((t) => (
              <span
                key={t}
                className={`label-mono px-3 py-1.5 rounded-full ${
                  t === "Completed" ? "bg-green-700 text-white" : "bg-yellow-500 text-dark"
                }`}
              >
                {t}
              </span>
            ))}
            {project.tags.map((t) => (
              <span
                key={t}
                className="label-mono px-3 py-1.5 rounded-full border border-card-line bg-dark text-paper-muted"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
