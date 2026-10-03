"use client";
import { useCallback, useEffect, useState } from "react";
import { Bell, CandlestickChart, Home, Wallet } from "lucide-react";
import type { QuoteKey } from "@/lib/rates/types";
import { useMounted } from "@/store/persist";
import { cx } from "@/lib/format";
import { MarketScreen } from "./screens/MarketScreen";
import { ChartScreen } from "./screens/ChartScreen";
import { PortfolioScreen } from "./screens/PortfolioScreen";
import { AlarmScreen } from "./screens/AlarmScreen";
import { AlarmWatcher, type PushMsg } from "./AlarmWatcher";
import { PushBanner } from "./PushBanner";

type Tab = "piyasa" | "grafik" | "portfoy" | "alarm";

const TABS: { id: Tab; label: string; icon: typeof Home }[] = [
  { id: "piyasa", label: "Piyasa", icon: Home },
  { id: "grafik", label: "Grafik", icon: CandlestickChart },
  { id: "portfoy", label: "Portföyüm", icon: Wallet },
  { id: "alarm", label: "Alarmlar", icon: Bell },
];

/** Uygulamanın kendisi — çerçeveden bağımsız; gerçek telefonda tam ekran açılır. */
export function MobileApp() {
  const mounted = useMounted();
  const [tab, setTab] = useState<Tab>("piyasa");
  const [key, setKey] = useState<QuoteKey>("HAS");
  const [push, setPush] = useState<PushMsg | null>(null);
  const onPush = useCallback((m: PushMsg) => setPush(m), []);

  useEffect(() => {
    if (!push) return;
    const t = setTimeout(() => setPush(null), 6000);
    return () => clearTimeout(t);
  }, [push]);

  if (!mounted) return <div className="h-full animate-pulse bg-surface" />;

  return (
    <div className="relative flex h-full flex-col bg-bg">
      <AlarmWatcher onPush={onPush} />
      <PushBanner msg={push} onClose={() => { setPush(null); setTab("alarm"); }} />
      <div className="no-scrollbar flex-1 overflow-y-auto">
        {tab === "piyasa" && <MarketScreen onOpen={(k) => { setKey(k); setTab("grafik"); }} />}
        {tab === "grafik" && <ChartScreen k={key} onPick={setKey} onAlarm={() => setTab("alarm")} />}
        {tab === "portfoy" && <PortfolioScreen />}
        {tab === "alarm" && <AlarmScreen initialKey={key} />}
      </div>
      <nav className="grid grid-cols-4 border-t border-line bg-surface/95 pb-[max(env(safe-area-inset-bottom),0.5rem)] backdrop-blur">
        {TABS.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} className={cx("flex flex-col items-center gap-1 pt-2.5 text-caption", tab === t.id ? "text-gold-hi" : "text-muted")}>
            <t.icon className="size-5" />
            {t.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
