import type { ReactNode } from "react";
import { cx } from "@/lib/format";

export function PageHead({ title, desc, action }: { title: string; desc?: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-h2">{title}</h1>
        {desc && <p className="mt-1 text-small text-muted">{desc}</p>}
      </div>
      {action}
    </div>
  );
}

export function Kpi({ label, value, hint, tone }: { label: string; value: ReactNode; hint?: ReactNode; tone?: "up" | "down" | "gold" }) {
  return (
    <div className="rounded-card border border-line bg-surface p-4">
      <p className="text-caption uppercase text-muted">{label}</p>
      <div className={cx("mt-1.5 text-h3 font-semibold", tone === "gold" && "text-gold-hi")}>{value}</div>
      {hint && <p className={cx("mt-1 text-caption", tone === "up" ? "text-up" : tone === "down" ? "text-down" : "text-muted")}>{hint}</p>}
    </div>
  );
}

export function Card({ title, action, children, className }: { title?: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div className={cx("rounded-card border border-line bg-surface", className)}>
      {title && (
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <p className="text-small font-semibold">{title}</p>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

/** Basit tablo: mobilde yatay kaydırılır */
export function Table({ head, children }: { head: ReactNode[]; children: ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-small">
        <thead>
          <tr className="border-b border-line text-left text-caption uppercase text-muted">
            {head.map((h, i) => <th key={i} className="px-4 py-2.5 font-medium">{h}</th>)}
          </tr>
        </thead>
        <tbody className="[&_td]:px-4 [&_td]:py-3 [&_tr]:border-b [&_tr]:border-line/60 [&_tr:last-child]:border-0">{children}</tbody>
      </table>
    </div>
  );
}

const STATUS_TONE = {
  up: "bg-up/10 text-up",
  down: "bg-down/10 text-down",
  gold: "bg-gold/12 text-gold-hi",
  info: "bg-info/10 text-info",
  muted: "bg-surface-3 text-ink-2",
};
export function Pill({ tone = "muted", children }: { tone?: keyof typeof STATUS_TONE; children: ReactNode }) {
  return <span className={cx("inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-caption font-medium whitespace-nowrap", STATUS_TONE[tone])}>{children}</span>;
}
