"use client";
import { useSyncExternalStore } from "react";
import type { ReactNode } from "react";

const clockSub = (cb: () => void) => {
  const t = setInterval(cb, 10_000);
  return () => clearInterval(t);
};
const clockNow = () => new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });

const mqSub = (cb: () => void) => {
  const m = window.matchMedia("(min-width: 1024px)");
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};

function StatusBar() {
  const time = useSyncExternalStore(clockSub, clockNow, () => "");
  return (
    <div className="flex h-11 shrink-0 items-center justify-between px-7 text-small font-semibold">
      <span className="num">{time}</span>
      <span className="absolute left-1/2 top-2.5 h-7 w-28 -translate-x-1/2 rounded-full bg-black" />
      <span className="flex items-center gap-1.5">
        <span className="flex items-end gap-0.5">{[3, 5, 7, 9].map((h) => <span key={h} className="w-0.5 rounded-sm bg-ink" style={{ height: h }} />)}</span>
        <span className="relative h-3 w-6 rounded-[3px] border border-ink/70"><span className="absolute inset-0.5 right-1.5 rounded-[1px] bg-ink" /></span>
      </span>
    </div>
  );
}

/** Masaüstünde telefon çerçevesi; küçük ekranda çerçevesiz tam ekran. */
export function PhoneFrame({ children }: { children: ReactNode }) {
  const desktop = useSyncExternalStore(mqSub, () => window.matchMedia("(min-width: 1024px)").matches, () => null);
  if (desktop === null) return <div className="h-[812px] animate-pulse rounded-[3rem] bg-surface lg:mx-auto lg:w-[384px]" />;
  if (!desktop) return <div className="-mx-4 h-[calc(100dvh-100px)] overflow-hidden border-b border-line">{children}</div>;
  return (
    <>
      <div>
        <div className="relative mx-auto h-[812px] w-[384px] rounded-[3.2rem] bg-gradient-to-b from-[#3a3a42] to-[#1a1a1f] p-[11px] shadow-[0_40px_120px_-30px_rgba(217,180,90,0.35)]">
          <div className="relative flex h-full flex-col overflow-hidden rounded-[2.6rem] bg-bg">
            <StatusBar />
            <div className="min-h-0 flex-1">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
