import { experience } from "@/data/profile";
import Section from "./Section";

export default function Experience() {
  return (
    <Section id="experience" title="Experience" eyebrow="02">
      <ol className="space-y-8">
        {experience.map((e) => (
          <li key={e.org + e.title} className="grid gap-2 sm:grid-cols-[10rem_1fr] sm:gap-8">
            <p className="font-mono text-sm text-muted">{e.period}</p>
            <div>
              <h3 className="font-semibold">
                {e.title} <span className="text-muted">· {e.org}</span>
              </h3>
              <p className="text-sm text-muted">{e.location}</p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-muted">
                {e.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
