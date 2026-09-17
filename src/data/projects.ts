export type DemoKey = "artiste" | "http-server" | "campuscabs";

export type Project = {
  slug: string;
  name: string;
  short: string; // one line for the card
  summary: string; // a sentence or two for the page header
  status?: string;
  tech: string[];
  repo: string;
  live?: string;
  bullets: string[];
  learned: string;
  demo: DemoKey;
  demoTitle: string;
  demoIntro: string;
};

export const projects: Project[] = [
  {
    slug: "artiste",
    name: "Artiste",
    short: "iOS trading app where music fans buy and sell shares in artists.",
    summary:
      "A virtual artist trading platform for iOS, nearing App Store release. Fans discover artists, place buy and sell orders, and track a portfolio whose prices move with real streaming data.",
    status: "Nearing App Store release",
    tech: ["Python", "FastAPI", "PostgreSQL", "React Native", "pytest", "GitHub Actions"],
    repo: "https://github.com/KingCobra52/artiste_mobile_v2",
    bullets: [
      "JWT authentication, artist discovery, buy/sell orders, and portfolio tracking.",
      "Transactional safeguards that stop concurrent overspending and duplicate sales at the database level.",
      "Idempotent YouTube and Last.fm pipelines for 24 artists, batching up to 50 lookups and database writes per request.",
      "Three scheduled daily runs with failure isolation, monitoring, and 65 mocked unit tests.",
    ],
    learned:
      "The hard part was not the trading UI, it was money. Two taps on Buy, or two requests racing for the same cash balance, cannot both succeed. I ended up leaning on database transactions and idempotency keys instead of trusting the client, and writing tests that simulate the race.",
    demo: "artiste",
    demoTitle: "Trading simulator",
    demoIntro:
      "A tiny version of the market. You start with $1,000. Try to overspend, or double-click Buy, and watch the same guardrails the real app uses kick in. Advance a day to see the daily pipeline update prices.",
  },
  {
    slug: "http-server",
    name: "HTTP Server from Raw Sockets",
    short: "An HTTP server built directly on TCP sockets, no Flask or FastAPI.",
    summary:
      "An HTTP/1.1 server written in Python directly over TCP sockets, with no web framework. Started sequential, then grew a 32-worker thread pool, then an asyncio event loop.",
    tech: ["Python", "TCP/IP", "ThreadPoolExecutor", "asyncio", "pytest"],
    repo: "https://github.com/KingCobra52/http_server",
    bullets: [
      "Request parsing, routing, and response generation implemented from the socket layer up.",
      "Evolved from sequential handling to a 32-worker thread pool, then to an asyncio event loop.",
      "Content-Length headers, connection cleanup, and a 10-second receive timeout so slow clients cannot hold a worker forever.",
      "Tests cover routing, response framing, and up to 33 concurrent clients over real sockets.",
    ],
    learned:
      "Frameworks hide a lot. Getting Content-Length right, closing connections cleanly, and choosing a timeout were where most bugs lived. Moving from one thread to a pool to an event loop made the trade-offs between them concrete instead of textbook.",
    demo: "http-server",
    demoTitle: "Request playground and concurrency timeline",
    demoIntro:
      "Build a request and see the exact bytes the server sends back. Then set a number of simultaneous clients and compare how the three server designs handle them.",
  },
  {
    slug: "campuscabs",
    name: "CampusCabs",
    short: "Student ride-service pilot for affordable short trips around State College.",
    summary:
      "A student transportation venture for Penn State. Short campus trips priced by distance, coordinated drivers, and payments that go straight to the driver.",
    status: "Happy Valley LaunchBox Idea TestLab",
    tech: ["Next.js", "React", "TypeScript", "Supabase", "Tailwind CSS"],
    repo: "https://github.com/KingCobra52/campusCabs-landing-page",
    live: "https://campus-cabs-landing-page.vercel.app/",
    bullets: [
      "Designed a campus ride-service pilot with distance-based fares, manually coordinated drivers, and direct payments to drivers.",
      "Built a responsive Next.js site to recruit riders and drivers, storing signups in separate Supabase waitlists with validation, student email fields, and duplicate detection.",
      "Completed LaunchBox's four-week Idea TestLab and refined the pilot using mentor feedback and interview guides.",
    ],
    learned:
      "Talking to riders and drivers changed the product more than any code did. Riders cared about a predictable price for a two-mile trip; drivers cared about keeping most of it. The fare model above came out of those interviews.",
    demo: "campuscabs",
    demoTitle: "Fare estimator",
    demoIntro:
      "Pick a pickup and dropoff around campus. The fare is distance-based, and the breakdown shows how much of it reaches the driver. Prices are illustrative pilot numbers.",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
