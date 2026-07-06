"use client";

import { useEffect, useRef } from "react";

type Orb = {
  hx: number; // home position, relative to canvas size
  hy: number;
  r: number; // radius relative to min(viewport) — scaled at draw time
  hue: number;
  phase: number;
  drift: number; // ambient drift amplitude in px
  x: number;
  y: number;
  vx: number;
  vy: number;
};

const ORBS: Omit<Orb, "x" | "y" | "vx" | "vy">[] = [
  { hx: 0.1, hy: 0.2, r: 0.085, hue: 210, phase: 0.3, drift: 26 },
  { hx: 0.2, hy: 0.52, r: 0.052, hue: 300, phase: 2.1, drift: 34 },
  { hx: 0.86, hy: 0.17, r: 0.07, hue: 160, phase: 4.4, drift: 30 },
  { hx: 0.8, hy: 0.5, r: 0.04, hue: 40, phase: 1.2, drift: 40 },
  { hx: 0.09, hy: 0.8, r: 0.048, hue: 250, phase: 5.3, drift: 28 },
  { hx: 0.93, hy: 0.78, r: 0.06, hue: 190, phase: 3.6, drift: 32 },
];

function drawOrb(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  baseHue: number,
  t: number
) {
  const hue = baseHue + Math.sin(t * 0.00025 + baseHue) * 28;

  // Glassy body — near-transparent centre, iridescent rim.
  const body = ctx.createRadialGradient(
    x - r * 0.25,
    y - r * 0.3,
    r * 0.1,
    x,
    y,
    r
  );
  body.addColorStop(0, "hsla(0, 0%, 100%, 0.06)");
  body.addColorStop(0.5, `hsla(${hue}, 85%, 78%, 0.1)`);
  body.addColorStop(0.74, `hsla(${hue + 40}, 90%, 74%, 0.3)`);
  body.addColorStop(0.9, `hsla(${hue + 110}, 85%, 68%, 0.5)`);
  body.addColorStop(1, `hsla(${hue + 160}, 90%, 72%, 0.18)`);
  ctx.fillStyle = body;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();

  // Counter-rim sheen for the iridescent shift.
  const sheen = ctx.createRadialGradient(
    x + r * 0.35,
    y + r * 0.4,
    r * 0.2,
    x,
    y,
    r
  );
  sheen.addColorStop(0, "hsla(0, 0%, 100%, 0)");
  sheen.addColorStop(0.8, `hsla(${hue - 90}, 90%, 75%, 0.22)`);
  sheen.addColorStop(1, `hsla(${hue - 130}, 90%, 78%, 0.05)`);
  ctx.fillStyle = sheen;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();

  // Specular highlight.
  const spec = ctx.createRadialGradient(
    x - r * 0.38,
    y - r * 0.42,
    0,
    x - r * 0.38,
    y - r * 0.42,
    r * 0.42
  );
  spec.addColorStop(0, "hsla(0, 0%, 100%, 0.85)");
  spec.addColorStop(1, "hsla(0, 0%, 100%, 0)");
  ctx.fillStyle = spec;
  ctx.beginPath();
  ctx.arc(x - r * 0.38, y - r * 0.42, r * 0.42, 0, Math.PI * 2);
  ctx.fill();
}

export default function OrbField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let running = false;

    const orbs: Orb[] = ORBS.map((o) => ({ ...o, x: 0, y: 0, vx: 0, vy: 0 }));
    const mouse = { x: -1e5, y: -1e5 };

    const scaleR = (r: number) => r * Math.min(w, h) * (w < 640 ? 1.4 : 1);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      for (const o of orbs) {
        o.x = o.hx * w;
        o.y = o.hy * h;
      }
      if (reduced) renderStatic();
    };

    const renderStatic = () => {
      ctx.clearRect(0, 0, w, h);
      for (const o of orbs) drawOrb(ctx, o.hx * w, o.hy * h, scaleR(o.r), o.hue, 0);
    };

    let last = performance.now();
    const frame = (now: number) => {
      const dt = Math.min((now - last) / 16.67, 3); // normalised to 60fps steps
      last = now;
      ctx.clearRect(0, 0, w, h);

      for (const o of orbs) {
        const r = scaleR(o.r);
        // Ambient drift target around the home position.
        const tx =
          o.hx * w +
          Math.sin(now * 0.00021 + o.phase) * o.drift +
          Math.sin(now * 0.00047 + o.phase * 2.3) * o.drift * 0.5;
        const ty =
          o.hy * h +
          Math.cos(now * 0.00018 + o.phase * 1.7) * o.drift +
          Math.cos(now * 0.00039 + o.phase) * o.drift * 0.5;

        // Spring toward drift target.
        o.vx += (tx - o.x) * 0.0012 * dt;
        o.vy += (ty - o.y) * 0.0012 * dt;

        // Cursor repulsion.
        const dx = o.x - mouse.x;
        const dy = o.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        const reach = r + 140;
        if (dist < reach && dist > 0.001) {
          const f = ((reach - dist) / reach) * 0.55 * dt;
          o.vx += (dx / dist) * f;
          o.vy += (dy / dist) * f;
        }

        // Damping → wobble settles.
        o.vx *= Math.pow(0.975, dt);
        o.vy *= Math.pow(0.975, dt);
        o.x += o.vx * dt;
        o.y += o.vy * dt;

        drawOrb(ctx, o.x, o.y, r, o.hue, now);
      }
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running || reduced) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onPointerLeave = () => {
      mouse.x = -1e5;
      mouse.y = -1e5;
    };
    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    start();

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener(
        "pointerleave",
        onPointerLeave
      );
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
