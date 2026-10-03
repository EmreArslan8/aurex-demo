"use client";
import Link from "next/link";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { getProductById } from "@/data/products";
import { QUOTE_META } from "@/lib/rates/catalog";
import type { QuoteKey } from "@/lib/rates/types";
import { useMounted } from "@/store/persist";
import { useRates } from "@/store/rates-store";
import { Change, Price } from "@/components/ui/Price";
import { fmtTL, fmtTL0 } from "@/lib/format";
import { Card, Kpi, PageHead, Pill, Table } from "./ui";
import { usePanelOrders, usePanelSerials, useStockValuation } from "./usePanelData";
import { EINVOICE } from "./status";

const WATCH: QuoteKey[] = ["HAS", "GRA", "CEYREK", "GUMUS", "USD"];

export function Overview() {
  const mounted = useMounted();
  const orders = usePanelOrders();
  const serials = usePanelSerials();
  const stock = useStockValuation();
  const quotes = useRates((s) => s.quotes);
  if (!mounted) return null;

  const revenue = orders.reduce((a, o) => a + o.total, 0);
  const stockValue = stock.reduce((a, s) => a + s.value, 0);
  const pendingInvoice = orders.filter((o) => o.eInvoice !== "onaylandi").length;
  const low = stock.filter((s) => s.p.stock < 40);
  const flagged = serials.filter((s) => s.status === "bildirimli");

  return (
    <>
      <PageHead title="Genel bakış" desc="Satış, stok ve piyasa özeti — stok değeri canlı kurla hesaplanır." />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Kpi label="Ciro (30 gün)" value={fmtTL0(revenue)} hint={`${orders.length} sipariş`} />
        <Kpi label="Stok değeri (canlı)" value={stock[0]?.ready ? fmtTL0(stockValue) : "—"} hint="Maden değeri, piyasa satış" tone="gold" />
        <Kpi label="e-Fatura bekleyen" value={pendingInvoice} hint={pendingInvoice ? "GİB onayı bekleniyor" : "Hepsi onaylı"} tone={pendingInvoice ? "down" : "up"} />
        <Kpi label="Kayıtlı seri no" value={serials.length} hint={`${flagged.length} kayıp/çalıntı bildirimi`} tone={flagged.length ? "down" : undefined} />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.6fr_1fr]">
        <Card title="Son siparişler" action={<Link href="/panel/siparisler" className="flex items-center gap-1 text-small text-gold hover:text-gold-hi">Tümü <ArrowRight className="size-3.5" /></Link>}>
          <Table head={["Sipariş", "Müşteri", "Ürün", "Tutar", "e-Fatura"]}>
            {orders.slice(0, 7).map((o) => (
              <tr key={o.no}>
                <td className="code">{o.no}{o.live && <span className="ml-2"><Pill tone="gold">yeni</Pill></span>}</td>
                <td>{o.customer}</td>
                <td className="max-w-48 truncate text-ink-2">{o.items.map((i) => getProductById(i.productId)?.name).join(", ")}</td>
                <td className="num">{fmtTL(o.total)}</td>
                <td><Pill tone={EINVOICE[o.eInvoice].tone}>{EINVOICE[o.eInvoice].label}</Pill></td>
              </tr>
            ))}
          </Table>
        </Card>

        <div className="space-y-5">
          <Card title="Piyasa">
            <div className="divide-y divide-line/60">
              {WATCH.map((k) => (
                <div key={k} className="flex items-center justify-between px-4 py-2.5 text-small">
                  <span className="text-ink-2">{QUOTE_META[k].label}</span>
                  <span className="flex items-center gap-3"><Price value={quotes?.[k].sell} plain /><Change value={quotes?.[k].change} className="w-14 text-right text-caption" /></span>
                </div>
              ))}
            </div>
          </Card>
          <Card title="Uyarılar">
            <div className="space-y-2 p-4 text-small">
              {low.map((s) => (
                <p key={s.p.id} className="flex items-center gap-2"><AlertTriangle className="size-4 text-gold" /> {s.p.name}: stok <b className="num">{s.p.stock}</b></p>
              ))}
              {flagged.map((f) => (
                <p key={f.serial} className="flex items-center gap-2 text-down"><AlertTriangle className="size-4" /> <span className="code">{f.serial}</span> çalıntı bildirimi</p>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
