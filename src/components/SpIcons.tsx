/* Line icons lifted verbatim from the approved hero mockup so the header,
   hero and stat bar render exactly as designed. */
type P = { className?: string };

function Svg({ className = "sp-icon", children }: P & { children: React.ReactNode }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function SpArrow({ className }: P) {
  return (
    <Svg className={className}>
      <path d="M4 12h15M13 5l7 7-7 7" />
    </Svg>
  );
}

export function SpGlobe({ className }: P) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M5 7h14M5 17h14M12 3c5 5 5 13 0 18-5-5-5-13 0-18Z" />
    </Svg>
  );
}

export function SpMenu({ className }: P) {
  return (
    <Svg className={className}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Svg>
  );
}

export function SpClose({ className }: P) {
  return (
    <Svg className={className}>
      <path d="m6 6 12 12M6 18 18 6" />
    </Svg>
  );
}

export function SpPlay({ className }: P) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="12" r="9.5" />
      <path d="m10 8 6 4-6 4Z" />
    </Svg>
  );
}

export function SpTower({ className }: P) {
  return (
    <Svg className={className}>
      <path d="M3 21h18M6 21V6l6-3 6 3v15M10 21v-4h4v4M9 8h1m4 0h1M9 11h1m4 0h1M9 14h1m4 0h1" />
    </Svg>
  );
}

export function SpTeam({ className }: P) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="7" r="3" />
      <path d="M6 21v-3a6 6 0 0 1 12 0v3ZM5 5a3 3 0 0 0 0 6M3 14a5 5 0 0 0-2 4v3h3M19 5a3 3 0 0 1 0 6m2 3a5 5 0 0 1 2 4v3h-3" />
    </Svg>
  );
}

export function SpShield({ className }: P) {
  return (
    <Svg className={className}>
      <path d="M12 2c3 2 6 3 9 3v7c0 5-5 8-9 10-4-2-9-5-9-10V5c3 0 6-1 9-3Z" />
      <path d="m7.5 11.5 3 3 6-6" />
    </Svg>
  );
}

export function SpHardhat({ className }: P) {
  return (
    <Svg className={className}>
      <path d="M3 16v-3a9 9 0 0 1 6-8M15 5a9 9 0 0 1 6 8v3M9 10V3h6v7M1 16h22v3H1ZM6 19v3h12v-3" />
    </Svg>
  );
}
