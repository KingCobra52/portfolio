import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { profile } from "@/data/profile";

/**
 * The hero portrait, masked into the same arch silhouette as the drawing it
 * replaced. Everything here is presentational CSS -- the source image is never
 * modified.
 *
 * The base fades out with a gradient overlay painted in the page colour rather
 * than a real alpha mask. Against a flat background the two are visually
 * identical, this has no mask-composite browser caveats, and because it reads
 * var(--bg) it follows dark mode for free.
 */

const W = 15; // rem
const H = 18; // rem -- the arch is two W/2 corners meeting across the top

/**
 * Server component, so this runs at build. A local path that isn't there yet
 * renders nothing rather than a broken-image icon, which means the photo can be
 * dropped into public/ later with no code change.
 */
function isMissingLocalFile(src: string) {
  if (!src.startsWith("/")) return false; // remote URL: nothing to check
  try {
    return !fs.existsSync(path.join(process.cwd(), "public", src.slice(1)));
  } catch {
    return false;
  }
}

export default function Portrait({ className = "" }: { className?: string }) {
  const src = profile.portrait;
  if (!src || isMissingLocalFile(src)) return null;

  return (
    <div className={className} style={{ width: `${W}rem` }}>
      <div
        className="relative overflow-hidden rounded-t-[7.5rem] ring-1 ring-fg/10"
        style={{ height: `${H}rem` }}
      >
        <Image
          src={src}
          alt={profile.name}
          width={760}
          height={880}
          priority
          sizes="15rem"
          className="portrait-lift h-full w-full object-cover object-[center_28%]"
        />

        {/* Softens the hard bottom edge into the page. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[24%]"
          style={{ background: "linear-gradient(to bottom, transparent, var(--bg) 92%)" }}
        />
      </div>

      {/* Echoes the plinth the arch drawing used to sit on. */}
      <div aria-hidden="true" className="mx-auto h-px w-[85%] bg-fg/12" />
    </div>
  );
}
