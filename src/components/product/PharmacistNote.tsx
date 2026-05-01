"use client";

import { Reveal } from "@/components/motion/Reveal";
import type { Product } from "@/lib/data";
import { cn } from "@/lib/utils";

export function PharmacistNote({ product }: { product: Product }) {
  const note =
    product.pharmacistNote ??
    "이 제품을 직접 큐레이션한 약사의 노트입니다.";

  return (
    <section className="relative w-full bg-gradient-to-b from-sage-50 via-cream-100 to-sage-50/40 paper-grain overflow-hidden">
      <div className="absolute inset-0 bg-vignette opacity-40 pointer-events-none" />
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-ink-200/50 to-transparent" />

      <div className="container max-w-[480px] py-16 relative">
        <Reveal>
          <span className="eyebrow text-sage-700">Pharmacist's Note</span>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="relative mt-4">
            <span
              className={cn(
                "absolute -left-1 -top-6 font-serif text-sage-700/30 select-none leading-none",
                "text-[110px]"
              )}
              aria-hidden
            >
              &ldquo;
            </span>
            <blockquote className="relative pl-1 pr-2">
              <p className="font-serif italic text-display-sm leading-[1.28] text-ink-800 tracking-tight">
                {note}
              </p>
            </blockquote>
          </div>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-8 flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-full bg-gradient-to-br from-sage-100 via-cream-100 to-clay-100 hairline border border-ink-100 flex items-center justify-center">
              <span className="font-serif text-title-md text-sage-700">김</span>
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-sage-700 border-2 border-cream-50" />
            </div>
            <div className="flex flex-col">
              <span className="text-body-sm font-medium text-ink-800">
                약사 김OO
              </span>
              <span className="text-caption text-ink-500">
                약학박사 · {product.categoryName} · 12년 경력
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-8 rule" />
        </Reveal>
      </div>
    </section>
  );
}
