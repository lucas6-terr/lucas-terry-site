"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { motion, useReducedMotion } from "framer-motion";

const NAV = [
  { label: "about", href: "#about" },
  { label: "experience", href: "#experience" },
  { label: "tools", href: "#tools" },
  { label: "work", href: "#work" },
  { label: "writing", href: "#writing" },
  { label: "contact", href: "#contact" },
];

const NAME = "Lucas Terry";

type TagPos = { left: number; top: number } | null;

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The composition the bubbles refract: name + headshot + tagline.
 * Rendered once for real and once (static, aria-hidden) inside each bubble,
 * so the lens shows a magnified copy of exactly what sits behind it.
 */
function HeroScene({
  clone,
  reduced,
  tagPos,
  nameRef,
  tagRef,
}: {
  clone?: boolean;
  reduced: boolean;
  tagPos: TagPos;
  nameRef?: React.Ref<HTMLSpanElement>;
  tagRef?: React.Ref<HTMLParagraphElement>;
}) {
  const NameTag = clone ? "div" : "h1";
  const skipMotion = reduced || clone;

  return (
    <>
      {/* Name — masthead, ~12vh of air above */}
      <NameTag
        className="absolute inset-x-0 top-[12svh] z-10 select-none text-center font-display leading-[0.92] tracking-[-0.04em]"
        style={{ fontSize: "clamp(3.2rem, 12vw, 13.5rem)", fontWeight: 650 }}
      >
        <span ref={nameRef} className="inline-block whitespace-nowrap">
          {NAME.split("").map((ch, i) =>
            ch === " " ? (
              <span key={i}> </span>
            ) : (
              <span
                key={i}
                className="inline-block overflow-hidden align-bottom"
              >
                <motion.span
                  className="inline-block"
                  initial={skipMotion ? false : { y: "0.75em", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.15 + i * 0.045,
                    duration: 0.7,
                    ease: EASE,
                  }}
                >
                  {ch}
                </motion.span>
              </span>
            )
          )}
        </span>
      </NameTag>

      {/* Headshot cutout — the accent: small, bottom-anchored, bleeds off the edge */}
      <motion.div
        className="absolute bottom-[-3svh] left-1/2 z-20 -translate-x-1/2"
        initial={skipMotion ? false : { y: "40%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.45, duration: 1.1, ease: EASE }}
      >
        {clone ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/headshot-cutout.png"
            alt=""
            style={{ height: "38svh", width: "auto", maxWidth: "none" }}
          />
        ) : (
          <Image
            src="/headshot-cutout.png"
            alt="Lucas Terry"
            width={797}
            height={666}
            priority
            style={{ height: "38svh", width: "auto", maxWidth: "none" }}
          />
        )}
      </motion.div>

      {/* Tagline — left edge locked to the right end of the name */}
      <motion.p
        ref={tagRef}
        className="absolute z-10 whitespace-nowrap text-left text-[15.5px] leading-[1.55] text-[#555]"
        style={
          tagPos
            ? { left: tagPos.left, top: tagPos.top }
            : { left: "62%", top: "36svh", visibility: "hidden" }
        }
        initial={skipMotion ? false : { y: 14, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6, ease: "easeOut" }}
      >
        Growth &amp; marketing operator —
        <br />
        zero-to-one GTM
        <br />
        for technical products.
      </motion.p>
    </>
  );
}

/* ---------------- Glass bubbles ---------------- */

type BubbleSpec = {
  fx: number; // home position, fraction of hero size
  fy: number;
  r: number; // radius, px (desktop)
  mag: number; // lens magnification
  phase: number;
  drift: number;
};

// Placed to touch the composition: two on the name, one on the cutout edge.
const BUBBLES: BubbleSpec[] = [
  { fx: 0.235, fy: 0.21, r: 78, mag: 1.07, phase: 0.4, drift: 16 },
  { fx: 0.755, fy: 0.185, r: 27, mag: 1.16, phase: 2.2, drift: 22 },
  { fx: 0.615, fy: 0.72, r: 54, mag: 1.09, phase: 4.1, drift: 18 },
  { fx: 0.085, fy: 0.56, r: 21, mag: 1.18, phase: 1.1, drift: 26 },
  { fx: 0.88, fy: 0.585, r: 44, mag: 1.11, phase: 3.3, drift: 20 },
];

function GlassBubbles({
  size,
  reduced,
  scene,
}: {
  size: { w: number; h: number };
  reduced: boolean;
  scene: React.ReactNode;
}) {
  const bubbleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lensRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sizeRef = useRef(size);
  sizeRef.current = size;

  const scaleFor = useCallback(
    (r: number) => (sizeRef.current.w < 640 ? r * 0.65 : r),
    []
  );

  useEffect(() => {
    const state = BUBBLES.map((b) => ({
      ...b,
      x: b.fx * sizeRef.current.w,
      y: b.fy * sizeRef.current.h,
      vx: 0,
      vy: 0,
    }));
    const mouse = { x: -1e5, y: -1e5 };
    let raf = 0;
    let running = false;

    const apply = (i: number, x: number, y: number) => {
      const b = state[i];
      const r = scaleFor(b.r);
      const bubble = bubbleRefs.current[i];
      const lens = lensRefs.current[i];
      if (!bubble || !lens) return;
      bubble.style.transform = `translate3d(${x - r}px, ${y - r}px, 0)`;
      // Map scene point (x, y) to the bubble centre at magnification `mag`.
      lens.style.transform = `translate3d(${r - b.mag * x}px, ${
        r - b.mag * y
      }px, 0) scale(${b.mag})`;
    };

    const renderStatic = () => {
      state.forEach((b, i) =>
        apply(i, b.fx * sizeRef.current.w, b.fy * sizeRef.current.h)
      );
    };

    if (reduced) {
      renderStatic();
      return;
    }

    let last = performance.now();
    const frame = (now: number) => {
      const dt = Math.min((now - last) / 16.67, 3);
      last = now;
      const { w, h } = sizeRef.current;

      state.forEach((b, i) => {
        const r = scaleFor(b.r);
        const tx =
          b.fx * w +
          Math.sin(now * 0.00019 + b.phase) * b.drift +
          Math.sin(now * 0.00043 + b.phase * 2.1) * b.drift * 0.5;
        const ty =
          b.fy * h +
          Math.cos(now * 0.00016 + b.phase * 1.6) * b.drift +
          Math.cos(now * 0.00037 + b.phase) * b.drift * 0.5;

        // Soft spring toward the drift target.
        b.vx += (tx - b.x) * 0.0014 * dt;
        b.vy += (ty - b.y) * 0.0014 * dt;

        // Cursor repulsion.
        const dx = b.x - mouse.x;
        const dy = b.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        const reach = r + 120;
        if (dist < reach && dist > 0.001) {
          const f = ((reach - dist) / reach) * 0.5 * dt;
          b.vx += (dx / dist) * f;
          b.vy += (dy / dist) * f;
        }

        b.vx *= Math.pow(0.972, dt);
        b.vy *= Math.pow(0.972, dt);
        b.x += b.vx * dt;
        b.y += b.vy * dt;

        apply(i, b.x, b.y);
      });
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running) return;
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
      // Hero sits at the top of the page, so client coords match hero coords.
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onPointerLeave = () => {
      mouse.x = -1e5;
      mouse.y = -1e5;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    start();
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener(
        "pointerleave",
        onPointerLeave
      );
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced, scaleFor]);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-30"
      aria-hidden="true"
    >
      {BUBBLES.map((b, i) => {
        const r = size.w < 640 ? b.r * 0.65 : b.r;
        const d = r * 2;
        return (
          <div
            key={i}
            ref={(el) => {
              bubbleRefs.current[i] = el;
            }}
            className="absolute left-0 top-0 overflow-hidden rounded-full bg-bg will-change-transform"
            style={{
              width: d,
              height: d,
              boxShadow:
                "0 18px 40px -18px rgba(17,17,17,0.18), 0 0 0 1px rgba(17,17,17,0.04)",
            }}
          >
            {/* Refracted scene */}
            <div
              ref={(el) => {
                lensRefs.current[i] = el;
              }}
              inert
              className="absolute left-0 top-0 origin-top-left will-change-transform"
              style={{ width: size.w, height: size.h }}
            >
              {scene}
            </div>
            {/* Edge falloff — glass thickens at the rim */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 42% 38%, transparent 62%, rgba(17,17,17,0.05) 84%, rgba(17,17,17,0.12) 100%)",
              }}
            />
            {/* Faint iridescence, rim only */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 72% 78%, transparent 68%, hsla(200,90%,70%,0.12) 88%, hsla(280,80%,75%,0.1) 100%), radial-gradient(circle at 25% 20%, transparent 70%, hsla(150,80%,70%,0.08) 100%)",
              }}
            />
            {/* Thin bright rim highlight */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                boxShadow:
                  "inset 0 0 0 1.5px rgba(255,255,255,0.9), inset 0 2px 8px rgba(255,255,255,0.35)",
              }}
            />
            {/* One small specular dot */}
            <div
              className="absolute rounded-full"
              style={{
                left: "24%",
                top: "18%",
                width: "16%",
                height: "16%",
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 70%)",
                filter: "blur(0.5px)",
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

/* ---------------- Hero ---------------- */

export default function Hero() {
  const reduced = useReducedMotion() ?? false;
  const heroRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const tagRef = useRef<HTMLParagraphElement>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const [tagPos, setTagPos] = useState<TagPos>(null);

  const measure = useCallback(() => {
    const hero = heroRef.current;
    const name = nameRef.current;
    if (!hero || !name) return;
    const hr = hero.getBoundingClientRect();
    const nr = name.getBoundingClientRect();
    const tagW = tagRef.current?.offsetWidth ?? 230;
    setSize({ w: hr.width, h: hr.height });
    setTagPos({
      left: Math.min(nr.right - hr.left, hr.width - tagW - 24),
      top: nr.bottom - hr.top + hr.height * 0.045,
    });
  }, []);

  useLayoutEffect(() => {
    measure();
    document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  return (
    <header
      ref={heroRef}
      className="relative h-svh min-h-[560px] overflow-hidden"
    >
      <HeroScene
        reduced={reduced}
        tagPos={tagPos}
        nameRef={nameRef}
        tagRef={tagRef}
      />

      {size && (
        <GlassBubbles
          size={size}
          reduced={reduced}
          scene={<HeroScene clone reduced={reduced} tagPos={tagPos} />}
        />
      )}

      {/* Top nav */}
      <nav className="absolute inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-5 md:px-10">
        <a href="#" className="font-display text-sm font-bold tracking-tight">
          LT
        </a>
        <div className="flex flex-wrap justify-end gap-x-4 gap-y-1 text-[13px] text-muted md:gap-x-6">
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="transition-colors hover:text-accent"
            >
              ({item.label})
            </a>
          ))}
        </div>
      </nav>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll down"
        className="absolute bottom-6 right-6 z-40 flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-sm text-muted transition-colors hover:border-accent hover:text-accent md:right-10"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <motion.span
          animate={reduced ? undefined : { y: [0, 3, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          ↓
        </motion.span>
      </motion.a>
    </header>
  );
}
