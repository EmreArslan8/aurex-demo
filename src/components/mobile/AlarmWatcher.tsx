"use client";
import { useEffect } from "react";
import { QUOTE_META } from "@/lib/rates/catalog";
import { fmtNum } from "@/lib/format";
import { useAlarms } from "@/store/alarm-store";
import { useRates } from "@/store/rates-store";

export interface PushMsg { id: string; title: string; body: string }

/** Her fiyat tikinde alarmları kontrol eder; tetiklenince uygulama içi push + (izin varsa) gerçek bildirim. */
export function AlarmWatcher({ onPush }: { onPush: (m: PushMsg) => void }) {
  useEffect(() => {
    return useRates.subscribe((s) => {
      if (!s.quotes) return;
      const { alarms, fire } = useAlarms.getState();
      for (const a of alarms) {
        if (a.firedAt) continue;
        const price = s.quotes[a.key].sell;
        const hit = a.dir === "above" ? price >= a.target : price <= a.target;
        if (!hit) continue;
        fire(a.id);
        const msg = {
          id: a.id,
          title: `${QUOTE_META[a.key].label} ${a.dir === "above" ? "hedefin üstünde" : "hedefin altında"}`,
          body: `Güncel fiyat ${fmtNum(price)} ₺ · hedefiniz ${fmtNum(a.target)} ₺`,
        };
        onPush(msg);
        navigator.vibrate?.(200);
        if (typeof Notification !== "undefined" && Notification.permission === "granted") {
          new Notification(`Aurex · ${msg.title}`, { body: msg.body });
        }
      }
    });
  }, [onPush]);
  return null;
}
