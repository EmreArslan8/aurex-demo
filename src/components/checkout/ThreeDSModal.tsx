"use client";
import { useEffect, useState } from "react";
import { Lock, Loader2 } from "lucide-react";
import { fmtTL } from "@/lib/format";
import { Button } from "@/components/ui/Button";

const DEMO_CODE = "123456";

/** Banka 3D Secure doğrulama ekranı (demo) */
export function ThreeDSModal({ amount, cardLast4, onSuccess, onCancel }: { amount: number; cardLast4: string; onSuccess: () => void; onCancel: () => void }) {
  const [code, setCode] = useState("");
  const [err, setErr] = useState(false);
  const [busy, setBusy] = useState(false);
  const [left, setLeft] = useState(180);

  useEffect(() => {
    const t = setInterval(() => setLeft((l) => Math.max(0, l - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const submit = () => {
    if (code !== DEMO_CODE) return setErr(true);
    setBusy(true);
    setTimeout(onSuccess, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4 backdrop-blur">
      <div className="w-full max-w-sm overflow-hidden rounded-2xl bg-white text-[#1b1d24] shadow-2xl">
        <div className="flex items-center justify-between bg-[#0f2a4a] px-5 py-3.5 text-white">
          <span className="text-small font-bold">Aurex Bank</span>
          <span className="flex items-center gap-1.5 text-caption font-semibold uppercase"><Lock className="size-3" /> 3D Secure</span>
        </div>
        <div className="space-y-4 p-5">
          <p className="text-small text-[#4b5060]">Ödemenizi onaylamak için cep telefonunuza gönderilen tek kullanımlık şifreyi girin.</p>
          <dl className="grid grid-cols-2 gap-y-1.5 rounded-xl bg-[#f3f4f7] p-3 text-small">
            <dt className="text-[#6b7080]">İşyeri</dt><dd className="text-right font-semibold">AUREX KIYMETLİ MADEN</dd>
            <dt className="text-[#6b7080]">Tutar</dt><dd className="num text-right font-semibold">{fmtTL(amount)}</dd>
            <dt className="text-[#6b7080]">Kart</dt><dd className="num text-right">**** {cardLast4}</dd>
          </dl>
          <div>
            <input
              autoFocus
              inputMode="numeric"
              maxLength={6}
              value={code}
              onChange={(e) => { setErr(false); setCode(e.target.value.replace(/\D/g, "")); }}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              placeholder="● ● ● ● ● ●"
              className="num h-12 w-full rounded-xl border-2 border-[#d5d8e0] text-center text-h3 tracking-[0.4em] outline-none focus:border-[#0f2a4a]"
            />
            <div className="mt-1.5 flex justify-between text-caption">
              <span className={err ? "text-[#d33]" : "text-[#6b7080]"}>{err ? "Şifre hatalı" : `Demo şifre: ${DEMO_CODE}`}</span>
              <span className="num text-[#6b7080]">{Math.floor(left / 60)}:{String(left % 60).padStart(2, "0")}</span>
            </div>
          </div>
          <button onClick={submit} disabled={busy || code.length < 6} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0f2a4a] font-semibold text-white disabled:opacity-50">
            {busy ? <><Loader2 className="size-4 animate-spin" /> Onaylanıyor…</> : "Onayla"}
          </button>
          <Button variant="ghost" size="sm" onClick={onCancel} className="w-full text-[#6b7080] hover:bg-[#f3f4f7] hover:text-[#1b1d24]">İptal</Button>
        </div>
      </div>
    </div>
  );
}
