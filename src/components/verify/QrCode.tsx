"use client";
import { QRCodeSVG } from "qrcode.react";
import { useOrigin } from "@/store/persist";

const DEFAULT_ORIGIN = "https://aurex-demo-delta.vercel.app";

/** Sertifika QR kodu — /dogrula/{seri} adresine yönlendirir (bulunduğu ortamın adresiyle). */
export function QrCode({ serial, size = 120 }: { serial: string; size?: number }) {
  const origin = useOrigin(DEFAULT_ORIGIN);
  return (
    <div className="inline-block rounded-xl bg-white p-2.5">
      <QRCodeSVG value={`${origin}/dogrula/${serial}`} size={size} bgColor="#ffffff" fgColor="#0a0a0c" level="M" />
    </div>
  );
}
