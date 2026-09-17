"use client";

import Link from "next/link";
import { useState } from "react";
import { profile } from "@/data/profile";
import { GitHubIcon, LinkedInIcon } from "./Icons";
import Swoosh from "./Swoosh";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur">
      <div className="mx-auto flex h-[4.5rem] w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href="/"
          className="group shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-ink"
        >
          <span className="font-display block text-xl font-semibold leading-none tracking-tight sm:text-[1.4rem]">
            {profile.name}
          </span>
          <Swoosh className="-mt-0.5 h-2 w-[105%] text-accent" />
          <span className="mt-0.5 block font-sans text-[0.65rem] uppercase tracking-[0.16em] text-muted">
            Product Studio
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-sans text-sm text-muted transition hover:text-fg"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="hidden rounded-full p-2 text-muted transition hover:bg-bg-elevated hover:text-fg sm:block"
          >
            <GitHubIcon />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="hidden rounded-full p-2 text-muted transition hover:bg-bg-elevated hover:text-fg sm:block"
          >
            <LinkedInIcon />
          </a>
          <ThemeToggle />

          <Link
            href="/#contact"
            className="ml-2 hidden items-center gap-2 rounded-full bg-fg px-5 py-2.5 font-sans text-sm font-medium text-bg transition hover:bg-accent hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink md:inline-flex"
          >
            Let&apos;s build
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>
          </Link>

          <button
            type="button"
            className="ml-1 rounded-full p-2 text-muted hover:bg-bg-elevated hover:text-fg md:hidden"
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
          <div className="mx-auto flex max-w-6xl flex-col px-5 py-2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 font-sans text-sm text-muted hover:text-fg"
              >
                {l.label}
              </Link>
            ))}
            <div className="flex items-center gap-3 border-t border-border py-3">
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-muted hover:text-fg">
                <GitHubIcon />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-muted hover:text-fg">
                <LinkedInIcon />
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
