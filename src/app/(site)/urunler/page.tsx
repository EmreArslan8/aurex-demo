import { Suspense } from "react";
import type { Metadata } from "next";
import { CatalogFilter } from "@/components/shop/CatalogFilter";
import { Eyebrow } from "@/components/ui/Badge";

export const metadata: Metadata = { title: "Ürünler" };

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      <Eyebrow>Katalog</Eyebrow>
      <h1 className="mt-2 mb-2 font-display text-h1">Tüm ürünler</h1>
      <p className="mb-8 max-w-xl text-ink-2">Gösterilen tüm fiyatlar canlı piyasa kuruna bağlıdır ve saniyede bir güncellenir.</p>
      <Suspense>
        <CatalogFilter />
      </Suspense>
    </div>
  );
}
