"use client";
import { useEffect, useRef, useState } from "react";
import { cx, fmtNum, fmtTL } from "@/lib/format";

/** Değiştiğinde yeşil/kırmızı yanıp sönen fiyat. */
export function Price({ value, className, plain }: { value: number | null | undefined; className?: string; plain?: boolean }) {
  const prev = useRef<number | null>(null);
  const [flash, setFlash] = useState<"up" | "down" | null>(null);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (value == null) return;
    const p = prev.current;
    prev.current = value;
    if (p == null || Math.abs(value - p) < 0.005) return;
    setFlash(value > p ? "up" : "down");
    setKey((k) => k + 1);
  }, [value]);

  if (value == null) return <span className={cx("inline-block h-[1em] w-24 animate-pulse rounded bg-surface-3 align-middle", className)} />;
  return (
    <span
      key={key}
      className={cx("num -mx-1 rounded px-1", flash === "up" && "animate-flash-up", flash === "down" && "animate-flash-down", className)}
    >
      {plain ? fmtNum(value) : fmtTL(value)}
    </span>
  );
}

export function Change({ value, className }: { value: number | null | undefined; className?: string }) {
  if (value == null) return null;
  const up = value >= 0;
  return (
    <span className={cx("num text-small whitespace-nowrap", up ? "text-up" : "text-down", className)}>
      {up ? "▲" : "▼"} %{Math.abs(value).toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
    </span>
  );
}

export function LiveDot({ className }: { className?: string }) {
  return <span className={cx("inline-block size-1.5 animate-pulse-dot rounded-full bg-up", className)} />;
}
