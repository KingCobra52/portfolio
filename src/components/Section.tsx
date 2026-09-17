import Eyebrow from "./Eyebrow";

export default function Section({
  id,
  title,
  eyebrow,
  rule = true,
  children,
  className = "",
}: {
  id: string;
  title?: string;
  eyebrow?: string;
  rule?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-24 py-14 sm:py-20 ${className}`}>
      {(eyebrow || title) && (
        <div className={rule ? "border-t border-border pt-4" : undefined}>
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          {title && (
            <h2 className="font-display mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
              {title}
            </h2>
          )}
        </div>
      )}
      <div className={eyebrow || title ? "mt-8" : undefined}>{children}</div>
    </section>
  );
}
