import { cn } from "@/lib/cn";

/**
 * Illustrative chart of a day: solar generation peaks at midday, household
 * use peaks in the evening, and a battery covers the evening with stored
 * solar. Conceptual only: no figures. Designed for dark surfaces.
 *
 * Hours map to x: 4am = 40 … 11pm = 600 (about 29.5px per hour).
 *
 * @param {{ className?: string }} props
 */
export function DayCurve({ className }) {
  return (
    <svg
      viewBox="0 0 640 340"
      role="img"
      aria-labelledby="day-curve-title day-curve-desc"
      className={cn("h-auto w-full", className)}
    >
      <title id="day-curve-title">How solar and a battery cover a day</title>
      <desc id="day-curve-desc">
        Illustration. Solar panels generate most around midday, while household
        use is highest in the evening. A battery stores surplus solar and
        supplies it in the evening.
      </desc>
      <defs>
        <pattern
          id="day-curve-hatch"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="8"
            className="stroke-brand-300"
            strokeWidth="3"
          />
        </pattern>
      </defs>

      {/* Hour grid */}
      <g className="stroke-white/10" strokeWidth="1">
        {[99, 276, 453].map((x) => (
          <line key={x} x1={x} y1="40" x2={x} y2="290" />
        ))}
      </g>

      {/* Solar generation, 6am to 6pm */}
      <path
        d="M99 290 C 170 290, 200 70, 276 70 S 382 290, 453 290 Z"
        className="fill-accent-400"
      />

      {/* Evening covered by the battery */}
      <path
        d="M453 290 L453 160 C 466 154, 474 150, 482 150 C 520 150, 552 196, 572 216 L572 290 Z"
        fill="url(#day-curve-hatch)"
        opacity="0.9"
      />

      {/* Household use */}
      <path
        d="M40 268 C 80 262, 100 228, 128 228 S 220 254, 276 252 S 420 150, 482 150 S 570 220, 600 240"
        pathLength="1"
        strokeDasharray="1"
        fill="none"
        className="animate-draw stroke-white"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Axis */}
      <line
        x1="40"
        y1="290"
        x2="600"
        y2="290"
        className="stroke-white/40"
        strokeWidth="1.5"
      />

      {/* Labels */}
      <g className="font-sans" fontSize="15" fontWeight="600">
        <text x="276" y="200" textAnchor="middle" className="fill-brand-950">
          Solar
        </text>
        <text x="512" y="132" textAnchor="middle" className="fill-white">
          Your usage
        </text>
        <text x="512" y="316" textAnchor="middle" className="fill-brand-300">
          Battery
        </text>
      </g>
      <g className="fill-brand-200 font-sans" fontSize="13">
        <text x="99" y="316" textAnchor="middle">
          6am
        </text>
        <text x="276" y="316" textAnchor="middle">
          Noon
        </text>
        <text x="453" y="316" textAnchor="middle">
          6pm
        </text>
        <text x="600" y="316" textAnchor="end">
          11pm
        </text>
      </g>
    </svg>
  );
}
