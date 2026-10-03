import type { Order } from "@/store/orders-store";
import type { SerialStatus } from "@/data/serials";

type Tone = "up" | "down" | "gold" | "info" | "muted";

export const EINVOICE: Record<Order["eInvoice"], { label: string; tone: Tone }> = {
  kuyrukta: { label: "Kuyrukta", tone: "gold" },
  "gib-iletildi": { label: "GİB'e iletildi", tone: "info" },
  onaylandi: { label: "Onaylandı", tone: "up" },
};

export const SERIAL_STATUS: Record<SerialStatus, { label: string; tone: Tone }> = {
  stokta: { label: "Stokta", tone: "muted" },
  satildi: { label: "Satıldı", tone: "up" },
  bildirimli: { label: "Kayıp/çalıntı", tone: "down" },
};
