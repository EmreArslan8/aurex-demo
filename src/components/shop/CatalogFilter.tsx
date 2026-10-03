"use client";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CATEGORIES, PRODUCTS, type Category } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { cx } from "@/lib/format";

type Sort = "onerilen" | "agirlik-artan" | "agirlik-azalan";

export function CatalogFilter() {
  const sp = useSearchParams();
  const initial = (sp.get("k") as Category | null) ?? null;
  const [cat, setCat] = useState<Category | null>(initial && initial in CATEGORIES ? initial : null);
  const [sort, setSort] = useState<Sort>("onerilen");

  const list = useMemo(() => {
    const l = PRODUCTS.filter((p) => !cat || p.category === cat);
    if (sort === "agirlik-artan") return [...l].sort((a, b) => a.amount - b.amount);
    if (sort === "agirlik-azalan") return [...l].sort((a, b) => b.amount - a.amount);
    return l;
  }, [cat, sort]);

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {[null, ...(Object.keys(CATEGORIES) as Category[])].map((c) => (
            <button
              key={c ?? "all"}
              onClick={() => setCat(c)}
              className={cx("shrink-0 rounded-full border px-4 py-2 text-small transition", cat === c ? "border-gold bg-gold/10 text-gold-hi" : "border-line text-ink-2 hover:border-line-strong")}
            >
              {c ? CATEGORIES[c].label : "Tümü"}
            </button>
          ))}
        </div>
        <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="rounded-xl border border-line bg-surface px-3 py-2 text-small text-ink-2 outline-none focus:border-gold">
          <option value="onerilen">Önerilen</option>
          <option value="agirlik-artan">Ağırlık: düşükten yükseğe</option>
          <option value="agirlik-azalan">Ağırlık: yüksekten düşüğe</option>
        </select>
      </div>
      <div className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
        {list.map((p) => <ProductCard key={p.id} p={p} />)}
      </div>
    </>
  );
}
