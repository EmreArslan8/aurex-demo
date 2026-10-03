"use client";
import { useSyncExternalStore } from "react";

const noop = () => () => {};

/** localStorage'dan gelen durum sadece istemcide hazır — SSR uyumsuzluğunu önler. */
export function useMounted() {
  return useSyncExternalStore(noop, () => true, () => false);
}

/** Tarayıcı adresi (sunucuda varsayılan) */
export function useOrigin(fallback: string) {
  return useSyncExternalStore(noop, () => window.location.origin, () => fallback);
}
