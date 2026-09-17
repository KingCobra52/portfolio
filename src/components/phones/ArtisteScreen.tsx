import { StatusBar, TabBar } from "../PhoneMockup";

const tabs = [
  { label: "Home", d: "M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" },
  { label: "Search", d: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-4-4" },
  { label: "Collection", d: "M4 5h7v7H4zM13 5h7v7h-7zM4 14h7v5H4zM13 14h7v5h-7z" },
  { label: "Profile", d: "M4 20c0-3.3 3.6-5.5 8-5.5s8 2.2 8 5.5M12 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" },
];

// Stand-ins for artwork: gradients, so the illustration ships no image files.
const art = [
  "linear-gradient(150deg,#8c4a2f,#e08a52)",
  "linear-gradient(150deg,#2f3f6b,#6f7fa8)",
  "linear-gradient(150deg,#5c3350,#a96a8a)",
];

/** Illustration of the Artiste discovery screen. Decorative -- see PhoneMockup. */
export default function ArtisteScreen() {
  return (
    <div className="flex h-full flex-col bg-white text-[#16233f]">
      <StatusBar />

      {/* App bar */}
      <div className="flex shrink-0 items-center justify-between px-4 pb-2 pt-1">
        <span className="font-display text-[12px] font-semibold tracking-tight">Artiste</span>
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-4-4" />
        </svg>
      </div>

      {/* Hero card */}
      <div className="mx-3 shrink-0 overflow-hidden rounded-xl bg-[#191a20] px-3 py-2">
        <h4 className="font-display text-[15px] font-semibold leading-[1.12] tracking-tight text-white">
          Discover
          <br />
          Trade
          <br />
          Collect Artists
        </h4>
        <p className="mt-1 font-sans text-[7.5px] leading-snug text-white/55">
          Invest in the artists
          <br />
          you believe in.
        </p>
      </div>

      {/* Artwork grid */}
      <div className="mx-3 mt-2 grid shrink-0 grid-cols-3 gap-1.5">
        {art.map((bg, i) => (
          <div key={i} className="aspect-square rounded-md" style={{ backgroundImage: bg }} />
        ))}
      </div>

      {/* Trending */}
      <div className="mt-2.5 flex shrink-0 items-center justify-between px-3">
        <span className="font-display text-[10px] font-semibold tracking-tight">Trending Artists</span>
        <span className="font-sans text-[7px] text-[#16233f]/45">See all</span>
      </div>

      <div className="mx-3 mt-1.5 shrink-0 space-y-1.5">
        {[
          { name: "Nova Reyes", delta: "+4.2%", up: true, bg: art[0] },
          { name: "Kilo Vantage", delta: "-1.8%", up: false, bg: art[1] },
        ].map((a) => (
          <div key={a.name} className="flex items-center gap-2 rounded-lg border border-[#16233f]/10 px-2 py-1.5">
            <div className="h-5 w-5 shrink-0 rounded-md" style={{ backgroundImage: a.bg }} />
            <span className="flex-1 truncate font-sans text-[8.5px] font-medium">{a.name}</span>
            <span
              className={`font-mono text-[7.5px] font-semibold ${a.up ? "text-[#1f7a52]" : "text-[#b83a1c]"}`}
            >
              {a.delta}
            </span>
          </div>
        ))}
      </div>

      <TabBar items={tabs} active={0} />
    </div>
  );
}
