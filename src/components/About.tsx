import { about } from "@/data/profile";
import Section from "./Section";

export default function About() {
  return (
    <Section id="about" title="About" eyebrow="01">
      <div className="max-w-2xl space-y-4 leading-relaxed text-muted">
        {about.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </Section>
  );
}
