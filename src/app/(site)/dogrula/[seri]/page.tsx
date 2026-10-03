import type { Metadata } from "next";
import { Certificate } from "@/components/verify/Certificate";
import { VerifyForm } from "@/components/verify/VerifyForm";

export const metadata: Metadata = { title: "Sertifika Sonucu" };

export default async function VerifyResultPage({ params }: PageProps<"/dogrula/[seri]">) {
  const serial = decodeURIComponent((await params).seri).toUpperCase();
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:py-14">
      <p className="text-caption uppercase text-gold">Sorgulanan seri</p>
      <h1 className="code mt-1 mb-6 text-h2 break-all">{serial}</h1>
      <Certificate serial={serial} />
      <div className="mt-10 border-t border-line pt-8">
        <p className="mb-3 text-small text-muted">Başka bir ürün sorgula</p>
        <VerifyForm />
      </div>
    </div>
  );
}
