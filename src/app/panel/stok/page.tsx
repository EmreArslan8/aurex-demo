import type { Metadata } from "next";
import { StockView } from "@/components/panel/StockView";

export const metadata: Metadata = { title: "Stok" };

export default function Page() {
  return <StockView />;
}
