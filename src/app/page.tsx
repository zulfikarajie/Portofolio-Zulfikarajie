"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";
import PanelProgress from "@/components/PanelProgress";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { PANEL_IDS, PIN_MEDIA } from "@/lib/panels";

export { PANEL_IDS };

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  const handleLoaderDone = useCallback(() => {
    setLoaded(true);
  }, []);

  // Pinned crossfade setup — only after the loader dismisses, so all
  // measurements use the final fully-loaded layout.
  useEffect(() => {
    if (!loaded) return;

    const mm = gsap.matchMedia();

    mm.add(PIN_MEDIA, () => {
      const panels = gsap.utils.toArray<HTMLElement>("[data-crossfade-panel]");
      if (panels.length === 0) return;

      // Stack: first panel on top initially, all others hidden.
      gsap.set(panels, { autoAlpha: 0, scale: 1.015, zIndex: (_i, el) => Number((el as HTMLElement).dataset.index ?? 0) });
      gsap.set(panels[0], { autoAlpha: 1, scale: 1 });

      // Only the active panel takes pointer events. Fractional resting
      // scroll positions can leave a neighbor at ~0 opacity but
      // visibility:visible, which would otherwise swallow every click.
      const setActive = (idx: number) => {
        setActiveIndex(idx);
        panels.forEach((p, i) =>
          gsap.set(p, { pointerEvents: i === idx ? "auto" : "none" })
        );
      };
      setActive(0);

      const tl = gsap.timeline({
        defaults: { ease: "power1.inOut" },
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top top",
          end: `+=${(panels.length - 1) * 100}%`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setActive(
              Math.min(panels.length - 1, Math.round(self.progress * (panels.length - 1)))
            );
          },
        },
      });

      panels.forEach((panel, i) => {
        if (i === 0) return;
        const prev = panels[i - 1];
        tl.set(panel, { zIndex: i }, i - 1);
        tl.to(
          prev,
          { autoAlpha: 0, scale: 0.985, duration: 1 },
          i - 1
        );
        tl.fromTo(
          panel,
          { autoAlpha: 0, scale: 1.015 },
          { autoAlpha: 1, scale: 1, duration: 1 },
          "<"
        );
      });

      triggerRef.current = tl.scrollTrigger as ScrollTrigger;
      ScrollTrigger.refresh();

      return () => {
        triggerRef.current = null;
        tl.scrollTrigger?.kill();
        tl.kill();
        gsap.set(panels, { clearProps: "all" });
      };
    });

    // Ensure measurements settle once everything is visible.
    ScrollTrigger.refresh();

    return () => {
      mm.revert();
    };
  }, [loaded]);

  const scrollToPanel = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(PANEL_IDS.length - 1, index));
    const st = triggerRef.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (st && window.matchMedia(PIN_MEDIA).matches) {
      const y = st.start + (st.end - st.start) * (clamped / (PANEL_IDS.length - 1));
      window.scrollTo({ top: y, behavior: reduced ? "auto" : "smooth" });
    } else {
      document
        .getElementById(PANEL_IDS[clamped])
        ?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    }
  }, []);

  return (
    <main>
      <PageLoader onDone={handleLoaderDone} />
      <Navbar activeIndex={activeIndex} onNavigate={scrollToPanel} />
      <PanelProgress activeIndex={activeIndex} onNavigate={scrollToPanel} visible={loaded} />
      <div ref={wrapRef} id="panels-wrap">
        <div ref={viewportRef} className="crossfade-viewport">
          <div data-crossfade-panel data-index={0} className="crossfade-panel">
            <Hero introReady={loaded} onNavigate={scrollToPanel} />
          </div>
          <div data-crossfade-panel data-index={1} className="crossfade-panel">
            <About />
          </div>
          <div data-crossfade-panel data-index={2} className="crossfade-panel">
            <Projects />
          </div>
          <div data-crossfade-panel data-index={3} className="crossfade-panel">
            <Contact />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
