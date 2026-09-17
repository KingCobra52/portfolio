# Portfolio

Personal portfolio site for Siddarth Thota. Built with Next.js, TypeScript, and Tailwind CSS.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Edit content

All text lives in two files. Components read from them, so you never need to touch JSX to update the site.

- `src/data/profile.ts` — name, links, about, experience, skills, education
- `src/data/projects.ts` — the featured projects and the copy on each project page

Each project page has an interactive demo in `src/components/demos/`.

## Deploy

Push to GitHub, then import the repo at https://vercel.com/new. Vercel detects Next.js automatically. No environment variables are needed.

## Checks

```bash
npm run lint
npm run build
```
