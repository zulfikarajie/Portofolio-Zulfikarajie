"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import LightingBackground from "./LightingBackground";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function scrambleTo(el: HTMLElement, finalText: string, duration = 0.9) {
  const obj = { progress: 0 };
  const len = finalText.length;

  return gsap.to(obj, {
    progress: 1,
    duration,
    ease: "power1.out",
    onUpdate: () => {
      const revealCount = Math.floor(obj.progress * len);
      let out = "";
      for (let i = 0; i < len; i++) {
        if (i < revealCount) {
          out += finalText[i];
        } else {
          out += SCRAMBLE_CHARS[
            Math.floor(Math.random() * SCRAMBLE_CHARS.length)
          ];
        }
      }
      el.textContent = out;
    },
    onComplete: () => {
      el.textContent = finalText;
    },
  });
}

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);

  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);

  const techNumRef = useRef<HTMLParagraphElement>(null);
  const idRef = useRef<HTMLParagraphElement>(null);
  const enRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.2,
      });

      tl.from(".hero-eyebrow", {
        y: 16,
        opacity: 0,
        duration: 0.6,
      })
        // ---- typing name ----
        .to(
          line1Ref.current,
          {
            duration: 0.8,
            text: "Zulfikar Ajie",
            ease: "none",
          },
          "-=0.2"
        )
        .to(
          line2Ref.current,
          {
            duration: 0.6,
            text: "Pangarso.",
            ease: "none",
            onStart: () => {
              line2Ref.current?.classList.add("typing-cursor");
            },
          },
          "+=0.05"
        )
        .from(
          ".hero-sub",
          {
            y: 16,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.2"
        )
        .from(
          ".hero-cta",
          {
            y: 16,
            opacity: 0,
            duration: 0.5,
            stagger: 0.08,
          },
          "-=0.4"
        )
        .from(
          ".hero-photo",
          {
            scale: 0.92,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.7"
        )
        .from(
          ".hero-stat",
          {
            y: 12,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
          },
          "-=0.5"
        )
        // ---- stat "calculation" animations, run together after stats appear ----
        .add(() => {
          if (techNumRef.current) {
            const obj = { val: 0 };
            gsap.to(obj, {
              val: 10,
              duration: 0.9,
              ease: "power2.out",
              onUpdate: () => {
                if (techNumRef.current) {
                  techNumRef.current.textContent = `${Math.round(
                    obj.val
                  )}+`;
                }
              },
            });
          }
          if (idRef.current) scrambleTo(idRef.current, "ID", 0.8);
          if (enRef.current) scrambleTo(enRef.current, "EN", 0.8);
        }, "-=0.2");
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={root}
      className="relative min-h-screen w-full overflow-hidden bg-dark text-paper flex items-center"
    >
      {/* Ambient lighting — canvas-based flowing glow */}
      <LightingBackground />

      <div
        className="
          relative mx-auto w-full max-w-7xl
          px-6 sm:px-8 lg:px-10
          pt-28 pb-12
          grid
          grid-cols-1
          lg:grid-cols-[1.05fr_0.95fr]
          xl:grid-cols-[1fr_1fr]
          gap-8 lg:gap-4 xl:gap-8
          items-center
        "
      >
        {/* ================= TEXT ================= */}
        <div className="relative z-10 max-w-2xl">
          <p className="hero-eyebrow label-mono text-blue-glow mb-5 md:mb-6">
            Web Developer, Android Developer & Game Developer — Fresh Graduate
          </p>

          <h1
            className="
              font-display font-semibold
              leading-[0.95]
              tracking-tight
              text-[15vw]
              sm:text-[11vw]
              md:text-[5.5rem]
              lg:text-[4.5rem]
              xl:text-[5.5rem]
            "
          >
            <span className="block">
              <span ref={line1Ref} className="hero-line block" />
            </span>

            <span className="block">
              <span
                ref={line2Ref}
                className="hero-line block text-paper-muted"
              />
            </span>
          </h1>

          {/* CTA */}
          <div className="mt-15 md:mt-20 flex flex-wrap items-center gap-3 md:gap-4">
            <a
              href="https://github.com/zulfikarajie?tab=repositories"
              className="
                hero-cta
                inline-flex items-center gap-2
                rounded-full
                bg-paper text-dark
                px-5 md:px-6 py-3
                font-medium text-sm
                hover:bg-orange-glow
                transition-colors
              "
            >
              See all projects
              <span aria-hidden>→</span>
            </a>

            <a
              href="#contact"
              className="
                hero-cta
                inline-flex items-center gap-2
                rounded-full
                border border-paper/25
                px-5 md:px-6 py-3
                font-medium text-sm
                hover:border-orange-glow 
                hover:text-orange-glow
                transition-colors
              "
            >
              Curriculum Vitae
            </a>
          </div>

          {/* ================= STACK ================= */}
          <div
            className="
              mt-5 md:mt-8
              grid grid-cols-2 sm:grid-cols-3
              gap-x-6 gap-y-6
              label-mono text-paper-muted
              max-w-xl
            "
          >
            <div className="mt-5 md:mt-8 flex gap-8 md:gap-10 label-mono text-paper-muted">
              <div className="hero-stat">
                <p
                  ref={techNumRef}
                  className="text-paper text-2xl md:text-3xl font-display text-center tabular-nums"
                >
                  0+
                </p>
                <p className="mt-1 text-center">Technologies</p>
              </div>

              <div className="hero-stat">
                <p
                  ref={idRef}
                  className="text-paper text-2xl md:text-3xl font-display text-center"
                >
                  ID
                </p>
                <p className="mt-1 text-center">Native</p>
              </div>

              <div className="hero-stat">
                <p
                  ref={enRef}
                  className="text-paper text-2xl md:text-3xl font-display text-center"
                >
                  EN
                </p>
                <p className="mt-1 text-center">Intermediate</p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= PHOTO ================= */}
        <div
          className="
            hero-photo
            relative
            z-0
            w-full
            h-[520px]
            sm:h-[580px]
            md:h-[620px]
            lg:h-[calc(100vh-120px)]
            lg:min-h-[600px]
            xl:min-h-[680px]
            flex
            items-end
            justify-center
            lg:justify-end
          "
        >
          <div
            className="
              relative
              w-[360px]
              h-[520px]
              sm:w-[430px]
              sm:h-[580px]
              md:w-[500px]
              md:h-[620px]
              lg:w-[520px]
              lg:h-full
              xl:w-[600px]
            "
          >
            <Image
              src="/images/ZULFIKAR.png"
              alt="Zulfikar Ajie"
              fill
              priority
              sizes="
                (max-width: 640px) 360px,
                (max-width: 768px) 430px,
                (max-width: 1024px) 500px,
                (max-width: 1280px) 520px,
                600px
              "
              className="object-contain object-bottom"
              style={{
                maskImage:
                  "linear-gradient(to bottom, transparent 0%, black 15%, black 82%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent 0%, black 15%, black 82%, transparent 100%)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Transition beam */}
      <div className="absolute bottom-0 left-0 right-0 seam-beam" />
    </section>
  );
}