import { StaggerContainer, StaggerItem } from "./RevealOnScroll";

export function FeatureGrid({
  features,
  columns = 3,
}: {
  features: readonly { readonly title: string; readonly description: string }[];
  columns?: 2 | 3;
}) {
  const gridCols = columns === 2
    ? "grid-cols-1 md:grid-cols-2"
    : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  return (
    <StaggerContainer className={`grid ${gridCols} gap-6`}>
      {features.map((feature) => (
        <StaggerItem key={feature.title}>
          <div className="w-card h-full">
            <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center mb-4">
              <div className="w-2 h-2 rounded-full bg-gold" />
            </div>
            <h4 className="font-display text-base font-semibold text-ink-90 mb-2">
              {feature.title}
            </h4>
            <p className="text-sm text-ink-50 leading-relaxed">
              {feature.description}
            </p>
          </div>
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}
