import Image from "next/image";
import type { Metadata } from "next";
import { QrCode, ScanLine, ShieldCheck } from "lucide-react";
import { VerifyForm } from "@/components/verify/VerifyForm";
import { Eyebrow } from "@/components/ui/Badge";

export const metadata: Metadata = { title: "Sertifika Doğrula" };

const STEPS = [
  { icon: QrCode, t: "QR kodu bulun", d: "Sertifika kartının arkasındaki ya da ambalajdaki QR kod." },
  { icon: ScanLine, t: "Okutun veya yazın", d: "Telefon kamerasıyla okutun ya da seri numarasını girin." },
  { icon: ShieldCheck, t: "Sonucu görün", d: "Ürün bilgisi, üretim kaydı ve sertifika anında görünür." },
];

export default function VerifyPage() {
  return (
    <div className="relative">
      <Image src="/stock/bars-stack.webp" alt="" fill sizes="100vw" className="object-cover opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bg" />
      <div className="relative mx-auto max-w-3xl px-4 py-14 md:py-20">
        <Eyebrow>Orijinallik sorgulama</Eyebrow>
        <h1 className="mt-2 font-display text-h1">Sertifika doğrula</h1>
        <p className="mt-3 mb-8 text-ink-2">Aurex ürünlerinin her biri benzersiz bir seri numarası taşır. Ürününüzün orijinalliğini saniyeler içinde kontrol edin.</p>
        <VerifyForm />
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.t} className="rounded-card border border-line bg-surface/80 p-5 backdrop-blur">
              <s.icon className="size-5 text-gold" />
              <p className="mt-3 font-semibold">{s.t}</p>
              <p className="mt-1 text-small text-muted">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
