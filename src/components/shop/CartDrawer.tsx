"use client";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShieldCheck, Trash2, X } from "lucide-react";
import { useCart } from "@/store/cart-store";
import { useCartSummary } from "@/store/hooks";
import { useMounted } from "@/store/persist";
import { Price } from "@/components/ui/Price";
import { btn } from "@/components/ui/Button";
import { cx } from "@/lib/format";

export function CartDrawer() {
  const mounted = useMounted();
  const open = useCart((s) => s.open);
  const setOpen = useCart((s) => s.setOpen);
  const { setQty, remove } = useCart.getState();
  const sum = useCartSummary();
  if (!mounted) return null;

  return (
    <div className={cx("fixed inset-0 z-50 transition", open ? "visible" : "invisible")}>
      <div onClick={() => setOpen(false)} className={cx("absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity", open ? "opacity-100" : "opacity-0")} />
      <aside
        className={cx(
          "absolute top-0 right-0 flex h-full w-full max-w-md flex-col border-l border-line bg-surface transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <div>
            <h2 className="font-display text-h2">Sepetim</h2>
            <p className="text-small text-muted">{sum.count} ürün · fiyatlar canlı</p>
          </div>
          <button onClick={() => setOpen(false)} className="grid size-9 place-items-center rounded-lg text-muted hover:bg-surface-3 hover:text-ink" aria-label="Kapat">
            <X className="size-4" />
          </button>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto p-6">
          {sum.items.length === 0 && <p className="py-16 text-center text-muted">Sepetiniz boş.</p>}
          {sum.items.map((it) => (
            <div key={it.productId} className="flex gap-4 rounded-card border border-line bg-surface-2 p-3">
              <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-bg">
                <Image src={it.product.image} alt={it.product.name} fill sizes="80px" className="object-cover" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <p className="truncate font-medium">{it.product.name}</p>
                  <button onClick={() => remove(it.productId)} className="text-muted hover:text-down" aria-label="Kaldır">
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
                <p className="text-small text-muted">{it.product.weightLabel} · {it.product.purity}</p>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center rounded-lg border border-line">
                    <button onClick={() => setQty(it.productId, it.qty - 1)} className="grid size-7 place-items-center text-muted hover:text-ink"><Minus className="size-3" /></button>
                    <span className="num w-7 text-center text-small">{it.qty}</span>
                    <button onClick={() => setQty(it.productId, it.qty + 1)} className="grid size-7 place-items-center text-muted hover:text-ink"><Plus className="size-3" /></button>
                  </div>
                  <Price value={sum.ready ? it.total : null} className="font-medium" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {sum.items.length > 0 && (
          <div className="space-y-4 border-t border-line p-6">
            <div className="flex items-center justify-between">
              <span className="text-muted">Ara toplam</span>
              <Price value={sum.ready ? sum.subtotal : null} className="text-price" />
            </div>
            <p className="flex items-center gap-2 text-small text-muted">
              <ShieldCheck className="size-4 text-gold" /> Fiyat, ödeme adımında {""}
              <span className="text-ink-2">90 sn sabitlenir</span>.
            </p>
            <Link href="/odeme" onClick={() => setOpen(false)} className={btn("gold", "lg", "w-full")}>
              Güvenli Ödemeye Geç
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}
