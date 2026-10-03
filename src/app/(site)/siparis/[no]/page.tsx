import type { Metadata } from "next";
import { OrderSuccess } from "@/components/checkout/OrderSuccess";

export const metadata: Metadata = { title: "Sipariş Onayı", robots: { index: false } };

export default async function OrderPage({ params }: PageProps<"/siparis/[no]">) {
  const { no } = await params;
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:px-6">
      <OrderSuccess no={no} />
    </div>
  );
}
