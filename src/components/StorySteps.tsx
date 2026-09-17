import type { Story } from "@/data/projects";

const labels: { key: keyof Story; label: string }[] = [
  { key: "problem", label: "Problem" },
  { key: "approach", label: "My approach" },
  { key: "outcome", label: "Outcome" },
];

/** The numbered Problem / Approach / Outcome narrative. */
export default function StorySteps({
  story,
  headingLevel: Heading = "h3",
  className = "",
}: {
  story: Story;
  /** h3 under a section <h2>, h4 when nested under a card's <h3>. */
  headingLevel?: "h3" | "h4";
  className?: string;
}) {
  return (
    <ol className={`space-y-4 ${className}`}>
      {labels.map((l, i) => (
        <li key={l.key} className="flex gap-3">
          <span
            aria-hidden="true"
            className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-fg font-sans text-[11px] font-semibold text-bg"
          >
            {i + 1}
          </span>
          <div>
            <Heading className="font-sans text-sm font-semibold text-fg">{l.label}</Heading>
            <p className="mt-1 text-sm leading-relaxed text-muted">{story[l.key]}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
