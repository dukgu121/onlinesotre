"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";

const ease = [0.22, 1, 0.36, 1] as const;

export function BrandClose() {
  const reduce = useReducedMotion();

  return (
    <section className="relative w-full bg-cream-100 hairline-t overflow-hidden">
      <div className="container max-w-[480px] pt-20 pb-12">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="block h-px w-6 bg-ink-700" />
            <span className="eyebrow text-ink-600">Atelier · Apothecary</span>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <h3 className="mt-5 font-serif text-[clamp(40px,12vw,64px)] leading-[0.92] tracking-tightest text-ink-900">
            Atelier
            <br />
            <span className="italic">Pharmacy.</span>
          </h3>
        </Reveal>

        <Reveal delay={0.14}>
          <motion.div
            animate={reduce ? undefined : { opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 5, ease, repeat: Infinity }}
            className="mt-6 h-px w-24 bg-ink-700/70"
          />
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-6 grid grid-cols-2 gap-y-3 text-[11px] tracking-[0.18em] uppercase text-ink-600">
            <div>
              <div className="text-ink-400">Est.</div>
              <div className="mt-1 text-ink-700 tabular">2026 · Seoul</div>
            </div>
            <div>
              <div className="text-ink-400">Consult</div>
              <div className="mt-1 text-ink-700 tabular">02-XXX-XXXX</div>
            </div>
            <div>
              <div className="text-ink-400">Hours</div>
              <div className="mt-1 text-ink-700 tabular">09:00 — 22:00</div>
            </div>
            <div>
              <div className="text-ink-400">Address</div>
              <div className="mt-1 text-ink-700">서울 성동구 성수</div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.26}>
          <p className="mt-8 max-w-[24rem] font-serif italic text-body-lg text-ink-600 leading-relaxed">
            “약은 늘 신중하게, 매일은 부드럽게.”
          </p>
        </Reveal>

        <Reveal delay={0.32}>
          <ul className="mt-10 flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-ink-500">
            <li>
              <Link
                href="/legal/terms"
                className="hover:text-ink-800 transition-colors duration-320"
              >
                이용약관
              </Link>
            </li>
            <li className="text-ink-300" aria-hidden>·</li>
            <li>
              <Link
                href="/legal/privacy"
                className="hover:text-ink-800 transition-colors duration-320 font-medium"
              >
                개인정보 처리방침
              </Link>
            </li>
            <li className="text-ink-300" aria-hidden>·</li>
            <li>
              <Link
                href="/legal/business"
                className="hover:text-ink-800 transition-colors duration-320"
              >
                사업자정보
              </Link>
            </li>
            <li className="text-ink-300" aria-hidden>·</li>
            <li>
              <Link
                href="/legal/notice"
                className="hover:text-ink-800 transition-colors duration-320"
              >
                고시정보
              </Link>
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.38}>
          <p className="mt-6 text-[10px] tracking-[0.05em] text-ink-400 leading-relaxed">
            (주)아틀리에 파마시 · 대표 김약사 · 사업자등록번호 000-00-00000
            <br />
            통신판매업신고 2026-서울성동-0000 · 약국개설등록증 제0000호
            <br />© 2026 Atelier Pharmacy. All rights reserved.
          </p>
        </Reveal>

        {/* Bottom safe area buffer for BottomNav */}
        <div className="h-12" aria-hidden />
      </div>
    </section>
  );
}
