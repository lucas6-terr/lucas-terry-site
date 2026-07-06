"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import OrbField from "./OrbField";

const NAV = [
  { label: "about", href: "#about" },
  { label: "experience", href: "#experience" },
  { label: "tools", href: "#tools" },
  { label: "work", href: "#work" },
  { label: "writing", href: "#writing" },
  { label: "contact", href: "#contact" },
];

const NAME = "Lucas Terry";

export default function Hero() {
  const reduced = useReducedMotion();

  const letter = {
    hidden: reduced ? {} : { y: "0.7em", opacity: 0 },
    show: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.15 + i * 0.045,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    }),
  };

  return (
    <header className="relative h-svh min-h-[560px] overflow-hidden">
      <OrbField />

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

      {/* Name */}
      <h1
        className="absolute inset-x-0 top-[26%] z-10 select-none text-center font-display font-semibold leading-[0.95] tracking-[-0.03em] md:top-[28%]"
        style={{ fontSize: "clamp(3.4rem, 11.5vw, 12rem)" }}
      >
        {NAME.split("").map((ch, i) =>
          ch === " " ? (
            <span key={i}> </span>
          ) : (
            <span key={i} className="inline-block overflow-hidden align-bottom">
              <motion.span
                className="inline-block"
                custom={i}
                initial="hidden"
                animate="show"
                variants={letter}
              >
                {ch}
              </motion.span>
            </span>
          )
        )}
      </h1>

      {/* Headshot cutout — in front of the letters */}
      <motion.div
        className="absolute bottom-0 left-1/2 z-20 -translate-x-1/2"
        style={{ width: "min(82vw, 74svh, 620px)" }}
        initial={reduced ? false : { y: "45%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.45, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src="/headshot-cutout.png"
          alt="Lucas Terry"
          width={797}
          height={666}
          priority
          className="h-auto w-full"
        />
      </motion.div>

      {/* Tagline — offset right of centre */}
      <motion.p
        className="absolute right-6 top-[54%] z-10 max-w-[200px] text-right text-[13px] leading-relaxed text-muted lg:right-[6%] lg:top-auto lg:bottom-[27%] lg:max-w-[210px] lg:text-left"
        initial={reduced ? false : { y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6, ease: "easeOut" }}
      >
        Growth &amp; marketing operator — zero-to-one GTM for technical
        products.
      </motion.p>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll down"
        className="absolute bottom-6 right-6 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-sm text-muted transition-colors hover:border-accent hover:text-accent md:right-10"
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
