import { profile } from "@/data/profile";
import { ArrowIcon, GitHubIcon } from "./Icons";

export default function Hero() {
  return (
    <section className="py-20 sm:py-28">
      <p className="mb-3 font-mono text-sm text-accent">CS @ Penn State · Class of 2029</p>
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{profile.name}</h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{profile.tagline}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href="#projects"
          className="inline-flex items-center gap-2 rounded-md bg-fg px-4 py-2 text-sm font-medium text-bg transition hover:bg-accent"
        >
          View projects <ArrowIcon />
        </a>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium transition hover:border-accent hover:text-accent"
        >
          <GitHubIcon className="h-4 w-4" /> GitHub
        </a>
      </div>
    </section>
  );
}
