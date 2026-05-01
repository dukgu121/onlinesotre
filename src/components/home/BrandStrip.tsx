"use client";

import { Reveal } from "@/components/motion/Reveal";

const credentials = [
  "약사 직접 큐레이션",
  "콜드체인 배송",
  "정품 보장",
  "24시간 약사 상담",
  "처방전 익스프레스",
  "GMP 인증 원료",
];

export function BrandStrip() {
  // Duplicate for seamless marquee loop
  const items = [...credentials, ...credentials];

  return (
    <Reveal>
      <section
        aria-label="Atelier Pharmacy 신뢰의 기준"
        className="relative w-full hairline-t hairline-b bg-cream-50/60 overflow-hidden"
      >
        <div className="relative py-3.5">
          {/* Edge fades */}
          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-cream-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-cream-50 to-transparent z-10 pointer-events-none" />

          <div className="flex w-max animate-marquee will-change-transform">
            {items.map((c, i) => (
              <div
                key={`${c}-${i}`}
                className="flex items-center gap-5 pr-5"
                aria-hidden={i >= credentials.length || undefined}
              >
                <span className="text-[11px] tracking-[0.22em] uppercase text-ink-700 whitespace-nowrap font-medium">
                  {c}
                </span>
                <span className="text-ink-300 text-[8px]" aria-hidden>
                  ●
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Reveal>
  );
}
