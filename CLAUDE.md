# lucasterry.com rebuild — build spec

You are rebuilding Lucas Terry's personal site. This folder is the project root — scaffold the app directly in here. All site copy is in CONTENT.md (use it verbatim, do not rewrite his words). His headshot is in assets/ (B&W photo — remove/mask the background so it's a clean cutout; if no headshot file is present, use a placeholder silhouette and flag it).

## Who Lucas is (context, don't paste this anywhere)
Growth/marketing operator, 6 yrs, crypto + consumer fintech startups, now moving toward AI. Technical marketer — builds his own tools with Claude. The site's job: read senior, sharp, and creative to founders hiring a founding growth/marketing lead.

## Stack
- Next.js (App Router) + TypeScript + Tailwind + Framer Motion.
- Canvas (plain 2D or three.js if justified) for the hero objects.
- Deploys on Vercel via Lucas's existing GitHub repo — keep it a standard `next build`, no exotic config. He will copy this into his repo / swap remotes himself.
- Routes: `/` (everything), `/work/cascade-gtm`, `/work/trader-dashboards` (designed stubs — real content comes later).

## Aesthetic
Sharp, modern, minimal-but-not-sterile editorial. Light theme.
- Background near-white (slightly warm, e.g. #FAFAF8), ink near-black (#111).
- One accent color used very sparingly (links, active rail item, hover states). Pick something confident — e.g. an electric blue or acid green — not navy.
- Display type: a sharp modern grotesk (e.g. Space Grotesk, General Sans via Fontshare, or Inter Tight), tight letter-spacing (-0.03em) at display sizes. Body: same family or Inter. NO monospace as the primary voice (small mono labels for section numbers are fine).
- Hairline dividers, generous whitespace, big type scale contrast (display huge, body restrained).
- Reference sites: joegizzi.co (hero + statement section energy). NOT playful-3D-icons portfolio style.

## Explicit vetoes from Lucas
- No big sticky stat counters ($28M / 50K / $850M as animated hero numbers). Stats live inside the experience copy only.
- No paper-texture background, no navy ink, no monospace-everything, no "//" section markers.
- Info density: same as current site. Do not add sections or padding copy.

## Page structure (wireframe agreed with Lucas — visual reference in wireframe.html, open it in a browser; it shows proportions and placement, NOT final styling)

1. HERO — 100vh.
   - Minimal top nav: "LT" mark left; right: (about) (experience) (tools) (work) (writing) (contact) — lowercase in parens, smooth-scroll anchors.
   - "Lucas Terry" set huge, centered (clamp ~7-12vw).
   - B&W headshot cutout rises from bottom center, overlapping the name — head IN FRONT of the letters. Subtle entrance: cutout rises + name letters stagger in on load.
   - Tagline offset to the right-of-center, small: use the one-liner from CONTENT.md.
   - Floating iridescent orbs/bubbles (Gizzi-style, 4-6 of them, varied sizes) drifting slowly with physics; they repel from the cursor and wobble back. Ambient drift on mobile, no hover dependency. Keep them soft/glassy against the sharp type.
   - Scroll cue bottom.
2. STATEMENT ABOUT — big 3-line staggered statement (left / center / right aligned lines, Gizzi page-2 style). Two short paragraphs tucked in the gaps (from CONTENT.md about lines). Below: Working On / Looking Forward / Thinking About as a quiet 3-column triptych.
3. STICKY LEFT RAIL from here down (desktop): rail lists about / experience / ai tools / work / writing, scrollspy highlights active section, click scrolls. On mobile the rail collapses to a slim horizontal sticky bar.
4. EXPERIENCE — clean rows (role — company, dates right-aligned), hairline dividers, hover/click expands to the 2-3 line description. Same 5 entries as CONTENT.md incl. education.
5. AI TOOLS — filter pills (all / ai content / brand infrastructure / ops / community / analytics), grid of 6 cards, each expands in place to show "how it works" + tool tags. Smooth height animation.
6. WORK — two full-width feature cards: "The Cascade launch" (zero → private beta GTM story) and "Trader dashboards" (AI-built internal tooling, live demo later). Cards link to the stub routes. Hover: subtle image pan/scale. Stub pages: designed shell (title, one-line intro, "case study coming soon", back link) using the same design system.
7. WRITING — simple index rows: title, platform · year, view counts where given, external links to X.
8. FOOTER — big-type contact line ("Let's build the next one." or similar), email + X + LinkedIn, small copyright.

## Motion rules
- Framer Motion. Staggered fade-up reveals on scroll (once, not scrubbed), 0.4-0.6s, ease-out.
- Scrollspy rail transitions. In-place expansions animated. Page transition into /work/* routes.
- Restrained: no parallax circus, no scroll-jacking. The hero orbs are the one showpiece.
- Respect prefers-reduced-motion (disable orb physics + entrances).

## Quality bar
- Lighthouse 90+ on performance. Orb canvas must idle cheaply (requestAnimationFrame, pause when tab hidden).
- Fully responsive; hero cutout + name composition must work at mobile sizes (name may sit above cutout).
- Real favicon (LT mark), OG image (name + tagline on the site background), metadata, sitemap.
- SEO basics: semantic HTML, one h1 ("Lucas Terry").

## Workflow expectations
- Get a dev server running early, iterate visually.
- Commit as you go with clear messages.
- When done: `next build` must pass clean. Tell Lucas exactly what to push where (his repo auto-deploys to Vercel on push to main).
