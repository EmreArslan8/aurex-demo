import type { Metadata } from "next";
import { SerialsView } from "@/components/panel/SerialsView";

export const metadata: Metadata = { title: "Seri / Lot" };

export default function Page() {
  return <SerialsView />;
}
