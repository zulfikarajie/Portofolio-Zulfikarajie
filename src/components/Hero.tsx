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

export default function Hero({
  introReady = true,
  onNavigate,
}: {
  introReady?: boolean;
  onNavigate?: (index: number) => void;
}) {
  const root = useRef<HTMLDivElement>(null);

  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);

  const techNumRef = useRef<HTMLParagraphElement>(null);
  const idRef = useRef<HTMLParagraphElement>(null);
  const enRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    if (!introReady) return;
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
  }, [introReady]);

  return (
    <section
      id="hero"
      ref={root}
      className="relative h-auto min-h-[100svh] w-full overflow-visible bg-dark text-paper flex items-center lg:h-full lg:overflow-hidden"
    >
      {/* Ambient lighting — canvas-based flowing glow */}
      <LightingBackground />

      <div
        className="
          relative mx-auto w-full max-w-7xl
          px-5 sm:px-8 lg:px-10
          pt-24 pb-10
          lg:py-0 lg:pt-[72px] lg:h-full lg:max-h-full
          grid
          grid-cols-1
          lg:grid-cols-[1.05fr_0.95fr]
          xl:grid-cols-[1fr_1fr]
          gap-6 lg:gap-4 xl:gap-8
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
              text-[clamp(2.25rem,12vw,3rem)]
              sm:text-[clamp(3rem,11vw,4.5rem)]
              md:text-[4.5rem]
              lg:text-[4.25rem]
              xl:text-[5.25rem]
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

          {/* CTA — fluid size via clamp(), scales with viewport like the name */}
          <div className="mt-6 md:mt-10 lg:mt-8 flex flex-row flex-wrap items-center gap-[clamp(0.5rem,2vw,1rem)]">
            <a
              href="#projects"
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate(2);
                }
              }}
              className="
                hero-cta
                inline-flex items-center justify-center
                gap-[clamp(0.375rem,1.5vw,0.5rem)]
                rounded-full
                bg-paper text-dark
                px-[clamp(0.9rem,4vw,1.25rem)]
                py-[clamp(0.6rem,2.4vw,0.75rem)]
                font-medium
                text-[clamp(0.7rem,3.4vw,0.875rem)]
                whitespace-nowrap
                hover:bg-orange-glow
                transition-colors
              "
            >
              See all projects
              <span aria-hidden>→</span>
            </a>

            <a
              href="#contact"
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate(3);
                }
              }}
              className="
                hero-cta
                inline-flex items-center justify-center
                gap-[clamp(0.375rem,1.5vw,0.5rem)]
                rounded-full
                border border-paper/25
                px-[clamp(0.9rem,4vw,1.25rem)]
                py-[clamp(0.6rem,2.4vw,0.75rem)]
                font-medium
                text-[clamp(0.7rem,3.4vw,0.875rem)]
                whitespace-nowrap
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
              mt-6 md:mt-8 lg:mt-6
              label-mono text-paper-muted
              max-w-xl
            "
          >
            <div className="flex gap-8 md:gap-10 label-mono text-paper-muted">
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
            h-[clamp(220px,62vw,340px)]
            sm:h-[clamp(360px,58vw,520px)]
            md:h-[480px]
            lg:h-[min(calc(100svh-170px),600px)]
            lg:min-h-[400px]
            flex
            items-end
            justify-center
            lg:justify-end
          "
        >
          <div
            className="
              relative
              h-full
              w-[clamp(200px,60vw,280px)]
              sm:w-[340px]
              md:w-[400px]
              lg:w-[clamp(360px,36vw,520px)]
              xl:w-[clamp(420px,38vw,560px)]
            "
          >
            <Image
              src="/images/ZULFIKAR1.png"
              alt="Zulfikar Ajie"
              fill
              priority
              sizes="(max-width: 640px) 70vw, (max-width: 768px) 340px, (max-width: 1024px) 400px, (max-width: 1280px) 36vw, 38vw"
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

      {/* Transition beam — desktop only; on mobile it cuts across the photo */}
      <div aria-hidden className="absolute bottom-0 left-0 right-0 hidden lg:block seam-beam" />
    </section>
  );
}