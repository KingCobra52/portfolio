export type DemoKey = "artiste" | "http-server" | "campuscabs";

export type Tint = "blue" | "peach" | "slate" | "sky";

/** The 1/2/3 narrative shown on featured cards and project pages. */
export type Story = {
  problem: string;
  approach: string;
  outcome: string;
};

export type Project = {
  slug: string;
  name: string;
  tagline: string; // the serif line directly under the name
  short: string; // one line for the card
  summary: string; // a sentence or two for the page header
  status?: string;
  featured: boolean; // featured projects get a full tinted panel on the home page
  tint: Tint;
  annotation?: string; // handwritten marginalia; decorative, aria-hidden
  tech: string[];
  repo: string;
  live?: string;
  story: Story;
  bullets: string[];
  learned: string;
  demo: DemoKey;
  demoTitle: string;
  demoIntro: string;
};

export const projects: Project[] = [
  {
    slug: "campuscabs",
    name: "CampusCabs",
    tagline: "A student transportation venture for Penn State.",
    short: "Student ride-service pilot for affordable short trips around State College.",
    summary:
      "A student transportation venture for Penn State. Short campus trips priced by distance, coordinated drivers, and payments that go straight to the driver.",
    status: "Happy Valley LaunchBox Idea TestLab",
    featured: true,
    tint: "blue",
    annotation: "Built for a stronger Penn State",
    tech: ["Next.js", "React", "TypeScript", "Supabase", "Tailwind CSS"],
    repo: "https://github.com/KingCobra52/campusCabs-landing-page",
    live: "https://campus-cabs-landing-page.vercel.app/",
    story: {
      problem:
        "Students needed a more affordable and more reliable way to make short trips around campus and State College.",
      approach:
        "Designed a pilot with distance-based fares and separate rider and driver waitlists, built a responsive Next.js recruiting site on Supabase, and ran user research through Penn State's Happy Valley LaunchBox.",
      outcome:
        "A validated pilot concept, with real rider and driver feedback that reshaped the fare model more than any code did.",
    },
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
  {
    slug: "artiste",
    name: "Artiste",
    tagline: "Invest in the artists you believe in.",
    short:
      "iOS app where music fans discover artists, trade virtual shares, and build portfolios that move with streaming data.",
    summary:
      "Artiste turns music fandom into an interactive experience. Fans discover artists, buy and sell virtual shares, and build portfolios whose prices move with real-world streaming performance.",
    status: "Nearing App Store release",
    featured: true,
    tint: "peach",
    annotation: "Music brings people together",
    tech: ["Python", "FastAPI", "PostgreSQL", "React Native", "pytest", "GitHub Actions"],
    repo: "https://github.com/KingCobra52/artiste_mobile_v2",
    story: {
      problem:
        "Music fans can stream, follow, and share the artists they love, but those experiences are mostly passive. There isn't an engaging way for fans to discover talent early, back the artists they believe in, and follow their growth over time.",
      approach:
        "I designed Artiste around discovering, trading, and collecting artists. Fans can explore trending and emerging artists, buy and sell virtual shares, watch prices respond to streaming data, and build a portfolio around their taste in music.",
      outcome:
        "A nearly App Store-ready iOS experience that combines music discovery with a virtual marketplace—turning an artist's growth into something fans can follow, participate in, and build a collection around.",
    },
    // Hardest engineering first: the story above is product-led, so this list
    // is where the depth lives.
    bullets: [
      "Transactional safeguards that stop concurrent overspending and duplicate sales at the database level.",
      "Idempotent YouTube and Last.fm pipelines for 24 artists, batching up to 50 lookups and database writes per request.",
      "Three scheduled daily runs with failure isolation, monitoring, and 65 mocked unit tests.",
      "JWT authentication, artist discovery, buy/sell orders, and portfolio tracking.",
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
    tagline: "An HTTP/1.1 server built from the socket layer up.",
    short: "An HTTP server built directly on TCP sockets, no Flask or FastAPI.",
    summary:
      "An HTTP/1.1 server written in Python directly over TCP sockets, with no web framework. Started sequential, then grew a 32-worker thread pool, then an asyncio event loop.",
    featured: false,
    tint: "slate",
    tech: ["Python", "TCP/IP", "ThreadPoolExecutor", "asyncio", "pytest"],
    repo: "https://github.com/KingCobra52/http_server",
    story: {
      problem:
        "Web frameworks hide almost everything about how a request actually becomes a response.",
      approach:
        "Wrote request parsing, routing, and response generation straight onto TCP sockets, then evolved the server from sequential handling to a 32-worker thread pool to an asyncio event loop.",
      outcome:
        "Correct Content-Length framing, clean connection teardown, and a 10-second receive timeout, tested against up to 33 concurrent clients over real sockets.",
    },
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
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
