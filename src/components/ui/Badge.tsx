import type { ReactNode } from "react";
import { cx } from "@/lib/format";

const T = {
  gold: "bg-gold/12 text-gold-hi border-gold/25",
  up: "bg-up/10 text-up border-up/25",
  down: "bg-down/10 text-down border-down/25",
  info: "bg-info/10 text-info border-info/25",
  muted: "bg-surface-3 text-ink-2 border-line",
};

export function Badge({ tone = "muted", children, className }: { tone?: keyof typeof T; children: ReactNode; className?: string }) {
  return (
    <span className={cx("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-caption font-medium uppercase", T[tone], className)}>
      {children}
    </span>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cx("text-caption font-semibold uppercase text-gold", className)}>{children}</p>;
}
