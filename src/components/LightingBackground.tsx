"use client";

import { useEffect, useRef } from "react";

type Blob = {
  baseX: number;
  baseY: number;
  radius: number;
  color: string;
  speedX: number;
  speedY: number;
  speedR: number;
  phaseX: number;
  phaseY: number;
  phaseR: number;
  ampX: number;
  ampY: number;
};

export default function LightingBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let rafId: number;
    let visible = true;

    const blues = ["#3e7bfa", "#6fa0ff"];
    const oranges = ["#ff7a3d", "#ffab6f"];

    const blobs: Blob[] = [];

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      // (Re)build blobs relative to size
      blobs.length = 0;

      const configs = [
        { xF: 0.12, yF: 0.35, rF: 0.32, colors: blues, speed: 1 },
        { xF: 0.28, yF: 0.55, rF: 0.22, colors: blues, speed: 1.3 },
        { xF: 0.85, yF: 0.75, rF: 0.3, colors: oranges, speed: 0.9 },
        { xF: 0.7, yF: 0.4, rF: 0.2, colors: oranges, speed: 1.15 },
      ];

      configs.forEach((c, i) => {
        blobs.push({
          baseX: width * c.xF,
          baseY: height * c.yF,
          radius: Math.max(width, height) * c.rF,
          color: c.colors[i % c.colors.length],
          speedX: 0.00025 * c.speed,
          speedY: 0.0003 * c.speed,
          speedR: 0.00035 * c.speed,
          phaseX: Math.random() * Math.PI * 2,
          phaseY: Math.random() * Math.PI * 2,
          phaseR: Math.random() * Math.PI * 2,
          ampX: width * 0.08,
          ampY: height * 0.08,
        });
      });
    }

    function draw(time: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "screen"; // additive-ish blending for glow

      blobs.forEach((b) => {
        const x = b.baseX + Math.sin(time * b.speedX + b.phaseX) * b.ampX;
        const y = b.baseY + Math.cos(time * b.speedY + b.phaseY) * b.ampY;
        const r =
          b.radius * (0.85 + 0.15 * Math.sin(time * b.speedR + b.phaseR));

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
        gradient.addColorStop(0, `${b.color}55`); // ~33% alpha at center
        gradient.addColorStop(1, `${b.color}00`); // transparent edge

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalCompositeOperation = "source-over";
    }

    function loop(time: number) {
      if (visible && !prefersReducedMotion) {
        draw(time);
      }
      rafId = requestAnimationFrame(loop);
    }

    resize();
    rafId = requestAnimationFrame(loop);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    if (prefersReducedMotion) {
      // Draw a single static frame so it's not blank
      draw(0);
    }

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ filter: "blur(60px)" }}
      aria-hidden
    />
  );
}