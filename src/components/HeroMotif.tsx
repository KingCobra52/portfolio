/**
 * An engraved-feeling line drawing: a campus arch filled with tonal hatching,
 * overlaid with a small node network. Stands in for the hand-drawn illustration
 * in the reference. Decorative only.
 */

// Hatch lines thin out toward the bottom, which reads as light falling off.
const hatch = Array.from({ length: 26 }, (_, i) => {
  const y = 126 + i * 6.2;
  const t = i / 25;
  return { y, opacity: 0.5 - t * 0.38, width: 1.1 - t * 0.45 };
});

const nodes = [
  { x: 160, y: 96 },
  { x: 104, y: 150 },
  { x: 216, y: 150 },
  { x: 126, y: 216 },
  { x: 196, y: 216 },
  { x: 160, y: 262 },
];

const edges = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 4],
  [3, 4],
  [3, 5],
  [4, 5],
  [1, 2],
];

export default function HeroMotif({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 300" fill="none" aria-hidden="true" className={className}>
      <defs>
        <clipPath id="hero-arch">
          <path d="M80 280V200a80 80 0 0 1 160 0v80z" />
        </clipPath>
      </defs>

      {/* Tonal hatching inside the arch */}
      <g clipPath="url(#hero-arch)" stroke="currentColor" strokeLinecap="round">
        {hatch.map((h) => (
          <path
            key={h.y}
            d={`M78 ${h.y}h164`}
            strokeWidth={h.width}
            strokeOpacity={h.opacity}
          />
        ))}
      </g>

      {/* Arch outline and plinth */}
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M80 280V200a80 80 0 0 1 160 0v80" strokeWidth="2.2" strokeOpacity="0.85" />
        <path d="M96 280V202a64 64 0 0 1 128 0v78" strokeWidth="1" strokeOpacity="0.35" />
        <path d="M58 280h204" strokeWidth="2.2" strokeOpacity="0.85" />
        <path d="M66 288h188" strokeWidth="1" strokeOpacity="0.35" />
      </g>

      {/* Node network */}
      <g stroke="currentColor" strokeOpacity="0.45" strokeWidth="1">
        {edges.map(([a, b]) => (
          <path
            key={`${a}-${b}`}
            d={`M${nodes[a].x} ${nodes[a].y}L${nodes[b].x} ${nodes[b].y}`}
          />
        ))}
      </g>
      <g>
        {nodes.map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={i === 0 ? 5 : 3.6}
            className="fill-bg"
            stroke="currentColor"
            strokeWidth="1.8"
          />
        ))}
      </g>
    </svg>
  );
}
