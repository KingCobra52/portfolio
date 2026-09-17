# Portfolio

Personal portfolio site for Siddarth Thota. Built with Next.js, TypeScript, and Tailwind CSS v4.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Edit content

All text lives in two files. Components read from them, so you never need to touch JSX to update the site.

- `src/data/profile.ts` — name, links, hero copy, about, experience, skills, education
- `src/data/projects.ts` — the projects and the copy on each project page

### Project fields

Each project in `src/data/projects.ts` drives both its card and its page:

- `featured` — `true` gives the project a full tinted panel on the home page with
  a phone mockup. `false` puts it in the "More projects" list below.
- `tint` — `"blue" | "peach" | "slate" | "sky"`, the panel and header wash.
- `tagline` — the short serif line under the project name.
- `story` — the numbered `problem` / `approach` / `outcome` narrative.
- `annotation` — optional handwritten note beside the phone. Decorative.

A featured project also needs a phone screen in `src/components/phones/`, wired
up in the `screens` map in `src/components/FeaturedProject.tsx`. Without one the
card still renders, just without a device.

Each project page has an interactive demo in `src/components/demos/`.

## Résumé

The hero's Résumé button links to `/resume.pdf`. Drop the file in `public/` and
it works. To hide the button instead, set `resume: null` in `src/data/profile.ts`.

## Design system

Colors, fonts and spacing tokens all live in `src/app/globals.css`. Tailwind v4
is configured CSS-first through the `@theme inline` block there — there is no
`tailwind.config.ts`, so new tokens go in that block.

Fonts are self-hosted through `@fontsource-variable` packages and imported in
`src/app/layout.tsx`: Fraunces for display, Source Serif 4 for body, Caveat for
the handwritten annotations.

Dark mode is class-based, toggled on `<html>` and applied before paint by the
inline script in `src/app/layout.tsx`.

## Deploy

Push to GitHub, then import the repo at https://vercel.com/new. Vercel detects Next.js automatically. No environment variables are needed.

## Checks

```bash
npm run lint
npm run build
```
