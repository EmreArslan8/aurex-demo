"use client";
import { useCallback, useEffect, useState } from "react";
import { useCartSummary } from "@/store/hooks";
import { usePricing } from "@/store/pricing-store";
import { shippingCost } from "@/lib/pricing/engine";

type Summary = ReturnType<typeof useCartSummary>;

/** Ödeme adımında sepet fiyatını belirli süre sabitler; süre dolunca yeniden kilitlenir. */
export function usePriceLock(insured: boolean) {
  const live = useCartSummary(insured);
  const cfg = usePricing((s) => s.config);
  const seconds = cfg.priceLockSeconds;
  const [locked, setLocked] = useState<{ at: number; data: Summary } | null>(null);
  const [now, setNow] = useState(() => Date.now());

  const relock = useCallback(() => setLocked({ at: Date.now(), data: live }), [live]);

  // İlk hazır fiyatla kilitle
  if (!locked && live.ready && live.items.length > 0) setLocked({ at: now, data: live });

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(t);
  }, []);

  const remaining = locked ? Math.max(0, seconds - Math.floor((now - locked.at) / 1000)) : seconds;
  // Kargo tercihi değişince kalemler aynı, sadece kargo/total güncellenir
  const shipping = locked ? shippingCost(locked.data.subtotal, cfg, insured) : live.shipping;
  const data = locked ? { ...locked.data, shipping, total: locked.data.subtotal + shipping } : live;
  return { data, remaining, expired: !!locked && remaining === 0, seconds, relock, live };
}
