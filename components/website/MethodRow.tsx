import { RevealOnScroll } from "./RevealOnScroll";
import { ImagePlaceholder } from "./ImagePlaceholder";

export function MethodRow({
  number,
  title,
  subtitle,
  description,
  image,
  reversed = false,
}: {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  image?: string;
  reversed?: boolean;
}) {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${reversed ? "lg:direction-rtl" : ""}`}>
      <RevealOnScroll direction={reversed ? "right" : "left"} className={reversed ? "lg:order-2" : ""}>
        <div className="lg:pr-8">
          {/* Large decorative number */}
          <span className="font-display text-7xl lg:text-8xl font-bold text-ink-10 block mb-4 leading-none">
            {number}
          </span>
          <h3 className="text-2xl lg:text-3xl font-semibold text-ink-90 tracking-tight -mt-8 relative">
            {title}
          </h3>
          <p className="text-sm text-gold font-medium mt-2 mb-3">{subtitle}</p>
          <p className="text-ink-50 leading-relaxed text-sm max-w-md">{description}</p>
        </div>
      </RevealOnScroll>

      <RevealOnScroll direction={reversed ? "left" : "right"} className={reversed ? "lg:order-1" : ""}>
        <div className="rounded-2xl overflow-hidden bg-ink-05">
          <ImagePlaceholder aspect="4/3" label={title} src={image} />
        </div>
      </RevealOnScroll>
    </div>
  );
}
