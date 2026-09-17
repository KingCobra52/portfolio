/**
 * A code-drawn phone frame. The screens inside are illustrations of the real
 * apps, not screenshots, so the whole thing is aria-hidden -- every claim they
 * make also appears as real text next to them.
 *
 * Screens are authored once at REF_W x REF_H and scaled to whatever width the
 * frame is rendered at. Sizing them in raw pixels against a fluid frame meant
 * the tab bar fell outside the frame and got clipped.
 */
const REF_W = 178;
const REF_H = Math.round((REF_W * 19) / 9); // 376

export default function PhoneMockup({
  children,
  width = REF_W,
  className = "",
}: {
  children: React.ReactNode;
  width?: number;
  className?: string;
}) {
  const scale = width / REF_W;

  return (
    <div aria-hidden="true" className={`relative select-none ${className}`} style={{ width }}>
      <div className="relative rounded-[2.6rem] bg-[#1c1d22] p-[3px] shadow-[0_28px_60px_-20px_rgba(22,35,63,0.45),0_8px_20px_-8px_rgba(22,35,63,0.3)]">
        <div className="relative overflow-hidden rounded-[2.4rem] bg-white ring-1 ring-black/10">
          {/* Notch */}
          <div className="absolute left-1/2 top-[7px] z-20 h-[15px] w-[54px] -translate-x-1/2 rounded-full bg-[#1c1d22]" />
          <div style={{ width: width, height: Math.round(REF_H * scale) }}>
            <div
              className="origin-top-left"
              style={{ width: REF_W, height: REF_H, transform: `scale(${scale})` }}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Shared iOS-ish status bar. */
export function StatusBar({ dark = false }: { dark?: boolean }) {
  const tone = dark ? "bg-white/85" : "bg-[#16233f]/80";
  const text = dark ? "text-white/85" : "text-[#16233f]/80";
  return (
    <div className="flex shrink-0 items-center justify-between px-4 pb-1 pt-[25px]">
      <span className={`font-sans text-[9px] font-semibold ${text}`}>9:41</span>
      <div className="flex items-center gap-[3px]">
        <span className={`h-[7px] w-[2px] rounded-sm ${tone} opacity-50`} />
        <span className={`h-[9px] w-[2px] rounded-sm ${tone} opacity-70`} />
        <span className={`h-[11px] w-[2px] rounded-sm ${tone}`} />
        <span className={`ml-1 h-[8px] w-[14px] rounded-[2px] border ${dark ? "border-white/60" : "border-[#16233f]/50"}`}>
          <span className={`block h-full w-2/3 rounded-[1px] ${tone}`} />
        </span>
      </div>
    </div>
  );
}

/** Shared bottom tab bar. */
export function TabBar({
  items,
  active = 0,
  dark = false,
}: {
  items: { label: string; d: string }[];
  active?: number;
  dark?: boolean;
}) {
  return (
    <div
      className={`mt-auto flex shrink-0 items-end justify-around border-t px-2 pb-3 pt-2 ${
        dark ? "border-white/10 bg-[#14151a]" : "border-[#16233f]/10 bg-white"
      }`}
    >
      {items.map((it, i) => {
        const on = i === active;
        const color = on
          ? dark
            ? "text-white"
            : "text-[#16233f]"
          : dark
            ? "text-white/35"
            : "text-[#16233f]/35";
        return (
          <div key={it.label} className={`flex flex-col items-center gap-[3px] ${color}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-[13px] w-[13px]">
              <path d={it.d} />
            </svg>
            <span className="font-sans text-[7px] font-medium">{it.label}</span>
          </div>
        );
      })}
    </div>
  );
}
