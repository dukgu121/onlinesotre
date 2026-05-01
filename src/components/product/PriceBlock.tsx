"use client";

import { Star, ShieldCheck, Snowflake, BadgeCheck } from "lucide-react";
import { motion } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";
import { BadgeMap } from "@/components/ui/Badge";
import { cn, formatKRW, discountRate } from "@/lib/utils";
import type { Product } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

export function PriceBlock({ product }: { product: Product }) {
  const dr = product.original ? discountRate(product.original, product.price) : 0;

  const scrollToReviews = () => {
    if (typeof document === "undefined") return;
    const el = document.getElementById("section-reviews");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="container max-w-[480px] pt-7 pb-6">
      <Reveal>
        <div className="flex items-center gap-2">
          <BadgeMap badge={product.badge} />
          <span className="eyebrow text-ink-600">{product.brand}</span>
        </div>
      </Reveal>

      <Reveal delay={0.06}>
        <h1 className="mt-3 font-serif text-display-md leading-[1.08] tracking-tightest text-ink-900">
          {product.name}
        </h1>
      </Reveal>

      {product.nameEn && (
        <Reveal delay={0.1}>
          <p className="mt-1.5 font-serif italic text-title-md text-ink-500 tracking-tight">
            {product.nameEn}
          </p>
        </Reveal>
      )}

      <Reveal delay={0.14}>
        <p className="mt-4 text-body text-ink-600 leading-relaxed">
          {product.hero}
        </p>
      </Reveal>

      {/* Rating row */}
      <Reveal delay={0.18}>
        <button
          onClick={scrollToReviews}
          className="tap mt-5 flex items-center gap-2 group"
          aria-label="리뷰 섹션으로 이동"
        >
          <span className="flex items-center gap-0.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star
                key={i}
                className={cn(
                  "w-3.5 h-3.5",
                  i < Math.round(product.rating)
                    ? "fill-clay-500 stroke-clay-500"
                    : "stroke-ink-300"
                )}
                strokeWidth={1.6}
              />
            ))}
          </span>
          <span className="tabular text-body-sm font-medium text-ink-800">
            {product.rating.toFixed(1)}
          </span>
          <span className="text-ink-300">·</span>
          <span className="tabular text-body-sm text-ink-600 underline underline-offset-4 decoration-ink-200 group-hover:decoration-ink-700 transition-colors duration-320">
            총 {product.reviewCount.toLocaleString()}개 리뷰
          </span>
          <span className="ml-1 inline-flex items-center gap-1 text-[10px] tracking-[0.18em] uppercase text-sage-700">
            <BadgeCheck className="w-3 h-3" strokeWidth={1.8} />
            Verified
          </span>
        </button>
      </Reveal>

      {/* Price row */}
      <Reveal delay={0.22}>
        <div className="mt-6 flex items-baseline gap-3 tabular">
          {dr > 0 && (
            <motion.span
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease }}
              className="text-signal-red text-title-md font-semibold"
            >
              {dr}%
            </motion.span>
          )}
          <span className="font-semibold text-[28px] leading-none text-ink-900">
            {formatKRW(product.price)}
          </span>
          {product.original && (
            <span className="text-ink-400 text-body-sm line-through">
              {formatKRW(product.original)}
            </span>
          )}
        </div>
        <div className="mt-2 text-caption text-ink-500 tabular">
          {product.capacity} · {product.intake}
        </div>
      </Reveal>

      {/* Trust chips */}
      <Reveal delay={0.28}>
        <div className="mt-6 flex flex-wrap gap-1.5">
          <TrustChip icon={<BadgeCheck className="w-3.5 h-3.5" strokeWidth={1.6} />}>
            약사 검증
          </TrustChip>
          <TrustChip icon={<Snowflake className="w-3.5 h-3.5" strokeWidth={1.6} />}>
            콜드체인 배송
          </TrustChip>
          <TrustChip icon={<ShieldCheck className="w-3.5 h-3.5" strokeWidth={1.6} />}>
            정품 보장
          </TrustChip>
        </div>
      </Reveal>
    </section>
  );
}

function TrustChip({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-full border border-ink-100 text-[11px] text-ink-700 bg-cream-50/60">
      <span className="text-sage-700">{icon}</span>
      {children}
    </span>
  );
}
