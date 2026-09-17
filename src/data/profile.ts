// All site content lives here. Edit this file to update the portfolio.

export const profile = {
  name: "Siddarth Thota",
  handle: "KingCobra52",
  role: "Computer Science student at Penn State",
  tagline:
    "I build backend systems, mobile apps, and data pipelines, and I care about the details that make them hold up under real use.",
  location: "University Park, PA",
  github: "https://github.com/KingCobra52",
  linkedin: "https://www.linkedin.com/in/siddarth-thota-0541b3265/",
  repo: "https://github.com/KingCobra52/portfolio",

  // Served from public/resume.pdf. Set to null to hide the Resume button.
  resume: "/resume.pdf" as string | null,

  // Drop the photo at public/portrait.jpg. Set to null to hide it.
  portrait: "/portrait.jpg" as string | null,
};

// The hero headline is split so one word can be set in coral italic.
export const hero = {
  eyebrow: ["Software engineer", "Product builder", "Problem solver"],
  headline: { before: "Engineering products people can", emphasis: "actually", after: "use." },
  sub: "Penn State CS student building mobile products, backend systems, and thoughtful digital experiences.",
  // Handwritten marginalia. Decorative only -- these are aria-hidden.
  notes: {
    flow: ["Ideas", "Products", "Real impact"],
    school: "Penn State Computer Science",
    practice: ["Build", "Learn", "Iterate"],
  },
};

export const about = [
  "I'm a Computer Science major at The Pennsylvania State University, graduating in 2029. Most of my work sits at the backend: REST APIs, database transactions, concurrency, and the testing that keeps them honest.",
  "Outside class I ship real products. Artiste is an iOS trading app for music fans that is nearing App Store release. CampusCabs is a student ride-service pilot that went through Happy Valley LaunchBox. I also like building things from scratch to understand them, like an HTTP server written directly on TCP sockets.",
  "Right now I'm on the HackPSU design team, working on Figma systems and event graphics for a hackathon serving more than 900 attendees.",
];

export type Experience = {
  org: string;
  title: string;
  period: string;
  location: string;
  bullets: string[];
};

export const experience: Experience[] = [
  {
    org: "HackPSU",
    title: "Design Team Member",
    period: "Sep 2026 – Present",
    location: "University Park, PA",
    bullets: [
      "Design high-fidelity Figma systems and user flows for registration, schedules, judging queues, and live event dashboards in collaboration with the Technology team.",
      "Create venue wayfinding, sponsor graphics, social content, and merchandise for an event planned to serve more than 900 attendees.",
    ],
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages & Web", items: ["Python", "TypeScript", "JavaScript", "SQL", "HTML", "CSS"] },
  { group: "Frameworks", items: ["FastAPI", "React Native", "Next.js", "React"] },
  { group: "Data & ML", items: ["PostgreSQL", "Supabase", "Pandas", "NumPy", "Matplotlib", "PyTorch"] },
  { group: "Testing & Tools", items: ["Git", "GitHub Actions", "pytest", "HTTP mocking", "Unit & integration testing"] },
  { group: "Backend & Systems", items: ["REST APIs", "Database transactions", "TCP sockets", "asyncio", "Multithreading"] },
  { group: "Design", items: ["Figma", "User flows", "Event graphics"] },
];

export const education = {
  school: "The Pennsylvania State University",
  degree: "B.S. in Computer Science",
  period: "Expected 2029",
  location: "University Park, PA",
  coursework: [
    "Data Structures (CMPSC 132)",
    "Introduction to Data Sciences (DS 200)",
    "Matrices / Linear Algebra (MATH 220)",
    "Calculus II (MATH 141)",
    "Calculus and Vector Analysis (MATH 230, in progress)",
  ],
  activities: ["Association for Computing Machinery (ACM), Penn State Chapter"],
};
