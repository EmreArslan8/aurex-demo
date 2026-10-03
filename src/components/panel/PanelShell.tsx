"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Boxes, ExternalLink, LayoutDashboard, Menu, Plug, Receipt, ScanBarcode, SlidersHorizontal, X } from "lucide-react";
import { Logo } from "@/components/site/Logo";
import { LiveDot } from "@/components/ui/Price";
import { useRates } from "@/store/rates-store";
import { cx, fmtTime } from "@/lib/format";

const NAV = [
  { href: "/panel", label: "Genel bakış", icon: LayoutDashboard },
  { href: "/panel/siparisler", label: "Siparişler & e-Fatura", icon: Receipt },
  { href: "/panel/seri-lot", label: "Seri / Lot takibi", icon: ScanBarcode },
  { href: "/panel/stok", label: "Stok", icon: Boxes },
  { href: "/panel/fiyatlandirma", label: "Fiyat kuralları", icon: SlidersHorizontal },
  { href: "/panel/entegrasyonlar", label: "Entegrasyonlar", icon: Plug },
];

function Nav({ onNav }: { onNav?: () => void }) {
  const path = usePathname();
  return (
    <nav className="space-y-1">
      {NAV.map((n) => {
        const active = n.href === "/panel" ? path === "/panel" : path.startsWith(n.href);
        return (
          <Link key={n.href} href={n.href} onClick={onNav} className={cx("flex items-center gap-3 rounded-xl px-3 py-2.5 text-small transition", active ? "bg-surface-3 text-gold-hi" : "text-ink-2 hover:bg-surface-2 hover:text-ink")}>
            <n.icon className="size-4" /> {n.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function PanelShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const status = useRates((s) => s.status);
  const fetched = useRates((s) => s.snapshot?.fetchedAt);

  return (
    <div className="flex min-h-dvh">
      <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col border-r border-line bg-surface p-4 lg:flex">
        <Logo href="/panel" className="mb-8 px-2 pt-2" />
        <Nav />
        <div className="mt-auto space-y-3">
          <div className="rounded-xl bg-bg p-3 text-caption">
            <p className="flex items-center gap-2 text-ink-2"><LiveDot className={status === "error" ? "bg-down" : undefined} /> Piyasa verisi {status === "error" ? "yedekte" : "canlı"}</p>
            <p className="num mt-1 text-muted">Son çekim {fetched ? fmtTime(fetched) : "—"}</p>
          </div>
          <Link href="/" className="flex items-center gap-2 px-2 text-small text-muted hover:text-ink"><ExternalLink className="size-3.5" /> Mağazayı aç</Link>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-line bg-bg/85 px-4 backdrop-blur lg:hidden">
          <button onClick={() => setOpen(true)} className="grid size-9 place-items-center rounded-lg border border-line" aria-label="Menü"><Menu className="size-4" /></button>
          <Logo href="/panel" />
        </header>
        {open && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div onClick={() => setOpen(false)} className="absolute inset-0 bg-black/60" />
            <div className="absolute inset-y-0 left-0 w-72 border-r border-line bg-surface p-4">
              <button onClick={() => setOpen(false)} className="mb-6 ml-auto grid size-9 place-items-center rounded-lg text-muted" aria-label="Kapat"><X className="size-4" /></button>
              <Nav onNav={() => setOpen(false)} />
            </div>
          </div>
        )}
        <main className="mx-auto max-w-7xl p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
