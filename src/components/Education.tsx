import { education } from "@/data/profile";
import Section from "./Section";

export default function Education() {
  return (
    <Section id="education" title="Education" eyebrow="05">
      <div className="grid gap-2 sm:grid-cols-[10rem_1fr] sm:gap-8">
        <p className="font-mono text-sm text-muted">{education.period}</p>
        <div>
          <h3 className="font-semibold">{education.degree}</h3>
          <p className="text-muted">
            {education.school} · {education.location}
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-sm font-semibold">Relevant coursework</p>
              <ul className="list-disc space-y-1 pl-5 text-sm text-muted">
                {education.coursework.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold">Activities</p>
              <ul className="list-disc space-y-1 pl-5 text-sm text-muted">
                {education.activities.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
