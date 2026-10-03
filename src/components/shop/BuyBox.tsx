"use client";
import { useState } from "react";
import { Minus, Plus, ShieldCheck, Truck, QrCode, Lock } from "lucide-react";
import type { Product } from "@/data/products";
import { usePrice } from "@/store/hooks";
import { useCart } from "@/store/cart-store";
import { Change, LiveDot, Price } from "@/components/ui/Price";
import { Button } from "@/components/ui/Button";

export function BuyBox({ p }: { p: Product }) {
  const price = usePrice(p);
  const add = useCart((s) => s.add);
  const [qty, setQty] = useState(1);

  return (
    <div className="space-y-5">
      <div className="rounded-card border border-gold/25 bg-gradient-to-b from-gold/[0.07] to-transparent p-5">
        <div className="flex items-center gap-2 text-caption font-semibold uppercase text-ink-2">
          <LiveDot /> Canlı fiyat
        </div>
        <div className="mt-2 flex items-baseline gap-3">
          <Price value={price ? price.total * qty : null} className="text-price-lg font-medium" />
          <Change value={price?.change} />
        </div>
        <p className="mt-1 text-small text-muted">Kur değiştikçe fiyat otomatik güncellenir.</p>
      </div>

      <div className="flex gap-3">
        <div className="flex items-center rounded-xl border border-line">
          <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid size-12 place-items-center text-muted hover:text-ink" aria-label="Azalt"><Minus className="size-4" /></button>
          <span className="num w-8 text-center">{qty}</span>
          <button onClick={() => setQty((q) => Math.min(p.stock, q + 1))} className="grid size-12 place-items-center text-muted hover:text-ink" aria-label="Artır"><Plus className="size-4" /></button>
        </div>
        <Button size="lg" className="flex-1" onClick={() => add(p.id, qty)}>Sepete Ekle</Button>
      </div>

      <ul className="grid gap-2.5 text-small text-ink-2 sm:grid-cols-2">
        <li className="flex items-center gap-2"><Lock className="size-4 text-gold" /> 3D Secure ile ödeme</li>
        <li className="flex items-center gap-2"><Truck className="size-4 text-gold" /> Değer bazlı sigortalı kargo</li>
        <li className="flex items-center gap-2"><QrCode className="size-4 text-gold" /> QR kodlu sertifika</li>
        <li className="flex items-center gap-2"><ShieldCheck className="size-4 text-gold" /> Stok: <span className="num">{p.stock}</span> adet · Lot {p.lot}</li>
      </ul>
    </div>
  );
}
