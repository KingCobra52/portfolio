import type { Metadata } from "next";

// Self-hosted variable fonts. Google Fonts is not reachable from the build
// environment, and self-hosting also drops a third-party request at runtime.
import "@fontsource-variable/fraunces";
import "@fontsource-variable/fraunces/wght-italic.css";
import "@fontsource-variable/source-serif-4";
import "@fontsource-variable/source-serif-4/wght-italic.css";
import "@fontsource-variable/caveat";

import "./globals.css";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: `${profile.name} | Software Engineer`,
  description: `${profile.name} is a ${profile.role}. ${profile.tagline}`,
  openGraph: {
    title: `${profile.name} | Software Engineer`,
    description: profile.tagline,
    type: "website",
  },
};

// Runs before paint so the saved theme applies without a flash of the wrong one.
const themeScript = `
(function () {
  try {
    var saved = localStorage.getItem("theme");
    var dark = saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (dark) document.documentElement.classList.add("dark");
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
