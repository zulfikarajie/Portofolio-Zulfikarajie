"use client";

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
    <motion.a
      href={project.href}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col justify-between rounded-3xl border border-light-line bg-light-surface p-8 min-h-[280px] overflow-hidden"
    >
      {/* hover glow, echoes the hero lighting at small scale */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-blue/0 to-orange/0 group-hover:from-blue/15 group-hover:to-orange/15 blur-2xl transition-all duration-500" />

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="label-mono text-ink-muted">
            {project.role} &middot; {project.year}
          </p>
          <h3 className="mt-3 font-display text-2xl md:text-[1.7rem] font-semibold tracking-tight">
            {project.title}
          </h3>
        </div>
        <motion.span
          className="shrink-0 grid place-items-center h-11 w-11 rounded-full border border-light-line text-ink"
          whileHover={{ rotate: 45 }}
          transition={{ duration: 0.25 }}
        >
          &rarr;
        </motion.span>
      </div>

      <div className="relative mt-8">
        <p className="text-ink-muted leading-relaxed max-w-md">
          {project.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.status.map((t) => (
            <span
              key={t}
              className={`label-mono px-3 py-1.5 rounded-full text-white ${
                t === "Completed" ? "bg-green-700" : "bg-yellow-500"
              }`}
            >
              {t}
            </span>
          ))}
          {project.tags.map((t) => (
            <span
              key={t}
              className="label-mono px-3 py-1.5 rounded-full bg-light text-ink-muted"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}
