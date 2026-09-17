import { skills } from "@/data/profile";
import Section from "./Section";
import Tag from "./Tag";

export default function Skills() {
  return (
    <Section id="skills" title="Skills" eyebrow="04">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((s) => (
          <div key={s.group}>
            <h3 className="mb-3 text-sm font-semibold">{s.group}</h3>
            <div className="flex flex-wrap gap-1.5">
              {s.items.map((i) => (
                <Tag key={i}>{i}</Tag>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
