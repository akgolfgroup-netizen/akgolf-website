export function ValueItem({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-6 py-8 border-b border-ink-10 last:border-b-0">
      <span className="font-mono text-sm text-gold shrink-0 pt-0.5">{number}</span>
      <div>
        <h3 className="w-heading-sm mb-2">{title}</h3>
        <p className="text-sm text-ink-50 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
