"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { PRODUCTS, getProductById } from "@/data/products";
import type { SerialStatus } from "@/data/serials";
import { useMounted } from "@/store/persist";
import { cx, fmtDate } from "@/lib/format";
import { Card, Kpi, PageHead, Pill, Table } from "./ui";
import { usePanelSerials } from "./usePanelData";
import { SERIAL_STATUS } from "./status";

export function SerialsView() {
  const mounted = useMounted();
  const all = usePanelSerials();
  const [q, setQ] = useState("");
  const [st, setSt] = useState<SerialStatus | "hepsi">("hepsi");
  const [pid, setPid] = useState("hepsi");

  const list = useMemo(
    () =>
      all.filter(
        (s) =>
          (st === "hepsi" || s.status === st) &&
          (pid === "hepsi" || s.productId === pid) &&
          (!q || [s.serial, s.lot, s.orderNo, s.certificateNo].some((v) => v?.toUpperCase().includes(q.toUpperCase()))),
      ),
    [all, q, st, pid],
  );

  const lots = useMemo(() => {
    const m = new Map<string, { lot: string; total: number; sold: number; pid: string }>();
    for (const s of all) {
      const e = m.get(s.lot) ?? { lot: s.lot, total: 0, sold: 0, pid: s.productId };
      e.total++;
      if (s.status !== "stokta") e.sold++;
      m.set(s.lot, e);
    }
    return [...m.values()];
  }, [all]);

  if (!mounted) return null;
  const count = (x: SerialStatus) => all.filter((s) => s.status === x).length;

  return (
    <>
      <PageHead title="Seri / Lot takibi" desc="Her ürün üretim lotundan müşteriye kadar seri numarasıyla izlenir. Satışta seri otomatik atanır ve sertifika QR'ına bağlanır." />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Kpi label="Toplam seri" value={all.length} />
        <Kpi label="Stokta" value={count("stokta")} />
        <Kpi label="Satıldı" value={count("satildi")} tone="up" />
        <Kpi label="Kayıp / çalıntı" value={count("bildirimli")} tone="down" hint="Doğrulamada uyarı gösterilir" />
      </div>

      <div className="mt-5 flex flex-col gap-2 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Seri, lot, sipariş veya sertifika no ara" className="h-10 w-full rounded-xl border border-line bg-surface pr-3 pl-9 text-small outline-none focus:border-gold" />
        </div>
        <select value={pid} onChange={(e) => setPid(e.target.value)} className="h-10 rounded-xl border border-line bg-surface px-3 text-small outline-none">
          <option value="hepsi">Tüm ürünler</option>
          {PRODUCTS.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <div className="flex gap-1 rounded-xl border border-line bg-surface p-1">
          {(["hepsi", "stokta", "satildi", "bildirimli"] as const).map((x) => (
            <button key={x} onClick={() => setSt(x)} className={cx("rounded-lg px-2.5 py-1 text-caption", st === x ? "bg-surface-3 text-gold-hi" : "text-muted")}>
              {x === "hepsi" ? "Tümü" : SERIAL_STATUS[x].label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 grid gap-5 xl:grid-cols-[1fr_280px]">
        <Card>
          <Table head={["Seri no", "Ürün", "Lot", "Üretim", "Durum", "Sahip / sipariş"]}>
            {list.slice(0, 60).map((s) => (
              <tr key={s.serial}>
                <td><Link href={`/dogrula/${s.serial}`} target="_blank" className="code whitespace-nowrap text-gold-hi hover:underline">{s.serial}</Link></td>
                <td className="whitespace-nowrap">{getProductById(s.productId)?.name}</td>
                <td className="code text-ink-2">{s.lot}</td>
                <td className="whitespace-nowrap text-ink-2">{fmtDate(s.producedAt)}</td>
                <td><Pill tone={SERIAL_STATUS[s.status].tone}>{SERIAL_STATUS[s.status].label}</Pill></td>
                <td className="whitespace-nowrap text-ink-2">{s.owner ?? "—"} {s.orderNo && <span className="code text-caption text-muted">· {s.orderNo}</span>}</td>
              </tr>
            ))}
          </Table>
          {list.length > 60 && <p className="px-4 py-3 text-caption text-muted">İlk 60 kayıt gösteriliyor ({list.length} sonuç)</p>}
        </Card>
        <Card title="Lotlar">
          <div className="divide-y divide-line/60">
            {lots.map((l) => (
              <button key={l.lot} onClick={() => { setQ(l.lot); setPid("hepsi"); }} className="block w-full px-4 py-2.5 text-left hover:bg-surface-2">
                <div className="flex justify-between text-small"><span className="code">{l.lot}</span><span className="num text-muted">{l.sold}/{l.total}</span></div>
                <p className="truncate text-caption text-muted">{getProductById(l.pid)?.name}</p>
                <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-surface-3"><div className="h-full bg-gold" style={{ width: `${(l.sold / l.total) * 100}%` }} /></div>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
