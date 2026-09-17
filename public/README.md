# public/

Static files served from the site root.

- `resume.pdf` — the résumé the hero's Résumé button links to, at `/resume.pdf`.
  Replace this file to publish a new version. To hide the button instead, set
  `resume: null` in `src/data/profile.ts`.
- `portrait.jpg` — the hero photo, at `/portrait.jpg`. Replace this file to
  change it, or set `portrait: null` in `src/data/profile.ts` to hide it. The
  component checks at build whether the file is present, so a missing photo
  leaves the hero's handwritten notes in place rather than a broken image.
