import { cn } from "@/lib/cn";

/**
 * Illustrative chart of a day: solar generation peaks at midday, household
 * use peaks in the evening, and a battery covers the evening with stored
 * solar. Conceptual only: no figures. Designed for dark surfaces.
 *
 * Hours map to x: 4am = 32 … midnight = 608 (28.8px per hour).
 * The baseline is y = 250.
 *
 * @param {{ className?: string }} props
 */
export function DayCurve({ className }) {
  // Household use: small morning bump, low through the day, evening peak.
  const usage =
    "M32 226 C 70 226, 96 196, 126 196 C 160 196, 196 216, 262 216 C 330 216, 384 128, 446 122 C 500 117, 548 168, 608 206";

  return (
    <div className={className}>
      <svg
        viewBox="0 0 640 290"
        role="img"
        aria-labelledby="day-curve-title day-curve-desc"
        className="h-auto w-full overflow-visible"
      >
        <title id="day-curve-title">How solar and a battery cover a day</title>
        <desc id="day-curve-desc">
          Illustration. Solar panels generate most around midday, while
          household use is highest in the evening. A battery stores surplus
          solar and supplies it in the evening.
        </desc>
        <defs>
          <linearGradient id="day-curve-solar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--color-accent-300)" />
            <stop
              offset="1"
              stopColor="var(--color-accent-500)"
              stopOpacity="0.15"
            />
          </linearGradient>
          <linearGradient id="day-curve-battery" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0"
              stopColor="var(--color-brand-300)"
              stopOpacity="0.85"
            />
            <stop
              offset="1"
              stopColor="var(--color-brand-400)"
              stopOpacity="0.4"
            />
          </linearGradient>
          {/* The area under the usage line, to fill the battery's share. */}
          <clipPath id="day-curve-under-usage">
            <path d={`${usage} L608 250 L32 250 Z`} />
          </clipPath>
        </defs>

        {/* Hour grid: 6am, noon, 6pm, midnight */}
        <g className="stroke-white/10" strokeWidth="1" strokeDasharray="3 5">
          {[89.6, 262.4, 435.2].map((x) => (
            <line key={x} x1={x} y1="24" x2={x} y2="250" />
          ))}
        </g>

        {/* Solar generation, 6am to 6pm */}
        <path
          d="M89.6 250 C 160 250, 196 58, 262.4 58 C 328.8 58, 364.8 250, 435.2 250 Z"
          fill="url(#day-curve-solar)"
        />
        <path
          d="M89.6 250 C 160 250, 196 58, 262.4 58 C 328.8 58, 364.8 250, 435.2 250"
          fill="none"
          className="stroke-accent-300"
          strokeWidth="2"
        />

        {/* Evening use covered by the battery, 6pm to about 11pm */}
        <rect
          x="435.2"
          y="0"
          width="144"
          height="250"
          fill="url(#day-curve-battery)"
          clipPath="url(#day-curve-under-usage)"
        />

        {/* Household use */}
        <path
          d={usage}
          pathLength="1"
          strokeDasharray="1"
          fill="none"
          className="animate-draw stroke-white"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="446" cy="122" r="5" className="fill-white" />

        {/* Axis */}
        <line
          x1="32"
          y1="250"
          x2="608"
          y2="250"
          className="stroke-white/30"
          strokeWidth="1.5"
        />

        {/* In-chart labels */}
        <g className="font-sans" fontWeight="700">
          <text
            x="262.4"
            y="150"
            textAnchor="middle"
            fontSize="17"
            className="fill-brand-950"
          >
            Solar
          </text>
          <text
            x="507"
            y="214"
            textAnchor="middle"
            fontSize="15"
            className="fill-white"
          >
            Battery
          </text>
          <text
            x="446"
            y="104"
            textAnchor="middle"
            fontSize="14"
            className="fill-white"
          >
            Evening peak
          </text>
        </g>
        <g className="fill-white/60 font-sans" fontSize="13">
          <text x="89.6" y="276" textAnchor="middle">
            6am
          </text>
          <text x="262.4" y="276" textAnchor="middle">
            Noon
          </text>
          <text x="435.2" y="276" textAnchor="middle">
            6pm
          </text>
          <text x="608" y="276" textAnchor="end">
            Midnight
          </text>
        </g>
      </svg>

      {/* Legend */}
      <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-foreground-inverse-muted">
        <li className="inline-flex items-center gap-2">
          <span
            aria-hidden="true"
            className="size-3 rounded-sm bg-accent-400"
          />
          Solar generation
        </li>
        <li className="inline-flex items-center gap-2">
          <span aria-hidden="true" className="size-3 rounded-sm bg-brand-300" />
          Battery (stored solar)
        </li>
        <li className="inline-flex items-center gap-2">
          <span
            aria-hidden="true"
            className="h-0.75 w-4 rounded-full bg-white"
          />
          Your usage
        </li>
      </ul>
    </div>
  );
}
