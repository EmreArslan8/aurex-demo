"use client";
import { findSerial, type SerialRecord } from "@/data/serials";
import { useOrders } from "@/store/orders-store";

/** Seri kaydı: önce kayıt defteri, sonra bu tarayıcıda verilen siparişler */
export function useSerialLookup(serial: string): SerialRecord | null {
  const orders = useOrders((s) => s.orders);
  const hit = findSerial(serial);
  if (hit) return hit;
  const s = serial.trim().toUpperCase();
  for (const o of orders) {
    for (const it of o.items) {
      if (it.serials.includes(s)) {
        return {
          serial: s,
          productId: it.productId,
          lot: `L${s.split("-").slice(1, 3).join("-")}`,
          certificateNo: `CRT-${s.replace(/\D/g, "").slice(-7)}`,
          producedAt: o.createdAt.slice(0, 10),
          assayer: "Dr. S. Yalın",
          status: "satildi",
          soldAt: o.createdAt.slice(0, 10),
          owner: o.customer,
          orderNo: o.no,
        };
      }
    }
  }
  return null;
}
