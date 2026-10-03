const tl = new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", minimumFractionDigits: 2, maximumFractionDigits: 2 });
const tl0 = new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 });
const num = new Intl.NumberFormat("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const pct = new Intl.NumberFormat("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2, signDisplay: "always" });

export const fmtTL = (v: number) => tl.format(v);
export const fmtTL0 = (v: number) => tl0.format(v);
export const fmtNum = (v: number) => num.format(v);
export const fmtPct = (v: number) => `%${pct.format(v)}`.replace("%+", "+%").replace("%-", "−%");

export const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("tr-TR", { day: "2-digit", month: "long", year: "numeric" });
export const fmtTime = (d: Date | string) =>
  new Date(d).toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

export const cx = (...parts: (string | false | null | undefined)[]) => parts.filter(Boolean).join(" ");
