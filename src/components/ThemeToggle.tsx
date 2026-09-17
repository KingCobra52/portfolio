"use client";

import { MoonIcon, SunIcon } from "./Icons";

// No React state: the theme lives on <html>, so the icons are swapped with CSS.
// That keeps the server and client markup identical and avoids a hydration flash.
export default function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = !root.classList.contains("dark");
    root.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark theme"
      className="rounded-md p-2 text-muted transition hover:bg-bg-elevated hover:text-fg focus-visible:outline-2 focus-visible:outline-accent"
    >
      <MoonIcon className="h-5 w-5 dark:hidden" />
      <SunIcon className="hidden h-5 w-5 dark:block" />
    </button>
  );
}
