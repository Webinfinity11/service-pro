import Image from "next/image";
import { partners } from "@/lib/site";

const half = Math.ceil(partners.length / 2);
const rows = [partners.slice(0, half), partners.slice(half)];

/** Two rails running against each other — the counter-motion reads as one
 *  moving surface rather than a single strip sliding past. */
export default function Partners() {
  return (
    <div
      className="relative space-y-4 overflow-hidden py-2"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
      }}
    >
      {rows.map((row, r) => (
        <ul
          key={r}
          className={`flex w-max items-center gap-4 ${
            r === 0 ? "anim-marquee" : "anim-marquee-rev"
          }`}
        >
          {[...row, ...row].map((src, i) => (
            <li
              key={`${src}-${i}`}
              className="group flex h-24 w-44 shrink-0 items-center justify-center rounded-cta border border-line bg-white px-6 transition-colors duration-300 hover:border-slate/40"
            >
              <Image
                src={src}
                alt=""
                width={140}
                height={56}
                sizes="176px"
                className="h-auto max-h-12 w-auto object-contain opacity-55 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
              />
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
