"use client";

import Link from "next/link";
import { useState } from "react";
import { profile } from "@/data/profile";
import { GitHubIcon, LinkedInIcon } from "./Icons";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="font-semibold tracking-tight hover:text-accent">
          {profile.name}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-muted transition hover:text-fg">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="rounded-md p-2 text-muted transition hover:bg-bg-elevated hover:text-fg">
            <GitHubIcon />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="rounded-md p-2 text-muted transition hover:bg-bg-elevated hover:text-fg">
            <LinkedInIcon />
          </a>
          <ThemeToggle />
          <button
            type="button"
            className="ml-1 rounded-md p-2 text-muted hover:bg-bg-elevated hover:text-fg md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5 w-5" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-border bg-bg md:hidden">
          <div className="mx-auto flex max-w-5xl flex-col px-5 py-2">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-2.5 text-sm text-muted hover:text-fg">
                {l.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
