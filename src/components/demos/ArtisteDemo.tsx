"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Sparkline from "./Sparkline";

type Artist = { id: string; name: string; genre: string; drift: number; vol: number; start: number };

// Fictional artists. Prices are generated, not real.
const artists: Artist[] = [
  { id: "nova", name: "Nova Reyes", genre: "Pop", drift: 0.004, vol: 0.03, start: 24 },
  { id: "kilo", name: "Kilo Vantage", genre: "Hip-hop", drift: 0.006, vol: 0.05, start: 41 },
  { id: "ember", name: "Ember & Co.", genre: "Indie", drift: 0.002, vol: 0.02, start: 12 },
  { id: "halide", name: "Halide", genre: "Electronic", drift: 0.001, vol: 0.04, start: 18 },
];

// Small seeded PRNG so the market looks the same on every visit.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function step(price: number, a: Artist, rnd: () => number) {
  const shock = (rnd() - 0.5) * 2 * a.vol;
  return Math.max(1, +(price * (1 + a.drift + shock)).toFixed(2));
}

function initialHistory() {
  const rnd = mulberry32(52);
  const out: Record<string, number[]> = {};
  for (const a of artists) {
    const h = [a.start];
    for (let i = 1; i < 30; i++) h.push(step(h[i - 1], a, rnd));
    out[a.id] = h;
  }
  return out;
}

type Event = { id: number; kind: "ok" | "rejected" | "info"; text: string };

const START_CASH = 1000;
const COMMIT_MS = 700;

function money(x: number) {
  return `$${x.toFixed(2)}`;
}

