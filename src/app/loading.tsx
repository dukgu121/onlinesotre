export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-ink-200 border-t-ink-700 animate-spin" />
        <span className="eyebrow">Loading</span>
      </div>
    </div>
  );
}
