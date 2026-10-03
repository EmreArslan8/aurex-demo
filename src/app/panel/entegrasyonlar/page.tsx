import type { Metadata } from "next";
import { IntegrationsView } from "@/components/panel/IntegrationsView";

export const metadata: Metadata = { title: "Entegrasyonlar" };

export default function Page() {
  return <IntegrationsView />;
}
