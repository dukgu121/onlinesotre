"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { ProductCard } from "@/components/ui/ProductCard";
import { collections, getProductsBySlugs } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

export function Bestsellers() {
  const items = getProductsBySlugs(collections.bestseller);

  return (
    <section className="relative w-full bg-cream-100">
      <div className="py-20">
        {/* Header */}
        <div className="container max-w-[480px]">
          <Reveal>
            <div className="flex items-end justify-between gap-4">
              <div>
                <span className="eyebrow text-ink-600">Best · 매일의 베스트</span>
                <h2 className="mt-3 font-serif text-display-sm text-ink-900 leading-[1.1] tracking-tightest">
                  많이 처방된,
                  <br />
                  <span className="italic">검증된 매일.</span>
                </h2>
              </div>
              <Link
                href="/c/all?sort=best"
                className="flex-shrink-0 inline-flex items-center gap-1 text-body-sm text-ink-700 underline underline-offset-4 decoration-ink-300 hover:decoration-ink-700 transition-colors duration-320"
              >
                전체
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.6} />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-4 text-body-sm text-ink-500 max-w-[24rem]">
              이번 달, 이 약국의 손님들이 가장 자주 다시 찾는 처방입니다.
            </p>
          </Reveal>
        </div>

        {/* Snap row */}
        <Reveal delay={0.16}>
          <div className="mt-8 snap-row no-scrollbar overflow-x-auto">
            <ul className="flex gap-4 px-5 pr-10">
              {items.map((p, i) => (
                <li
                  key={p.slug}
                  className="snap-item shrink-0"
                  style={{ width: "70vw", maxWidth: 280 }}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96, y: 12 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{
                      duration: 0.7,
                      ease,
                      delay: i * 0.06,
                    }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="font-serif italic text-title-md text-ink-700 tabular">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="block h-px flex-1 bg-ink-200" />
                    </div>
                    <ProductCard product={p} />
                  </motion.div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
