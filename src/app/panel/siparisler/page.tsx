import type { Metadata } from "next";
import { OrdersView } from "@/components/panel/OrdersView";

export const metadata: Metadata = { title: "Siparişler" };

export default function Page() {
  return <OrdersView />;
}
