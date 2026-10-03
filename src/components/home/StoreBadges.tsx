const APPLE = "M16.37 12.62c-.02-2.3 1.88-3.4 1.96-3.46-1.07-1.56-2.73-1.78-3.32-1.8-1.41-.14-2.76.83-3.47.83-.72 0-1.82-.81-3-.79-1.54.02-2.96.9-3.76 2.27-1.6 2.78-.41 6.9 1.15 9.15.76 1.1 1.67 2.34 2.86 2.3 1.15-.05 1.58-.74 2.97-.74 1.38 0 1.78.74 2.99.72 1.24-.02 2.02-1.12 2.77-2.23.88-1.28 1.24-2.52 1.26-2.59-.03-.01-2.4-.92-2.41-3.66zM14.1 5.86c.63-.77 1.06-1.83.94-2.89-.91.04-2.02.61-2.67 1.37-.58.67-1.1 1.76-.96 2.8 1.02.08 2.06-.52 2.69-1.28z";
const PLAY = "M3.6 2.3c-.3.3-.4.7-.4 1.2v17c0 .5.1.9.4 1.2l9.5-9.7-9.5-9.7zm10.6 10.8 2.9 2.9-11 6.3 8.1-9.2zm0-2.2L6.1 1.7l11 6.3-2.9 2.9zm4.3 2.5-3.1-1.8 3.1-3.2 3.1 1.8c.9.5.9 1.4 0 1.9l-3.1 1.3z";

export function StoreBadges() {
  const items = [
    { d: APPLE, top: "App Store'dan", name: "İndirin" },
    { d: PLAY, top: "Google Play'den", name: "Edinin" },
  ];
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((s) => (
        <a key={s.top} href="/mobil" className="flex items-center gap-3 rounded-xl border border-line-strong bg-black px-4 py-2 transition hover:border-gold">
          <svg viewBox="0 0 24 24" className="size-6 fill-ink"><path d={s.d} /></svg>
          <span className="flex flex-col leading-tight">
            <span className="text-caption text-ink-2">{s.top}</span>
            <span className="text-small font-semibold">{s.name}</span>
          </span>
        </a>
      ))}
    </div>
  );
}
