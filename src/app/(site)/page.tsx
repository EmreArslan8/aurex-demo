import Image from "next/image";
import { ArrowRight, BadgeCheck, Bell, CreditCard, Lock, PackageCheck, QrCode, ScanLine, ShieldCheck, Truck, Wallet, Headset } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { HeroMarket } from "@/components/home/HeroMarket";
import { FormulaShowcase } from "@/components/home/FormulaShowcase";
import { StoreBadges } from "@/components/home/StoreBadges";
import { Faq } from "@/components/home/Faq";
import { ProductCard } from "@/components/shop/ProductCard";
import { LinkButton } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Badge";

const TRUST = [
  { icon: Lock, label: "3D Secure güvenli ödeme" },
  { icon: Truck, label: "Sigortalı, isimsiz paket" },
  { icon: QrCode, label: "QR kodlu sertifika" },
  { icon: BadgeCheck, label: "999.9 saflık garantisi" },
  { icon: CreditCard, label: "Anında geri alım garantisi" },
];

const STEPS = [
  { icon: Wallet, t: "Seçin", d: "Gram, külçe ya da sikke — canlı fiyatı görerek seçin." },
  { icon: Lock, t: "Fiyatınızı sabitleyin", d: "Ödeme adımında fiyatınız 90 saniye kilitlenir, piyasa oynasa da değişmez." },
  { icon: PackageCheck, t: "Sigortalı teslim", d: "Ürününüz değeri üzerinden sigortalı, mühürlü pakette kapınıza gelir." },
  { icon: ScanLine, t: "Doğrulayın", d: "Sertifikadaki QR kodu okutun, ürününüzün orijinal olduğunu görün." },
];

const FEATURED = ["p04", "p08", "p01", "p07", "p10", "p12", "p11", "p05"];

export default function Home() {
  const featured = FEATURED.map((id) => PRODUCTS.find((p) => p.id === id)!);
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-line">
        <Image src="/stock/vault-bars.webp" alt="" fill priority sizes="100vw" className="object-cover opacity-[0.16]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,transparent,var(--color-bg)_70%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-10 md:px-6 md:py-16 lg:grid-cols-[1.1fr_1fr] lg:py-24">
          <div className="space-y-7">
            <Eyebrow>Güncel piyasa fiyatıyla</Eyebrow>
            <h1 className="font-display text-display">
              Altınınızı <em className="gold-text">güvenle</em> alın, değerini her an görün.
            </h1>
            <p className="max-w-lg text-ink-2">
              Sertifikalı külçe ve ziynet altın, piyasanın anlık fiyatıyla. Sigortalı kargoyla kapınızda, QR kodla orijinalliği bir saniyede doğrulanır.
            </p>
            <div className="flex flex-wrap gap-3">
              <LinkButton href="/urunler" size="lg">Alışverişe Başla <ArrowRight className="size-4" /></LinkButton>
              <LinkButton href="/piyasalar" size="lg" variant="outline">Canlı Piyasalar</LinkButton>
            </div>
          </div>
          <HeroMarket />
        </div>
      </section>

      {/* GÜVENCE */}
      <section className="border-b border-line bg-surface">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-3 px-4 py-5 md:flex md:justify-between md:px-6">
          {TRUST.map((t) => (
            <span key={t.label} className="flex items-center gap-2.5 text-small text-ink-2">
              <t.icon className="size-4 text-gold" /> {t.label}
            </span>
          ))}
        </div>
      </section>

      {/* ÜRÜNLER */}
      <section className="mx-auto max-w-7xl px-4 pt-14 md:px-6 md:pt-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <Eyebrow>Çok tercih edilenler</Eyebrow>
            <h2 className="mt-2 font-display text-h1">Yatırımlık altın & gümüş</h2>
          </div>
          <LinkButton href="/urunler" variant="ghost" className="hidden shrink-0 sm:inline-flex">Tümünü gör <ArrowRight className="size-4" /></LinkButton>
        </div>
        <div className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
          {featured.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      {/* NASIL ÇALIŞIR */}
      <section className="mx-auto max-w-7xl px-4 pt-16 md:px-6 md:pt-24">
        <Eyebrow>4 adımda</Eyebrow>
        <h2 className="mt-2 mb-8 font-display text-h1">Altın almak hiç bu kadar kolay olmamıştı</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <div key={s.t} className="rounded-card border border-line bg-surface p-6">
              <div className="mb-5 flex items-center justify-between">
                <s.icon className="size-6 text-gold" />
                <span className="num text-h2 text-line-strong">0{i + 1}</span>
              </div>
              <p className="text-h3">{s.t}</p>
              <p className="mt-2 text-small text-muted">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ŞEFFAF FİYAT */}
      <section className="mx-auto max-w-7xl px-4 pt-16 md:px-6 md:pt-24">
        <div className="mb-8 max-w-2xl">
          <Eyebrow>Şeffaf fiyat</Eyebrow>
          <h2 className="mt-2 font-display text-h1">Ödediğiniz her kuruşun dökümü önünüzde.</h2>
          <p className="mt-3 text-ink-2">Gizli maliyet yok. Fiyatı oluşturan her kalemi ürün sayfasında anlık olarak görürsünüz.</p>
        </div>
        <FormulaShowcase />
      </section>

      {/* ORİJİNALLİK + UYGULAMA */}
      <section className="mx-auto grid max-w-7xl gap-5 px-4 pt-16 md:px-6 md:pt-24 lg:grid-cols-2">
        <div className="relative overflow-hidden rounded-[1.5rem] border border-line bg-surface p-6 md:p-8">
          <Image src="/stock/bar-hand.webp" alt="" fill sizes="50vw" className="object-cover opacity-20" />
          <div className="relative flex h-full flex-col gap-4">
            <ShieldCheck className="size-7 text-gold" />
            <h3 className="font-display text-h1">Altınınız gerçekten orijinal mi?</h3>
            <p className="max-w-md text-ink-2">Her ürünümüz benzersiz seri numarası ve QR kodlu sertifikayla gelir. Kodu okutun; üretim bilgisi, saflık raporu ve sertifikanız anında karşınızda.</p>
            <LinkButton href="/dogrula" variant="outline" className="mt-auto self-start"><QrCode className="size-4" /> Sertifika Sorgula</LinkButton>
          </div>
        </div>
        <div className="flex flex-col gap-4 rounded-[1.5rem] border border-line bg-gradient-to-br from-surface-2 to-surface p-6 md:p-8">
          <Bell className="size-7 text-gold" />
          <h3 className="font-display text-h1">Piyasa cebinizde.</h3>
          <p className="max-w-md text-ink-2">Aurex uygulamasıyla canlı fiyatları takip edin, portföyünüzün güncel değerini ve kâr/zararınızı görün, hedef fiyata gelince bildirim alın.</p>
          <div className="mt-auto"><StoreBadges /></div>
        </div>
      </section>

      {/* SSS */}
      <section className="mx-auto grid max-w-7xl gap-10 px-4 pt-16 md:px-6 md:pt-24 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <Eyebrow>Sıkça sorulanlar</Eyebrow>
          <h2 className="mt-2 font-display text-h1">Aklınıza takılanlar</h2>
          <p className="mt-3 text-ink-2">Cevabını bulamadınız mı? Uzman ekibimiz hafta içi 09:00–19:00 arası yanınızda.</p>
          <p className="mt-5 flex items-center gap-2 text-ink"><Headset className="size-5 text-gold" /> <span className="num">0850 000 00 00</span></p>
        </div>
        <Faq />
      </section>
    </>
  );
}
