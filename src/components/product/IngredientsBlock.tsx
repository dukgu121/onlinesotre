"use client";

import { StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import type { Product } from "@/lib/data";

function splitIngredient(line: string): { name: string; dose?: string } {
  // Examples: "정제어유 1,200mg (rTG)" or "EPA 540mg" or "퀘르세틴 25mg"
  const m = line.match(/^(.+?)\s+([\d.,]+\s*(?:mg|μg|IU|g|ml|억|%|CFU)[^\s]*.*)$/);
  if (m) return { name: m[1].trim(), dose: m[2].trim() };
  return { name: line };
}

export function IngredientsBlock({ product }: { product: Product }) {
  return (
    <div className="space-y-1">
      <div className="flex items-baseline justify-between">
        <span className="eyebrow text-ink-600">Composition</span>
        <span className="font-serif italic text-body-sm text-ink-500">
          / {product.ingredients.length} 성분
        </span>
      </div>

      <p className="pt-3 text-body-sm text-ink-600 leading-relaxed">
        한 캡슐, 한 포에 담긴 모든 것. 무첨가·무향료를 원칙으로 합니다.
      </p>

      <StaggerGroup className="mt-5 flex flex-col" stagger={0.05}>
        {product.ingredients.map((line, i) => {
          const { name, dose } = splitIngredient(line);
          return (
            <StaggerItem key={`${line}-${i}`}>
              <div className="flex items-baseline gap-3 py-3.5 border-b border-ink-100 last:border-b-0">
                <span className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-sage-700" />
                <div className="flex-1 flex items-baseline justify-between gap-3">
                  <span className="font-medium text-body text-ink-800 tracking-tight">
                    {name}
                  </span>
                  {dose && (
                    <span className="font-light tabular text-body-sm text-ink-500 text-right">
                      {dose}
                    </span>
                  )}
                </div>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerGroup>

      <div className="mt-6 p-4 rounded-lg bg-sage-50/60 border border-sage-100">
        <span className="text-[10px] tracking-[0.22em] uppercase text-sage-700">
          Free From
        </span>
        <p className="mt-2 text-body-sm text-ink-700 leading-relaxed">
          인공 색소 · 합성 향료 · 트랜스 지방 · 글루텐 · 유전자변형(GMO) 원료를
          사용하지 않습니다.
        </p>
      </div>
    </div>
  );
}
