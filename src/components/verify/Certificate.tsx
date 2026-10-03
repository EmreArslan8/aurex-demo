"use client";
import Image from "next/image";
import { AlertTriangle, BadgeCheck, PackageCheck, ShieldX } from "lucide-react";
import { getProductById } from "@/data/products";
import type { SerialRecord } from "@/data/serials";
import { fmtDate } from "@/lib/format";
import { useMounted } from "@/store/persist";
import { QrCode } from "./QrCode";
import { useSerialLookup } from "./lookup";
import { cx } from "@/lib/format";

const STATUS = {
  satildi: { tone: "up", icon: BadgeCheck, title: "Orijinal Aurex ürünü", text: "Bu seri numarası kayıtlarımızda mevcut ve satışı tamamlanmış bir ürüne ait." },
  stokta: { tone: "up", icon: PackageCheck, title: "Orijinal Aurex ürünü", text: "Bu ürün kayıtlarımızda mevcut ve henüz satılmamış (mağaza stoğunda)." },
  bildirimli: { tone: "down", icon: AlertTriangle, title: "Dikkat: kayıp / çalıntı bildirimi", text: "Bu seri numarası kayıp veya çalıntı olarak bildirilmiştir. Lütfen ürünü satın almayın ve bizimle iletişime geçin." },
} as const;

function Banner({ rec }: { rec: SerialRecord | null }) {
  if (!rec)
    return (
      <div className="flex gap-4 rounded-card border border-down/40 bg-down/10 p-5">
        <ShieldX className="size-7 shrink-0 text-down" />
        <div>
          <p className="text-h3 text-down">Kayıt bulunamadı</p>
          <p className="mt-1 text-small text-ink-2">Bu seri numarası Aurex kayıtlarında yok. Numarayı kontrol edin; doğruysa ürün orijinal olmayabilir.</p>
        </div>
      </div>
    );
  const s = STATUS[rec.status];
  return (
    <div className={cx("flex gap-4 rounded-card border p-5", s.tone === "up" ? "border-up/35 bg-up/10" : "border-down/40 bg-down/10")}>
      <s.icon className={cx("size-7 shrink-0", s.tone === "up" ? "text-up" : "text-down")} />
      <div>
        <p className={cx("text-h3", s.tone === "up" ? "text-up" : "text-down")}>{s.title}</p>
        <p className="mt-1 text-small text-ink-2">{s.text}</p>
      </div>
    </div>
  );
}

export function Certificate({ serial }: { serial: string }) {
  const mounted = useMounted();
  const rec = useSerialLookup(serial);
  if (!mounted) return <div className="h-96 animate-pulse rounded-[1.5rem] bg-surface" />;
  const p = rec ? getProductById(rec.productId) : null;

  return (
    <div className="space-y-5">
      <Banner rec={rec} />
      {rec && p && (
        <div className="overflow-hidden rounded-[1.5rem] border border-gold/30 bg-gradient-to-b from-surface-2 to-surface">
          <div className="flex items-center justify-between border-b border-line px-6 py-4">
            <div>
              <p className="text-caption uppercase text-gold">Orijinallik sertifikası</p>
              <p className="code text-small text-ink-2">{rec.certificateNo}</p>
            </div>
            <span className="font-display text-h3 tracking-[0.06em]">AUREX</span>
          </div>
          <div className="grid gap-6 p-5 md:grid-cols-[180px_1fr_auto] md:p-6">
            <div className="flex items-center justify-between gap-4 md:hidden">
              <div className="relative size-28 overflow-hidden rounded-xl bg-bg">
                <Image src={p.image} alt={p.name} fill sizes="112px" className="object-cover" />
              </div>
              <QrCode serial={rec.serial} size={96} />
            </div>
            <div className="relative hidden aspect-square overflow-hidden rounded-xl bg-bg md:block">
              <Image src={p.image} alt={p.name} fill sizes="180px" className="object-cover" />
            </div>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-4 text-small">
              {[
                ["Ürün", p.name],
                ["Seri no", rec.serial],
                ["Ağırlık", p.weightLabel],
                ["Saflık", p.purity],
                ["Üretici", p.refinery],
                ["Üretim lotu", rec.lot],
                ["Üretim tarihi", fmtDate(rec.producedAt)],
                ["Ayar analizi", rec.assayer],
                ...(rec.owner ? [["Kayıtlı sahibi", rec.owner]] : []),
                ...(rec.soldAt ? [["Satış tarihi", fmtDate(rec.soldAt)]] : []),
              ].map(([k, v]) => (
                <div key={k} className="min-w-0">
                  <dt className="text-caption uppercase text-muted">{k}</dt>
                  <dd className={cx("mt-0.5 truncate", k === "Seri no" && "code")}>{v}</dd>
                </div>
              ))}
            </dl>
            <div className="hidden text-center md:block">
              <QrCode serial={rec.serial} size={110} />
              <p className="mt-2 text-caption text-muted">Sertifika QR</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
