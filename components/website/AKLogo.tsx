export function AKLogo({
  className = "",
  fill = "currentColor",
  size = 32,
}: {
  className?: string;
  fill?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="AK Golf Group"
    >
      <rect width="40" height="40" rx="8" fill={fill} />
      <text
        x="50%"
        y="54%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill={fill === "currentColor" ? "white" : fill === "#0A0A08" || fill === "#1A1A17" ? "white" : "#0A0A08"}
        fontFamily="var(--font-display)"
        fontWeight="600"
        fontSize="16"
      >
        AK
      </text>
    </svg>
  );
}
