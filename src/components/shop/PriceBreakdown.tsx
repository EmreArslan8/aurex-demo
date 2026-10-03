"use client";
import type { Product } from "@/data/products";
import { QUOTE_META } from "@/lib/rates/catalog";
import { usePrice, useQuote } from "@/store/hooks";
import { usePricing } from "@/store/pricing-store";
import { Price } from "@/components/ui/Price";
import { fmtNum } from "@/lib/format";

/** "Fiyat nasıl oluşur?" — formülün her kalemi canlı. */
export function PriceBreakdown({ p }: { p: Product }) {
  const price = usePrice(p);
  const q = useQuote(p.quote);
  const cfg = usePricing((s) => s.config);
  const meta = QUOTE_META[p.quote];
  const unit = meta.unit === "adet" ? "adet" : "g";

  const rows = [
    { label: `${meta.label} kuru × ${fmtNum(p.amount)} ${unit}`, hint: q ? `${fmtNum(q.sell)} ₺ / ${unit}` : "", value: price?.metal },
    { label: "Darp & işçilik", hint: `%${fmtNum(p.premium * 100)}`, value: price?.premium },
    { label: "Hizmet bedeli", hint: `%${fmtNum(cfg.margin[p.category] * 100)}`, value: price?.margin },
    { label: "KDV", hint: cfg.vat[p.category] === 0 ? "Yatırımlık altın — istisna" : `%${fmtNum(cfg.vat[p.category] * 100)}`, value: price?.vat },
  ];

  return (
    <div className="rounded-card border border-line bg-surface p-5">
      <p className="mb-4 text-caption font-semibold uppercase text-ink-2">Fiyat nasıl oluşuyor?</p>
      <div className="space-y-3">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between gap-4 text-small">
            <div>
              <p className="text-ink-2">{r.label}</p>
              <p className="num text-caption text-muted">{r.hint}</p>
            </div>
            <Price value={r.value} className="text-ink-2" />
          </div>
        ))}
        <div className="hairline" />
        <div className="flex items-center justify-between">
          <span className="font-medium">Satış fiyatı</span>
          <Price value={price?.total} className="text-price text-gold-hi" />
        </div>
        <div className="flex items-center justify-between text-small">
          <span className="text-muted">Bugün geri satarsanız</span>
          <Price value={price?.buyback} className="text-ink-2" />
        </div>
      </div>
    </div>
  );
}
