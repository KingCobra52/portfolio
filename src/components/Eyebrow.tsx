/** Small letterspaced uppercase label. Sans, so it contrasts with the serif. */
export default function Eyebrow({
  children,
  tone = "muted",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "muted" | "accent";
  className?: string;
}) {
  const color = tone === "accent" ? "text-accent-ink" : "text-muted";
  return (
    <p
      className={`font-sans text-[0.68rem] font-semibold uppercase tracking-[0.18em] ${color} ${className}`}
    >
      {children}
    </p>
  );
}
