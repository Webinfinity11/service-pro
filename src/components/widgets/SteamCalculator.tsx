"use client";

import { useState } from "react";
import { useI18n } from "../LangProvider";
import { CalcShell, NumField, ResultTile, fmt } from "./CalcParts";

/**
 * Condensate return savings, from the client's formula sheet:
 *   M_return = M_steam · R%/100;  ΔT = T_cond − T_cold
 *   P_saved  = M_return · 4.184 · ΔT / 3600            (kW)
 *   E_year   = P_saved · H_year / (efficiency/100)     (kWh fuel-side)
 *   Savings  = E_year · C_energy;  V_water = M_return · H_year / 1000 (m³)
 * Test case 10000 / 80 / 90 / 15 / 6000 / 0.12 at 100% → 4 184 000 kWh, 502 080 ₾, 48 000 m³.
 */
const copy = {
  ka: {
    eyebrow: "ინტერაქტიული კალკულატორი",
    title: "კონდენსატის უკან დაბრუნების ეკონომიკური სარგებელი",
    inputs: "პარამეტრები",
    results: "წლიური დანაზოგი",
    steam: "ქვაბის წარმადობა",
    ret: "კონდენსატის დაბრუნების წილი",
    tCond: "დაბრუნებული წყლის ტემპერატურა",
    tCold: "დასამატებელი ცივი წყლის ტემპ.",
    eff: "ქვაბის მარგი ქმედების კოეფიციენტი",
    hours: "სამუშაო საათები წელიწადში",
    price: "1 კვტ.სთ თბური ენერგიის ფასი",
    kgh: "კგ/სთ",
    h: "სთ",
    finance: "წლიური ფინანსური ეკონომია",
    financeSub: "დაზოგილი თანხა საწვავზე",
    energy: "დაზოგილი თბური ენერგია (წლიურად)",
    kwh: "კვტ.სთ",
    water: "დაზოგილი სუფთა წყალი (წლიურად)",
    waterSub: "მცირდება ქიმიური რეაგენტების ხარჯიც",
    detail: (m: string, p: string) =>
      `ტექნიკური დეტალი: დაბრუნებული ცხელი წყლის მასა — ${m} კგ/სთ, დაზოგილი სიმძლავრე — ${p} კვტ.`,
    invalid: "დაბრუნებული წყლის ტემპერატურა ცივი წყლისაზე მაღალი უნდა იყოს.",
  },
  en: {
    eyebrow: "Interactive calculator",
    title: "Savings from returning condensate to the boiler",
    inputs: "Parameters",
    results: "Annual savings",
    steam: "Boiler steam output",
    ret: "Condensate return rate",
    tCond: "Returned condensate temperature",
    tCold: "Make-up cold water temperature",
    eff: "Boiler efficiency",
    hours: "Operating hours per year",
    price: "Price of 1 kWh of heat",
    kgh: "kg/h",
    h: "h",
    finance: "Annual financial savings",
    financeSub: "Money saved on fuel",
    energy: "Heat energy saved per year",
    kwh: "kWh",
    water: "Clean water saved per year",
    waterSub: "Chemical treatment costs fall too",
    detail: (m: string, p: string) =>
      `Technical detail: returned hot water mass ${m} kg/h, heat power saved ${p} kW.`,
    invalid: "The returned condensate must be hotter than the make-up water.",
  },
};

export default function SteamCalculator() {
  const { lang } = useI18n();
  const c = copy[lang];
  const [v, setV] = useState({ steam: 10000, ret: 80, tCond: 90, tCold: 15, eff: 90, hours: 6000, price: 0.12 });
  const set = (k: keyof typeof v) => (n: number) => setV((s) => ({ ...s, [k]: n }));

  const n = (x: number) => (Number.isFinite(x) ? x : 0);
  const mReturn = n(v.steam) * (Math.min(Math.max(n(v.ret), 0), 100) / 100);
  const dT = n(v.tCond) - n(v.tCold);
  const ok = dT > 0;
  const pSaved = ok ? (mReturn * 4.184 * dT) / 3600 : 0;
  const eff = Math.min(Math.max(n(v.eff) || 100, 1), 100) / 100;
  const eYear = (pSaved * n(v.hours)) / eff;
  const money = eYear * n(v.price);
  const water = (mReturn * n(v.hours)) / 1000;

  return (
    <CalcShell
      eyebrow={c.eyebrow}
      title={c.title}
      inputsTitle={c.inputs}
      resultsTitle={c.results}
      inputs={
        <>
          <NumField id="sc-steam" label={c.steam} unit={c.kgh} value={v.steam} onChange={set("steam")} min={0} step={500} wide />
          <NumField id="sc-ret" label={c.ret} unit="%" value={v.ret} onChange={set("ret")} min={0} max={100} />
          <NumField id="sc-eff" label={c.eff} unit="%" value={v.eff} onChange={set("eff")} min={1} max={100} />
          <NumField id="sc-tcond" label={c.tCond} unit="°C" value={v.tCond} onChange={set("tCond")} />
          <NumField id="sc-tcold" label={c.tCold} unit="°C" value={v.tCold} onChange={set("tCold")} />
          <NumField id="sc-hours" label={c.hours} unit={c.h} value={v.hours} onChange={set("hours")} min={0} max={8760} step={100} />
          <NumField id="sc-price" label={c.price} unit="₾" value={v.price} onChange={set("price")} min={0} step={0.01} />
        </>
      }
      results={
        ok ? (
          <>
            <ResultTile highlight label={c.finance} value={fmt(money)} unit="₾" sub={c.financeSub} />
            <ResultTile label={c.energy} value={fmt(eYear)} unit={c.kwh} />
            <ResultTile label={c.water} value={fmt(water)} unit="m³" sub={c.waterSub} />
          </>
        ) : (
          <p className="rounded-cta border border-white/15 px-5 py-4 text-sm text-white/80">{c.invalid}</p>
        )
      }
      footnote={ok ? c.detail(fmt(mReturn), fmt(pSaved, 1)) : undefined}
    />
  );
}
