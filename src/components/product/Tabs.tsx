"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";
import { IngredientsBlock } from "./IngredientsBlock";
import type { Product } from "@/lib/data";

const TABS = [
  { id: "product", label: "제품" },
  { id: "ingredients", label: "성분" },
  { id: "usage", label: "복용 · 보관" },
  { id: "warnings", label: "주의사항" },
] as const;

type TabId = (typeof TABS)[number]["id"];

const ease = [0.22, 1, 0.36, 1] as const;

export function Tabs({ product }: { product: Product }) {
  const [active, setActive] = useState<TabId>("product");
  const reduce = useReducedMotion();
  const sectionsRef = useRef<Record<TabId, HTMLElement | null>>({
    product: null,
    ingredients: null,
    usage: null,
    warnings: null,
  });
  const isClickScrolling = useRef(false);
  const navRef = useRef<HTMLDivElement>(null);
  const [navVisible, setNavVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        if (isClickScrolling.current) return;
        // Pick the entry closest to top that's intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          const id = visible[0].target.getAttribute("data-tab-id") as TabId;
          if (id) setActive(id);
        }
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0, 0.1, 0.4],
      }
    );

    Object.values(sectionsRef.current).forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Reveal nav on scroll past header
  useEffect(() => {
    const onScroll = () => {
      const navEl = navRef.current;
      if (!navEl) return;
      const rect = navEl.getBoundingClientRect();
      setNavVisible(rect.top <= 80);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onSelect = (id: TabId) => {
    setActive(id);
    isClickScrolling.current = true;
    const el = sectionsRef.current[id];
    if (el) {
      const offset = 110; // accounts for top bar + sticky tabs
      const top = window.scrollY + el.getBoundingClientRect().top - offset;
      window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
    }
    window.setTimeout(() => {
      isClickScrolling.current = false;
    }, 800);
  };

  return (
    <div ref={navRef} className="relative">
      <div
        className={cn(
          "sticky top-14 z-30 bg-cream-50/92 backdrop-blur-md hairline-b transition-transform duration-320 ease-premium",
          navVisible ? "translate-y-0" : "-translate-y-1"
        )}
      >
        <div className="container max-w-[480px]">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar -mx-1 px-1">
            {TABS.map((t) => {
              const isActive = active === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => onSelect(t.id)}
                  className={cn(
                    "tap relative shrink-0 h-12 px-4 text-body-sm font-medium tracking-tight transition-colors duration-320",
                    isActive ? "text-ink-900" : "text-ink-500"
                  )}
                  aria-current={isActive ? "true" : undefined}
                >
                  <span className="relative z-10">{t.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="pdp-tab-underline"
                      className="absolute left-2 right-2 bottom-0 h-[2px] rounded-full bg-ink-900"
                      transition={{ duration: 0.42, ease }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container max-w-[480px]">
        <section
          ref={(el) => {
            sectionsRef.current.product = el;
          }}
          data-tab-id="product"
          className="pt-10 pb-12 scroll-mt-32"
        >
          <Reveal>
            <span className="eyebrow text-ink-600">About</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h3 className="mt-3 font-serif text-display-sm leading-[1.14] tracking-tight text-ink-900">
              제품에 관하여
            </h3>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-5 text-body text-ink-700 leading-[1.85]">
              {product.description}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <dl className="mt-8 grid grid-cols-2 gap-x-4 gap-y-0 border-t border-ink-100">
              <FactRow label="용량" value={product.capacity} />
              <FactRow label="복용" value={product.intake} />
              <FactRow label="브랜드" value={product.brand} />
              <FactRow label="카테고리" value={product.categoryName} />
            </dl>
          </Reveal>
        </section>

        <section
          ref={(el) => {
            sectionsRef.current.ingredients = el;
          }}
          data-tab-id="ingredients"
          className="py-12 scroll-mt-32 border-t border-ink-100"
        >
          <Reveal>
            <span className="eyebrow text-ink-600">Ingredients</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h3 className="mt-3 mb-8 font-serif text-display-sm leading-[1.14] tracking-tight text-ink-900">
              성분 · 영양
            </h3>
          </Reveal>
          <IngredientsBlock product={product} />
        </section>

        <section
          ref={(el) => {
            sectionsRef.current.usage = el;
          }}
          data-tab-id="usage"
          className="py-12 scroll-mt-32 border-t border-ink-100"
        >
          <Reveal>
            <span className="eyebrow text-ink-600">Usage &amp; Storage</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h3 className="mt-3 mb-2 font-serif text-display-sm leading-[1.14] tracking-tight text-ink-900">
              복용 · 보관
            </h3>
          </Reveal>

          <div className="mt-6 flex flex-col gap-7">
            {product.notes.map((n, i) => (
              <Reveal key={n.title} delay={0.08 + i * 0.04}>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-serif italic text-body-sm tabular text-ink-500">
                      0{i + 1}
                    </span>
                    <span className="block h-px flex-1 bg-ink-200" />
                    <span className="text-[10px] tracking-[0.22em] uppercase text-ink-700">
                      {n.title}
                    </span>
                  </div>
                  <p className="mt-3 text-body text-ink-700 leading-[1.85]">
                    {n.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section
          ref={(el) => {
            sectionsRef.current.warnings = el;
          }}
          data-tab-id="warnings"
          className="py-12 scroll-mt-32 border-t border-ink-100"
        >
          <Reveal>
            <span className="eyebrow text-ink-600">Cautions</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h3 className="mt-3 font-serif text-display-sm leading-[1.14] tracking-tight text-ink-900">
              주의사항
            </h3>
          </Reveal>

          <ul className="mt-7 flex flex-col gap-3">
            {product.warnings.map((w, i) => (
              <Reveal key={`${w}-${i}`} delay={0.08 + i * 0.04}>
                <li className="flex items-start gap-3 p-3.5 rounded-md border border-signal-amber/30 bg-clay-100/40">
                  <AlertCircle
                    className="shrink-0 mt-0.5 w-4 h-4 text-signal-amber"
                    strokeWidth={1.6}
                  />
                  <span className="text-body-sm text-ink-700 leading-relaxed">
                    {w}
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.2}>
            <p className="mt-7 text-caption text-ink-500 leading-relaxed">
              본 제품은 의약품이 아닌 건강기능식품입니다. 질병의 진단, 치료,
              경감을 목적으로 하지 않습니다. 복용 중 이상 반응이 발생하면 즉시
              전문가와 상담하세요.
            </p>
          </Reveal>
        </section>
      </div>
    </div>
  );
}

function FactRow({ label, value }: { label: string; value: string }) {
  return (
    <>
      <dt className="text-[10px] tracking-[0.22em] uppercase text-ink-500 py-3.5 border-b border-ink-100">
        {label}
      </dt>
      <dd className="text-body-sm text-ink-800 py-3.5 border-b border-ink-100 text-right tabular">
        {value}
      </dd>
    </>
  );
}
