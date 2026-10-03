"use client";
import { getProductById } from "@/data/products";
import { usePrice, useQuote } from "@/store/hooks";
import { Price } from "@/components/ui/Price";

/** Müşteriye şeffaf fiyat dökümü: 10 gr külçe örneği, canlı */
export function FormulaShowcase() {
  const p = getProductById("p04")!;
  const price = usePrice(p);
  const has = useQuote("HAS");
  const parts = [
    { label: "Altın değeri", value: price?.metal, note: has ? `10 g × ${has.sell.toLocaleString("tr-TR", { maximumFractionDigits: 2 })} ₺` : "10 g × has altın" },
    { label: "Darp & ambalaj", value: price?.premium, note: "sertifikalı, mühürlü" },
    { label: "Hizmet bedeli", value: price?.margin, note: "sabit, şeffaf oran" },
    { label: "KDV", value: price?.vat, note: "yatırımlık altında yok" },
  ];
  return (
    <div className="grid items-center gap-4 md:grid-cols-[repeat(4,1fr)_auto_1.2fr]">
      {parts.map((x, i) => (
        <div key={x.label} className="relative rounded-card border border-line bg-surface p-4">
          {i > 0 && <span className="absolute top-1/2 -left-3.5 hidden -translate-y-1/2 text-muted md:block">+</span>}
          <p className="text-caption uppercase text-muted">{x.label}</p>
          <Price value={x.value} className="mt-1 block text-h3" />
          <p className="text-caption text-muted">{x.note}</p>
        </div>
      ))}
      <span className="hidden text-h2 text-gold md:block">=</span>
      <div className="rounded-card border border-gold/40 bg-gradient-to-br from-gold/15 to-transparent p-4">
        <p className="text-caption uppercase text-gold">10 gr külçe altın</p>
        <Price value={price?.total} className="mt-1 block text-price-lg" />
        <p className="text-caption text-muted">Şu an ödeyeceğiniz tutar</p>
      </div>
    </div>
  );
}
