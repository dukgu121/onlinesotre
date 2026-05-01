"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { ProductCard } from "@/components/ui/ProductCard";
import { collections, getProductsBySlugs } from "@/lib/data";

export function NewArrivals() {
  const items = getProductsBySlugs(collections.newArrivals);

  return (
    <section className="relative w-full bg-cream-50/60 hairline-t hairline-b">
      <div className="container max-w-[480px] py-20">
        <Reveal>
          <div className="flex items-end justify-between gap-4">
            <div>
              <span className="eyebrow text-ink-600">New · 새로 도착한 처방</span>
              <h2 className="mt-3 font-serif text-display-sm text-ink-900 leading-[1.1] tracking-tightest">
                이번 주에 도착한,
                <br />
                <span className="italic">새 일곱 가지.</span>
              </h2>
            </div>
            <Link
              href="/c/all?sort=new"
              className="flex-shrink-0 inline-flex items-center gap-1 text-body-sm text-ink-700 underline underline-offset-4 decoration-ink-300 hover:decoration-ink-700 transition-colors duration-320"
            >
              전체
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.6} />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mt-4 text-body-sm text-ink-500 max-w-[24rem]">
            약사가 직접 검토한, 이번 주의 새 입고 처방.
          </p>
        </Reveal>

        <StaggerGroup className="mt-10 grid grid-cols-2 gap-x-3 gap-y-8" stagger={0.08}>
          {items.map((p) => (
            <StaggerItem key={p.slug}>
              <ProductCard product={p} variant="compact" />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
