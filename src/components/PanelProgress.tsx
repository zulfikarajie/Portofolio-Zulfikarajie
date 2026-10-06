"use client";

import { PANEL_IDS } from "@/lib/panels";

const LABELS = ["Intro", "About", "Work", "Contact"] as const;

type PanelProgressProps = {
  activeIndex: number;
  onNavigate: (index: number) => void;
  /** Hidden until the loader dismisses so it never flashes over it. */
  visible: boolean;
};

/**
 * Vertical bars-only progress rail.
 *
 * Four slim vertical bars in a single vertical stack — the active panel's
 * bar grows tall with the brand blue→orange gradient, the rest stay short
 * hairlines. Always paper-toned: every panel behind it is dark.
 * Clickable to jump. Desktop pinned mode only.
 */
export default function PanelProgress({ activeIndex, onNavigate, visible }: PanelProgressProps) {
  return (
    <nav
      aria-label="Sections"
      className={`fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 text-paper transition-all delay-150 duration-500 xl:right-8 lg:motion-safe:block ${
        visible ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-3 opacity-0"
      }`}
    >
      <ol className="flex flex-col items-center gap-2.5">
        {PANEL_IDS.map((id, i) => {
          const isActive = i === activeIndex;
          return (
            <li key={id} className="flex justify-center">
              <button
                type="button"
                onClick={() => onNavigate(i)}
                aria-label={`Go to ${LABELS[i]} section`}
                aria-current={isActive ? "true" : undefined}
                className="group flex justify-center px-2 py-1"
              >
                <span
                  aria-hidden
                  className={`w-[3px] rounded-full transition-all duration-500 ${
                    isActive
                      ? "h-12 bg-gradient-to-b from-blue to-orange"
                      : "h-6 bg-paper/25 group-hover:bg-paper/60"
                  }`}
                />
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
