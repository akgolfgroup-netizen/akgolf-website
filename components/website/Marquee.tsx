"use client";

const ITEMS = [
  "Evidensbasert trening",
  "Individuell coaching",
  "Teknologidrevet analyse",
  "Personlig oppfølging",
  "Skreddersydde planer",
  "Mental styrke",
  "Teknisk presisjon",
  "Profesjonelt miljø",
];

export function Marquee() {
  return (
    <div className="overflow-hidden bg-ink-100 border-y border-ink-80/50 py-4 select-none">
      <div className="w-animate-marquee">
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span key={i} className="flex items-center shrink-0 mx-8 md:mx-12">
            <span className="w-1.5 h-1.5 rounded-full bg-gold/60 mr-3" />
            <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-ink-40 whitespace-nowrap">
              {item}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
