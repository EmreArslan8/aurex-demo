"use client";
import { RotateCcw } from "lucide-react";
import { CATEGORIES, PRODUCTS, type Category } from "@/data/products";
import { useMounted } from "@/store/persist";
import { usePricing } from "@/store/pricing-store";
import { usePrice } from "@/store/hooks";
import { Price } from "@/components/ui/Price";
import { Button } from "@/components/ui/Button";
import { Card, PageHead, Table } from "./ui";

function PctInput({ value, onChange, step = 0.1 }: { value: number; onChange: (v: number) => void; step?: number }) {
  return (
    <div className="relative">
      <input
        type="number"
        step={step}
        min={0}
        value={+(value * 100).toFixed(3)}
        onChange={(e) => onChange((Number(e.target.value) || 0) / 100)}
        className="num h-10 w-full rounded-lg border border-line bg-bg pr-8 pl-3 text-small outline-none focus:border-gold"
      />
      <span className="absolute top-1/2 right-3 -translate-y-1/2 text-caption text-muted">%</span>
    </div>
  );
}

function PreviewRow({ id }: { id: string }) {
  const p = PRODUCTS.find((x) => x.id === id)!;
  const pr = usePrice(p);
  return (
    <tr>
      <td className="whitespace-nowrap">{p.name}</td>
      <td><Price value={pr?.metal} className="text-ink-2" /></td>
      <td><Price value={pr ? pr.premium + pr.margin : null} className="text-ink-2" /></td>
      <td><Price value={pr?.vat} className="text-ink-2" /></td>
      <td><Price value={pr?.total} className="font-semibold text-gold-hi" /></td>
      <td><Price value={pr?.buyback} className="text-ink-2" /></td>
    </tr>
  );
}

export function PricingView() {
  const mounted = useMounted();
  const { config, update, reset } = usePricing();
  if (!mounted) return null;
  const cats = Object.keys(CATEGORIES) as Category[];

  return (
    <>
      <PageHead
        title="Fiyat kuralları"
        desc="Tüm fiyatlar tek formülden hesaplanır: kur × miktar + ürün primi + marj + KDV. Buradaki değişiklik mağazaya, sepete ve mobil uygulamaya anında yansır."
        action={<Button variant="ghost" onClick={reset}><RotateCcw className="size-4" /> Varsayılana dön</Button>}
      />
      <div className="grid gap-5 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-5">
          <Card title="Kategori kuralları">
            <div className="space-y-3 p-4">
              <div className="grid grid-cols-[1fr_96px_96px] gap-3 text-caption uppercase text-muted"><span /><span>Marj</span><span>KDV</span></div>
              {cats.map((c) => (
                <div key={c} className="grid grid-cols-[1fr_96px_96px] items-center gap-3">
                  <div>
                    <p className="text-small font-semibold">{CATEGORIES[c].label}</p>
                    <p className="text-caption text-muted">{CATEGORIES[c].hint}</p>
                  </div>
                  <PctInput value={config.margin[c]} onChange={(v) => update({ margin: { ...config.margin, [c]: v } })} />
                  <PctInput value={config.vat[c]} step={1} onChange={(v) => update({ vat: { ...config.vat, [c]: v } })} />
                </div>
              ))}
            </div>
          </Card>
          <Card title="Genel">
            <div className="grid gap-4 p-4 sm:grid-cols-2">
              <label className="space-y-1.5 text-small">
                <span className="text-ink-2">Geri alım makası</span>
                <PctInput value={config.buybackSpread} step={0.05} onChange={(v) => update({ buybackSpread: v })} />
              </label>
              <label className="space-y-1.5 text-small">
                <span className="text-ink-2">Kargo sigorta oranı</span>
                <PctInput value={config.insuranceRate} step={0.01} onChange={(v) => update({ insuranceRate: v })} />
              </label>
              <label className="space-y-1.5 text-small">
                <span className="text-ink-2">Kargo taban ücreti (₺)</span>
                <input type="number" value={config.shippingBase} onChange={(e) => update({ shippingBase: Number(e.target.value) || 0 })} className="num h-10 w-full rounded-lg border border-line bg-bg px-3 outline-none focus:border-gold" />
              </label>
              <label className="space-y-1.5 text-small">
                <span className="text-ink-2">Ödemede fiyat kilidi (sn)</span>
                <input type="number" min={15} value={config.priceLockSeconds} onChange={(e) => update({ priceLockSeconds: Math.max(15, Number(e.target.value) || 15) })} className="num h-10 w-full rounded-lg border border-line bg-bg px-3 outline-none focus:border-gold" />
              </label>
            </div>
          </Card>
        </div>
        <Card title="Canlı önizleme">
          <Table head={["Ürün", "Maden değeri", "Prim + marj", "KDV", "Satış", "Geri alım"]}>
            {PRODUCTS.map((p) => <PreviewRow key={p.id} id={p.id} />)}
          </Table>
        </Card>
      </div>
    </>
  );
}
