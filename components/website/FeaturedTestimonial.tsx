import { RevealOnScroll } from "./RevealOnScroll";

export function FeaturedTestimonial({
  quote,
  name,
  role,
}: {
  quote: string;
  name: string;
  role: string;
}) {
  return (
    <RevealOnScroll>
      <div className="relative max-w-3xl mx-auto text-center mb-16">
        {/* Subtle gold glow behind quote */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-48 bg-gold/[0.04] rounded-full blur-3xl pointer-events-none" />

        <div className="relative">
          <svg width="48" height="48" viewBox="0 0 24 24" className="text-gold/50 mx-auto mb-8" fill="currentColor">
            <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
          </svg>
          <blockquote className="font-display text-xl md:text-2xl lg:text-3xl font-normal leading-relaxed text-white mb-8">
            &ldquo;{quote}&rdquo;
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <div className="w-px h-4 bg-gold/40" />
            <div>
              <p className="text-sm font-medium text-white">{name}</p>
              <p className="text-xs text-ink-40 mt-0.5">{role}</p>
            </div>
          </div>
        </div>
      </div>
    </RevealOnScroll>
  );
}
