import { about, education, experience, skills } from "@/data/profile";
import Eyebrow from "./Eyebrow";
import Section from "./Section";

/**
 * The lean page folds Experience, Skills and Education in here as side notes,
 * rather than giving each its own section. No content was dropped -- it all
 * still comes from src/data/profile.ts.
 */
export default function About() {
  return (
    <Section id="about" title="Backend-leaning, product-minded." eyebrow="About">
      <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-muted">
          {about.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="space-y-8">
          <div>
            <Eyebrow>Now</Eyebrow>
            {experience.map((e) => (
              <div key={e.org} className="mt-3">
                <h3 className="font-display text-lg font-semibold leading-snug">
                  {e.title}, {e.org}
                </h3>
                <p className="mt-0.5 font-sans text-xs text-muted">
                  {e.period} &middot; {e.location}
                </p>
                <ul className="mt-2.5 space-y-2 text-sm leading-relaxed text-muted">
                  {e.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-6">
            <Eyebrow>Studying</Eyebrow>
            <h3 className="font-display mt-3 text-lg font-semibold leading-snug">
              {education.degree}
            </h3>
            <p className="mt-0.5 font-sans text-xs text-muted">
              {education.school} &middot; {education.location} &middot; {education.period}
            </p>
            <p className="mt-2.5 text-sm italic leading-relaxed text-muted">
              {education.coursework.join(" · ")}
            </p>
            <p className="mt-2 text-sm italic leading-relaxed text-muted">
              {education.activities.join(", ")}
            </p>
          </div>

          <div className="border-t border-border pt-6">
            <Eyebrow>Tools</Eyebrow>
            <dl className="mt-3 space-y-2.5">
              {skills.map((g) => (
                <div key={g.group} className="sm:grid sm:grid-cols-[8.5rem_1fr] sm:gap-3">
                  <dt className="font-sans text-xs font-semibold uppercase tracking-wider text-fg/70">
                    {g.group}
                  </dt>
                  <dd className="text-sm italic leading-relaxed text-muted">
                    {g.items.join(", ")}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </Section>
  );
}
