"use client";

import { motion, useReducedMotion } from "motion/react";
import { CornerDownLeft, Search } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ProductImage } from "@/components/ui/ProductImage";
import type { Product } from "@/lib/data";

type Props = {
  query: string;
  completions: string[];
  products: Product[];
  onPickTerm: (term: string) => void;
  className?: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-sage-100 text-sage-800 px-0.5 rounded-[3px]">
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

export function Suggestions({
  query,
  completions,
  products,
  onPickTerm,
  className,
}: Props) {
  const reduce = useReducedMotion();

  return (
    <div className={cn("space-y-7", className)}>
      {completions.length > 0 && (
        <section className="space-y-2">
          <h3 className="eyebrow text-ink-500">Suggestions · 빠른 완성</h3>
          <ul className="rounded-lg overflow-hidden border border-ink-100 bg-cream-50 divide-y divide-ink-100/60">
            {completions.map((c, i) => (
              <motion.li
                key={c}
                initial={reduce ? false : { opacity: 0, x: -6 }}
                animate={reduce ? undefined : { opacity: 1, x: 0 }}
                transition={{ duration: 0.32, delay: i * 0.03, ease }}
              >
                <button
                  type="button"
                  onClick={() => onPickTerm(c)}
                  className="tap w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-cream-200/40 transition-colors duration-320 ease-premium"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Search className="w-4 h-4 text-ink-400 shrink-0" strokeWidth={1.6} />
                    <span className="truncate text-body-sm text-ink-800">
                      <Highlight text={c} query={query} />
                    </span>
                  </div>
                  <CornerDownLeft className="w-3.5 h-3.5 text-ink-400 shrink-0" strokeWidth={1.6} />
                </button>
              </motion.li>
            ))}
          </ul>
        </section>
      )}

      {products.length > 0 && (
        <section className="space-y-3">
          <h3 className="eyebrow text-ink-500">Products · 매칭 제품</h3>
          <ul className="space-y-2">
            {products.slice(0, 4).map((p, i) => (
              <motion.li
                key={p.slug}
                initial={reduce ? false : { opacity: 0, y: 6 }}
                animate={reduce ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.42, delay: 0.05 + i * 0.04, ease }}
              >
                <Link
                  href={`/p/${p.slug}`}
                  className="tap flex items-center gap-3 p-2 rounded-lg hover:bg-cream-200/40 transition-colors duration-320 ease-premium"
                >
                  <div className="w-14 h-14 shrink-0">
                    <ProductImage product={p} ratio="square" animate={false} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] tracking-[0.18em] uppercase text-ink-500">
                      {p.brand}
                    </div>
                    <div className="truncate text-body-sm text-ink-800 font-medium">
                      <Highlight text={p.name} query={query} />
                    </div>
                  </div>
                </Link>
              </motion.li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
