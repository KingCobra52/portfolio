/** A single tech name, set in italic serif the way the rest of the site sets asides. */
export default function Tag({ children }: { children: React.ReactNode }) {
  return <span className="italic text-muted">{children}</span>;
}

/** The comma-separated tech run used under project names. */
export function TechList({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <p className={`font-serif text-sm italic leading-relaxed text-muted ${className}`}>
      {items.join(", ")}
    </p>
  );
}
