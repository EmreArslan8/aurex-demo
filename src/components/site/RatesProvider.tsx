"use client";
import { useEffect } from "react";
import type { RatesSnapshot } from "@/lib/rates/types";
import { useRates } from "@/store/rates-store";

const POLL_MS = 20_000;
const TICK_MS = 1_000;

/** Canlı kur akışı: sunucudan ilk veri + 20 sn'de bir yenileme + saniyelik tik. */
export function RatesProvider({ initial }: { initial: RatesSnapshot }) {
  useEffect(() => {
    const { setSnapshot, tick, fail } = useRates.getState();
    if (!useRates.getState().snapshot) setSnapshot(initial);

    const poll = async () => {
      try {
        const res = await fetch("/api/rates", { cache: "no-store" });
        if (!res.ok) throw new Error();
        setSnapshot((await res.json()) as RatesSnapshot);
      } catch {
        fail();
      }
    };
    const p = setInterval(poll, POLL_MS);
    const t = setInterval(tick, TICK_MS);
    return () => {
      clearInterval(p);
      clearInterval(t);
    };
  }, [initial]);
  return null;
}
