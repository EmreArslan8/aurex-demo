import type { Metadata } from "next";
import { PricingView } from "@/components/panel/PricingView";

export const metadata: Metadata = { title: "Fiyat Kuralları" };

export default function Page() {
  return <PricingView />;
}
