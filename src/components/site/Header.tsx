"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, ShieldCheck, Smartphone } from "lucide-react";
import { Logo } from "./Logo";
import { useCart } from "@/store/cart-store";
import { useMounted } from "@/store/persist";
import { cx } from "@/lib/format";

const NAV = [
  { href: "/urunler", label: "Ürünler" },
  { href: "/piyasalar", label: "Piyasalar" },
  { href: "/dogrula", label: "Sertifika Doğrula", icon: ShieldCheck },
  { href: "/mobil", label: "Mobil Uygulama", icon: Smartphone },
];

export function Header() {
  const path = usePathname();
  const mounted = useMounted();
  const count = useCart((s) => s.lines.reduce((a, b) => a + b.qty, 0));
  const setOpen = useCart((s) => s.setOpen);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 md:px-6">
        <Logo />
        <nav className="ml-6 hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={cx(
                "flex items-center gap-1.5 rounded-lg px-3 py-2 text-small transition",
                path.startsWith(n.href) ? "text-gold-hi" : "text-ink-2 hover:text-ink",
              )}
            >
              {n.icon && <n.icon className="size-3.5" />}
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => setOpen(true)}
            className="relative grid size-10 place-items-center rounded-xl border border-line text-ink-2 transition hover:border-gold hover:text-gold-hi"
            aria-label="Sepet"
          >
            <ShoppingBag className="size-4.5" />
            {mounted && count > 0 && (
              <span className="num absolute -top-1.5 -right-1.5 grid min-w-5 place-items-center rounded-full bg-gold px-1 text-caption font-bold text-bg">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>
      <nav className="no-scrollbar flex gap-1 overflow-x-auto border-t border-line px-3 py-1.5 lg:hidden">
        {NAV.map((n) => (
          <Link key={n.href} href={n.href} className={cx("shrink-0 rounded-lg px-3 py-1.5 text-small", path.startsWith(n.href) ? "bg-surface-2 text-gold-hi" : "text-ink-2")}>
            {n.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
