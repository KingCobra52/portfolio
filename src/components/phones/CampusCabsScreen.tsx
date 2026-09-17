import { StatusBar, TabBar } from "../PhoneMockup";

const tabs = [
  { label: "Home", d: "M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" },
  { label: "Rides", d: "M5 17h14M6 17V9l2-4h8l2 4v8M7.5 13h.01M16.5 13h.01" },
  { label: "Join", d: "M16 20v-2a4 4 0 0 0-8 0v2M12 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" },
  { label: "Profile", d: "M4 20c0-3.3 3.6-5.5 8-5.5s8 2.2 8 5.5M12 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" },
];

/** Illustration of the CampusCabs rider flow. Decorative -- see PhoneMockup. */
export default function CampusCabsScreen() {
  return (
    <div className="flex h-full flex-col bg-white text-[#16233f]">
      <StatusBar />

      {/* App bar */}
      <div className="flex shrink-0 items-center justify-between px-4 pb-2 pt-1">
        <div className="flex items-center gap-1.5">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="9" />
            <circle cx="12" cy="12" r="3.2" />
          </svg>
          <span className="font-display text-[11px] font-semibold tracking-tight">CampusCabs</span>
        </div>
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </div>

      <div className="shrink-0 px-4">
        <h4 className="font-display text-[18px] font-semibold leading-[1.03] tracking-tight">
          Get there
          <br />
          together.
        </h4>
        <p className="mt-1 font-sans text-[8.5px] leading-snug text-[#16233f]/55">
          Affordable rides around
          <br />
          Penn State.
        </p>
      </div>

      {/* Route map */}
      <div className="mx-4 mt-2 h-[60px] shrink-0 overflow-hidden rounded-xl bg-[#eef1f6]">
        <svg viewBox="0 0 160 96" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
          <rect width="160" height="96" fill="#eef1f6" />
          {/* street grid */}
          <g stroke="#ffffff" strokeWidth="5">
            <path d="M0 26h160M0 62h160M38 0v96M104 0v96" />
          </g>
          <g stroke="#dfe5ee" strokeWidth="1.5">
            <path d="M0 44h160M70 0v96M136 0v96" />
          </g>
          {/* park block */}
          <rect x="106" y="64" width="34" height="24" rx="3" fill="#e2ebe2" />
          {/* route */}
          <path
            d="M26 78C26 60 38 56 54 56s26-6 26-22V12"
            fill="none"
            stroke="#2f4f8f"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeDasharray="0.1 5.2"
          />
          <circle cx="26" cy="78" r="3.4" fill="#2f4f8f" />
          {/* destination pin */}
          <path d="M80 4c4.4 0 8 3.6 8 8 0 5.6-8 13-8 13s-8-7.4-8-13c0-4.4 3.6-8 8-8z" fill="#f05c34" />
          <circle cx="80" cy="12" r="2.9" fill="#ffffff" />
        </svg>
      </div>

      {/* From / To */}
      <div className="mx-4 mt-2 shrink-0 space-y-1">
        {[
          { label: "From", value: "University Park", d: "M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11z" },
          { label: "To", value: "State College", d: "M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11z" },
        ].map((f) => (
          <div key={f.label} className="flex items-center gap-2 rounded-lg border border-[#16233f]/12 px-2 py-1">
            <svg viewBox="0 0 24 24" className="h-3 w-3 shrink-0 text-[#16233f]/40" fill="none" stroke="currentColor" strokeWidth="2">
              <path d={f.d} />
              <circle cx="12" cy="10" r="2.4" />
            </svg>
            <div className="min-w-0">
              <p className="font-sans text-[6.5px] uppercase tracking-wider text-[#16233f]/40">{f.label}</p>
              <p className="truncate font-sans text-[9px] font-medium">{f.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mx-4 mt-2 shrink-0 rounded-lg bg-[#16233f] py-1.5 text-center">
        <span className="font-sans text-[9.5px] font-semibold text-white">Find a ride</span>
      </div>

      <TabBar items={tabs} active={0} />
    </div>
  );
}
