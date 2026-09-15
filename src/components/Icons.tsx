/* Thin outline icons, 24px grid, drawn to one weight so the hero bar and
   section lists read as one set. */

type P = { className?: string };

const base = (className = "h-6 w-6") => ({
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  className,
});

export function Medal({ className }: P) {
  return (
    <svg {...base(className)}>
      <circle cx="12" cy="15" r="5.5" />
      <path d="M12 12.8l.9 1.9 2 .3-1.5 1.4.4 2-1.8-1-1.8 1 .4-2-1.5-1.4 2-.3.9-1.9Z" />
      <path d="M8 9.5L6 2.5h12l-2 7" />
    </svg>
  );
}

export function Building({ className }: P) {
  return (
    <svg {...base(className)}>
      <path d="M3 21h18" />
      <path d="M5 21V6.5L13 3v18" />
      <path d="M13 10h6v11" />
      <path d="M8 8h2M8 11.5h2M8 15h2M16 13.5h1M16 17h1" />
    </svg>
  );
}

export function Hardhat({ className }: P) {
  return (
    <svg {...base(className)}>
      <path d="M2.5 17.5h19" />
      <path d="M4.5 17.5v-2a7.5 7.5 0 0 1 15 0v2" />
      <path d="M9.5 8.3V4.5h5v3.8" />
      <path d="M2.5 20.5h19" />
    </svg>
  );
}

export function ShieldCheck({ className }: P) {
  return (
    <svg {...base(className)}>
      <path d="M12 2.5l8 3v6c0 4.5-3.2 8.5-8 10-4.8-1.5-8-5.5-8-10v-6l8-3Z" />
      <path d="M8.5 11.8l2.6 2.6 4.4-4.6" />
    </svg>
  );
}

export function ArrowRight({ className = "h-4 w-4" }: P) {
  return (
    <svg {...base(className)} strokeWidth={2}>
      <path d="M4 12h15" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowCircle({ className = "h-9 w-9" }: P) {
  return (
    <svg {...base(className)}>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M9 12h6" />
      <path d="M12.5 9.2L15.3 12l-2.8 2.8" />
    </svg>
  );
}

export function Phone({ className = "h-4 w-4" }: P) {
  return (
    <svg {...base(className)} strokeWidth={1.8}>
      <path d="M21 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 1.1 4.2 2 2 0 0 1 3.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L7.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.8.6a2 2 0 0 1 1.7 2.1Z" />
    </svg>
  );
}

export const heroStatIcons = { Medal, Building, Hardhat, ShieldCheck };

export function Fan({ className }: P) {
  return (
    <svg {...base(className)}>
      <circle cx="12" cy="12" r="9.5" />
      <circle cx="12" cy="12" r="2.2" />
      <path d="M12 9.8c0-3.4 1-5.6 3.3-5.2 2 .4 2.2 3.4-1.1 5.6" />
      <path d="M14.2 12c3.4 0 5.6 1 5.2 3.3-.4 2-3.4 2.2-5.6-1.1" />
      <path d="M9.8 12c-3.4 0-5.6-1-5.2-3.3.4-2 3.4-2.2 5.6 1.1" />
      <path d="M12 14.2c0 3.4-1 5.6-3.3 5.2-2-.4-2.2-3.4 1.1-5.6" />
    </svg>
  );
}

export function Wrench({ className }: P) {
  return (
    <svg {...base(className)}>
      <path d="M14.6 6.4a3.6 3.6 0 0 1 4.9-4.9l-2.6 2.6 2.9 2.9 2.6-2.6a3.6 3.6 0 0 1-4.9 4.9l-8 8a2.4 2.4 0 1 1-3.4-3.4l8-8Z" />
      <path d="M6.5 17.5h.01" />
    </svg>
  );
}

export function Layers({ className }: P) {
  return (
    <svg {...base(className)}>
      <path d="M12 2.5l9 4.2-9 4.2-9-4.2 9-4.2Z" />
      <path d="M3 12l9 4.2 9-4.2" />
      <path d="M3 17l9 4.2 9-4.2" />
    </svg>
  );
}

export function Blueprint({ className }: P) {
  return (
    <svg {...base(className)}>
      <rect x="2.5" y="4" width="19" height="16" rx="1" />
      <path d="M7 4v16M2.5 9h4.5M2.5 15h4.5" />
      <path d="M11 8h6v5h-6z" />
      <path d="M11 17h6" />
    </svg>
  );
}

export function House({ className }: P) {
  return (
    <svg {...base(className)}>
      <path d="M3 10.5L12 3l9 7.5" />
      <path d="M5.5 9.5V21h13V9.5" />
      <path d="M10 21v-6h4v6" />
    </svg>
  );
}

export function Panel({ className }: P) {
  return (
    <svg {...base(className)}>
      <rect x="2.5" y="3.5" width="19" height="17" rx="1" />
      <path d="M2.5 9h19M2.5 15h19" />
      <path d="M9 3.5v17M15.5 3.5v17" />
    </svg>
  );
}

export const serviceIcons = { Fan, Wrench, Layers, Blueprint, House, Panel };
export type ServiceIconName = keyof typeof serviceIcons;
