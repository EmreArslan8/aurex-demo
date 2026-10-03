import type { Metadata } from "next";
import { MarketsView } from "@/components/market/MarketsView";
import { Eyebrow } from "@/components/ui/Badge";

export const metadata: Metadata = { title: "Canlı Piyasalar" };

export default function MarketsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-12">
      <Eyebrow>Canlı piyasalar</Eyebrow>
      <h1 className="mt-2 mb-2 font-display text-h1">Altın, gümüş ve döviz</h1>
      <p className="mb-8 max-w-xl text-ink-2">Fiyatlar anlık güncellenir. Grafiği değiştirmek için listeden bir varlık seçin.</p>
      <MarketsView />
    </div>
  );
}