export default function ArtisteDemo() {
  const [history, setHistory] = useState<Record<string, number[]>>(initialHistory);
  const [cash, setCash] = useState(START_CASH);
  const [holdings, setHoldings] = useState<Record<string, number>>({});
  const [selected, setSelected] = useState(artists[0].id);
  const [qty, setQty] = useState(5);
  const [events, setEvents] = useState<Event[]>([
    { id: 0, kind: "info", text: "Account funded with $1,000. Prices seeded from 30 days of pipeline runs." },
  ]);
  const [orderKey, setOrderKey] = useState("ord_a1f3c9");
  const [inFlight, setInFlight] = useState<string | null>(null);
  const rnd = useRef(mulberry32(99));
  const eventId = useRef(1);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const price = (id: string) => history[id][history[id].length - 1];
  const artist = artists.find((a) => a.id === selected)!;
  const day = history[artists[0].id].length;

  const portfolioValue = useMemo(
    () => Object.entries(holdings).reduce((sum, [id, n]) => sum + n * price(id), 0),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [holdings, history],
  );

  function log(kind: Event["kind"], text: string) {
    setEvents((e) => [{ id: eventId.current++, kind, text }, ...e].slice(0, 6));
  }

  function newKey() {
    const k = "ord_" + Math.floor(rnd.current() * 0xffffff).toString(16).padStart(6, "0");
    setOrderKey(k);
  }

  function submit(side: "buy" | "sell") {
    const n = Math.max(1, Math.floor(qty || 0));
    const p = price(selected);
    const total = +(n * p).toFixed(2);

    // Idempotency: the same order key cannot be processed twice, even while the first is still committing.
    if (inFlight === orderKey) {
      log("rejected", `Duplicate ignored: ${orderKey} is already in flight. Same key, same result, no double charge.`);
      return;
    }

    // Validation happens inside the "transaction", before any balance is touched.
    if (side === "buy" && total > cash) {
      log("rejected", `Insufficient funds: ${n} × ${money(p)} = ${money(total)} but cash is ${money(cash)}. Rolled back.`);
      return;
    }
    const held = holdings[selected] ?? 0;
    if (side === "sell" && n > held) {
      log("rejected", `You hold ${held} ${artist.name} share${held === 1 ? "" : "s"}, cannot sell ${n}. Rolled back.`);
      return;
    }

    setInFlight(orderKey);
    const key = orderKey;
    timer.current = setTimeout(() => {
      if (side === "buy") {
        setCash((c) => +(c - total).toFixed(2));
        setHoldings((h) => ({ ...h, [selected]: (h[selected] ?? 0) + n }));
        log("ok", `${key} committed: bought ${n} ${artist.name} at ${money(p)} for ${money(total)}.`);
      } else {
        setCash((c) => +(c + total).toFixed(2));
        setHoldings((h) => {
          const next = { ...h, [selected]: (h[selected] ?? 0) - n };
          if (next[selected] === 0) delete next[selected];
          return next;
        });
        log("ok", `${key} committed: sold ${n} ${artist.name} at ${money(p)} for ${money(total)}.`);
      }
      setInFlight(null);
      newKey();
    }, COMMIT_MS);
  }

  function nextDay() {
    setHistory((h) => {
      const out: Record<string, number[]> = {};
      for (const a of artists) out[a.id] = [...h[a.id], step(h[a.id][h[a.id].length - 1], a, rnd.current)];
      return out;
    });
    log("info", `Pipeline run for day ${day + 1}: refreshed ${artists.length} artists from streaming data. Idempotent, so a retry would change nothing.`);
  }

  const inputClass =
    "w-full rounded-md border border-border bg-bg px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-accent";

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
      {/* Market */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-medium uppercase tracking-wider text-muted">Market · day {day}</p>
          <button
            type="button"
            onClick={nextDay}
            className="rounded-md border border-border px-3 py-1.5 text-xs font-medium transition hover:border-accent hover:text-accent"
          >
            Run daily pipeline →
          </button>
        </div>
        <ul className="divide-y divide-border rounded-lg border border-border bg-bg">
          {artists.map((a) => {
            const h = history[a.id];
            const p = h[h.length - 1];
            const change = ((p - h[h.length - 2]) / h[h.length - 2]) * 100;
            const active = a.id === selected;
            return (
              <li key={a.id}>
                <button
                  type="button"
                  onClick={() => setSelected(a.id)}
                  aria-pressed={active}
                  className={`flex w-full items-center gap-4 px-4 py-3 text-left transition ${
                    active ? "bg-accent-soft" : "hover:bg-bg-elevated"
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{a.name}</p>
                    <p className="text-xs text-muted">{a.genre}</p>
                  </div>
                  <Sparkline values={h.slice(-30)} className="hidden shrink-0 text-accent sm:block" />
                  <div className="w-20 shrink-0 text-right">
                    <p className="font-mono text-sm">{money(p)}</p>
                    <p className={`text-xs ${change >= 0 ? "text-muted" : "text-muted"}`}>
                      {change >= 0 ? "▲" : "▼"} {Math.abs(change).toFixed(1)}%
                    </p>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Order + portfolio */}
      <div className="space-y-5">
        <div className="rounded-lg border border-border bg-bg p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-muted">Order</p>
          <p className="mt-1 text-sm">
            {artist.name} · <span className="font-mono">{money(price(selected))}</span>
          </p>
          <label className="mt-3 block">
            <span className="mb-1 block text-xs text-muted">Shares</span>
            <input
              type="number"
              min={1}
              value={qty}
              onChange={(e) => {
                setQty(parseInt(e.target.value, 10) || 0);
                if (!inFlight) newKey();
              }}
              className={inputClass}
            />
          </label>
          <p className="mt-2 flex items-center justify-between text-xs text-muted">
            <span>Total {money(Math.max(1, qty || 0) * price(selected))}</span>
            <span className="font-mono">key {orderKey}</span>
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => submit("buy")}
              className="rounded-md bg-fg py-2 text-sm font-medium text-bg transition hover:bg-accent"
            >
              {inFlight ? "Committing…" : "Buy"}
            </button>
            <button
              type="button"
              onClick={() => submit("sell")}
              className="rounded-md border border-border py-2 text-sm font-medium transition hover:border-accent hover:text-accent"
            >
              Sell
            </button>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-bg p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-muted">Portfolio</p>
          <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-xs text-muted">Cash</p>
              <p className="font-mono">{money(cash)}</p>
            </div>
            <div>
              <p className="text-xs text-muted">Total value</p>
              <p className="font-mono">{money(cash + portfolioValue)}</p>
            </div>
          </div>
          {Object.keys(holdings).length > 0 && (
            <ul className="mt-3 space-y-1 border-t border-border pt-3 text-sm">
              {Object.entries(holdings).map(([id, n]) => {
                const a = artists.find((x) => x.id === id)!;
                return (
                  <li key={id} className="flex justify-between">
                    <span>
                      {n} × {a.name}
                    </span>
                    <span className="font-mono text-muted">{money(n * price(id))}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="rounded-lg border border-border bg-bg p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-muted">Ledger</p>
          <ul className="mt-2 space-y-2 text-xs leading-relaxed" aria-live="polite">
            {events.map((e) => (
              <li key={e.id} className="flex gap-2">
                <span
                  className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${
                    e.kind === "rejected" ? "bg-accent" : e.kind === "ok" ? "bg-fg" : "bg-muted"
                  }`}
                  aria-hidden="true"
                />
                <span className={e.kind === "rejected" ? "text-fg" : "text-muted"}>{e.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
