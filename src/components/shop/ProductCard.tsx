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

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-card border border-line bg-surface transition hover:border-gold/40 hover:shadow-[0_20px_60px_-30px_var(--color-gold)]">
      <div className="relative aspect-square overflow-hidden bg-bg">
        <Link href={`/urun/${p.slug}`} className="absolute inset-0">
          <Image src={p.image} alt={p.name} fill sizes="(max-width:768px) 50vw, 25vw" className="object-cover transition duration-700 group-hover:scale-105" />
        </Link>
        <button
          onClick={() => add(p.id)}
          className="absolute right-2.5 bottom-2.5 grid size-9 place-items-center rounded-xl bg-black/60 text-ink backdrop-blur transition active:bg-gold active:text-bg sm:hidden"
          aria-label="Sepete ekle"
        >
          <Plus className="size-4" />
        </button>
        {p.badge && <Badge tone="gold" className="pointer-events-none absolute top-2.5 left-2.5 max-w-[calc(100%-1.25rem)] truncate backdrop-blur md:top-3 md:left-3">{p.badge}</Badge>}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-3 md:p-4">
        <div className="min-w-0">
          <Link href={`/urun/${p.slug}`} className="line-clamp-1 font-semibold hover:text-gold-hi">{p.name}</Link>
          <p className="truncate text-small text-muted">{p.weightLabel} · {p.purity}</p>
        </div>
        <div className="mt-auto flex items-end justify-between gap-2">
          <div className="min-w-0">
            <Price value={price?.total} className="block text-body font-semibold whitespace-nowrap sm:text-h3 md:text-price" />
            <Change value={price?.change} className="text-caption" />
          </div>
          <button
            onClick={() => add(p.id)}
            className="hidden size-10 shrink-0 place-items-center rounded-xl bg-surface-3 text-ink transition hover:bg-gold hover:text-bg sm:static sm:grid"
            aria-label="Sepete ekle"
          >
            <Plus className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
