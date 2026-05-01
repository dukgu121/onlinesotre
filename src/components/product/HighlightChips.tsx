"use client";

import { StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import type { Product } from "@/lib/data";

export function HighlightChips({ product }: { product: Product }) {
  const items = product.highlights.slice(0, 4);

  return (
    <section className="container max-w-[480px] pb-2">
      <StaggerGroup className="grid grid-cols-2 gap-2.5">
        {items.map((h) => (
          <StaggerItem key={h.label}>
            <article className="relative h-full p-4 rounded-lg border border-ink-100 bg-gradient-to-br from-cream-50 via-cream-100 to-cream-200/60 paper-grain overflow-hidden">
              <div className="absolute inset-0 pointer-events-none opacity-50 bg-vignette" />
              <div className="relative">
                <span className="text-[10px] tracking-[0.22em] uppercase text-ink-500">
                  {h.label}
                </span>
                <p className="mt-2 font-serif text-title-md text-ink-900 leading-snug tracking-tight">
                  {h.value}
                </p>
              </div>
            </article>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
