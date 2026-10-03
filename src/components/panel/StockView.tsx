"use client";
import Image from "next/image";
import { CATEGORIES } from "@/data/products";
import { useMounted } from "@/store/persist";
import { Price } from "@/components/ui/Price";
import { fmtTL0 } from "@/lib/format";
import { Card, Kpi, PageHead, Pill, Table } from "./ui";
import { useStockValuation } from "./usePanelData";

export function StockView() {
  const mounted = useMounted();
  const rows = useStockValuation();
  if (!mounted) return null;
  const total = rows.reduce((a, r) => a + r.value, 0);
  const units = rows.reduce((a, r) => a + r.p.stock, 0);
  const goldGr = rows.filter((r) => r.p.quote === "HAS").reduce((a, r) => a + r.p.amount * r.p.stock, 0);

  return (
    <>
      <PageHead title="Stok" desc="Stok değeri canlı piyasa kuruyla anlık yeniden değerlenir. ERP'ye aktarılan stok hareketleri seri numarası bazındadır." />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Kpi label="Stok değeri" value={rows[0]?.ready ? fmtTL0(total) : "—"} tone="gold" hint="Canlı" />
        <Kpi label="Toplam adet" value={units.toLocaleString("tr-TR")} />
        <Kpi label="Külçe altın" value={`${goldGr.toLocaleString("tr-TR")} g`} />
        <Kpi label="Kritik stok" value={rows.filter((r) => r.p.stock < 40).length} tone="down" hint="40 adet altı" />
      </div>
      <Card className="mt-5">
        <Table head={["Ürün", "Kategori", "Lot", "Stok", "Satış fiyatı", "Geri alım", "Stok değeri"]}>
          {rows.map((r) => (
            <tr key={r.p.id}>
              <td>
                <div className="flex items-center gap-3">
                  <div className="relative size-9 shrink-0 overflow-hidden rounded-lg bg-bg"><Image src={r.p.image} alt="" fill sizes="36px" className="object-cover" /></div>
                  <span className="whitespace-nowrap">{r.p.name}</span>
                </div>
              </td>
              <td className="whitespace-nowrap text-ink-2">{CATEGORIES[r.p.category].label}</td>
              <td className="code text-ink-2">{r.p.lot}</td>
              <td>{r.p.stock < 40 ? <Pill tone="down">{r.p.stock}</Pill> : <span className="num">{r.p.stock}</span>}</td>
              <td><Price value={r.ready ? r.price : null} /></td>
              <td><Price value={r.ready ? r.buyback : null} className="text-ink-2" /></td>
              <td><Price value={r.ready ? r.value : null} className="font-semibold" /></td>
            </tr>
          ))}
        </Table>
      </Card>
    </>
  );
}
