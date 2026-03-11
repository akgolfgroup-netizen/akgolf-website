import Link from "next/link";

const accentDotColors = {
  academy: "bg-academy",
  junior: "bg-junior",
  software: "bg-software",
  gold: "bg-gold",
} as const;

const accentTextColors = {
  academy: "text-academy",
  junior: "text-junior",
  software: "text-software",
  gold: "text-gold-text",
} as const;

const accentLabels = {
  academy: "AK Golf Academy",
  junior: "Junior Academy",
  software: "Software",
  gold: "Merkevare",
} as const;

type Accent = keyof typeof accentDotColors;

export function ServiceCard({
  title,
  description,
  features,
  href,
  accent,
}: {
  title: string;
  description: string;
  features: readonly string[];
  href: string;
  accent: Accent;
}) {
  return (
    <Link href={href} className="group block">
      <div className="w-service-card h-full flex flex-col min-h-[320px] bg-white">
        {/* Dot + tag label */}
        <div className="flex items-center gap-2 mb-8">
          <span className={`w-1.5 h-1.5 rounded-full ${accentDotColors[accent]} shrink-0`} />
          <span className={`text-[11px] font-medium tracking-wide uppercase ${accentTextColors[accent]}`}>
            {accentLabels[accent]}
          </span>
        </div>

        <h3 className="w-heading-sm mb-4 group-hover:text-gold transition-colors duration-300">
          {title}
        </h3>

        <p className="text-sm text-ink-50 leading-relaxed mb-8 flex-1">
          {description}
        </p>

        {/* Features with thin checkmarks */}
        <ul className="space-y-2.5 mb-8">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-2.5 text-xs text-ink-60">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="shrink-0 text-ink-30"
              >
                <path
                  d="M2 6l2.5 2.5L10 3.5"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {feature}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="flex items-center gap-2 text-sm font-medium text-ink-60 group-hover:text-ink-90 transition-colors duration-300">
          Les mer
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
