"use client";

import { useId, useState } from "react";
import { useI18n } from "../LangProvider";
import { fmt } from "./CalcParts";

/** Reference pressure-drop curve of a standard recuperator heat exchanger (client's table). */
const POINTS: [number, number][] = [
  [0, 0],
  [100, 25],
  [200, 85],
  [300, 180],
  [400, 310],
  [500, 470],
];

const copy = {
  ka: {
    eyebrow: "აეროდინამიკური მახასიათებელი",
    title: "თბომცვლელის აეროდინამიკური მახასიათებლის მრუდი",
    x: "ჰაერის ხარჯი (m³/h)",
    y: "წნევის ვარდნა (Pa)",
    flow: "ჰაერის ხარჯი",
    drop: "წნევის ვარდნა",
    hint: "გადააადგილეთ სლაიდერი — მრუდზე ნაჩვენები წერტილი და წნევის ვარდნა შეიცვლება.",
    chart: "წნევის ვარდნის მრუდი ჰაერის ხარჯის მიხედვით",
  },
  en: {
    eyebrow: "Aerodynamic performance",
    title: "Heat exchanger aerodynamic performance curve",
    x: "Air flow (m³/h)",
    y: "Pressure drop (Pa)",
    flow: "Air flow",
    drop: "Pressure drop",
    hint: "Move the slider to see the pressure drop at any air flow on the curve.",
    chart: "Pressure drop curve against air flow",
  },
};

/** Linear interpolation between the reference points. */
function dropAt(q: number) {
  for (let i = 1; i < POINTS.length; i++) {
    const [x0, y0] = POINTS[i - 1];
    const [x1, y1] = POINTS[i];
    if (q <= x1) return y0 + ((q - x0) / (x1 - x0)) * (y1 - y0);
  }
  return POINTS[POINTS.length - 1][1];
}

const W = 640;
const H = 340;
const PAD = { l: 58, r: 20, t: 20, b: 50 };
const X_MAX = 500;
const Y_MAX = 500;
const sx = (x: number) => PAD.l + (x / X_MAX) * (W - PAD.l - PAD.r);
const sy = (y: number) => H - PAD.b - (y / Y_MAX) * (H - PAD.t - PAD.b);

/** Smooth path through the points (Catmull-Rom converted to cubic Béziers). */
function smoothPath(pts: [number, number][]) {
  const p = pts.map(([x, y]) => [sx(x), sy(y)]);
  let d = `M${p[0][0]},${p[0][1]}`;
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] ?? p[i];
    const p1 = p[i];
    const p2 = p[i + 1];
    const p3 = p[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0]},${c1[1]} ${c2[0]},${c2[1]} ${p2[0]},${p2[1]}`;
  }
  return d;
}

export default function RecuperatorCurve() {
  const { lang } = useI18n();
  const c = copy[lang];
  const [q, setQ] = useState(300);
  const id = useId();
  const dp = dropAt(q);
  const line = smoothPath(POINTS);
  const area = `${line} L${sx(X_MAX)},${sy(0)} L${sx(0)},${sy(0)} Z`;

  return (
    <section className="my-12 overflow-hidden rounded-cta border border-line bg-white">
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-line px-6 py-6 sm:px-8">
        <div>
          <p className="tag flex items-center gap-3 text-red-ink">
            <span className="h-px w-8 bg-red" />
            {c.eyebrow}
          </p>
          <h3 className="display-ge mt-3 text-[clamp(1.2rem,2.4vw,1.5rem)] leading-snug text-ink">{c.title}</h3>
        </div>
        <div className="flex gap-6 text-right" aria-live="polite">
          <div>
            <p className="tag text-slate">{c.flow}</p>
            <p className="display text-2xl text-ink">
              {fmt(q)} <span className="text-sm font-semibold text-slate">m³/h</span>
            </p>
          </div>
          <div>
            <p className="tag text-slate">{c.drop}</p>
            <p className="display text-2xl text-red-ink">
              {fmt(dp)} <span className="text-sm font-semibold text-slate">Pa</span>
            </p>
          </div>
        </div>
      </header>

      <div className="px-3 pt-6 sm:px-6">
        <div>
          <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={c.chart} className="block h-auto w-full">
            <defs>
              <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#003a4e" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#003a4e" stopOpacity="0" />
              </linearGradient>
            </defs>

            {[0, 100, 200, 300, 400, 500].map((y) => (
              <g key={`y${y}`}>
                <line x1={sx(0)} x2={sx(X_MAX)} y1={sy(y)} y2={sy(y)} stroke="#dfe7ea" />
                <text x={sx(0) - 10} y={sy(y) + 4} textAnchor="end" fontSize="12" fill="#5b6f78">
                  {y}
                </text>
              </g>
            ))}
            {POINTS.map(([x]) => (
              <text key={`x${x}`} x={sx(x)} y={H - PAD.b + 20} textAnchor="middle" fontSize="12" fill="#5b6f78">
                {x}
              </text>
            ))}
            <text x={(sx(0) + sx(X_MAX)) / 2} y={H - 8} textAnchor="middle" fontSize="12.5" fontWeight="600" fill="#073547">
              {c.x}
            </text>
            <text
              x={14}
              y={(sy(0) + sy(Y_MAX)) / 2}
              textAnchor="middle"
              fontSize="12.5"
              fontWeight="600"
              fill="#073547"
              transform={`rotate(-90 14 ${(sy(0) + sy(Y_MAX)) / 2})`}
            >
              {c.y}
            </text>

            <path d={area} fill={`url(#${id}-fill)`} />
            <path d={line} fill="none" stroke="#003a4e" strokeWidth="3" strokeLinecap="round" />
            {POINTS.slice(1).map(([x, y]) => (
              <circle key={x} cx={sx(x)} cy={sy(y)} r="4.5" fill="#fff" stroke="#003a4e" strokeWidth="2" />
            ))}

            <line x1={sx(q)} x2={sx(q)} y1={sy(0)} y2={sy(dp)} stroke="#e10b17" strokeDasharray="4 4" />
            <line x1={sx(0)} x2={sx(q)} y1={sy(dp)} y2={sy(dp)} stroke="#e10b17" strokeDasharray="4 4" />
            <circle cx={sx(q)} cy={sy(dp)} r="7" fill="#e10b17" stroke="#fff" strokeWidth="2.5" />
          </svg>
        </div>
      </div>

      <div className="px-6 pb-6 pt-2 sm:px-8">
        <label htmlFor={`${id}-q`} className="sr-only">
          {c.flow}
        </label>
        <input
          id={`${id}-q`}
          type="range"
          min={0}
          max={500}
          step={10}
          value={q}
          onChange={(e) => setQ(Number(e.target.value))}
          className="w-full accent-[#e10b17]"
        />
        <p className="mt-2 text-sm text-slate">{c.hint}</p>
      </div>
    </section>
  );
}
