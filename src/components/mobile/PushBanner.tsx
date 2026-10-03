"use client";
import type { PushMsg } from "./AlarmWatcher";

export function PushBanner({ msg, onClose }: { msg: PushMsg | null; onClose: () => void }) {
  if (!msg) return null;
  return (
    <button onClick={onClose} className="absolute inset-x-2 top-2 z-30 flex animate-slide-down gap-3 rounded-2xl bg-surface-3/95 p-3 text-left shadow-2xl ring-1 ring-line-strong backdrop-blur">
      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-gold-hi to-gold-lo font-display text-bg italic">A</span>
      <span className="min-w-0">
        <span className="flex justify-between text-caption text-muted"><span>AUREX</span><span>şimdi</span></span>
        <span className="block truncate text-small font-semibold">{msg.title}</span>
        <span className="block text-caption text-ink-2">{msg.body}</span>
      </span>
    </button>
  );
}
