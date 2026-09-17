"use client";

import { useState } from "react";

type Method = "GET" | "POST" | "HEAD";
const methods: Method[] = ["GET", "POST", "HEAD"];

// Routes the toy server knows about, with the methods each accepts.
const routes: Record<string, { methods: Method[]; body: (b: string) => string; type: string }> = {
  "/": { methods: ["GET", "HEAD"], body: () => "<h1>Hello from raw sockets</h1>", type: "text/html" },
  "/hello": { methods: ["GET", "HEAD"], body: () => "Hello, world!", type: "text/plain" },
  "/health": { methods: ["GET", "HEAD"], body: () => '{"status":"ok"}', type: "application/json" },
  "/echo": { methods: ["POST"], body: (b) => b, type: "text/plain" },
};

const CRLF = "\r\n";

function buildRequest(method: Method, path: string, body: string) {
  const lines = [`${method} ${path} HTTP/1.1`, "Host: localhost:8080", "User-Agent: portfolio-demo/1.0", "Accept: */*"];
  if (method === "POST") {
    lines.push("Content-Type: text/plain", `Content-Length: ${new TextEncoder().encode(body).length}`);
  }
  return lines.join(CRLF) + CRLF + CRLF + (method === "POST" ? body : "");
}

function buildResponse(method: Method, path: string, body: string) {
  const route = routes[path];
  let status = "200 OK";
  let payload = "";
  let type = "text/plain";
  const extra: string[] = [];

  if (!route) {
    status = "404 Not Found";
    payload = `No route for ${path}`;
  } else if (!route.methods.includes(method)) {
    status = "405 Method Not Allowed";
    payload = `${method} not allowed on ${path}`;
    extra.push(`Allow: ${route.methods.join(", ")}`);
  } else {
    payload = route.body(body);
    type = route.type;
  }

  const len = new TextEncoder().encode(payload).length;
  const lines = [
    `HTTP/1.1 ${status}`,
    "Server: raw-sockets/0.3",
    `Content-Type: ${type}; charset=utf-8`,
    `Content-Length: ${len}`,
    ...extra,
    "Connection: close",
  ];
  const head = lines.join(CRLF) + CRLF + CRLF;
  return { status, text: head + (method === "HEAD" ? "" : payload), len };
}

function Wire({ text }: { text: string }) {
  // Render the bytes with visible CRLF markers so framing is obvious.
  const parts = text.split(CRLF);
  return (
    <pre className="overflow-x-auto rounded-md border border-border bg-bg p-3 font-mono text-xs leading-relaxed">
      {parts.map((line, i) => (
        <span key={i}>
          {line}
          {i < parts.length - 1 && <span className="select-none text-accent/70">\r\n</span>}
          {i < parts.length - 1 && "\n"}
        </span>
      ))}
    </pre>
  );
}

type Mode = "sequential" | "threadpool" | "asyncio";
const modeLabels: Record<Mode, string> = {
  sequential: "Sequential",
  threadpool: "Thread pool (32 workers)",
  asyncio: "asyncio event loop",
};
const SERVICE_MS = 100; // simulated time to handle one request
const WORKERS = 32;

function schedule(mode: Mode, clients: number) {
  // Returns [start, end] in ms for each client.
  const out: [number, number][] = [];
  for (let i = 0; i < clients; i++) {
    if (mode === "sequential") out.push([i * SERVICE_MS, (i + 1) * SERVICE_MS]);
    else if (mode === "threadpool") {
      const wave = Math.floor(i / WORKERS);
      out.push([wave * SERVICE_MS, (wave + 1) * SERVICE_MS]);
    } else {
      // The event loop interleaves; each request finishes just after the last with a tiny scheduling cost.
      out.push([i * 1.5, SERVICE_MS + i * 1.5]);
    }
  }
  return out;
}

function axisMax(total: number) {
  // Round the axis up to a clean number a little past the last bar.
  const mag = Math.pow(10, Math.floor(Math.log10(total)));
  return Math.ceil(total / mag) * mag;
}

function niceTicks(max: number) {
  // 4 to 6 evenly spaced, round-numbered ticks.
  const raw = max / 5;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((c) => c >= raw) ?? mag * 10;
  const out: number[] = [];
  for (let t = 0; t <= max + 1e-9; t += step) out.push(Math.round(t));
  return out;
}

