"use client";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { DEMO_SERIALS } from "@/data/serials";
import { Button } from "@/components/ui/Button";
import { ScanButton } from "./ScanButton";

export function VerifyForm({ initial = "" }: { initial?: string }) {
  const router = useRouter();
  const [value, setValue] = useState(initial);
  const go = useCallback((s: string) => s.trim() && router.push(`/dogrula/${encodeURIComponent(s.trim().toUpperCase())}`), [router]);

  return (
    <div className="space-y-3">
      <form onSubmit={(e) => { e.preventDefault(); go(value); }} className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted" />
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Seri numarası, örn. AX-2609-15-00123"
            className="code h-12 w-full rounded-xl border border-line bg-surface pr-4 pl-11 uppercase outline-none placeholder:normal-case placeholder:text-muted focus:border-gold"
          />
        </div>
        <Button type="submit" size="lg">Sorgula</Button>
        <ScanButton onResult={go} />
      </form>
      <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-small text-muted">
        Örnek:
        {[DEMO_SERIALS.valid, DEMO_SERIALS.flagged, DEMO_SERIALS.fake].map((s) => (
          <button key={s} type="button" onClick={() => go(s)} className="code text-ink-2 underline decoration-line-strong underline-offset-4 hover:text-gold-hi">
            {s}
          </button>
        ))}
      </p>
    </div>
  );
}
