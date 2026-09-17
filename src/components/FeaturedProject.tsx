import Link from "next/link";
import type { Project } from "@/data/projects";
import Annotation from "./Annotation";
import Eyebrow from "./Eyebrow";
import PhoneMockup from "./PhoneMockup";
import StorySteps from "./StorySteps";
import { TechList } from "./Tag";
import { ArrowIcon } from "./Icons";
import CampusCabsScreen from "./phones/CampusCabsScreen";
import ArtisteScreen from "./phones/ArtisteScreen";

const tints: Record<string, string> = {
  blue: "bg-tint-blue",
  peach: "bg-tint-peach",
  slate: "bg-tint-slate",
  sky: "bg-tint-sky",
};

const screens: Record<string, React.ComponentType> = {
  campuscabs: CampusCabsScreen,
  artiste: ArtisteScreen,
};

export default function FeaturedProject({ project }: { project: Project }) {
  const Screen = screens[project.slug];

  return (
    <article
      className={`relative flex h-full flex-col overflow-hidden rounded-2xl ${tints[project.tint] ?? "bg-tint-slate"} p-6 sm:p-8`}
    >
      <Eyebrow>Featured project</Eyebrow>

      <h3 className="font-display mt-3 text-3xl font-semibold leading-none tracking-tight sm:text-4xl">
        <Link
          href={`/projects/${project.slug}`}
          className="transition hover:text-accent-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-ink"
        >
          {project.name}
        </Link>
      </h3>

      <p className="font-display mt-2 max-w-[22ch] text-lg font-medium leading-snug">
        {project.tagline}
      </p>

      <div className="mt-5 flex flex-1 flex-col gap-6 lg:flex-row lg:gap-4">
        <div className="lg:w-[56%]">
          <p className="text-sm leading-relaxed text-muted">{project.summary}</p>
          <StorySteps story={project.story} className="mt-5" />
        </div>

        {/* The phone sits in its own column on wide screens, centred on narrow ones.
            The annotation goes above it in normal flow so the two never collide. */}
        <div className="flex flex-col items-center gap-1 lg:w-[44%] lg:items-end">
          {project.annotation && (
            <Annotation
              arrow="down"
              arrowClassName="h-7 w-4"
              align="end"
              className="hidden max-w-[10rem] pr-4 text-right lg:flex"
            >
              {project.annotation}
            </Annotation>
          )}
          {Screen && (
            <PhoneMockup className="w-[158px] sm:w-[178px]">
              <Screen />
            </PhoneMockup>
          )}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-fg/10 pt-4">
        <TechList items={project.tech} />
        <Link
          href={`/projects/${project.slug}`}
          className="group inline-flex items-center gap-1.5 font-sans text-sm font-medium text-accent-ink transition hover:gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink"
        >
          See the demo
          <ArrowIcon className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
