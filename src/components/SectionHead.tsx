import Reveal from "./Reveal";

export default function SectionHead({
  index,
  eyebrow,
  title,
  lead,
  light = false,
  align = "left",
}: {
  index?: string;
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  light?: boolean;
  align?: "left" | "center";
}) {
  return (
    <Reveal
      className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      <p
        className={`tag flex items-center gap-3 ${
          align === "center" ? "justify-center" : ""
        } ${light ? "text-red-soft" : "text-red-ink"}`}
      >
        {index && <span className={light ? "text-white/60" : "text-slate"}>{index}</span>}
        <span className="h-px w-9 bg-red" />
        {eyebrow}
      </p>
      <h2
        className={`display-ge mt-5 text-[clamp(1.65rem,3.6vw,2.9rem)] ${
          light ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={`mt-5 text-[1.0625rem] leading-relaxed ${
            light ? "text-white/60" : "text-slate"
          }`}
        >
          {lead}
        </p>
      )}
    </Reveal>
  );
}
