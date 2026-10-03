"use client";
import { QUOTE_KEYS } from "@/lib/rates/catalog";
import { useRates } from "@/store/rates-store";
import { Change, LiveDot, Price } from "@/components/ui/Price";
import { fmtTime } from "@/lib/format";

/** Sayfanın en üstünde kayan canlı piyasa bandı */
export function TickerBar() {
  const quotes = useRates((s) => s.quotes);
  const status = useRates((s) => s.status);
  const tickAt = useRates((s) => s.tickAt);
  const items = QUOTE_KEYS.map((k) => quotes?.[k]).filter(Boolean);

  return (
    <div className="relative flex h-9 items-center overflow-hidden border-b border-line bg-surface text-small">
      <div className="z-10 flex h-full shrink-0 items-center gap-2 border-r border-line bg-surface px-4">
        <LiveDot className={status === "error" ? "bg-down" : undefined} />
        <span className="text-caption font-semibold uppercase text-ink-2">{status === "error" ? "Yedek veri" : "Canlı"}</span>
        <span className="num hidden text-caption text-muted sm:inline">{tickAt ? fmtTime(new Date(tickAt)) : "--:--:--"}</span>
      </div>
      <div className="no-scrollbar flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_4%,#000_96%,transparent)]">
        <div className="flex w-max animate-[marquee_60s_linear_infinite] hover:[animation-play-state:paused]">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex gap-8 pr-8 pl-6" aria-hidden={dup === 1}>
              {items.length === 0
                ? Array.from({ length: 8 }).map((_, i) => <span key={i} className="h-3 w-32 animate-pulse rounded bg-surface-3" />)
                : items.map((q) => (
                    <span key={q!.key} className="flex items-center gap-2 whitespace-nowrap">
                      <span className="text-muted">{q!.short}</span>
                      <Price value={q!.sell} plain className="text-ink" />
                      <Change value={q!.change} className="text-caption" />
                    </span>
                  ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
