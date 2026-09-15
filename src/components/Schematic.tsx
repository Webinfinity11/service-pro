/**
 * Hairline duct schematic drawn over the hero photo, the way an engineer
 * marks up a site picture: main run, branch takeoffs, a fan symbol and a
 * dimension line. Decorative only.
 */
export default function Schematic({ className = "" }: { className?: string }) {
  const s = (len: number) =>
    ({ "--len": len } as React.CSSProperties);

  return (
    <svg
      viewBox="0 0 520 420"
      fill="none"
      aria-hidden="true"
      className={className}
      stroke="var(--color-red)"
      strokeWidth="1.5"
    >
      {/* main duct run */}
      <path d="M20 150h330l40 40v190" className="anim-draw" style={s(600)} />
      <path d="M20 186h312l58 58v176" className="anim-draw" style={s(610)} />

      {/* branch takeoffs */}
      <path d="M110 150v-60h54" className="anim-draw" style={s(120)} />
      <path d="M146 186v-96h18" className="anim-draw" style={s(120)} />
      <path d="M236 186v74h60" className="anim-draw" style={s(140)} />
      <path d="M272 150v146h24" className="anim-draw" style={s(180)} />

      {/* diffuser grilles at branch ends */}
      <g className="anim-draw" style={s(200)}>
        <rect x="164" y="78" width="34" height="24" />
        <path d="M172 78v24M180 78v24M188 78v24" />
      </g>
      <g className="anim-draw" style={s(200)}>
        <rect x="296" y="248" width="24" height="48" />
        <path d="M296 258h24M296 270h24M296 282h24" />
      </g>

      {/* fan symbol on the main run */}
      <g className="anim-draw" style={s(260)}>
        <circle cx="404" cy="286" r="26" />
        <path d="M404 260c14 9 14 43 0 52M404 260c-14 9-14 43 0 52" />
      </g>

      {/* airflow arrows */}
      <g className="anim-draw" style={s(90)} strokeWidth="2">
        <path d="M56 168h34m-9-7 9 7-9 7" />
        <path d="M196 168h34m-9-7 9 7-9 7" />
      </g>

      {/* dimension line */}
      <g className="anim-draw" style={s(160)} strokeWidth="1">
        <path d="M20 120v-22M350 120V98M20 109h330" />
        <path d="M28 104l-8 5 8 5M342 104l8 5-8 5" strokeWidth="1.5" />
      </g>
      <text
        x="176"
        y="94"
        textAnchor="middle"
        fill="var(--color-red-soft)"
        stroke="none"
        fontFamily="var(--font-mono)"
        fontSize="13"
        letterSpacing="1.5"
      >
        Ø 400
      </text>
      <text
        x="440"
        y="290"
        fill="var(--color-red-soft)"
        stroke="none"
        fontFamily="var(--font-mono)"
        fontSize="13"
        letterSpacing="1.5"
      >
        AHU-01
      </text>
    </svg>
  );
}
