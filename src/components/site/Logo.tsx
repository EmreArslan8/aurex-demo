import Link from "next/link";
import { cx } from "@/lib/format";

export function Logo({ className, href = "/" }: { className?: string; href?: string }) {
  return (
    <Link href={href} className={cx("group flex items-center gap-2.5", className)}>
      <span className="relative grid size-8 place-items-center rounded-lg bg-gradient-to-br from-gold-hi via-gold to-gold-lo text-bg shadow-[inset_0_1px_0_rgba(255,255,255,.5)]">
        <span className="font-display text-h3 leading-none italic">A</span>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-h3 tracking-[0.06em]">AUREX</span>
        <span className="text-[0.56rem] tracking-[0.2em] text-muted uppercase">Kıymetli Madenler</span>
      </span>
    </Link>
  );
}
