import { hero, profile } from "@/data/profile";
import Annotation from "./Annotation";
import Button from "./Button";
import HeroMotif from "./HeroMotif";
import Swoosh from "./Swoosh";
import { ArrowIcon, GitHubIcon, LinkedInIcon } from "./Icons";

export default function Hero() {
  return (
    <section className="grid gap-12 py-14 sm:py-20 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8">
      {/* Left column */}
      <div className="max-w-2xl">
        <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-sans text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted">
          {hero.eyebrow.map((e, i) => (
            <span key={e} className="flex items-center gap-2.5">
              {i > 0 && <span aria-hidden="true" className="text-accent">&times;</span>}
              {e}
            </span>
          ))}
        </p>

        <h1 className="font-display mt-5 text-[2.75rem] font-semibold leading-[0.95] sm:text-6xl lg:text-[4.1rem]">
          {hero.headline.before}{" "}
          <span className="relative inline-block">
            <em className="italic text-accent">{hero.headline.emphasis}</em>
            <Swoosh
              variant="b"
              className="absolute -bottom-1 left-0 h-3 w-full text-accent sm:-bottom-2"
            />
          </span>{" "}
          {hero.headline.after}
        </h1>

        <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">{hero.sub}</p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button href="/#work" variant="coral" size="lg">
            See my work <ArrowIcon className="h-4 w-4" />
          </Button>

          {profile.resume && (
            <Button
              href={profile.resume}
              external
              variant="outline"
              size="lg"
              aria-label="Résumé (opens in a new tab)"
            >
              Résumé
            </Button>
          )}

          <div className="ml-1 flex items-center gap-1">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="rounded-full border border-fg/20 p-2.5 text-fg transition hover:border-accent hover:text-accent-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink"
            >
              <GitHubIcon />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="rounded-full border border-fg/20 p-2.5 text-fg transition hover:border-accent hover:text-accent-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink"
            >
              <LinkedInIcon />
            </a>
          </div>
        </div>
      </div>

      {/* Right column: marginalia around the motif. Hidden on small screens,
          where it would only crowd the headline. */}
      <div className="relative hidden min-h-[22rem] lg:block">
        <HeroMotif className="absolute right-0 top-2 h-[19rem] w-[19rem] text-script/50" />

        <Annotation arrow="down" arrowClassName="h-8 w-5" className="absolute left-0 top-0">
          {hero.notes.flow[0]}
        </Annotation>
        <Annotation arrow="down" arrowClassName="h-8 w-5" className="absolute left-8 top-[4.2rem]">
          {hero.notes.flow[1]}
        </Annotation>
        <Annotation className="absolute left-16 top-[8.4rem]">{hero.notes.flow[2]}</Annotation>

        <Annotation
          arrow="curveLeft"
          arrowClassName="h-9 w-12"
          align="end"
          className="absolute right-2 top-0 max-w-[10rem] text-right"
        >
          {hero.notes.school}
        </Annotation>

        <div aria-hidden="true" className="absolute bottom-8 right-1 flex flex-col items-end">
          {hero.notes.practice.map((w) => (
            <span key={w} className="font-script text-xl leading-[1.15] text-script">
              {w}
            </span>
          ))}
        </div>

        <p className="font-display absolute bottom-0 left-0 max-w-[13rem] text-2xl font-medium leading-tight">
          {hero.pullQuote}
        </p>
      </div>
    </section>
  );
}
