import Link from "next/link";
import { Logo } from "./Logo";

const COLS = [
  { title: "Ürünler", links: [["Külçe Altın", "/urunler?k=kulce"], ["Sikke & Ziynet", "/urunler?k=sikke"], ["Bilezik", "/urunler?k=ziynet"], ["Gümüş", "/urunler?k=gumus"]] },
  { title: "Hizmetler", links: [["Canlı Piyasalar", "/piyasalar"], ["Sertifika Doğrulama", "/dogrula"], ["Mobil Uygulama", "/mobil"], ["Geri Alım", "/urunler"]] },
  { title: "Kurumsal", links: [["Hakkımızda", "#"], ["Teslimat & İade", "#"], ["Gizlilik", "#"], ["İletişim", "#"]] },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-[1.4fr_repeat(3,1fr)] md:px-6">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-xs text-small text-muted">
            Sertifikalı, seri numaralı külçe ve ziynet altın. Fiyatlar canlı piyasa kuruna göre saniyelik güncellenir.
          </p>
        </div>
        {COLS.map((c) => (
          <div key={c.title}>
            <p className="mb-4 text-caption font-semibold uppercase text-ink-2">{c.title}</p>
            <ul className="space-y-2.5">
              {c.links.map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-small text-muted transition hover:text-gold-hi">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-caption text-muted md:flex-row md:justify-between md:px-6">
          <span>© 2026 Aurex Kıymetli Madenler. Tüm hakları saklıdır.</span>
          <span>Demo site — gerçek satış yapılmaz. Kur kaynağı: Truncgil Finans.</span>
        </div>
      </div>
    </footer>
  );
}
