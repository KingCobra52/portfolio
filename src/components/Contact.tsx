import { profile } from "@/data/profile";
import { GitHubIcon, LinkedInIcon } from "./Icons";
import Section from "./Section";

export default function Contact() {
  return (
    <Section id="contact" title="Get in touch" eyebrow="06">
      <p className="max-w-2xl text-muted">
        I&apos;m looking for software engineering internships. The fastest way to reach me is LinkedIn.
        If you want to see how I write code, GitHub is the place.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-md bg-fg px-4 py-2 text-sm font-medium text-bg transition hover:bg-accent"
        >
          <LinkedInIcon className="h-4 w-4" /> LinkedIn
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
    </Section>
  );
}
