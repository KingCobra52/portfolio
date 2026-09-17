import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import Eyebrow from "@/components/Eyebrow";
import StorySteps from "@/components/StorySteps";
import Swoosh from "@/components/Swoosh";
import { TechList } from "@/components/Tag";
import { ExternalIcon, GitHubIcon } from "@/components/Icons";
import ArtisteDemo from "@/components/demos/ArtisteDemo";
import HttpServerDemo from "@/components/demos/HttpServerDemo";
import CampusCabsDemo from "@/components/demos/CampusCabsDemo";
import { getProject, projects, type DemoKey } from "@/data/projects";
import { profile } from "@/data/profile";

const demos: Record<DemoKey, React.ComponentType> = {
  artiste: ArtisteDemo,
  "http-server": HttpServerDemo,
  campuscabs: CampusCabsDemo,
};

const tints: Record<string, string> = {
  blue: "bg-tint-blue",
  peach: "bg-tint-peach",
  slate: "bg-tint-slate",
  sky: "bg-tint-sky",
};

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.name} | ${profile.name}`,
    description: project.short,
  };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const Demo = demos[project.demo];
  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <Nav />
      <main className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <article className="py-10 sm:py-14">
          <Link
            href="/#work"
            className="font-sans text-sm text-muted transition hover:text-accent-ink"
          >
            ← All projects
          </Link>

          {/* Tinted header band, matching the project's card on the home page. */}
          <header
            className={`mt-5 rounded-2xl ${tints[project.tint] ?? "bg-tint-slate"} px-6 py-10 sm:px-10 sm:py-12`}
          >
            {project.status && <Eyebrow tone="accent">{project.status}</Eyebrow>}
            <h1 className="font-display mt-3 text-4xl font-semibold leading-[1.02] sm:text-5xl">
              {project.name}
            </h1>
            <p className="font-display mt-3 max-w-[30ch] text-xl font-medium leading-snug">
              {project.tagline}
            </p>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{project.summary}</p>
            <TechList items={project.tech} className="mt-5" />

            <div className="mt-7 flex flex-wrap gap-3">
              <Button href={project.repo} external variant="primary">
                <GitHubIcon className="h-4 w-4" /> View code
              </Button>
              {project.live && (
                <Button href={project.live} external variant="outline">
                  Live site <ExternalIcon />
                </Button>
              )}
            </div>
          </header>

          <section className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div className="border-t border-border pt-4">
              <Eyebrow>How it went</Eyebrow>
              <h2 className="font-display mt-3 text-2xl font-semibold leading-tight sm:text-3xl">
                Problem, approach, outcome.
              </h2>
            </div>
            <StorySteps story={project.story} className="lg:pt-6" />
          </section>

          <section className="mt-14">
            <div className="border-t border-border pt-4">
              <Eyebrow>Details</Eyebrow>
            </div>
            <ul className="mt-5 max-w-3xl space-y-3">
              {project.bullets.map((b) => (
                <li key={b} className="flex gap-3 leading-relaxed text-muted">
                  <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {b}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-14">
            <div className="border-t border-border pt-4">
              <Eyebrow>Try it</Eyebrow>
              <h2 className="font-display mt-3 text-2xl font-semibold leading-tight sm:text-3xl">
                {project.demoTitle}
              </h2>
            </div>
            <p className="mt-4 max-w-2xl leading-relaxed text-muted">{project.demoIntro}</p>
            <div className="mt-7 rounded-2xl bg-bg-elevated p-5 ring-1 ring-border sm:p-7">
              <Demo />
            </div>
          </section>

          <section className="mt-14">
            <div className="border-t border-border pt-4">
              <Eyebrow>What I learned</Eyebrow>
            </div>
            <blockquote className="font-display relative mt-5 max-w-3xl text-xl font-medium leading-relaxed sm:text-2xl">
              <span
                aria-hidden="true"
                className="absolute -left-1 -top-6 font-display text-6xl leading-none text-accent/35"
              >
                &ldquo;
              </span>
              {project.learned}
            </blockquote>
          </section>

          <nav aria-label="Next project" className="mt-16 border-t border-border pt-6">
            <Eyebrow>Next project</Eyebrow>
            <Link
              href={`/projects/${next.slug}`}
              className="group mt-2 inline-flex items-baseline gap-3"
            >
              <span className="font-display text-2xl font-semibold leading-tight transition group-hover:text-accent-ink sm:text-3xl">
                {next.name}
              </span>
              <span aria-hidden="true" className="relative inline-block">
                <span className="font-sans text-sm text-accent-ink">→</span>
              </span>
            </Link>
            <Swoosh variant="b" className="mt-1 h-2 w-40 text-accent" />
          </nav>
        </article>
      </main>
      <Footer />
    </>
  );
}
