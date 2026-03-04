import { RevealOnScroll } from "./RevealOnScroll";
import { ImagePlaceholder } from "./ImagePlaceholder";

export function MethodRow({
  number,
  title,
  subtitle,
  description,
  image,
  reversed = false,
  dark = false,
}: {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  image?: string;
  reversed?: boolean;
  dark?: boolean;
}) {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start ${reversed ? "lg:direction-rtl" : ""}`}>
      <RevealOnScroll direction={reversed ? "right" : "left"} className={reversed ? "lg:order-2" : ""}>
        <div>
          <span className="font-mono text-xs text-gold-text tracking-[0.2em]">{number}</span>
          <h3 className={`w-heading-md mt-2 mb-2 ${dark ? "text-white" : ""}`}>{title}</h3>
          <p className="text-sm text-gold-text font-medium mb-4">{subtitle}</p>
          <p className={`leading-relaxed ${dark ? "text-ink-30" : "text-ink-50"}`}>{description}</p>
        </div>
      </RevealOnScroll>

      <RevealOnScroll direction={reversed ? "left" : "right"} className={reversed ? "lg:order-1" : ""}>
        <ImagePlaceholder aspect="4/3" label={title} src={image} />
      </RevealOnScroll>
    </div>
  );
}
