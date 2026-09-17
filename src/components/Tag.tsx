export default function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full border border-border bg-bg-elevated px-2.5 py-0.5 text-xs font-medium text-muted">
      {children}
    </span>
  );
}
