"use client";
import { useEffect, useRef } from "react";
import { AreaSeries, ColorType, createChart, type IChartApi, type ISeriesApi, type UTCTimestamp } from "lightweight-charts";
import type { Point } from "@/lib/history";

interface Props {
  data: Point[];
  /** Canlı fiyat: son noktayı günceller */
  live?: number | null;
  height?: number;
  color?: string;
  compact?: boolean;
}

/** TradingView Lightweight Charts sarmalayıcısı — tüm grafikler buradan. */
export function AreaChart({ data, live, height = 320, color = "#d9b45a", compact }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const chart = useRef<IChartApi | null>(null);
  const series = useRef<ISeriesApi<"Area"> | null>(null);
  const lastTime = useRef<number>(0);

  useEffect(() => {
    if (!box.current) return;
    const c = createChart(box.current, {
      height,
      autoSize: true,
      layout: { background: { type: ColorType.Solid, color: "transparent" }, textColor: "#8d897f", fontFamily: "var(--font-num)", fontSize: 11, attributionLogo: false },
      grid: { vertLines: { visible: false }, horzLines: { color: "rgba(255,255,255,0.04)" } },
      rightPriceScale: { borderVisible: false, visible: !compact },
      timeScale: { borderVisible: false, visible: !compact, timeVisible: true },
      crosshair: { vertLine: { color: "#34343e", labelBackgroundColor: "#202027" }, horzLine: { color: "#34343e", labelBackgroundColor: "#202027" } },
      handleScroll: !compact,
      handleScale: !compact,
      localization: { locale: "tr-TR", priceFormatter: (p: number) => p.toLocaleString("tr-TR", { maximumFractionDigits: 2 }) },
    });
    series.current = c.addSeries(AreaSeries, {
      lineColor: color,
      lineWidth: 2,
      topColor: color + "55",
      bottomColor: color + "00",
      priceLineVisible: !compact,
      lastValueVisible: !compact,
      crosshairMarkerRadius: 4,
    });
    chart.current = c;
    return () => {
      c.remove();
      chart.current = null;
      series.current = null;
    };
  }, [height, color, compact]);

  useEffect(() => {
    if (!series.current || data.length === 0) return;
    series.current.setData(data.map((p) => ({ time: p.time as UTCTimestamp, value: p.value })));
    lastTime.current = data[data.length - 1].time;
    chart.current?.timeScale().fitContent();
  }, [data, color, compact]);

  useEffect(() => {
    if (!series.current || live == null || !lastTime.current) return;
    series.current.update({ time: lastTime.current as UTCTimestamp, value: live });
  }, [live]);

  return <div ref={box} style={{ height }} className="w-full" />;
}
