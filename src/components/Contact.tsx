import { profile } from "@/data/profile";
import Annotation from "./Annotation";
import Button from "./Button";
import Eyebrow from "./Eyebrow";
import Swoosh from "./Swoosh";
import { GitHubIcon, LinkedInIcon } from "./Icons";

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 py-14 sm:py-20">
      <div className="relative overflow-hidden rounded-2xl bg-tint-peach px-6 py-12 sm:px-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <Eyebrow>Contact</Eyebrow>
            <h2 className="font-display mt-4 max-w-[16ch] text-4xl font-semibold leading-[1.02] sm:text-5xl">
              Let&apos;s build something
              <span className="relative ml-2.5 inline-block">
                <em className="italic text-accent">worth using.</em>
                <Swoosh className="absolute -bottom-1.5 left-0 h-3 w-full text-accent" />
              </span>
            </h2>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-muted">
              I&apos;m looking for software engineering internships. The fastest way to reach me is
              LinkedIn. If you want to see how I write code, GitHub is the place.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href={profile.linkedin} external variant="primary" size="lg">
                <LinkedInIcon className="h-4 w-4" /> LinkedIn
              </Button>
              <Button href={profile.github} external variant="outline" size="lg">
                <GitHubIcon className="h-4 w-4" /> GitHub
              </Button>
            </div>
          </div>

          <div className="relative hidden justify-end lg:flex">
            <Annotation arrow="hook" arrowClassName="h-14 w-16" align="end" className="max-w-[13rem] text-right">
              Always up for a good problem
            </Annotation>
          </div>
        </div>
      </div>
    </section>
  );
}
