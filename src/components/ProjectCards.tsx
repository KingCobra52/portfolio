import Link from "next/link";
import { projects } from "@/data/projects";
import { ArrowIcon } from "./Icons";
import Section from "./Section";
import Tag from "./Tag";

export default function ProjectCards() {
  return (
    <Section id="projects" title="Projects" eyebrow="03">
      <p className="mb-8 max-w-2xl text-muted">
        Each project has its own page with a small interactive demo of the part I found hardest.
      </p>
      <div className="grid gap-5 md:grid-cols-3">
        {projects.map((p) => (
          <Link
            key={p.slug}
            href={`/projects/${p.slug}`}
            className="group flex flex-col rounded-xl border border-border bg-bg-elevated p-6 transition hover:-translate-y-0.5 hover:border-accent focus-visible:outline-2 focus-visible:outline-accent"
          >
            {p.status && <p className="mb-2 font-mono text-xs text-accent">{p.status}</p>}
            <h3 className="text-lg font-semibold tracking-tight group-hover:text-accent">{p.name}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.short}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.tech.slice(0, 4).map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
              See the demo <ArrowIcon className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}
