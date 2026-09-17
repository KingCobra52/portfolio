import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Tag from "@/components/Tag";
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
      <main className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        <article className="py-12 sm:py-16">
          <Link href="/#projects" className="text-sm text-muted hover:text-accent">
            ← All projects
          </Link>

          <header className="mt-6">
            {project.status && <p className="mb-2 font-mono text-xs text-accent">{project.status}</p>}
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{project.name}</h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{project.summary}</p>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-fg px-4 py-2 text-sm font-medium text-bg transition hover:bg-accent"
              >
                <GitHubIcon className="h-4 w-4" /> View code
              </a>
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium transition hover:border-accent hover:text-accent"
                >
                  Live site <ExternalIcon />
                </a>
              )}
            </div>
          </header>

          <section className="mt-14">
            <h2 className="text-xl font-semibold tracking-tight">What I built</h2>
            <ul className="mt-4 max-w-2xl list-disc space-y-2 pl-5 leading-relaxed text-muted">
              {project.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </section>

          <section className="mt-14">
            <p className="mb-1 font-mono text-xs uppercase tracking-widest text-accent">Try it</p>
            <h2 className="text-xl font-semibold tracking-tight">{project.demoTitle}</h2>
            <p className="mt-2 max-w-2xl leading-relaxed text-muted">{project.demoIntro}</p>
            <div className="mt-6 rounded-xl border border-border bg-bg-elevated p-5 sm:p-6">
              <Demo />
            </div>
          </section>

          <section className="mt-14">
            <h2 className="text-xl font-semibold tracking-tight">What I learned</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-muted">{project.learned}</p>
          </section>

          <nav className="mt-16 border-t border-border pt-6 text-sm">
            <span className="text-muted">Next project: </span>
            <Link href={`/projects/${next.slug}`} className="font-medium text-accent hover:underline">
              {next.name} →
            </Link>
          </nav>
        </article>
      </main>
      <Footer />
    </>
  );
}
