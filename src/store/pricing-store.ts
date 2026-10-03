"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_PRICING, type PricingConfig } from "@/lib/pricing/config";

interface PricingState {
  config: PricingConfig;
  update: (patch: Partial<PricingConfig>) => void;
  reset: () => void;
}

export const usePricing = create<PricingState>()(
  persist(
    (set) => ({
      config: DEFAULT_PRICING,
      update: (patch) => set((s) => ({ config: { ...s.config, ...patch } })),
      reset: () => set({ config: DEFAULT_PRICING }),
    }),
    { name: "aurex-pricing" },
  ),
);
