"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { StoryHero } from "@/components/brand/StoryHero";
import { Pillars } from "@/components/brand/Pillars";
import { Timeline } from "@/components/brand/Timeline";
import { PharmacistsRow } from "@/components/brand/PharmacistsRow";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

export default function AboutPage() {
  return (
    <div className="pb-24">
      <StoryHero />

      <Pillars />

      <div className="rule mx-auto max-w-[480px]" />

      <Timeline />

      <div className="rule mx-auto max-w-[480px]" />

      <PharmacistsRow />

      {/* Editorial closing */}
      <section className="container max-w-[480px] py-20 text-center">
        <Reveal>
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="block w-6 h-px bg-ink-300" />
            <span className="eyebrow">A Letter</span>
            <span className="block w-6 h-px bg-ink-300" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <blockquote className="font-serif text-display-sm text-ink-900 tracking-tight leading-snug italic">
            “좋은 처방은 결국,<br />
            매일을 함께하는 일.”
          </blockquote>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="mt-6 font-serif text-title-md italic text-ink-600 tracking-tight">
            — 정 OO 약사, Atelier Pharmacy
          </p>
          <div className="mt-3 mx-auto w-12 h-px bg-ink-300" />
        </Reveal>
      </section>

      {/* Footer mini-CTA */}
      <Reveal>
        <section className="container max-w-[480px] pb-10">
          <div className="rounded-xl border border-sage-200/60 bg-sage-50/60 paper-grain p-6 text-center">
            <span className="text-[10px] tracking-[0.22em] uppercase text-sage-800 font-medium">
              Need a prescription?
            </span>
            <h3 className="mt-2 font-serif text-title-lg text-ink-900 tracking-tight">
              약사에게 묻기
            </h3>
            <p className="mt-2 text-body-sm text-ink-600 leading-relaxed">
              평균 7분 안에, 정성껏 답해드립니다.
            </p>
            <Link href="/consult" className="mt-5 inline-block">
              <Button
                variant="ink"
                size="md"
                trailing={<ArrowRight className="w-4 h-4" strokeWidth={1.6} />}
              >
                상담 시작하기
              </Button>
            </Link>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
