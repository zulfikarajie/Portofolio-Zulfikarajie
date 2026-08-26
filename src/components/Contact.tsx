"use client";

import { useState } from "react";
import { motion } from "motion/react";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: hubungkan ke API / layanan email pilihan Anda
    setStatus("sent");
  }

  return (
    <section id="contact" className="relative bg-light text-ink py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6 md:px-10 grid md:grid-cols-[0.9fr_1.1fr] gap-16">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="label-mono text-ink-muted mb-4"
          >
            03 — Contact
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-display text-3xl md:text-5xl font-semibold tracking-tight max-w-md"
          >
            If you have anything in mind, feel free to let me know.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-10 space-y-3 label-mono"
          >
            <a href="mailto:halo@dimasaditya.dev" className="block text-ink hover:text-blue transition-colors">
              work.zulfikarajie@gmail.com
            </a>
            <a href="https://instagram.com/zlfkrajie_" className="block text-ink-muted hover:text-ink transition-colors">
              Instagram
            </a>
            <a href="https://linkedin.com/in/zulfikarajie" className="block text-ink-muted hover:text-ink transition-colors">
              LinkedIn
            </a>
            <a href="https://github.com/zulfikarajie" className="block text-ink-muted hover:text-ink transition-colors">
              GitHub
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
