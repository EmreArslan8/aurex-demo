import type { Metadata } from "next";
import { Bell, CandlestickChart, ShieldCheck, Wallet } from "lucide-react";
import { PhoneFrame } from "@/components/mobile/PhoneFrame";
import { MobileApp } from "@/components/mobile/MobileApp";
import { StoreBadges } from "@/components/home/StoreBadges";
import { Eyebrow } from "@/components/ui/Badge";

export const metadata: Metadata = { title: "Mobil Uygulama" };

const FEATURES = [
  { icon: CandlestickChart, t: "Canlı piyasa & grafikler", d: "Altın, gümüş ve döviz fiyatlarını anlık izleyin; 1 günden 1 yıla grafikler." },
  { icon: Wallet, t: "Portföyüm", d: "Aldığınız her ürün otomatik eklenir; toplam değer ve kâr/zarar canlı hesaplanır." },
  { icon: Bell, t: "Fiyat alarmı", d: "Hedef fiyatı belirleyin, piyasa oraya geldiğinde anında bildirim alın." },
  { icon: ShieldCheck, t: "Sertifikalarım", d: "Tüm ürünlerinizin seri numarası ve sertifikası tek yerde." },
];

export default function MobilePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-10 md:px-6 lg:py-14">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto]">
        <div className="order-2 space-y-7 lg:order-1">
          <div>
            <Eyebrow>iOS & Android</Eyebrow>
            <h1 className="mt-2 font-display text-display">Altınınız <em className="gold-text">cebinizde</em>.</h1>
            <p className="mt-4 max-w-lg text-ink-2">Aurex uygulamasıyla piyasayı takip edin, portföyünüzün değerini her an görün, doğru fiyatı kaçırmayın.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <div key={f.t} className="rounded-card border border-line bg-surface p-5">
                <f.icon className="size-5 text-gold" />
                <p className="mt-3 font-semibold">{f.t}</p>
                <p className="mt-1 text-small text-muted">{f.d}</p>
              </div>
            ))}
          </div>
          <StoreBadges />
          <p className="hidden text-small text-muted lg:block">Sağdaki uygulama canlıdır: dokunun, gezinin, alarm kurun.</p>
        </div>
        <div className="order-1 lg:order-2">
          <PhoneFrame>
            <MobileApp />
          </PhoneFrame>
        </div>
      </div>
    </div>
  );
}
