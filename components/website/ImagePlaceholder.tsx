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

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-ink-10 ${className}`}
      style={{ aspectRatio: aspect }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-3 h-10 w-10 rounded-full bg-ink-20 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-ink-40">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
          {label && (
            <span className="font-mono text-[10px] tracking-wider uppercase text-ink-40">
              {label}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
