import Link from "next/link";

import { profile } from "@/data/profile";
import { GitHubIcon, LinkedInIcon } from "./Icons";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-display text-base font-semibold tracking-tight">{profile.name}</span>
          <span aria-hidden="true" className="text-border">|</span>
          <span className="font-sans text-xs uppercase tracking-[0.16em] text-muted">
            Product Studio
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <nav aria-label="Footer" className="flex items-center gap-6">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="font-sans text-sm text-muted transition hover:text-fg">
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-muted transition hover:text-fg">
              <GitHubIcon />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-muted transition hover:text-fg">
              <LinkedInIcon />
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-5 pb-8 sm:px-8">
        <p className="font-sans text-xs text-muted">
          © {new Date().getFullYear()} {profile.name} ·{" "}
          <a href={profile.repo} target="_blank" rel="noreferrer" className="transition hover:text-fg">
            Built with Next.js, view source
          </a>
        </p>
      </div>
    </footer>
  );
}
