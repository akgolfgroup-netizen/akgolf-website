import Image from "next/image";

export function ImagePlaceholder({
  aspect = "4/3",
  label,
  className = "",
  src,
  alt,
}: {
  aspect?: string;
  label?: string;
  className?: string;
  src?: string;
  alt?: string;
}) {
  // Real image — render at full aspect ratio
  if (src) {
    return (
      <div
        className={`relative overflow-hidden rounded-2xl ${className}`}
        style={{ aspectRatio: aspect }}
      >
        <Image
          src={src}
          alt={alt || label || ""}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    );
  }

  // Placeholder — compact version until real images are added
  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${className}`}
    >
      <div className="flex items-center gap-4 px-6 py-5 bg-gradient-to-br from-surface-cream to-ink-10 border border-ink-10">
        <div className="w-10 h-10 rounded-xl bg-ink-20/50 flex items-center justify-center shrink-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-ink-40">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
        </div>
        <div>
          {label && (
            <span className="font-mono text-[10px] tracking-wider uppercase text-ink-40 block">
              {label}
            </span>
          )}
          <span className="text-[10px] text-ink-30">Bilde kommer</span>
        </div>
      </div>
    </div>
  );
}
