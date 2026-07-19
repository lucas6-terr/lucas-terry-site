# lucasterry.com — build notes

Lucas's personal site, rebuilt (July 2026) in the format of his friend Adam's
site (adamdbs.com) at Lucas's request: tiny, text-first, monospace. The earlier
big-hero design spec that used to live in this file is obsolete and was
deleted; its history is in git if ever needed.

## What this is

- Next.js (App Router) + TypeScript, plain global CSS (no Tailwind). Deploys
  on Vercel via standard `next build` — keep it that way, no exotic config.
- Pages: `/` (photo, about, selected-work list), `/contact`, and
  `/projects/<slug>` for: cascade, cega, mycelium, inspiretek, ai-tools.

## Design system (in `app/globals.css`)

- Body: JetBrains Mono 15px. Headings: Inter 600, 28–36px, -0.02em.
- Colours as CSS variables: white bg, ink `#1a1916`, muted `#8a857a`,
  hairlines `#d9d4c7`, body text `#403d36`, accent `#6d5dd3` (thin link
  underlines only). Faint grain overlay. "rise" entrance animation,
  disabled under prefers-reduced-motion.
- Column: main max 860px, intro blocks max 600px. Portrait photo frame 35% /
  max 210px, 4:5. Mobile breakpoint at 560px.

## Content rules

- All site text belongs to Lucas. Project write-ups + tags live ONLY in
  `lib/projects.ts`; about paragraphs in `app/page.tsx`. Current text is
  FILLER — Lucas is rewriting it in his own conversational voice. Never
  invent facts about him; source facts from CONTENT.md.
- Do not copy any text from adamdbs.com — only the layout/format was
  replicated, with Lucas's own words.

## Workflow

- Dev server: `npm run dev` (or the `dev` entry in .claude/launch.json).
- Commit as you go. `next build` must pass clean before handing back.
- Deploy (the "final play", not yet done): push to a GitHub repo → import in
  Vercel → point lucasterry.com at it.
