"use client";
import { useState } from "react";
import { Download, Send } from "lucide-react";
import { getProductById } from "@/data/products";
import { useOrders, type Order } from "@/store/orders-store";
import { useMounted } from "@/store/persist";
import { Button } from "@/components/ui/Button";
import { cx, fmtTL } from "@/lib/format";
import { Card, PageHead, Pill, Table } from "./ui";
import { usePanelOrders } from "./usePanelData";
import { EINVOICE } from "./status";
import { downloadCsv } from "./csv";

const FILTERS: (Order["eInvoice"] | "hepsi")[] = ["hepsi", "kuyrukta", "gib-iletildi", "onaylandi"];

export function OrdersView() {
  const mounted = useMounted();
  const orders = usePanelOrders();
  const setInvoice = useOrders((s) => s.setInvoice);
  const [f, setF] = useState<(typeof FILTERS)[number]>("hepsi");
  if (!mounted) return null;
  const list = orders.filter((o) => f === "hepsi" || o.eInvoice === f);

  const send = (no: string) => {
    setInvoice(no, "gib-iletildi");
    setTimeout(() => setInvoice(no, "onaylandi"), 2500);
  };

  const exportCsv = () =>
    downloadCsv("aurex-satislar.csv", [
      ["Sipariş No", "Tarih", "Müşteri", "Ürün", "Seri No", "Adet", "Birim Fiyat", "Kargo", "Toplam", "e-Fatura"],
      ...orders.flatMap((o) =>
        o.items.map((i) => [o.no, o.createdAt.slice(0, 10), o.customer, getProductById(i.productId)?.name ?? "", i.serials.join(" "), i.qty, i.unitPrice.toFixed(2), o.shipping.toFixed(2), o.total.toFixed(2), EINVOICE[o.eInvoice].label]),
      ),
    ]);

  return (
    <>
      <PageHead
        title="Siparişler & e-Fatura"
        desc="Ödemesi onaylanan sipariş için e-Arşiv fatura otomatik oluşur ve entegratör üzerinden GİB'e iletilir."
        action={<Button variant="outline" onClick={exportCsv}><Download className="size-4" /> Muhasebeye aktar (CSV)</Button>}
      />
      <div className="no-scrollbar mb-4 flex gap-2 overflow-x-auto">
        {FILTERS.map((x) => (
          <button key={x} onClick={() => setF(x)} className={cx("shrink-0 rounded-full border px-3 py-1.5 text-small", f === x ? "border-gold bg-gold/10 text-gold-hi" : "border-line text-ink-2")}>
            {x === "hepsi" ? "Tümü" : EINVOICE[x].label} <span className="num text-muted">{orders.filter((o) => x === "hepsi" || o.eInvoice === x).length}</span>
          </button>
        ))}
      </div>
      <Card>
        <Table head={["Sipariş", "Tarih", "Müşteri", "Ürünler / seri no", "Teslimat", "Tutar", "e-Fatura", ""]}>
          {list.map((o) => (
            <tr key={o.no} className={o.live ? "bg-gold/[0.03]" : undefined}>
              <td className="code whitespace-nowrap">{o.no}</td>
              <td className="num whitespace-nowrap text-ink-2">{o.createdAt.slice(0, 10).split("-").reverse().join(".")}</td>
              <td className="whitespace-nowrap">{o.customer}<p className="text-caption text-muted">{o.city}</p></td>
              <td>
                {o.items.map((i) => (
                  <p key={i.serials[0]} className="whitespace-nowrap">{i.qty} × {getProductById(i.productId)?.name} <span className="code text-caption text-muted">{i.serials[0]}{i.serials.length > 1 ? ` +${i.serials.length - 1}` : ""}</span></p>
                ))}
              </td>
              <td className="whitespace-nowrap text-ink-2">{o.shippingMethod}</td>
              <td className="num whitespace-nowrap">{fmtTL(o.total)}</td>
              <td><Pill tone={EINVOICE[o.eInvoice].tone}>{EINVOICE[o.eInvoice].label}</Pill></td>
              <td>
                {o.live && o.eInvoice === "kuyrukta" && (
                  <Button size="sm" variant="dark" onClick={() => send(o.no)}><Send className="size-3.5" /> GİB&apos;e gönder</Button>
                )}
              </td>
            </tr>
          ))}
        </Table>
      </Card>
    </>
  );
}
