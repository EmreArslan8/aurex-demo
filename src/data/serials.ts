import { PRODUCTS, type Product } from "./products";
import { seeded } from "@/lib/random";

export type SerialStatus = "stokta" | "satildi" | "bildirimli";

export interface SerialRecord {
  serial: string;
  productId: string;
  lot: string;
  certificateNo: string;
  producedAt: string;
  assayer: string;
  status: SerialStatus;
  soldAt?: string;
  owner?: string;
  orderNo?: string;
}

const ASSAYERS = ["Dr. S. Yalın", "M. Karaca", "E. Duru", "A. Önal"];
const OWNERS = ["E*** A***", "M*** K***", "Z*** Ş***", "B*** T***", "C*** Y***", "H*** D***"];

export function makeSerial(p: Product, seq: number) {
  return `AX-${p.lot.replace("L", "")}-${String(seq).padStart(5, "0")}`;
}

function generate(): SerialRecord[] {
  const rnd = seeded(2609);
  const out: SerialRecord[] = [];
  PRODUCTS.forEach((p, pi) => {
    for (let i = 0; i < 8; i++) {
      const seq = 100 + pi * 37 + i * 3;
      const day = 1 + Math.floor(rnd() * 25);
      const roll = rnd();
      const status: SerialStatus = roll < 0.55 ? "satildi" : roll < 0.95 ? "stokta" : "bildirimli";
      const sold = status !== "stokta";
      out.push({
        serial: makeSerial(p, seq),
        productId: p.id,
        lot: p.lot,
        certificateNo: `CRT-26${String(9000 + pi * 40 + i).padStart(5, "0")}`,
        producedAt: `2026-09-${String(day).padStart(2, "0")}`,
        assayer: ASSAYERS[Math.floor(rnd() * ASSAYERS.length)],
        status,
        soldAt: sold ? `2026-09-${String(Math.min(30, day + 2 + Math.floor(rnd() * 5))).padStart(2, "0")}` : undefined,
        owner: sold ? OWNERS[Math.floor(rnd() * OWNERS.length)] : undefined,
        orderNo: sold ? `AX${260900 + pi * 13 + i}` : undefined,
      });
    }
  });
  // Demoda en az bir "kayıp/çalıntı bildirimli" kayıt olsun
  const flagged = out.find((r) => r.productId === "p06" && r.status === "satildi") ?? out[45];
  flagged.status = "bildirimli";
  return out;
}

export const SERIALS: SerialRecord[] = generate();

/** Doğrulama sayfasında "hemen dene" için örnekler */
export const DEMO_SERIALS = {
  valid: SERIALS.find((s) => s.status === "satildi" && s.productId === "p04")!.serial,
  stock: SERIALS.find((s) => s.status === "stokta" && s.productId === "p08")!.serial,
  flagged: SERIALS.find((s) => s.status === "bildirimli")!.serial,
  fake: "AX-2609-15-99999",
};

export const findSerial = (serial: string) =>
  SERIALS.find((s) => s.serial.toUpperCase() === serial.trim().toUpperCase());
