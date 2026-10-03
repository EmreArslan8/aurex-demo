import Link from "next/link";
import type { ComponentProps } from "react";
import { cx } from "@/lib/format";

type Variant = "gold" | "ghost" | "outline" | "dark";
type Size = "sm" | "md" | "lg";

const V: Record<Variant, string> = {
  gold: "bg-gradient-to-b from-gold-hi to-gold text-bg hover:brightness-110 shadow-[0_8px_30px_-12px_var(--color-gold)]",
  ghost: "text-ink-2 hover:text-ink hover:bg-surface-2",
  outline: "border border-line-strong text-ink hover:border-gold hover:text-gold-hi",
  dark: "bg-surface-3 text-ink hover:bg-line",
};
const S: Record<Size, string> = {
  sm: "h-8 px-3 text-small rounded-lg",
  md: "h-10 px-4 text-small rounded-xl",
  lg: "h-12 px-6 text-body rounded-xl",
};

export const btn = (v: Variant = "gold", s: Size = "md", extra?: string) =>
  cx("inline-flex items-center justify-center gap-2 font-medium transition disabled:opacity-40 disabled:pointer-events-none", V[v], S[s], extra);

export function Button({ variant = "gold", size = "md", className, ...rest }: ComponentProps<"button"> & { variant?: Variant; size?: Size }) {
  return <button className={btn(variant, size, className)} {...rest} />;
}

export function LinkButton({ variant = "gold", size = "md", className, ...rest }: ComponentProps<typeof Link> & { variant?: Variant; size?: Size }) {
  return <Link className={btn(variant, size, className)} {...rest} />;
}
