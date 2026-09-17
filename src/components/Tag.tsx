/** The comma-separated tech run used under project names. */
export function TechList({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <p className={`font-serif text-sm italic leading-relaxed text-muted ${className}`}>
      {items.join(", ")}
    </p>
  );
}
