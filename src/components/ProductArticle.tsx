import { Fragment } from "react";
import Image from "next/image";
import Reveal from "./Reveal";
import JacketCalculator from "./widgets/JacketCalculator";
import RecuperatorCurve from "./widgets/RecuperatorCurve";
import SteamCalculator from "./widgets/SteamCalculator";
import type { ContentBlock, WidgetName } from "@/lib/catalog";

const widgets: Record<WidgetName, React.ComponentType> = {
  "steam-calculator": SteamCalculator,
  "jacket-calculator": JacketCalculator,
  "recuperator-curve": RecuperatorCurve,
};

/** `**bold**` is the only inline markup the client documents use. */
function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("**") && p.endsWith("**") ? (
          <strong key={i} className="font-semibold text-ink">
            {p.slice(2, -2)}
          </strong>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        )
      )}
    </>
  );
}

/**
 * Long-form product article built from the client's documents: headings,
 * paragraphs, bullet lists, data tables, inline diagrams and calculators.
 * Set in a single readable column; tables and widgets may run wider.
 */
export default function ProductArticle({ blocks }: { blocks: ContentBlock[] }) {
  // Section numbers for the h2 headings, counted up front.
  const numbers = blocks.reduce<number[]>((acc, b, i) => {
    acc[i] = (acc[i - 1] ?? 0) + (b.type === "h2" ? 1 : 0);
    return acc;
  }, []);

  return (
    <article className="mx-auto max-w-4xl text-[1.0625rem] leading-[1.85] text-slate">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            return (
              <Reveal key={i} className={i === 0 ? "" : "mt-16"}>
                <h2 className="display-ge flex items-start gap-4 text-[clamp(1.35rem,2.6vw,1.9rem)] leading-snug text-ink">
                  <span className="display mt-1 shrink-0 text-base text-red-ink">
                    {String(numbers[i]).padStart(2, "0")}
                  </span>
                  <span>
                    <Rich text={b.text} />
                  </span>
                </h2>
                <span className="mt-5 block h-0.5 w-12 bg-red" />
              </Reveal>
            );
          case "h3":
            return (
              <h3 key={i} className="display-ge mt-10 text-[1.15rem] leading-snug text-ink">
                <Rich text={b.text} />
              </h3>
            );
          case "p":
            return (
              <p key={i} className="mt-5">
                <Rich text={b.text} />
              </p>
            );
          case "note":
            return (
              <p key={i} className="mt-8 border-l-4 border-red-ink bg-white px-6 py-5 text-ink">
                <Rich text={b.text} />
              </p>
            );
          case "list":
            return (
              <ul key={i} className="mt-6 space-y-3">
                {b.items.map((li, j) => (
                  <li key={j} className="flex gap-4 rounded-cta border border-line bg-white px-5 py-4">
                    <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 bg-red" />
                    <span>
                      <Rich text={li} />
                    </span>
                  </li>
                ))}
              </ul>
            );
          case "table":
            return (
              <div key={i} className="mt-8 overflow-x-auto rounded-cta border border-line bg-white">
                <table className="w-full min-w-[36rem] border-collapse text-left text-[0.95rem] leading-relaxed">
                  <thead>
                    <tr className="bg-steel text-white">
                      {b.head.map((h, j) => (
                        <th key={j} scope="col" className="px-4 py-3 align-bottom font-semibold">
                          {h.replace(/\*\*/g, "")}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((row, r) => (
                      <tr key={r} className="border-t border-line even:bg-paper/60">
                        {row.map((cell, j) => (
                          <td key={j} className={`px-4 py-3 align-top ${j === 0 ? "text-ink" : ""}`}>
                            <Rich text={cell} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "image":
            return (
              <figure key={i} className="mt-10">
                <div className="overflow-hidden rounded-cta border border-line bg-white">
                  <Image
                    src={b.src}
                    alt={b.alt}
                    width={b.width}
                    height={b.height}
                    sizes="(min-width: 960px) 896px, 92vw"
                    className="h-auto w-full"
                  />
                </div>
              </figure>
            );
          case "widget": {
            const Widget = widgets[b.name];
            return Widget ? <Widget key={i} /> : null;
          }
        }
      })}
    </article>
  );
}
