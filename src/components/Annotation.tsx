/**
 * Handwritten marginalia with an optional hand-drawn arrow, in the spirit of
 * notes scribbled on a printout. Decorative: the whole thing is aria-hidden,
 * so nothing here may carry information that isn't already in real text.
 */

const arrows = {
  // Straight-ish drop with a wobble.
  down: { box: "0 0 24 54", d: "M12.5 2c-1.6 10 .8 18-1.4 27.5-.5 2.2-.4 9 .6 20", head: "M6 42.5c2.6 3 4.4 6 5.7 9.4 1.2-3.6 2.8-6.8 5.1-9.8" },
  // Sweeps left and down.
  curveLeft: { box: "0 0 64 52", d: "M58 3C50.6 15 39.4 24.4 26 30.6 20 33.4 14.6 37 10 41.6", head: "M4.6 31.8c.6 4 2 7.6 4 10.9 3.7-1.4 7.6-2.2 11.6-2.4" },
  // Sweeps right and down.
  curveRight: { box: "0 0 64 52", d: "M6 3c7.4 12 18.6 21.4 32 27.6 6 2.8 11.4 6.4 16 11", head: "M59.4 31.8c-.6 4-2 7.6-4 10.9-3.7-1.4-7.6-2.2-11.6-2.4" },
  // Long hook that reaches down and back under.
  hook: { box: "0 0 70 58", d: "M4 4c2.6 14.6 11.4 26.6 24.8 33.6 10 5.2 21 6.6 33 4.4", head: "M53.6 35.6c3.6 2.6 7.2 4.6 11.2 6.2-3 2.8-5.6 6-7.6 9.6" },
} as const;

export type ArrowKind = keyof typeof arrows;

export default function Annotation({
  children,
  arrow,
  arrowClassName = "h-12 w-12",
  align = "start",
  className = "",
}: {
  children: React.ReactNode;
  arrow?: ArrowKind;
  arrowClassName?: string;
  align?: "start" | "center" | "end";
  className?: string;
}) {
  const a = arrow ? arrows[arrow] : null;
  const items = align === "center" ? "items-center" : align === "end" ? "items-end" : "items-start";

  return (
    <div aria-hidden="true" className={`pointer-events-none flex flex-col ${items} ${className}`}>
      <span className="font-script text-xl leading-tight text-script sm:text-2xl">{children}</span>
      {a && (
        <svg viewBox={a.box} fill="none" className={`mt-1 text-script/70 ${arrowClassName}`}>
          <path d={a.d} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d={a.head} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );
}
