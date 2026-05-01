"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Quote } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { ProductImage } from "@/components/ui/ProductImage";
import { collections, getProductsBySlugs } from "@/lib/data";
import { formatKRW, discountRate } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export function PharmacistsPick() {
  const pick = getProductsBySlugs(collections.pharmacistsPick)[0];
  if (!pick) return null;
  const dr = pick.original ? discountRate(pick.original, pick.price) : 0;

  return (
    <section className="relative w-full bg-cream-100">
      <div className="container max-w-[480px] py-20">
        {/* Header */}
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="block h-px w-6 bg-ink-700" />
            <span className="eyebrow text-ink-700">
              Today&apos;s Prescription · 2026.05.01
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="mt-5 font-serif text-display-md text-ink-900 leading-[1.05] tracking-tightest">
            오늘은,
            <br />
            <span className="italic">하루의 균형부터.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="mt-5 text-body text-ink-600 leading-relaxed max-w-[28rem]">
            계절이 바뀌는 길목, 약사가 가장 먼저 권하는 한 가지를 골랐습니다.
            매일 두 캡슐, 작은 의식이 한 달 뒤의 컨디션을 바꿉니다. 식단과
            수면을 함께 들여다보며 천천히 더해 보세요.
          </p>
        </Reveal>

        {/* Featured product */}
        <Reveal delay={0.22}>
          <Link
            href={`/p/${pick.slug}`}
            className="block mt-10 group"
            prefetch={false}
          >
            <motion.div
              whileTap={{ scale: 0.985 }}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.42, ease }}
              className="relative"
            >
              <ProductImage product={pick} ratio="portrait" animate={false} />

              {/* Badge corner */}
              <div className="absolute top-3 right-3">
                <span className="inline-flex items-center h-6 px-2.5 rounded-full bg-ink-900/85 text-cream-50 text-[10px] tracking-[0.2em] uppercase backdrop-blur-sm">
                  Pick of the Day
                </span>
              </div>
            </motion.div>

            {/* Meta line */}
            <div className="mt-5 flex items-baseline justify-between gap-4">
              <div className="min-w-0">
                <div className="text-[10px] tracking-[0.22em] uppercase text-ink-500">
                  {pick.brand}
                </div>
                <h3 className="mt-1 font-medium text-title-lg text-ink-900 leading-snug">
                  {pick.name}
                </h3>
                <p className="mt-1.5 text-body-sm text-ink-500">{pick.hero}</p>
              </div>
              <ArrowRight
                className="w-5 h-5 text-ink-700 flex-shrink-0 mt-1 transition-transform duration-420 ease-premium group-hover:translate-x-1"
                strokeWidth={1.4}
              />
            </div>

            <div className="mt-3 flex items-baseline gap-2 tabular">
              {dr > 0 && (
                <span className="text-signal-red text-body-sm font-medium">
                  {dr}%
                </span>
              )}
              <span className="text-ink-900 font-semibold text-title-md">
                {formatKRW(pick.price)}
              </span>
              {pick.original && (
                <span className="text-ink-400 text-body-sm line-through">
                  {formatKRW(pick.original)}
                </span>
              )}
            </div>
          </Link>
        </Reveal>

        {/* Pharmacist's pull-quote */}
        {pick.pharmacistNote && (
          <Reveal delay={0.32}>
            <figure className="mt-10 relative pl-6 border-l border-ink-200">
              <Quote
                className="absolute -left-2 -top-1 w-4 h-4 text-clay-500"
                strokeWidth={1.4}
              />
              <blockquote className="font-serif italic text-title-md text-ink-700 leading-relaxed">
                “{pick.pharmacistNote}”
              </blockquote>
              <figcaption className="mt-3 text-[11px] tracking-[0.2em] uppercase text-ink-500">
                약사 김 · 의약품 큐레이터
              </figcaption>
            </figure>
          </Reveal>
        )}

        {/* CTA */}
        <Reveal delay={0.4}>
          <Link href={`/p/${pick.slug}`} className="block mt-10">
            <Button
              variant="outline"
              size="lg"
              fullWidth
              trailing={<ArrowRight className="w-4 h-4" strokeWidth={1.6} />}
            >
              전문가의 처방 보기
            </Button>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
