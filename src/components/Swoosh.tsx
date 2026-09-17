/**
 * A hand-drawn underline stroke, the kind you'd make with a felt tip.
 * Purely decorative -- always aria-hidden.
 */
const paths = {
  // Long, slightly rising sweep with a tapered tail.
  a: "M3 13.5C38 6.5 86 3.6 134 4.2c37 .5 74 2.6 110 6.3-31-1-62-1.7-93-1.9-49-.3-98 1.4-146 5.6",
  // Shorter, flatter mark with a small kick at the end.
  b: "M2 11C30 5.4 62 2.6 94 2.2c34-.4 68 1.6 101 5.9-28-1.3-56-2-84-1.8-36 .2-73 1.9-109 4.9",
} as const;

export default function Swoosh({
  variant = "a",
  className = "h-3 w-full",
}: {
  variant?: keyof typeof paths;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 248 18"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d={paths[variant]}
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
