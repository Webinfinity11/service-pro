"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/hooks";

/** Thin space between thousands, matching the hero stat bar. */
const group = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

function useCountUp(target: number, run: boolean) {
  const [n, setN] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!run || reduced) return;
    const start = performance.now();
    const dur = 1400;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, reduced]);

  if (reduced) return run ? target : 0;
  return n;
}

export default function Stats({
  stats,
}: {
  stats: { v: number; suffix: string; k: string }[];
}) {
  const ref = useRef<HTMLDListElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRun(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <dl
      ref={ref}
      className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4"
    >
      {stats.map((s) => (
        <Stat key={s.k} value={s.v} suffix={s.suffix} label={s.k} run={run} />
      ))}
    </dl>
  );
}

function Stat({
  value,
  suffix,
  label,
  run,
}: {
  value: number;
  suffix: string;
  label: string;
  run: boolean;
}) {
  const n = useCountUp(value, run);
  return (
    <div className="bg-ink px-7 py-10">
      <span className="block h-[3px] w-8 bg-red" />
      <dt className="display mt-6 flex items-baseline gap-1 text-[clamp(2.6rem,5vw,3.6rem)] text-white">
        {group(n)}
        {suffix && <span className="text-red-soft">{suffix}</span>}
      </dt>
      <dd className="mt-3 max-w-[15rem] text-sm leading-snug text-white/60">
        {label}
      </dd>
    </div>
  );
}
