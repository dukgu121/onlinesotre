"use client";

import { Reveal } from "@/components/motion/Reveal";
import { ProductCard } from "@/components/ui/ProductCard";
import { getProductsByCategory, type Product } from "@/lib/data";

export function RelatedProducts({ product }: { product: Product }) {
  const related = getProductsByCategory(product.category)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 6);

  if (related.length === 0) return null;

  return (
    <section className="relative py-14 bg-cream-100 border-t border-ink-100">
      <div className="container max-w-[480px]">
        <Reveal>
          <span className="eyebrow text-ink-600">From the Same Category</span>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-3 font-serif text-display-sm leading-[1.14] tracking-tightest text-ink-900">
            함께 보면 좋은,
            <br />
            <span className="italic">같은 카테고리.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-3 text-body-sm text-ink-500">
            {product.categoryName} — 약사가 함께 큐레이션한 처방.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.16}>
        <div className="mt-8 snap-row no-scrollbar overflow-x-auto">
          <ul className="flex gap-4 px-5 pr-10">
            {related.map((p) => (
              <li
                key={p.slug}
                className="snap-item shrink-0"
                style={{ width: "62vw", maxWidth: 260 }}
              >
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
