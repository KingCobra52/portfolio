import Link from "next/link";
import { otherProjects } from "@/data/projects";
import Eyebrow from "./Eyebrow";
import { TechList } from "./Tag";
import { ArrowIcon, CodeIcon, ServerIcon } from "./Icons";

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  "http-server": ServerIcon,
};

const tiles: Record<string, string> = {
  blue: "bg-tint-blue",
  peach: "bg-tint-peach",
  slate: "bg-tint-slate",
  sky: "bg-tint-sky",
};

/**
 * Horizontal cards rather than a grid: this section holds whatever isn't
 * featured, which today is a single project, and a lone grid cell looks broken.
 */
export default function MoreProjects() {
  if (otherProjects.length === 0) return null;

  return (
    <section id="more-projects" className="scroll-mt-24 pb-4">
      <div className="border-t border-border pt-4">
        <Eyebrow as="h2">More projects</Eyebrow>
      </div>

      <ul className="mt-5 space-y-4">
        {otherProjects.map((p) => {
          const Icon = icons[p.slug] ?? CodeIcon;
          return (
            <li key={p.slug}>
              <Link
                href={`/projects/${p.slug}`}
                className="group flex items-start gap-4 rounded-2xl bg-bg-elevated p-5 ring-1 ring-border transition motion-safe:hover:-translate-y-0.5 hover:ring-accent/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink sm:gap-5 sm:p-6"
              >
                <span
                  aria-hidden="true"
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${tiles[p.tint] ?? "bg-tint-slate"} text-fg`}
                >
                  <Icon className="h-5 w-5" />
                </span>

                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-xl font-semibold leading-snug tracking-tight transition group-hover:text-accent-ink">
                    {p.name}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.summary}</p>
                  <TechList items={p.tech} className="mt-2.5" />
                </div>

                <ArrowIcon
                  className="mt-1 h-5 w-5 shrink-0 text-muted transition motion-safe:group-hover:translate-x-0.5 group-hover:text-accent-ink"
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
