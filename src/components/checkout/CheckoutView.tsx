"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Clock, Lock, RefreshCw, ShieldCheck, Store, Truck } from "lucide-react";
import { useCart } from "@/store/cart-store";
import { useMounted } from "@/store/persist";
import { Price } from "@/components/ui/Price";
import { Button, LinkButton } from "@/components/ui/Button";
import { cx, fmtTL } from "@/lib/format";
import { usePriceLock } from "./usePriceLock";
import { CardForm, cardValid, type CardState } from "./CardForm";
import { ThreeDSModal } from "./ThreeDSModal";
import { createOrder } from "./createOrder";

const field = "h-12 w-full rounded-xl border border-line bg-bg px-4 outline-none placeholder:text-muted focus:border-gold";

function Section({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-card border border-line bg-surface p-5 md:p-6">
      <h2 className="mb-4 flex items-center gap-3 text-h3">
        <span className="num grid size-7 place-items-center rounded-full bg-gold/15 text-small text-gold-hi">{n}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

export function CheckoutView() {
  const mounted = useMounted();
  const router = useRouter();
  const clear = useCart((s) => s.clear);
  const [insured, setInsured] = useState(true);
  const { data, remaining, expired, seconds, relock } = usePriceLock(insured);
  const [form, setForm] = useState({ name: "", phone: "", city: "", address: "" });
  const [card, setCard] = useState<CardState>({ number: "", name: "", exp: "", cvc: "" });
  const [threeDS, setThreeDS] = useState(false);

  if (!mounted) return <div className="h-96 animate-pulse rounded-card bg-surface" />;
  if (data.items.length === 0)
    return (
      <div className="rounded-card border border-line bg-surface p-10 text-center">
        <p className="text-h3">Sepetiniz boş</p>
        <LinkButton href="/urunler" className="mt-5">Ürünlere göz at</LinkButton>
      </div>
    );

  const formOk = form.name.trim().length > 3 && form.phone.replace(/\D/g, "").length >= 10 && (!insured || (form.city && form.address.length > 8));
  const canPay = formOk && cardValid(card) && !expired;

  const onPaid = () => {
    const order = createOrder(
      data.items.map((i) => ({ productId: i.productId, qty: i.qty, unit: i.unit })),
      form.name,
      data.shipping,
      insured ? "Sigortalı kargo" : "Mağazadan teslim",
    );
    router.push(`/siparis/${order.no}`);
    setTimeout(clear, 400);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
      <div className="space-y-5">
        <Section n={1} title="Teslimat">
          <div className="mb-4 grid gap-3 sm:grid-cols-2">
            {[
              { v: true, icon: Truck, t: "Sigortalı kargo", d: "Ürün değeri kadar sigortalı, isimsiz paket · 1–2 iş günü" },
              { v: false, icon: Store, t: "Mağazadan teslim", d: "Kimlikle şubeden teslim alın · ücretsiz" },
            ].map((o) => (
              <button key={o.t} type="button" onClick={() => setInsured(o.v)} className={cx("rounded-xl border p-4 text-left transition", insured === o.v ? "border-gold bg-gold/[0.06]" : "border-line hover:border-line-strong")}>
                <o.icon className={cx("size-5", insured === o.v ? "text-gold" : "text-muted")} />
                <p className="mt-2 font-semibold">{o.t}</p>
                <p className="text-small text-muted">{o.d}</p>
              </button>
            ))}
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <input className={field} placeholder="Ad soyad" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className={`${field} num`} inputMode="tel" placeholder="Telefon" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            {insured && (
              <>
                <input className={`${field} sm:col-span-2`} placeholder="İl / ilçe" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
                <textarea className={`${field} h-24 py-3 sm:col-span-2`} placeholder="Açık adres" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
              </>
            )}
          </div>
          <button type="button" onClick={() => setForm({ name: "Demo Kullanıcı", phone: "0532 000 00 00", city: "Kadıköy / İstanbul", address: "Caferağa Mah. Moda Cad. No: 1 D: 2" })} className="mt-3 text-small text-gold underline underline-offset-4">
            Örnek bilgilerle doldur
          </button>
        </Section>

        <Section n={2} title="Ödeme">
          <CardForm card={card} onChange={setCard} />
          <p className="mt-4 flex items-start gap-2 rounded-xl bg-bg p-3 text-small text-muted">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-gold" />
            Kuyum ürünlerinde yasal düzenleme gereği taksit uygulanamaz; ödeme tek çekim alınır. Kart bilgileriniz BDDK lisanslı ödeme kuruluşu tarafından işlenir, Aurex sunucularında saklanmaz.
          </p>
        </Section>
      </div>

      <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
        <div className={cx("flex items-center gap-3 rounded-card border p-4", expired ? "border-down/40 bg-down/10" : "border-gold/30 bg-gold/[0.06]")}>
          {expired ? <RefreshCw className="size-5 text-down" /> : <Clock className="size-5 text-gold" />}
          <div className="flex-1">
            <p className="font-semibold">{expired ? "Fiyat süresi doldu" : "Fiyatınız sabitlendi"}</p>
            <p className="text-small text-muted">{expired ? "Piyasa değişti, güncel fiyatla yeniden kilitleyin." : "Bu süre içinde piyasa değişse de ödeyeceğiniz tutar aynı kalır."}</p>
          </div>
          {expired ? (
            <Button size="sm" onClick={relock}>Yenile</Button>
          ) : (
            <span className="num text-h2 text-gold-hi">{remaining}<span className="text-small text-muted">sn</span></span>
          )}
        </div>
        {!expired && <div className="h-1 overflow-hidden rounded-full bg-surface-3"><div className="h-full bg-gold transition-[width] duration-300" style={{ width: `${(remaining / seconds) * 100}%` }} /></div>}

        <div className="rounded-card border border-line bg-surface p-5">
          <p className="mb-4 text-caption font-semibold uppercase text-ink-2">Sipariş özeti</p>
          <div className="space-y-3">
            {data.items.map((i) => (
              <div key={i.productId} className="flex items-center gap-3">
                <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-bg">
                  <Image src={i.product.image} alt="" fill sizes="48px" className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-small font-semibold">{i.product.name}</p>
                  <p className="num text-caption text-muted">{i.qty} × {fmtTL(i.unit)}</p>
                </div>
                <span className="num text-small">{fmtTL(i.total)}</span>
              </div>
            ))}
          </div>
          <div className="hairline my-4" />
          <div className="space-y-2 text-small">
            <div className="flex justify-between"><span className="text-muted">Ara toplam</span><span className="num">{fmtTL(data.subtotal)}</span></div>
            <div className="flex justify-between"><span className="text-muted">{insured ? "Sigortalı kargo" : "Mağazadan teslim"}</span><span className="num">{data.shipping ? fmtTL(data.shipping) : "Ücretsiz"}</span></div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="font-semibold">Toplam</span>
            <Price value={data.total} className="text-price text-gold-hi" />
          </div>
          <Button size="lg" className="mt-5 w-full" disabled={!canPay} onClick={() => setThreeDS(true)}>
            <Lock className="size-4" /> {fmtTL(data.total)} Öde
          </Button>
          {!canPay && !expired && <p className="mt-2 text-center text-caption text-muted">Teslimat ve kart bilgilerini doldurun</p>}
        </div>
      </aside>

      {/* Mobil: sabit alt ödeme çubuğu */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-1.5 text-caption text-muted">
              {expired ? <RefreshCw className="size-3 text-down" /> : <Clock className="size-3 text-gold" />}
              {expired ? "Fiyat süresi doldu" : <>Fiyat sabit · <span className="num text-gold-hi">{remaining} sn</span></>}
            </p>
            <Price value={data.total} className="text-h3 font-semibold" />
          </div>
          {expired ? <Button onClick={relock}>Yenile</Button> : <Button disabled={!canPay} onClick={() => setThreeDS(true)}><Lock className="size-4" /> Öde</Button>}
        </div>
      </div>
      <div className="h-16 lg:hidden" />

      {threeDS && <ThreeDSModal amount={data.total} cardLast4={card.number.slice(-4)} onCancel={() => setThreeDS(false)} onSuccess={onPaid} />}
    </div>
  );
}
