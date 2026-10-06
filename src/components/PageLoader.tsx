"use client";

import { useEffect, useRef, useState } from "react";
import { projects } from "@/data/projects";

type PageLoaderProps = {
  onDone: () => void;
  /** Fail-open ceiling so the loader never traps the user. */
  maxWaitMs?: number;
};

const HERO_IMAGE = "/images/ZULFIKAR1.png";

/**
 * Full-screen loading overlay.
 *
 * Gates the pinned ScrollTrigger setup in `page.tsx`: the page only
 * initializes pin/crossfade measurements after this reports done, so
 * panel heights and trigger start/end points are measured on the final
 * fully-loaded layout. Fail-open via `maxWaitMs`.
 */
export default function PageLoader({ onDone, maxWaitMs = 4500 }: PageLoaderProps) {
  const [fading, setFading] = useState(false);
  const [gone, setGone] = useState(false);
  const [progress, setProgress] = useState(0);
  const doneRef = useRef(false);
  const onDoneRef = useRef(onDone);

  // Keep the completion callback fresh without re-running the loader effect.
  useEffect(() => {
    onDoneRef.current = onDone;
  });

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      // Plain fade when reduced motion is preferred — no blur/decorative exit.
      setFading(true);
      window.setTimeout(
        () => {
          setGone(true);
          document.body.style.overflow = prevOverflow;
          onDoneRef.current();
        },
        reduced ? 60 : 550
      );
    };

    const failOpen = window.setTimeout(finish, maxWaitMs);

    const srcs = [HERO_IMAGE, ...projects.flatMap((p) => p.images)];
    const total = srcs.length + 1; // +1 for fonts
    let settled = 0;
    const tick = () => {
      settled += 1;
      setProgress(Math.min(100, Math.round((settled / total) * 100)));
    };

    const fontsReady =
      typeof document !== "undefined" &&
      "fonts" in document &&
      typeof (document as Document).fonts?.ready?.then === "function"
        ? (document as Document).fonts.ready.then(
            () => undefined,
            () => undefined
          )
        : Promise.resolve();

    const tracked = (p: Promise<unknown>) =>
      p.then(
        () => tick(),
        () => tick()
      );

    const imageLoaders = srcs.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = src;
          // Cached images may never fire when already complete.
          if (img.complete) resolve();
        })
    );

    tracked(fontsReady);
    imageLoaders.forEach((p) => tracked(p));

    Promise.allSettled([fontsReady, ...imageLoaders]).then(() => {
      window.clearTimeout(failOpen);
      // Let the bar settle at 100% for a beat so the fade doesn't feel abrupt.
      setProgress(100);
      window.setTimeout(finish, reduced ? 60 : 250);
    });

    return () => {
      window.clearTimeout(failOpen);
      if (!doneRef.current) document.body.style.overflow = prevOverflow;
    };
  }, [maxWaitMs]);

  if (gone) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading site content"
      className={`fixed inset-0 z-[100] flex h-[100svh] w-full items-center justify-center bg-dark/85 text-paper backdrop-blur-xl transition-opacity duration-500 ${
        fading ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex w-full max-w-xs flex-col items-center justify-center px-6 text-center">
        <p className="font-display text-lg font-semibold tracking-tight">
          ZAP<span className="text-blue">.</span>
        </p>

        {/* Spinner: thin dual-arc ring in the site's blue→orange accents.
            A plain rotating ring is kept under reduced motion (not decorative motion). */}
        <div
          aria-hidden
          className="loader-ring mx-auto mt-8 h-11 w-11 rounded-full"
        />

        <p className="label-mono mt-6 w-full text-center text-paper-muted tabular-nums">
          Loading&nbsp;&nbsp;{String(progress).padStart(2, "0")}%
        </p>

        {/* Hairline progress track */}
        <div className="mx-auto mt-4 h-px w-40 max-w-full overflow-hidden bg-paper/15">
          <div
            className="h-full bg-gradient-to-r from-blue to-orange transition-[width] duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
