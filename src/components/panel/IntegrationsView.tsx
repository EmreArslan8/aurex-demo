"use client";
import { BellRing, Building2, CreditCard, FileText, LineChart, ShieldCheck, Truck } from "lucide-react";
import { useRates } from "@/store/rates-store";
import { fmtTime } from "@/lib/format";
import { PageHead, Pill } from "./ui";

export function IntegrationsView() {
  const status = useRates((s) => s.status);
  const fetched = useRates((s) => s.snapshot?.fetchedAt);
  const live = status !== "error";

  const items = [
    { icon: LineChart, t: "Piyasa veri kaynağı", d: "Altın, gümüş ve döviz kotasyonları; 20 sn'de bir çekilir, sunucuda önbelleklenir. Kaynak değiştirilebilir (borsa / banka API).", st: live ? "Bağlı" : "Yedek veri", tone: live ? "up" : "down", meta: fetched ? `Son çekim ${fmtTime(fetched)}` : "" },
    { icon: CreditCard, t: "Sanal POS", d: "BDDK lisanslı ödeme kuruluşu / banka sanal POS'u. Tek çekim, kuyum ürünlerinde taksit kapalı.", st: "Test modu", tone: "gold", meta: "Demo: gerçek tahsilat yok" },
    { icon: ShieldCheck, t: "3D Secure", d: "Tüm kart ödemelerinde zorunlu 3D doğrulama; sonuç sipariş kaydına işlenir.", st: "Aktif", tone: "up", meta: "Demo OTP: 123456" },
    { icon: Truck, t: "Sigortalı kargo", d: "Değerli gönderi entegrasyonu: ürün değeri üzerinden sigorta, takip numarası ve teslimat bildirimi.", st: "Test modu", tone: "gold", meta: "Sigorta oranı panelden" },
    { icon: FileText, t: "e-Fatura / e-Arşiv", d: "GİB özel entegratörü API'si ile otomatik fatura oluşturma ve iletim.", st: "Test modu", tone: "gold", meta: "Sipariş onayında tetiklenir" },
    { icon: Building2, t: "ERP / muhasebe aktarımı", d: "Satış, seri numarası ve stok hareketleri muhasebe programına (Logo, Mikro, Luca vb.) aktarılır.", st: "CSV + API", tone: "info", meta: "Siparişler sayfasından dışa aktar" },
    { icon: BellRing, t: "Push bildirim", d: "Fiyat alarmı ve sipariş durumu bildirimleri — iOS (APNs) ve Android (FCM).", st: "Aktif", tone: "up", meta: "Mobil uygulamada deneyin" },
  ] as const;

  return (
    <>
      <PageHead title="Entegrasyonlar" desc="Dış servis bağlantıları. Anahtarlar ve ortam ayarları sunucuda saklanır." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((x) => (
          <div key={x.t} className="flex flex-col rounded-card border border-line bg-surface p-5">
            <div className="flex items-start justify-between">
              <span className="grid size-10 place-items-center rounded-xl bg-surface-3"><x.icon className="size-5 text-gold" /></span>
              <Pill tone={x.tone}>{x.st}</Pill>
            </div>
            <p className="mt-4 font-semibold">{x.t}</p>
            <p className="mt-1 flex-1 text-small text-muted">{x.d}</p>
            {x.meta && <p className="num mt-4 border-t border-line pt-3 text-caption text-ink-2">{x.meta}</p>}
          </div>
        ))}
      </div>
    </>
  );
}