export default function HttpServerDemo() {
  const [method, setMethod] = useState<Method>("GET");
  const [path, setPath] = useState("/hello");
  const [custom, setCustom] = useState("");
  const [body, setBody] = useState("ping");
  const [mode, setMode] = useState<Mode>("sequential");
  const [clients, setClients] = useState(33);

  const effectivePath = path === "custom" ? custom || "/" : path;
  const req = buildRequest(method, effectivePath, body);
  const res = buildResponse(method, effectivePath, body);

  const spans = schedule(mode, clients);
  const total = Math.max(...spans.map((s) => s[1]));
  // Each mode gets an axis sized to its own run so the bars stay readable. The
  // cross-mode comparison lives in the wall-time row below, where it is exact.
  const maxAxis = axisMax(total);
  const ticks = niceTicks(maxAxis);
  const walls = (Object.keys(modeLabels) as Mode[]).map((m) => {
    const sp = schedule(m, clients);
    return [m, Math.max(...sp.map((x) => x[1]))] as const;
  });
  const W = 560;
  const rowH = clients > 16 ? 9 : 14;
  const labelEvery = clients > 16 ? 4 : 1;
  const H = clients * rowH + 24;

  const selectClass =
    "rounded-md border border-border bg-bg px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-accent";

  return (
    <div className="space-y-10">
      {/* Part 1 */}
      <div>
        <h3 className="text-sm font-semibold">1. Bytes on the wire</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          <select aria-label="Method" className={selectClass} value={method} onChange={(e) => setMethod(e.target.value as Method)}>
            {methods.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
          <select aria-label="Path" className={selectClass} value={path} onChange={(e) => setPath(e.target.value)}>
            {Object.keys(routes).map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
            <option value="custom">custom path…</option>
          </select>
          {path === "custom" && (
            <input
              aria-label="Custom path"
              className={`${selectClass} flex-1`}
              placeholder="/anything"
              value={custom}
              onChange={(e) => setCustom(e.target.value.startsWith("/") ? e.target.value : "/" + e.target.value)}
            />
          )}
          {method === "POST" && (
            <input aria-label="Request body" className={`${selectClass} flex-1`} value={body} onChange={(e) => setBody(e.target.value)} />
          )}
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <p className="mb-1 text-xs font-medium text-muted">Client sends</p>
            <Wire text={req} />
          </div>
          <div>
            <p className="mb-1 flex items-center justify-between text-xs font-medium text-muted">
              <span>Server replies</span>
              <span className="font-mono">{res.status}</span>
            </p>
            <Wire text={res.text} />
          </div>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-muted">
          Unknown paths get a 404, wrong methods get a 405 with an Allow header, and HEAD returns headers only.
          Content-Length is always the byte length of the body, which is what lets the client know when the
          response ends.
        </p>
      </div>

      {/* Part 2 */}
      <div>
        <h3 className="text-sm font-semibold">2. Handling many clients at once</h3>
        <div className="mt-3 flex flex-wrap items-center gap-4">
          <div className="inline-flex rounded-md border border-border p-0.5" role="group" aria-label="Server mode">
            {(Object.keys(modeLabels) as Mode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                aria-pressed={mode === m}
                className={`rounded px-3 py-1.5 text-xs font-medium transition ${
                  mode === m ? "bg-fg text-bg" : "text-muted hover:text-fg"
                }`}
              >
                {modeLabels[m]}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-3 text-xs text-muted">
            <span>
              Clients: <span className="font-mono text-fg">{clients}</span>
            </span>
            <input type="range" min={1} max={33} value={clients} onChange={(e) => setClients(+e.target.value)} className="accent-[var(--accent)]" />
          </label>
        </div>

        <div className="mt-4 overflow-x-auto rounded-md border border-border bg-bg p-3">
          <svg viewBox={`0 0 ${W} ${H}`} width="100%" className="min-w-[420px]" role="img" aria-label={`Completion timeline for ${clients} clients in ${modeLabels[mode]} mode, total ${Math.round(total)} milliseconds`}>
            {ticks.map((t) => {
              const x = 40 + (t / maxAxis) * (W - 50);
              return (
                <g key={t}>
                  <line x1={x} x2={x} y1={0} y2={H - 20} stroke="var(--border)" strokeWidth="1" />
                  <text x={x} y={H - 6} fontSize="9" textAnchor="middle" fill="var(--muted)">
                    {t}ms
                  </text>
                </g>
              );
            })}
            {spans.map(([s, e], i) => {
              const x1 = 40 + (s / maxAxis) * (W - 50);
              const x2 = 40 + (e / maxAxis) * (W - 50);
              const y = i * rowH + 2;
              const queued = mode === "threadpool" && i >= WORKERS;
              return (
                <g key={i}>
                  {(i % labelEvery === 0 || i === clients - 1) && (
                    <text x={34} y={y + rowH * 0.75} fontSize={rowH > 10 ? 9 : 8} textAnchor="end" fill="var(--muted)">
                      c{i + 1}
                    </text>
                  )}
                  <rect x={x1} y={y} width={Math.max(2, x2 - x1)} height={rowH - 2} rx="2" fill={queued ? "var(--muted)" : "var(--accent)"}>
                    <title>{`Client ${i + 1}: starts at ${Math.round(s)} ms, done at ${Math.round(e)} ms${queued ? " (queued behind 32 workers)" : ""}`}</title>
                  </rect>
                </g>
              );
            })}
          </svg>
        </div>
        <div className="mt-4">
          <p className="mb-2 text-xs font-medium text-muted">Wall time for {clients} client{clients === 1 ? "" : "s"}</p>
          <div className="grid gap-2 sm:grid-cols-3">
            {walls.map(([m, w]) => (
              <div
                key={m}
                className={`rounded-md border px-3 py-2 ${m === mode ? "border-accent bg-accent-soft" : "border-border"}`}
              >
                <p className="text-xs text-muted">{modeLabels[m]}</p>
                <p className="font-mono text-lg font-medium">{Math.round(w)} ms</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs leading-relaxed text-muted">
            {mode === "sequential" && "One request at a time. Every client waits for all the ones before it."}
            {mode === "threadpool" &&
              (clients > WORKERS
                ? "32 run at once; the 33rd waits for a free worker. That grey bar is the queue, and it is why the tests go to 33."
                : "Every request runs at once, each on its own worker thread.")}
            {mode === "asyncio" && "One thread, but the loop switches to another request whenever one is waiting on the socket."}
          </p>
        </div>
      </div>
    </div>
  );
}
