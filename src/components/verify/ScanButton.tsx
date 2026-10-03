"use client";
import { useEffect, useRef, useState } from "react";
import { ScanLine, X } from "lucide-react";
import { useMounted } from "@/store/persist";

type Detector = { detect: (src: HTMLVideoElement) => Promise<{ rawValue: string }[]> };
type DetectorCtor = new (o: { formats: string[] }) => Detector;

/** Kamerayla QR okuma — tarayıcının yerleşik BarcodeDetector'ı ile (Android Chrome, Safari 17+) */
export function ScanButton({ onResult }: { onResult: (serial: string) => void }) {
  const mounted = useMounted();
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const video = useRef<HTMLVideoElement>(null);
  const supported = mounted && "BarcodeDetector" in window && !!navigator.mediaDevices;

  useEffect(() => {
    if (!open) return;
    let stream: MediaStream | null = null;
    let stop = false;
    (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        if (!video.current) return;
        video.current.srcObject = stream;
        await video.current.play();
        const Ctor = (window as unknown as { BarcodeDetector: DetectorCtor }).BarcodeDetector;
        const det = new Ctor({ formats: ["qr_code"] });
        while (!stop) {
          const codes = await det.detect(video.current);
          const raw = codes[0]?.rawValue;
          if (raw) {
            const serial = raw.split("/dogrula/").pop() ?? raw;
            setOpen(false);
            onResult(decodeURIComponent(serial));
            break;
          }
          await new Promise((r) => setTimeout(r, 250));
        }
      } catch {
        setErr("Kameraya erişilemedi. Seri numarasını elle girebilirsiniz.");
      }
    })();
    return () => {
      stop = true;
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, [open, onResult]);

  if (!supported) return null;
  return (
    <>
      <button type="button" onClick={() => { setErr(null); setOpen(true); }} className="flex h-12 items-center justify-center gap-2 rounded-xl border border-line-strong px-4 text-small text-ink transition hover:border-gold hover:text-gold-hi">
        <ScanLine className="size-4" /> QR Okut
      </button>
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4 backdrop-blur">
          <div className="relative w-full max-w-sm overflow-hidden rounded-[1.5rem] border border-line bg-surface">
            <button onClick={() => setOpen(false)} className="absolute top-3 right-3 z-10 grid size-9 place-items-center rounded-lg bg-black/50" aria-label="Kapat"><X className="size-4" /></button>
            <video ref={video} playsInline muted className="aspect-square w-full object-cover" />
            <div className="pointer-events-none absolute inset-10 rounded-2xl border-2 border-gold/80" />
            <p className="p-4 text-center text-small text-ink-2">{err ?? "QR kodu çerçevenin içine getirin"}</p>
          </div>
        </div>
      )}
    </>
  );
}
