# lucasterry.com

Personal site — Next.js (App Router) + TypeScript, plain CSS, deployed on Vercel.

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Where the content lives

- **About paragraphs** (homepage) — `app/page.tsx`
- **Project write-ups, tags, links, tools** — `lib/projects.ts`
- **Contact page** — `app/contact/page.tsx`
- **Colours, type, spacing** — `app/globals.css`

Editing any of those and saving updates the page automatically while
`npm run dev` is running.

## Deploying

Pushing to `main` triggers a Vercel deploy.
