import type { Point } from "@/lib/history";

export function Sparkline({ data, up, width = 96, height = 28 }: { data: Point[]; up: boolean; width?: number; height?: number }) {
  if (data.length < 2) return null;
  const vals = data.map((d) => d.value);
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const span = max - min || 1;
  const pts = vals.map((v, i) => `${(i / (vals.length - 1)) * width},${height - ((v - min) / span) * height}`).join(" ");
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <polyline points={pts} fill="none" stroke={up ? "var(--color-up)" : "var(--color-down)"} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}
