import type { Metadata } from "next";
import { Lock } from "lucide-react";
import { CheckoutView } from "@/components/checkout/CheckoutView";

export const metadata: Metadata = { title: "Güvenli Ödeme" };

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <h1 className="font-display text-h1">Güvenli ödeme</h1>
        <p className="flex items-center gap-2 text-small text-muted"><Lock className="size-4 text-gold" /> 256-bit SSL · 3D Secure</p>
      </div>
      <CheckoutView />
    </div>
  );
}
