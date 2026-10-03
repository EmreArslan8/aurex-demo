"use client";
import { getProductById } from "@/data/products";
import { useOrders, type Order } from "@/store/orders-store";

interface Line { productId: string; qty: number; unit: number }

const mask = (name: string) =>
  name.trim().split(/\s+/).map((w) => w[0]?.toLocaleUpperCase("tr-TR") + "***").join(" ") || "M*** ***";

/** Siparişi oluşturur, her adede benzersiz seri numarası atar, kaydeder. */
export function createOrder(lines: Line[], customer: string, shipping: number, shippingMethod: string): Order {
  const { takeSeq, add } = useOrders.getState();
  const units = lines.reduce((a, l) => a + l.qty, 0);
  let seq = takeSeq(units);
  const items = lines.map((l) => {
    const p = getProductById(l.productId)!;
    const lot = p.lot.replace("L", "");
    const serials = Array.from({ length: l.qty }, () => `AX-${lot}-${String(seq++).padStart(5, "0")}`);
    return { productId: l.productId, qty: l.qty, unitPrice: l.unit, serials };
  });
  const subtotal = items.reduce((a, i) => a + i.unitPrice * i.qty, 0);
  const order: Order = {
    no: `AX${Date.now().toString().slice(-8)}`,
    createdAt: new Date().toISOString(),
    customer: mask(customer),
    items,
    subtotal,
    shipping,
    total: subtotal + shipping,
    shippingMethod,
    eInvoice: "kuyrukta",
  };
  add(order);
  return order;
}
