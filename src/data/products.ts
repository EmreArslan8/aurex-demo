import type { QuoteKey } from "@/lib/rates/types";

export type Category = "kulce" | "sikke" | "ziynet" | "gumus";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  /** Fiyatın bağlı olduğu piyasa kotasyonu */
  quote: QuoteKey;
  /** Kotasyon birimi cinsinden miktar (gram ya da adet) */
  amount: number;
  /** Üretim / işçilik primi (oran) */
  premium: number;
  purity: string;
  weightLabel: string;
  image: string;
  refinery: string;
  lot: string;
  stock: number;
  badge?: string;
  description: string;
}

export const CATEGORIES: Record<Category, { label: string; hint: string }> = {
  kulce: { label: "Külçe Altın", hint: "24 ayar · 999.9" },
  sikke: { label: "Sikke & Ziynet", hint: "22 ayar · 916" },
  ziynet: { label: "Bilezik", hint: "22 ayar · 916" },
  gumus: { label: "Gümüş", hint: "999 saflık" },
};

const REF = "Aurex Rafineri A.Ş.";

export const PRODUCTS: Product[] = [
  { id: "p01", slug: "1-gram-kulce-altin", name: "1 gr Külçe Altın", category: "kulce", quote: "HAS", amount: 1, premium: 0.035, purity: "999.9", weightLabel: "1 gram", image: "/products/gram-altin-kart.webp", refinery: REF, lot: "L2609-11", stock: 412, badge: "Çok satan", description: "Sertifika kartında mühürlü 1 gram 24 ayar külçe. Hediye ve düzenli birikim için ideal." },
  { id: "p02", slug: "2-5-gram-kulce-altin", name: "2,5 gr Külçe Altın", category: "kulce", quote: "HAS", amount: 2.5, premium: 0.028, purity: "999.9", weightLabel: "2,5 gram", image: "/products/gram-altin-kart.webp", refinery: REF, lot: "L2609-12", stock: 238, description: "Sertifika kartında mühürlü 2,5 gram 24 ayar külçe altın." },
  { id: "p03", slug: "5-gram-kulce-altin", name: "5 gr Külçe Altın", category: "kulce", quote: "HAS", amount: 5, premium: 0.022, purity: "999.9", weightLabel: "5 gram", image: "/products/kulce-altin-minted.webp", refinery: REF, lot: "L2609-14", stock: 186, description: "Darp (minted) yüzeyli, ayna parlaklığında 5 gram külçe. QR kodlu sertifikalı." },
  { id: "p04", slug: "10-gram-kulce-altin", name: "10 gr Külçe Altın", category: "kulce", quote: "HAS", amount: 10, premium: 0.018, purity: "999.9", weightLabel: "10 gram", image: "/products/kulce-altin-minted.webp", refinery: REF, lot: "L2609-15", stock: 144, badge: "Popüler", description: "Darp yüzeyli 10 gram 24 ayar külçe altın. Her külçede benzersiz seri numarası." },
  { id: "p05", slug: "20-gram-kulce-altin", name: "20 gr Külçe Altın", category: "kulce", quote: "HAS", amount: 20, premium: 0.015, purity: "999.9", weightLabel: "20 gram", image: "/products/kulce-altin-minted.webp", refinery: REF, lot: "L2609-16", stock: 92, description: "Darp yüzeyli 20 gram külçe altın, mühürlü sertifika ambalajında." },
  { id: "p06", slug: "50-gram-kulce-altin", name: "50 gr Külçe Altın", category: "kulce", quote: "HAS", amount: 50, premium: 0.011, purity: "999.9", weightLabel: "50 gram", image: "/products/kulce-altin-cast.webp", refinery: REF, lot: "L2609-18", stock: 41, description: "Döküm (cast) 50 gram külçe altın. Yatırım için düşük üretim primi." },
  { id: "p07", slug: "100-gram-kulce-altin", name: "100 gr Külçe Altın", category: "kulce", quote: "HAS", amount: 100, premium: 0.009, purity: "999.9", weightLabel: "100 gram", image: "/products/kulce-altin-cast.webp", refinery: REF, lot: "L2609-19", stock: 23, badge: "En düşük prim", description: "Döküm 100 gram külçe altın. Gram başına en avantajlı fiyat." },
  { id: "p08", slug: "ceyrek-altin", name: "Çeyrek Altın", category: "sikke", quote: "CEYREK", amount: 1, premium: 0, purity: "916", weightLabel: "1,75 gram", image: "/products/ceyrek-altin.webp", refinery: REF, lot: "L2609-21", stock: 640, badge: "Çok satan", description: "22 ayar, yeni tarihli darphane çeyrek altın. Fiyatı piyasa çeyrek kotasyonuna bağlıdır." },
  { id: "p09", slug: "yarim-altin", name: "Yarım Altın", category: "sikke", quote: "YARIM", amount: 1, premium: 0, purity: "916", weightLabel: "3,50 gram", image: "/products/ceyrek-altin.webp", refinery: REF, lot: "L2609-22", stock: 210, description: "22 ayar yarım altın, yeni tarihli." },
  { id: "p10", slug: "cumhuriyet-altini", name: "Cumhuriyet Altını", category: "sikke", quote: "CUMHURIYET", amount: 1, premium: 0, purity: "916", weightLabel: "7,22 gram", image: "/products/cumhuriyet-altini.webp", refinery: REF, lot: "L2609-23", stock: 88, description: "22 ayar Cumhuriyet altını (ata lira)." },
  { id: "p11", slug: "22-ayar-burma-bilezik-20-gr", name: "22 Ayar Burma Bilezik", category: "ziynet", quote: "AYAR22", amount: 20, premium: 0.04, purity: "916", weightLabel: "20 gram", image: "/products/bilezik-22-ayar.webp", refinery: REF, lot: "L2609-31", stock: 34, description: "El işçiliği burma desenli 22 ayar bilezik. Fiyat gram × kur + işçilik." },
  { id: "p12", slug: "1-kg-gumus-kulce", name: "1 kg Gümüş Külçe", category: "gumus", quote: "GUMUS", amount: 1000, premium: 0.06, purity: "999", weightLabel: "1.000 gram", image: "/products/gumus-kulce.webp", refinery: REF, lot: "L2609-41", stock: 57, badge: "Yeni", description: "999 saflıkta döküm 1 kg gümüş külçe." },
  { id: "p13", slug: "100-gram-gumus-kulce", name: "100 gr Gümüş Külçe", category: "gumus", quote: "GUMUS", amount: 100, premium: 0.09, purity: "999", weightLabel: "100 gram", image: "/products/gumus-kulce.webp", refinery: REF, lot: "L2609-42", stock: 133, description: "999 saflıkta 100 gram gümüş külçe." },
  { id: "p14", slug: "1-ons-gumus-sikke", name: "1 ons Gümüş Sikke", category: "gumus", quote: "GUMUS", amount: 31.1, premium: 0.12, purity: "999", weightLabel: "31,1 gram", image: "/products/gumus-sikke.webp", refinery: REF, lot: "L2609-43", stock: 304, description: "1 troy ons (31,1 g) 999 gümüş yatırım sikkesi." },
];

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
export const getProductById = (id: string) => PRODUCTS.find((p) => p.id === id);
