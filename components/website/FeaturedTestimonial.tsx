import Image from "next/image";
import { RevealOnScroll } from "./RevealOnScroll";

export function FeaturedTestimonial({
  quote,
  name,
  role,
  photo,
}: {
  quote: string;
  name: string;
  role: string;
  photo?: string;
}) {
  return (
    <RevealOnScroll>
      <div className="relative max-w-3xl mx-auto text-center mb-16">
        {/* Subtle gold glow behind quote */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-48 bg-gold/[0.04] rounded-full blur-3xl pointer-events-none" />

        <div className="relative">
          <blockquote className="w-heading-md text-ink-80 leading-snug mb-10 max-w-3xl mx-auto">
            &ldquo;{quote}&rdquo;
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            {photo ? (
              <div className="w-10 h-10 rounded-full overflow-hidden relative shrink-0">
                <Image src={photo} alt={name} fill className="object-cover" sizes="40px" />
              </div>
            ) : (
              <div className="w-6 h-px bg-gold/50" />
            )}
            <div>
              <p className="text-sm font-medium text-ink-80">{name}</p>
              <p className="text-xs text-ink-40 mt-0.5">{role}</p>
            </div>
          </div>
        </div>
      </div>
    </RevealOnScroll>
  );
}
