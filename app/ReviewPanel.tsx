"use client";

import { useEffect, useRef, useState } from "react";

type Line = {
  label: string;
  note: string;
};

const LINES: Line[] = [
  { label: "Mobilabonnemang", note: "Tre · Telenor · Telia · Tele2" },
  { label: "Företagsväxel", note: "Uppsägningstid · funktioner" },
  { label: "Hemsida", note: "Drift · underhåll · bindningstid" },
  { label: "Sökmotoroptimering", note: "Insats mot utfall" },
];

/**
 * Signaturelement: "Kostnadsöversyn" som ett instrument.
 * En tunn scan-linje går igenom posterna och sätter status "Granskad",
 * en i taget — en visuell översättning av kärnkonceptet: vi går igenom
 * det ni redan betalar. Inga priser, inga siffror, inga påhittade case.
 * Respekterar prefers-reduced-motion (visar sluttillstånd direkt).
 */
export default function ReviewPanel() {
  const [reviewed, setReviewed] = useState<number>(0);
  const [active, setActive] = useState<number>(-1);
  const startedRef = useRef(false);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      setReviewed(LINES.length);
      setActive(-1);
      return;
    }

    if (startedRef.current) return;
    startedRef.current = true;

    const timers: ReturnType<typeof setTimeout>[] = [];
    LINES.forEach((_, i) => {
      timers.push(
        setTimeout(() => setActive(i), 600 + i * 900),
      );
      timers.push(
        setTimeout(() => {
          setReviewed(i + 1);
          if (i === LINES.length - 1) setActive(-1);
        }, 600 + i * 900 + 650),
      );
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  const done = reviewed >= LINES.length;

  return (
    <figure
      className="relative overflow-hidden rounded-md border border-[#d8d4c8] bg-white/60 shadow-[0_1px_0_rgba(19,42,49,0.04),0_20px_40px_-32px_rgba(19,42,49,0.5)]"
      aria-label="Illustration: en kostnadsöversyn där posterna granskas en i taget"
    >
      {/* Instrumentets rubrikrad */}
      <figcaption className="flex items-center justify-between border-b border-[#e7e3d8] px-5 py-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate">
          Kostnadsöversyn
        </span>
        <span
          className="flex items-center gap-2 font-mono text-[11px] text-slate"
          aria-live="polite"
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              done ? "bg-pine" : "bg-[#c7b78a]"
            }`}
            aria-hidden="true"
          />
          {done ? "Genomgången klar" : "Pågår"}
        </span>
      </figcaption>

      <ul className="divide-y divide-[#eee9dc]">
        {LINES.map((line, i) => {
          const isReviewed = i < reviewed;
          const isActive = i === active;
          return (
            <li
              key={line.label}
              className={`relative flex items-center justify-between gap-4 px-5 py-4 transition-colors duration-500 ${
                isActive ? "bg-pine/[0.05]" : "bg-transparent"
              }`}
            >
              {/* Scan-linjen */}
              {isActive && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-full bg-gradient-to-b from-pine/0 via-pine/[0.08] to-pine/0"
                />
              )}
              <div className="min-w-0">
                <p className="font-display text-[15px] font-medium text-ink">
                  {line.label}
                </p>
                <p className="mt-0.5 truncate font-mono text-[11px] text-slate">
                  {line.note}
                </p>
              </div>
              <span
                className={`shrink-0 font-mono text-[11px] tracking-wide transition-all duration-500 ${
                  isReviewed
                    ? "text-pine opacity-100"
                    : isActive
                      ? "text-slate opacity-100"
                      : "text-slate/50 opacity-70"
                }`}
              >
                {isReviewed ? (
                  <span className="inline-flex items-center gap-1.5">
                    <Check /> Granskad
                  </span>
                ) : isActive ? (
                  "Läser av…"
                ) : (
                  "I kö"
                )}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="border-t border-[#e7e3d8] px-5 py-3">
        <p className="font-mono text-[11px] leading-relaxed text-slate">
          {done
            ? "Ni får en sammanställning i klartext — inget säljsnack."
            : "Vi jämför mot vad som faktiskt finns på marknaden."}
        </p>
      </div>
    </figure>
  );
}

function Check() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className="translate-y-[0.5px]"
    >
      <path
        d="M2.5 6.2 4.8 8.5 9.5 3.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
