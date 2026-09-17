"use client";

import { useState } from "react";

type Spot = { id: string; name: string; lat: number; lng: number };

// Approximate coordinates around University Park and State College.
const spots: Spot[] = [
  { id: "hub", name: "HUB-Robeson Center", lat: 40.7982, lng: -77.8599 },
  { id: "library", name: "Pattee & Paterno Library", lat: 40.7983, lng: -77.864 },
  { id: "downtown", name: "Downtown (College & Allen)", lat: 40.7945, lng: -77.86 },
  { id: "east", name: "East Halls", lat: 40.8072, lng: -77.852 },
  { id: "pollock", name: "Pollock Halls", lat: 40.8005, lng: -77.854 },
  { id: "west", name: "West Halls", lat: 40.7975, lng: -77.868 },
  { id: "bjc", name: "Bryce Jordan Center", lat: 40.8085, lng: -77.854 },
  { id: "stadium", name: "Beaver Stadium", lat: 40.8122, lng: -77.8561 },
  { id: "walmart", name: "Walmart, N. Atherton", lat: 40.8215, lng: -77.8965 },
  { id: "mall", name: "Nittany Mall", lat: 40.821, lng: -77.7955 },
  { id: "airport", name: "State College Airport", lat: 40.8493, lng: -77.8487 },
];

// Pilot pricing (illustrative).
const BASE_FARE = 3.0;
const PER_MILE = 1.5;
const MIN_FARE = 4.0;
const DRIVER_SHARE = 0.85;
const ROAD_FACTOR = 1.25; // straight-line to road distance

function haversineMiles(a: Spot, b: Spot) {
  const R = 3958.8;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

function roundUpQuarter(x: number) {
  return Math.ceil(x * 4) / 4;
}

function money(x: number) {
  return `$${x.toFixed(2)}`;
}

export default function CampusCabsDemo() {
  const [fromId, setFromId] = useState("east");
  const [toId, setToId] = useState("downtown");

  const from = spots.find((s) => s.id === fromId)!;
  const to = spots.find((s) => s.id === toId)!;
  const same = fromId === toId;

  const miles = same ? 0 : haversineMiles(from, to) * ROAD_FACTOR;
  const raw = BASE_FARE + PER_MILE * miles;
  const fare = same ? 0 : roundUpQuarter(Math.max(MIN_FARE, raw));
  const driver = fare * DRIVER_SHARE;
  const platform = fare - driver;
  const minutes = Math.max(3, Math.round((miles / 15) * 60));

  // A generic rideshare estimate for comparison: booking fee + base + per mile + per minute, with a floor.
  const rideshare = same ? 0 : Math.max(8, 2.75 + 2.5 + 2.2 * miles + 0.35 * minutes);

  const selectClass =
    "w-full rounded-md border border-border bg-bg px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-accent";

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_1fr]">
      <div className="space-y-4">
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-muted">Pickup</span>
          <select className={selectClass} value={fromId} onChange={(e) => setFromId(e.target.value)}>
            {spots.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          onClick={() => {
            setFromId(toId);
            setToId(fromId);
          }}
          className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted transition hover:border-accent hover:text-accent"
        >
          Swap pickup and dropoff
        </button>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-muted">Dropoff</span>
          <select className={selectClass} value={toId} onChange={(e) => setToId(e.target.value)}>
            {spots.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </label>
        <p className="text-xs leading-relaxed text-muted">
          Fare = {money(BASE_FARE)} base + {money(PER_MILE)} per mile, {money(MIN_FARE)} minimum, rounded up to the
          quarter. Drivers keep {Math.round(DRIVER_SHARE * 100)}%.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-bg p-5">
        {same ? (
          <p className="text-sm text-muted">Pick two different places to see a fare.</p>
        ) : (
          <>
            <p className="text-xs font-medium uppercase tracking-wider text-muted">Rider pays</p>
            <p className="mt-1 text-4xl font-semibold tracking-tight">{money(fare)}</p>
            <p className="mt-1 text-sm text-muted">
              {miles.toFixed(1)} mi · about {minutes} min
            </p>

            <dl className="mt-5 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">Driver payout</dt>
                <dd className="font-medium">{money(driver)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Platform (coordination)</dt>
                <dd className="font-medium">{money(platform)}</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-2">
                <dt className="text-muted">Typical rideshare estimate</dt>
                <dd className="font-medium">{money(rideshare)}</dd>
              </div>
            </dl>

            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-border" aria-hidden="true">
              <div className="h-full bg-accent" style={{ width: `${DRIVER_SHARE * 100}%` }} />
            </div>
            <p className="mt-2 text-xs text-muted">
              {Math.round(DRIVER_SHARE * 100)}% of the fare goes to the driver.{" "}
              {rideshare > fare
                ? `Rider saves about ${money(rideshare - fare)} versus the rideshare estimate.`
                : "On this trip the rideshare estimate is comparable."}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
