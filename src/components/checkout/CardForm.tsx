"use client";
import { CreditCard } from "lucide-react";

export interface CardState {
  number: string;
  name: string;
  exp: string;
  cvc: string;
}

const fmtCard = (v: string) => v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
const fmtExp = (v: string) => v.replace(/\D/g, "").slice(0, 4).replace(/(\d{2})(?=\d)/, "$1/");

export const cardValid = (c: CardState) =>
  c.number.replace(/\s/g, "").length === 16 && c.name.trim().length > 3 && /^\d{2}\/\d{2}$/.test(c.exp) && c.cvc.length >= 3;

const input = "h-12 w-full rounded-xl border border-line bg-bg px-4 outline-none placeholder:text-muted focus:border-gold";

export function CardForm({ card, onChange }: { card: CardState; onChange: (c: CardState) => void }) {
  const set = (k: keyof CardState, v: string) => onChange({ ...card, [k]: v });
  return (
    <div className="space-y-3">
      <div className="relative">
        <input className={`${input} num pr-12`} inputMode="numeric" placeholder="Kart numarası" value={card.number} onChange={(e) => set("number", fmtCard(e.target.value))} />
        <CreditCard className="absolute top-1/2 right-4 size-5 -translate-y-1/2 text-muted" />
      </div>
      <input className={input} placeholder="Kart üzerindeki isim" value={card.name} onChange={(e) => set("name", e.target.value.toUpperCase())} />
      <div className="grid grid-cols-2 gap-3">
        <input className={`${input} num`} inputMode="numeric" placeholder="AA/YY" value={card.exp} onChange={(e) => set("exp", fmtExp(e.target.value))} />
        <input className={`${input} num`} inputMode="numeric" placeholder="CVC" maxLength={4} value={card.cvc} onChange={(e) => set("cvc", e.target.value.replace(/\D/g, ""))} />
      </div>
      <button type="button" onClick={() => onChange({ number: "4355 0843 5508 4358", name: "DEMO KULLANICI", exp: "12/28", cvc: "000" })} className="text-small text-gold underline underline-offset-4">
        Test kartıyla doldur
      </button>
    </div>
  );
}
