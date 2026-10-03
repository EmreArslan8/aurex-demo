"use client";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, FileText, PackageCheck, Smartphone, Truck } from "lucide-react";
import { getProductById } from "@/data/products";
import { useOrders } from "@/store/orders-store";
import { useMounted } from "@/store/persist";
import { QrCode } from "@/components/verify/QrCode";
import { LinkButton } from "@/components/ui/Button";
import { fmtTL } from "@/lib/format";

const TIMELINE = [
  { icon: CheckCircle2, t: "Ödeme onaylandı", done: true },
  { icon: FileText, t: "e-Arşiv fatura oluşturuldu", done: true },
  { icon: PackageCheck, t: "Mühürleniyor & sigortalanıyor", done: false },
  { icon: Truck, t: "Kargoya teslim", done: false },
];

export function OrderSuccess({ no }: { no: string }) {
  const mounted = useMounted();
  const order = useOrders((s) => s.orders.find((o) => o.no === no));
  if (!mounted) return <div className="h-96 animate-pulse rounded-card bg-surface" />;
  if (!order) return <p className="text-muted">Sipariş bulunamadı.</p>;

  return (
    <div className="space-y-6">
      <div className="rounded-[1.5rem] border border-up/30 bg-gradient-to-b from-up/10 to-transparent p-6 text-center md:p-10">
        <CheckCircle2 className="mx-auto size-12 text-up" />
        <h1 className="mt-4 font-display text-h1">Siparişiniz alındı</h1>
        <p className="mt-2 text-ink-2">Sipariş no <span className="code text-ink">{order.no}</span> · Toplam <span className="num text-ink">{fmtTL(order.total)}</span></p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {TIMELINE.map((s) => (
          <div key={s.t} className="flex flex-col items-start gap-2 rounded-card border border-line bg-surface p-4">
            <s.icon className={s.done ? "size-5 text-up" : "size-5 text-muted"} />
            <p className={s.done ? "text-small" : "text-small text-muted"}>{s.t}</p>
          </div>
        ))}
      </div>

      <div className="rounded-card border border-line bg-surface p-5 md:p-6">
        <h2 className="text-h3">Ürünleriniz ve sertifikaları</h2>
        <p className="mt-1 mb-5 text-small text-muted">Her ürüne benzersiz seri numarası atandı. QR kodu okutarak sertifikayı açabilirsiniz.</p>
        <div className="space-y-4">
          {order.items.flatMap((it) =>
            it.serials.map((serial) => {
              const p = getProductById(it.productId)!;
              return (
                <div key={serial} className="flex items-center gap-4 rounded-xl border border-line bg-bg p-3">
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-lg">
                    <Image src={p.image} alt="" fill sizes="64px" className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">{p.name}</p>
                    <Link href={`/dogrula/${serial}`} className="code block truncate text-caption text-gold-hi underline-offset-4 hover:underline sm:text-small">{serial}</Link>
                    <p className="num text-caption text-muted">{fmtTL(it.unitPrice)}</p>
                  </div>
                  <div className="shrink-0"><QrCode serial={serial} size={56} /></div>
                </div>
              );
            }),
          )}
        </div>
      </div>

      <div className="flex flex-col items-start justify-between gap-4 rounded-card border border-gold/25 bg-gold/[0.05] p-5 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <Smartphone className="size-6 text-gold" />
          <p className="text-small text-ink-2">Ürünleriniz mobil uygulamadaki <b className="text-ink">Portföyüm</b> ekranına eklendi; güncel değerini ve kâr/zararınızı oradan takip edebilirsiniz.</p>
        </div>
        <LinkButton href="/mobil" variant="outline" className="shrink-0">Portföyü gör</LinkButton>
      </div>
    </div>
  );
}
