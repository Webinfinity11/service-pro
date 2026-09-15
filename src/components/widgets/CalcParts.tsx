"use client";

/** Shared pieces for the product-page calculators: two-panel shell, numeric field, result tile. */

export const fmt = (n: number, digits = 0) =>
  Number.isFinite(n)
    ? n.toLocaleString("en-US", { maximumFractionDigits: digits, minimumFractionDigits: digits }).replace(/,/g, " ")
    : "—";

export function CalcShell({
  eyebrow,
  title,
  inputsTitle,
  resultsTitle,
  inputs,
  results,
  footnote,
}: {
  eyebrow: string;
  title: string;
  inputsTitle: string;
  resultsTitle: string;
  inputs: React.ReactNode;
  results: React.ReactNode;
  footnote?: React.ReactNode;
}) {
  return (
    <section className="not-prose my-12 overflow-hidden rounded-cta border border-line bg-white shadow-[0_24px_60px_-40px_rgb(0_58_78/0.5)]">
      <header className="border-b border-line px-6 py-6 sm:px-8">
        <p className="tag flex items-center gap-3 text-red-ink">
          <span className="h-px w-8 bg-red" />
          {eyebrow}
        </p>
        <h3 className="display-ge mt-3 text-[clamp(1.2rem,2.4vw,1.5rem)] leading-snug text-ink">{title}</h3>
      </header>
      <div className="grid lg:grid-cols-[1fr_1.05fr]">
        <div className="border-b border-line bg-paper p-6 sm:p-8 lg:border-b-0 lg:border-r">
          <p className="tag mb-5 text-slate">{inputsTitle}</p>
          <div className="grid gap-4 sm:grid-cols-2">{inputs}</div>
        </div>
        <div className="bg-steel p-6 text-white sm:p-8">
          <p className="tag mb-5 text-white/55">{resultsTitle}</p>
          <div className="grid gap-3">{results}</div>
          {footnote && <div className="mt-5 text-xs leading-relaxed text-white/55">{footnote}</div>}
        </div>
      </div>
    </section>
  );
}

export function NumField({
  id,
  label,
  unit,
  value,
  onChange,
  min,
  max,
  step = 1,
  hint,
  wide = false,
}: {
  id: string;
  label: string;
  unit?: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  hint?: string;
  wide?: boolean;
}) {
  return (
    <label htmlFor={id} className={`block ${wide ? "sm:col-span-2" : ""}`}>
      <span className="block text-sm font-semibold leading-snug text-ink">{label}</span>
      <span className="mt-2 flex items-stretch overflow-hidden rounded-cta border border-line bg-white transition-colors focus-within:border-red-ink">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          value={Number.isNaN(value) ? "" : value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(e.target.value === "" ? NaN : Number(e.target.value))}
          className="w-full min-w-0 bg-transparent px-4 py-3 text-base text-ink outline-none"
        />
        {unit && (
          <span className="flex shrink-0 items-center border-l border-line bg-paper px-3 text-sm text-slate">
            {unit}
          </span>
        )}
      </span>
      {hint && <span className="mt-1.5 block text-xs text-slate">{hint}</span>}
    </label>
  );
}

export function ResultTile({
  label,
  value,
  unit,
  sub,
  highlight = false,
}: {
  label: string;
  value: string;
  unit: string;
  sub?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-cta border px-5 py-4 ${
        highlight ? "border-red-ink bg-red-ink" : "border-white/12 bg-white/[0.06]"
      }`}
      aria-live="polite"
    >
      <p className={`text-sm ${highlight ? "text-white/85" : "text-white/60"}`}>{label}</p>
      <p className="display mt-1 flex flex-wrap items-baseline gap-x-2 text-[clamp(1.6rem,3.2vw,2.1rem)] leading-tight">
        {value}
        <span className="text-base font-semibold opacity-75">{unit}</span>
      </p>
      {sub && <p className={`mt-1 text-xs ${highlight ? "text-white/75" : "text-white/50"}`}>{sub}</p>}
    </div>
  );
}
