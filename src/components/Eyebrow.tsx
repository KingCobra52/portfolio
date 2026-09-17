/** Small letterspaced uppercase label. Sans, so it contrasts with the serif. */
export default function Eyebrow({
  children,
  tone = "muted",
  as: Tag = "p",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "muted" | "accent";
  /** Render as a heading when this label IS the section's heading. */
  as?: "p" | "h2" | "h3";
  className?: string;
}) {
  const color = tone === "accent" ? "text-accent-ink" : "text-muted";
  return (
    <Tag
      className={`font-sans text-[0.68rem] font-semibold uppercase tracking-[0.18em] ${color} ${className}`}
    >
      {children}
    </Tag>
  );
}
