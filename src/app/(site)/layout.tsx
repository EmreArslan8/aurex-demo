import { TickerBar } from "@/components/site/TickerBar";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CartDrawer } from "@/components/shop/CartDrawer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TickerBar />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
    </>
  );
}
