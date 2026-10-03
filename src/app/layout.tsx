import type { Metadata } from "next";
import { Fraunces, Manrope, JetBrains_Mono } from "next/font/google";
import { RatesProvider } from "@/components/site/RatesProvider";
import { getRates } from "@/lib/rates/source";
import "./globals.css";

const body = Manrope({ variable: "--font-body", subsets: ["latin", "latin-ext"] });
const serif = Fraunces({ variable: "--font-serif", subsets: ["latin", "latin-ext"], style: ["normal", "italic"], axes: ["opsz", "SOFT"] });
const mono = JetBrains_Mono({ variable: "--font-num", subsets: ["latin", "latin-ext"] });

export const metadata: Metadata = {
  title: { default: "Aurex — Canlı Fiyatlı Külçe & Ziynet Altın", template: "%s · Aurex" },
  description: "Canlı kura bağlı fiyatlandırma, QR sertifika doğrulama, sigortalı kargo. Web + mobil + ERP demo.",
  robots: { index: false, follow: false },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const rates = await getRates();
  return (
    <html lang="tr" className={`${body.variable} ${serif.variable} ${mono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <RatesProvider initial={rates} />
        {children}
      </body>
    </html>
  );
}
