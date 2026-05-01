import { cn } from "@/lib/utils";

const tones = {
  sage:    "bg-sage-100 text-sage-700 border-sage-200/60",
  clay:    "bg-clay-100 text-clay-600 border-clay-200/60",
  ink:     "bg-ink-800 text-cream-50 border-ink-900/40",
  cream:   "bg-cream-200 text-ink-700 border-ink-100",
  outline: "bg-transparent text-ink-700 border-ink-200",
} as const;

type Tone = keyof typeof tones;

export function Badge({
  children, tone = "outline", className,
}: { children: React.ReactNode; tone?: Tone; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 h-6 px-2 rounded-full border text-[10px] tracking-[0.18em] uppercase font-medium",
        tones[tone], className
      )}
    >
      {children}
    </span>
  );
}

export function BadgeMap({
  badge, className,
}: { badge?: string; className?: string }) {
  if (!badge) return null;
  const map: Record<string, { label: string; tone: Tone }> = {
    NEW:          { label: "New",          tone: "sage" },
    BEST:         { label: "Best",         tone: "ink" },
    EDITOR:       { label: "Editor's",     tone: "clay" },
    LIMITED:      { label: "Limited",      tone: "ink" },
    PRESCRIPTION: { label: "Rx",           tone: "outline" },
  };
  const it = map[badge];
  if (!it) return null;
  return (
    <Badge tone={it.tone} className={className}>
      {it.label}
    </Badge>
  );
}
