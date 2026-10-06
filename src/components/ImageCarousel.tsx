"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

type Props = {
  images: string[];
  alt: string;
  autoplayInterval?: number;
};

export default function ImageCarousel({
  images,
  alt,
  autoplayInterval = 5000,
}: Props) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const count = images.length;

  const goTo = useCallback(
    (i: number) => {
      if (count === 0) return;
      setIndex(((i % count) + count) % count);
    },
    [count]
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Autoplay with pause on hover/focus, reduced-motion respect
  useEffect(() => {
    if (count <= 1 || lightboxOpen) return;
    if (typeof window !== "undefined") {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduced) return;
    }
    if (isPaused) return;
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, autoplayInterval);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [count, isPaused, lightboxOpen, autoplayInterval]);

  // Lock body scroll when lightbox open + Esc to close
  useEffect(() => {
    if (!lightboxOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxOpen, next, prev]);

  if (count === 0) {
    return (
      <div
        data-testid="carousel-empty"
        className="grid aspect-[16/9] w-full place-items-center rounded-3xl border border-dashed border-card-line bg-card px-6 text-center"
      >
        <div>
          <p className="label-mono text-paper-muted">No screenshots yet</p>
          <p className="mt-2 text-sm text-paper-muted">
            Screenshots coming soon — drop images into{" "}
            <code className="font-mono">public/images/</code>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <section
        data-testid="carousel"
        role="region"
        aria-roledescription="carousel"
        aria-label={`${alt} image carousel`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.stopPropagation();
            next();
          }
          if (e.key === "ArrowLeft") {
            e.stopPropagation();
            prev();
          }
          if (e.key === "Home") goTo(0);
          if (e.key === "End") goTo(count - 1);
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
        className="relative overflow-hidden rounded-3xl border border-card-line bg-card focus:outline-none focus-visible:ring-2 focus-visible:ring-blue"
      >
        <div
          className="relative aspect-[16/9] w-full"
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const dx =
              e.changedTouches[0].clientX - (touchStartX.current ?? 0);
            if (Math.abs(dx) > 50) {
              if (dx < 0) next();
              else prev();
            }
            touchStartX.current = null;
          }}
        >
          {images.map((src, i) => (
            <div
              key={src}
              data-testid={i === index ? "carousel-slide-active" : "carousel-slide"}
              aria-hidden={i !== index}
              className={`absolute inset-0 transition-opacity duration-500 ${
                i === index ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                aria-label={`Open image ${i + 1} of ${count} in fullscreen`}
                className="relative block h-full w-full cursor-zoom-in"
              >
                <Image
                  src={src}
                  alt={`${alt} — screenshot ${i + 1} of ${count}`}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 768px) 100vw, 900px"
                  className="object-contain bg-dark"
                />
              </button>
            </div>
          ))}
        </div>

        {count > 1 && (
          <>
            <button
              type="button"
              data-testid="carousel-prev"
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full border border-card-line bg-card/90 text-paper backdrop-blur transition hover:bg-paper hover:text-dark focus-visible:ring-2 focus-visible:ring-blue"
            >
              <span aria-hidden>←</span>
            </button>
            <button
              type="button"
              data-testid="carousel-next"
              onClick={next}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full border border-card-line bg-card/90 text-paper backdrop-blur transition hover:bg-paper hover:text-dark focus-visible:ring-2 focus-visible:ring-blue"
            >
              <span aria-hidden>→</span>
            </button>
          </>
        )}

        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-ink/60 to-transparent px-4 pb-3 pt-8">
          <div className="flex items-center gap-2" role="tablist" aria-label="Choose image">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                data-testid={`carousel-dot-${i}`}
                role="tab"
                aria-selected={i === index}
                aria-label={`Go to image ${i + 1}`}
                onClick={() => goTo(i)}
                className="group grid h-6 min-w-6 place-items-center rounded-full focus-visible:ring-2 focus-visible:ring-paper"
              >
                <span
                  aria-hidden
                  className={`block h-2 rounded-full transition-all ${
                    i === index ? "w-6 bg-paper" : "w-2 bg-paper/50 group-hover:bg-paper/80"
                  }`}
                />
              </button>
            ))}
          </div>
          <p
            data-testid="carousel-counter"
            aria-live="polite"
            className="label-mono text-paper tabular-nums"
          >
            {index + 1} / {count}
          </p>
        </div>
      </section>

      {lightboxOpen && (
        <div
          data-testid="carousel-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${alt} fullscreen viewer`}
          className="fixed inset-0 z-[100] flex flex-col bg-dark/95 p-4 md:p-8"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 py-2">
            <p className="label-mono text-paper tabular-nums">
              {index + 1} / {count}
            </p>
            <button
              type="button"
              data-testid="carousel-lightbox-close"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close fullscreen viewer"
              className="label-mono rounded-full border border-paper/30 px-4 py-2 text-paper transition hover:bg-paper hover:text-dark focus-visible:ring-2 focus-visible:ring-paper"
            >
              Close ✕
            </button>
          </div>
          <div
            className="relative mx-auto w-full max-w-6xl flex-1"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[index]}
              alt={`${alt} — fullscreen screenshot ${index + 1} of ${count}`}
              fill
              sizes="100vw"
              className="object-contain"
            />
            {count > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous image"
                  onClick={prev}
                  className="absolute left-0 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full border border-paper/30 text-paper transition hover:bg-paper hover:text-dark"
                >
                  ←
                </button>
                <button
                  type="button"
                  aria-label="Next image"
                  onClick={next}
                  className="absolute right-0 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full border border-paper/30 text-paper transition hover:bg-paper hover:text-dark"
                >
                  →
                </button>
              </>
            )}
          </div>
          <p className="mx-auto max-w-6xl py-3 text-center text-sm text-paper-muted">
            Click backdrop or press Esc to close · ← → to navigate
          </p>
        </div>
      )}
    </>
  );
}
