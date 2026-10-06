/** Shared constants for the pinned crossfade experience. */
export const PANEL_IDS = ["hero", "about", "projects", "contact"] as const;

/**
 * Pin + crossfade applies on desktop only (motion-safe users).
 * Mobile (<1024px) and prefers-reduced-motion fall back to normal stacked scroll.
 */
export const PIN_MEDIA = "(prefers-reduced-motion: no-preference) and (min-width: 1024px)";
