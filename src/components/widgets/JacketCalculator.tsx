"use client";

import { useState } from "react";
import { useI18n } from "../LangProvider";
import { CalcShell, NumField, ResultTile, fmt } from "./CalcParts";

/**
 * Valve insulation jacket ROI, from the client's formula sheet:
 *   ΔT = T_sys − T_amb;  A = π · D(m) · 1.5   (valve ≈ 1.5 m of bare pipe)
 *   q = 8.44·ΔT + 0.04·ΔT²  (W/m²);  Q_bare = q·A;  Q_saved = 0.90·Q_bare
 *   E = Q_saved · H / 1000 · N (kWh);  Savings = E · tariff
 * Test case DN100, 150 °C, 8760 h, 0.30 ₾ → 836 W bare, 6 591 kWh, 1 977 ₾.
 */
const EFFICIENCY = 0.9;

const copy = {
  ka: {
    eyebrow: "ინტერაქტიული კალკულატორი",
    title: "სარქველის თბოიზოლაციის უკუგების (ROI) კალკულატორი",
    inputs: "სარქველის მონაცემები",
    results: "შედეგი ჯეკეტით იზოლირებისას",
    count: "სარქველების რაოდენობა",
    pcs: "ცალი",
    diameter: "სარქველის დიამეტრი",
    diameterHint: "მაგ: DN100 → ჩაწერეთ 100",
    temp: "მუშა ტემპერატურა",
    ambient: "გარემოს ტემპერატურა",
    hours: "წლიური სამუშაო საათები",
    hoursHint: "უწყვეტი მუშაობა: 8760 საათი",
    h: "სთ",
    tariff: "ენერგიის ტარიფი (1 კვტ.სთ)",
    money: "წლიური ფინანსური დანაზოგი",
    energy: "დაზოგილი ენერგია წელიწადში",
    kwh: "კვტ.სთ",
    loss: "შიშველი სარქველის სითბოს დანაკარგი",
    lossSub: (saved: string) => `ჯეკეტი დაზოგავს ~${saved} ვტ-ს (ეფექტურობა 90%) — ერთ სარქველზე`,
    w: "ვტ",
    invalid: "კალკულატორი განკუთვნილია მაღალტემპერატურული სისტემებისთვის — მუშა ტემპერატურა გარემოსაზე მაღალი უნდა იყოს.",
  },
  en: {
    eyebrow: "Interactive calculator",
    title: "Valve insulation payback (ROI) calculator",
    inputs: "Valve data",
    results: "Result with an insulation jacket",
    count: "Number of valves",
    pcs: "pcs",
    diameter: "Valve diameter",
    diameterHint: "E.g. DN100 → enter 100",
    temp: "Operating temperature",
    ambient: "Ambient temperature",
    hours: "Operating hours per year",
    hoursHint: "Continuous operation: 8760 hours",
    h: "h",
    tariff: "Energy tariff (per kWh)",
    money: "Annual financial savings",
    energy: "Energy saved per year",
    kwh: "kWh",
    loss: "Heat loss from a bare valve",
    lossSub: (saved: string) => `The jacket saves ~${saved} W (90% efficiency) — per valve`,
    w: "W",
    invalid: "This calculator is for hot systems — the operating temperature must be above ambient.",
  },
};

export default function JacketCalculator() {
  const { lang } = useI18n();
  const c = copy[lang];
  const [v, setV] = useState({ count: 1, diameter: 100, temp: 150, ambient: 20, hours: 8760, tariff: 0.3 });
  const set = (k: keyof typeof v) => (n: number) => setV((s) => ({ ...s, [k]: n }));

  const n = (x: number) => (Number.isFinite(x) ? x : 0);
  const dT = n(v.temp) - n(v.ambient);
  const ok = dT > 0;
  const area = Math.PI * (n(v.diameter) / 1000) * 1.5;
  const q = 8.44 * dT + 0.04 * dT * dT;
  const bare = ok ? q * area : 0;
  const saved = bare * EFFICIENCY;
  const energy = ((saved * n(v.hours)) / 1000) * Math.max(n(v.count), 0);
  const money = energy * n(v.tariff);

  return (
    <CalcShell
      eyebrow={c.eyebrow}
      title={c.title}
      inputsTitle={c.inputs}
      resultsTitle={c.results}
      inputs={
        <>
          <NumField id="jc-count" label={c.count} unit={c.pcs} value={v.count} onChange={set("count")} min={1} />
          <NumField id="jc-dia" label={c.diameter} unit="mm" value={v.diameter} onChange={set("diameter")} min={15} step={5} hint={c.diameterHint} />
          <NumField id="jc-temp" label={c.temp} unit="°C" value={v.temp} onChange={set("temp")} />
          <NumField id="jc-amb" label={c.ambient} unit="°C" value={v.ambient} onChange={set("ambient")} />
          <NumField id="jc-hours" label={c.hours} unit={c.h} value={v.hours} onChange={set("hours")} min={1} max={8760} step={100} hint={c.hoursHint} />
          <NumField id="jc-tariff" label={c.tariff} unit="₾" value={v.tariff} onChange={set("tariff")} min={0} step={0.01} />
        </>
      }
      results={
        ok ? (
          <>
            <ResultTile highlight label={c.money} value={fmt(money)} unit="₾" />
            <ResultTile label={c.energy} value={fmt(energy)} unit={c.kwh} />
            <ResultTile label={c.loss} value={fmt(bare)} unit={c.w} sub={c.lossSub(fmt(saved))} />
          </>
        ) : (
          <p className="rounded-cta border border-white/15 px-5 py-4 text-sm text-white/80">{c.invalid}</p>
        )
      }
    />
  );
}
