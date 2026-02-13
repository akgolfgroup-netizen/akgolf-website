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
      <div className="max-w-3xl mx-auto text-center mb-16">
        <svg width="40" height="40" viewBox="0 0 24 24" className="text-gold mx-auto mb-8" fill="currentColor">
          <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
        </svg>
        <blockquote className="font-display text-xl md:text-2xl lg:text-3xl font-light leading-relaxed text-white mb-8">
          &ldquo;{quote}&rdquo;
        </blockquote>
        <div>
          <p className="text-sm font-medium text-white">{name}</p>
          <p className="text-xs text-ink-40 mt-1">{role}</p>
        </div>
      </div>
    </RevealOnScroll>
  );
}
