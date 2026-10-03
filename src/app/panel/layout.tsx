import type { Metadata } from "next";
import { PanelShell } from "@/components/panel/PanelShell";

export const metadata: Metadata = { title: { default: "Yönetim Paneli", template: "%s · Aurex Panel" } };

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return <PanelShell>{children}</PanelShell>;
}
