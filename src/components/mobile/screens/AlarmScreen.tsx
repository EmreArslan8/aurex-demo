"use client";
import { useState } from "react";
import { BellRing, Trash2 } from "lucide-react";
import type { QuoteKey } from "@/lib/rates/types";
import { QUOTE_META } from "@/lib/rates/catalog";
import { useAlarms } from "@/store/alarm-store";
import { useRates } from "@/store/rates-store";
import { fmtNum, fmtTime } from "@/lib/format";
import { cx } from "@/lib/format";

const KEYS: QuoteKey[] = ["GRA", "HAS", "CEYREK", "CUMHURIYET", "GUMUS", "USD"];

export function AlarmScreen({ initialKey = "GRA" }: { initialKey?: QuoteKey }) {
  const [key, setKey] = useState<QuoteKey>(KEYS.includes(initialKey) ? initialKey : "GRA");
  const [dir, setDir] = useState<"above" | "below">("above");
  const [target, setTarget] = useState("");
  const q = useRates((s) => s.quotes?.[key]);
  const { alarms, add, remove } = useAlarms();
  const [perm, setPerm] = useState(() => (typeof Notification !== "undefined" ? Notification.permission : "denied"));

  const quick = (pct: number) => q && setTarget((q.sell * (1 + pct / 100)).toFixed(2));
  const submit = () => {
    const t = Number(target.replace(",", "."));
    if (!t) return;
    add({ key, dir, target: t });
    setTarget("");
  };

  return (
    <div className="px-4 pt-2 pb-4">
      <p className="text-h3">Fiyat alarmı</p>
      <p className="text-small text-muted">Hedef fiyata gelince anında bildirim alın.</p>

      <div className="mt-4 space-y-3 rounded-2xl bg-surface-2 p-4">
        <select value={key} onChange={(e) => { setKey(e.target.value as QuoteKey); setTarget(""); }} className="h-11 w-full rounded-xl border border-line bg-bg px-3 text-small outline-none">
          {KEYS.map((k) => <option key={k} value={k}>{QUOTE_META[k].label}</option>)}
        </select>
        <div className="grid grid-cols-2 gap-1 rounded-xl bg-bg p-1">
          {(["above", "below"] as const).map((d) => (
            <button key={d} onClick={() => setDir(d)} className={cx("rounded-lg py-2 text-small", dir === d ? "bg-surface-3 text-gold-hi" : "text-muted")}>
              {d === "above" ? "Üstüne çıkınca" : "Altına inince"}
            </button>
          ))}
        </div>
        <input value={target} onChange={(e) => setTarget(e.target.value)} inputMode="decimal" placeholder={q ? `Şu an ${fmtNum(q.sell)}` : "Hedef fiyat"} className="num h-11 w-full rounded-xl border border-line bg-bg px-3 outline-none focus:border-gold" />
        <div className="flex gap-1.5">
          {(dir === "above" ? [0.02, 0.5, 1] : [-0.02, -0.5, -1]).map((p) => (
            <button key={p} onClick={() => quick(p)} className="num flex-1 rounded-lg border border-line py-1.5 text-caption text-ink-2">{p > 0 ? "+" : ""}%{fmtNum(p)}</button>
          ))}
        </div>
        <button onClick={submit} className="h-11 w-full rounded-xl bg-gold font-semibold text-bg">Alarm kur</button>
      </div>

      {perm !== "granted" && typeof Notification !== "undefined" && (
        <button onClick={() => Notification.requestPermission().then(setPerm)} className="mt-3 w-full rounded-xl border border-dashed border-line-strong py-2.5 text-small text-ink-2">
          Telefon bildirimlerine izin ver
        </button>
      )}

      <p className="mt-5 mb-2 text-caption uppercase text-muted">Alarmlarım</p>
      {alarms.length === 0 && <p className="text-small text-muted">Henüz alarm yok. %0,02 ile hızlıca deneyebilirsiniz.</p>}
      <div className="space-y-2">
        {alarms.map((a) => (
          <div key={a.id} className={cx("flex items-center gap-3 rounded-xl p-3", a.firedAt ? "bg-up/10 ring-1 ring-up/30" : "bg-surface-2")}>
            <BellRing className={cx("size-4", a.firedAt ? "text-up" : "text-gold")} />
            <div className="min-w-0 flex-1">
              <p className="text-small font-semibold">{QUOTE_META[a.key].label}</p>
              <p className="num text-caption text-muted">{a.dir === "above" ? "≥" : "≤"} {fmtNum(a.target)} {a.firedAt ? `· ${fmtTime(new Date(a.firedAt))} tetiklendi` : "· bekliyor"}</p>
            </div>
            <button onClick={() => remove(a.id)} className="text-muted" aria-label="Sil"><Trash2 className="size-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}
