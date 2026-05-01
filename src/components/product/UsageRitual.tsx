"use client";

import { Sun, Sunrise, Moon } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/data";

type Slot = {
  key: "morning" | "afternoon" | "evening";
  label: string;
  pill: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  tone: string;
  body: string;
};

function buildRitual(product: Product): Slot[] {
  const intake = product.intake ?? "";
  const isOnce = /1일\s*1/.test(intake);
  const isTwice = /1일\s*2/.test(intake);
  const isBedtime = /취침|밤|저녁|잠/.test(intake);
  const isFasting = /공복/.test(intake);
  const afterMeal = /식후/.test(intake);

  const morning: Slot = {
    key: "morning",
    label: "Morning",
    pill: "07–09",
    icon: Sunrise,
    tone: "from-cream-200 via-cream-100 to-clay-100",
    body: isFasting
      ? "공복에 한 알, 미온수와 함께. 식사 30분 전이 가장 좋습니다."
      : afterMeal
      ? "아침 식후 한 알, 따뜻한 물과 함께 천천히 시작합니다."
      : "잠에서 깬 직후, 하루를 여는 한 잔의 의식처럼.",
  };

  const afternoon: Slot = {
    key: "afternoon",
    label: "Afternoon",
    pill: "13–15",
    icon: Sun,
    tone: "from-cream-100 via-clay-100 to-cream-200",
    body: isTwice
      ? "점심 식후 한 알, 오후의 흐름을 부드럽게 이어갑니다."
      : "수분과 함께 잠시 호흡을 가다듬는 시간으로 사용해도 좋습니다.",
  };

  const evening: Slot = {
    key: "evening",
    label: "Evening",
    pill: isBedtime ? "22–23" : "19–21",
    icon: Moon,
    tone: "from-sage-50 via-cream-100 to-sage-100",
    body: isBedtime
      ? "취침 30분 전, 따뜻한 물 한 잔과 함께 하루를 닫습니다."
      : isOnce && !afterMeal
      ? "저녁 식후 또는 잠들기 전, 차분한 마음으로 한 알."
      : "저녁 식후 한 알, 오늘 하루의 회복을 부탁합니다.",
  };

  return [morning, afternoon, evening];
}

export function UsageRitual({ product }: { product: Product }) {
  const slots = buildRitual(product);

  return (
    <section className="container max-w-[480px] py-14">
      <Reveal>
        <span className="eyebrow text-ink-600">Daily Ritual</span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-3 font-serif text-display-sm leading-[1.12] tracking-tightest text-ink-900">
          하루의 어디에 두실까요
        </h2>
      </Reveal>
      <Reveal delay={0.14}>
        <p className="mt-3 text-body-sm text-ink-500 leading-relaxed">
          {product.intake} — 매일의 작은 의식이 변화의 시작입니다.
        </p>
      </Reveal>

      <StaggerGroup className="mt-7 flex flex-col gap-3" stagger={0.08}>
        {slots.map((slot) => {
          const Icon = slot.icon;
          return (
            <StaggerItem key={slot.key}>
              <article
                className={cn(
                  "relative p-4 rounded-lg border border-ink-100 bg-gradient-to-br paper-grain overflow-hidden",
                  slot.tone
                )}
              >
                <div className="absolute inset-0 bg-vignette opacity-30 pointer-events-none" />
                <div className="relative flex items-start gap-4">
                  <div className="shrink-0 w-11 h-11 rounded-full bg-cream-50 hairline border border-ink-100 flex items-center justify-center text-ink-700">
                    <Icon className="w-[18px] h-[18px]" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] tracking-[0.22em] uppercase text-ink-700">
                        {slot.label}
                      </span>
                      <span className="inline-flex items-center h-5 px-2 rounded-full border border-ink-200 bg-cream-50/70 text-[10px] tabular text-ink-600">
                        {slot.pill}
                      </span>
                    </div>
                    <p className="mt-1.5 text-body-sm text-ink-700 leading-relaxed">
                      {slot.body}
                    </p>
                  </div>
                </div>
              </article>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </section>
  );
}
