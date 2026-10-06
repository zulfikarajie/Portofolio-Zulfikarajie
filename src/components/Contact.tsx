"use client";

import { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: hubungkan ke API / layanan email pilihan Anda
    setStatus("sent");
  }

  const inputCls =
    "w-full rounded-xl border border-card-line bg-dark px-4 py-2.5 text-base text-paper placeholder:text-paper-muted outline-none transition-colors focus:border-blue-glow sm:text-sm";

  return (
    <section id="contact" className="relative h-auto min-h-[100svh] scroll-mt-16 bg-section text-paper sm:scroll-mt-[72px] lg:h-full">
      <div className="mx-auto grid h-auto w-full max-w-6xl content-start gap-6 px-5 pb-10 pt-24 sm:px-6 md:gap-10 md:px-10 md:py-24 lg:h-full lg:content-center lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:py-20 lg:pt-24">
        <div className="reveal-fb">
          <p className="label-mono text-paper-muted">03 — Contact</p>
          <h2 className="mt-3 max-w-md font-display text-xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
            If you have anything in mind, feel free to let me know.
          </h2>

          <div className="label-mono mt-5 space-y-2.5 lg:mt-8">
            <a href="mailto:work.zulfikarajie@gmail.com" className="block break-all text-paper transition-colors hover:text-blue-glow sm:truncate">
              work.zulfikarajie@gmail.com
            </a>
            <div className="grid grid-cols-3 gap-2">
              <a href="https://instagram.com/zlfkrajie_" className="block text-paper-muted transition-colors hover:text-paper">
                Instagram
              </a>
              <a href="https://linkedin.com/in/zulfikarajie" className="block text-paper-muted transition-colors hover:text-paper">
                LinkedIn
              </a>
              <a href="https://github.com/zulfikarajie" className="block text-paper-muted transition-colors hover:text-paper">
                GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="reveal-fb rounded-3xl border border-card-line bg-card p-4 sm:p-5 lg:p-7">
          {status === "sent" ? (
            <div role="status" className="flex h-full min-h-32 flex-col items-start justify-center">
              <p className="label-mono text-blue-glow">Message sent</p>
              <p className="mt-2 font-display text-xl font-semibold tracking-tight text-paper">
                Thanks for reaching out.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-paper-muted">
                I&apos;ll get back to you as soon as I can.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 lg:space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="label-mono text-paper-muted">Name</span>
                  <input required name="name" placeholder="Your name" className={`${inputCls} mt-2`} />
                </label>
                <label className="block">
                  <span className="label-mono text-paper-muted">Email</span>
                  <input required type="email" name="email" placeholder="you@example.com" className={`${inputCls} mt-2`} />
                </label>
              </div>
              <label className="block">
                <span className="label-mono text-paper-muted">Message</span>
                <textarea
                  required
                  name="message"
                  rows={3}
                  placeholder="Tell me about your project…"
                  className={`${inputCls} mt-2 resize-none`}
                />
              </label>
              <button
                type="submit"
                className="label-mono inline-flex items-center gap-2 rounded-full bg-paper px-6 py-3 text-dark transition-colors hover:bg-blue-glow"
              >
                Send message <span aria-hidden>→</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
