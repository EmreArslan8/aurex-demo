import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CATEGORIES, PRODUCTS, getProduct } from "@/data/products";
import { BuyBox } from "@/components/shop/BuyBox";
import { PriceBreakdown } from "@/components/shop/PriceBreakdown";
import { ProductChart } from "@/components/shop/ProductChart";
import { ProductCard } from "@/components/shop/ProductCard";
import { Badge } from "@/components/ui/Badge";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/urun/[slug]">): Promise<Metadata> {
  const p = getProduct((await params).slug);
  return { title: p?.name ?? "Ürün" };
}

export default async function ProductPage({ params }: PageProps<"/urun/[slug]">) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const related = PRODUCTS.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4);
  const specs = [
    ["Ağırlık", p.weightLabel],
    ["Saflık", p.purity],
    ["Üretici", p.refinery],
    ["Teslimat", "1–2 iş günü, sigortalı"],
    ["Sertifika", "QR kodlu, seri numaralı"],
    ["Ambalaj", "Mühürlü, kurcalanmaya dayanıklı"],
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <nav className="mb-6 text-small text-muted">
        <Link href="/urunler" className="hover:text-ink">Ürünler</Link> <span className="mx-1.5">/</span>
        <Link href={`/urunler?k=${p.category}`} className="hover:text-ink">{CATEGORIES[p.category].label}</Link> <span className="mx-1.5">/</span>
        <span className="text-ink-2">{p.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-5">
          <div className="relative aspect-square overflow-hidden rounded-[1.5rem] border border-line bg-bg">
            <Image src={p.image} alt={p.name} fill priority sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
          </div>
          <ProductChart p={p} />
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex gap-2">
              <Badge tone="gold">{CATEGORIES[p.category].label}</Badge>
              {p.badge && <Badge>{p.badge}</Badge>}
            </div>
            <h1 className="font-display text-h1">{p.name}</h1>
            <p className="text-ink-2">{p.description}</p>
          </div>
          <BuyBox p={p} />
          <PriceBreakdown p={p} />
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-line bg-line">
            {specs.map(([k, v]) => (
              <div key={k} className="bg-surface p-4">
                <dt className="text-caption uppercase text-muted">{k}</dt>
                <dd className="mt-1 text-small">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-6 font-display text-h2">Benzer ürünler</h2>
          <div className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
            {related.map((r) => <ProductCard key={r.id} p={r} />)}
          </div>
        </section>
      )}
    </div>
  );
}
