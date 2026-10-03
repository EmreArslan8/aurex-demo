"use client";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import type { Product } from "@/data/products";
import { usePrice } from "@/store/hooks";
import { useCart } from "@/store/cart-store";
import { Change, Price } from "@/components/ui/Price";
import { Badge } from "@/components/ui/Badge";

export function ProductCard({ p }: { p: Product }) {
  const price = usePrice(p);
  const add = useCart((s) => s.add);
  const perGram = price && p.quote !== "CEYREK" && p.quote !== "YARIM" && p.quote !== "CUMHURIYET" ? price.total / p.amount : null;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-card border border-line bg-surface transition hover:border-gold/40 hover:shadow-[0_20px_60px_-30px_var(--color-gold)]">
      <Link href={`/urun/${p.slug}`} className="relative aspect-square overflow-hidden bg-bg">
        <Image src={p.image} alt={p.name} fill sizes="(max-width:768px) 50vw, 25vw" className="object-cover transition duration-700 group-hover:scale-105" />
        {p.badge && <Badge tone="gold" className="absolute top-3 left-3 backdrop-blur">{p.badge}</Badge>}
        <span className="num absolute top-3 right-3 rounded-md bg-black/50 px-1.5 py-0.5 text-caption text-ink-2 backdrop-blur">{p.purity}</span>
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <Link href={`/urun/${p.slug}`} className="font-medium hover:text-gold-hi">{p.name}</Link>
          <p className="text-small text-muted">{p.weightLabel} · Seri numaralı</p>
        </div>
        <div className="mt-auto flex items-end justify-between gap-2">
          <div className="min-w-0">
            <Price value={price?.total} className="block text-price" />
            <div className="mt-1 flex items-center gap-2">
              <Change value={price?.change} className="text-caption" />
              {perGram && <span className="num truncate text-caption text-muted">{perGram.toLocaleString("tr-TR", { maximumFractionDigits: 0 })} ₺/g</span>}
            </div>
          </div>
          <button
            onClick={() => add(p.id)}
            className="grid size-10 shrink-0 place-items-center rounded-xl bg-surface-3 text-ink transition hover:bg-gold hover:text-bg"
            aria-label="Sepete ekle"
          >
            <Plus className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
