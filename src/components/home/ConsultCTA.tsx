"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

const ease = [0.22, 1, 0.36, 1] as const;

export function ConsultCTA() {
  const reduce = useReducedMotion();

  return (
    <section className="relative w-full bg-sage-800 overflow-hidden">
      {/* Ambient gradient — gently shifting */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        animate={
          reduce
            ? undefined
            : {
                background: [
                  "radial-gradient(60% 50% at 20% 20%, rgba(168,181,154,0.18), transparent 70%), radial-gradient(50% 60% at 80% 80%, rgba(200,165,132,0.12), transparent 70%)",
                  "radial-gradient(60% 50% at 80% 30%, rgba(168,181,154,0.22), transparent 70%), radial-gradient(50% 60% at 20% 80%, rgba(200,165,132,0.16), transparent 70%)",
                  "radial-gradient(60% 50% at 20% 20%, rgba(168,181,154,0.18), transparent 70%), radial-gradient(50% 60% at 80% 80%, rgba(200,165,132,0.12), transparent 70%)",
                ],
              }
        }
        transition={{ duration: 12, ease, repeat: Infinity }}
      />

      {/* Paper grain over dark */}
      <div className="absolute inset-0 paper-grain opacity-30 pointer-events-none" />

      {/* Faint serif glyph */}
      <div
        className="absolute -right-6 -bottom-10 font-serif text-[200px] leading-none text-cream-50/5 select-none pointer-events-none"
        aria-hidden
      >
        ?
      </div>

      <div className="relative container max-w-[480px] py-20">
        <Reveal>
          <div className="flex items-center gap-2">
            <span className="block h-px w-6 bg-cream-50/40" />
            <span className="text-[11px] tracking-[0.22em] uppercase text-cream-50/70">
              Pharmacist Consult
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="mt-5 font-serif text-display-md text-cream-50 leading-[1.08] tracking-tightest">
            지금 약사에게,
            <br />
            <span className="italic">묻고 싶은 한 가지가 있다면.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-5 text-body text-cream-50/75 leading-relaxed max-w-[26rem]">
            복용 중인 약과 영양제의 충돌, 어울리지 않는 시간대,
            지금의 컨디션에 맞는 한 가지. 약사가 직접 답합니다.
            <br />
            평일 09:00–22:00 · 평균 8분 응답.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <Link href="/consult" className="block mt-9">
            <Button
              variant="soft"
              size="lg"
              fullWidth
              className="bg-cream-50 text-ink-900 hover:bg-cream-100 border-cream-50"
              leading={<MessageCircle className="w-4 h-4" strokeWidth={1.6} />}
              trailing={<ArrowRight className="w-4 h-4" strokeWidth={1.6} />}
            >
              약사 상담 시작하기
            </Button>
          </Link>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-6 flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase text-cream-50/60">
            <span className="relative flex h-1.5 w-1.5">
              <motion.span
                animate={
                  reduce ? undefined : { scale: [1, 1.6, 1], opacity: [0.7, 0, 0.7] }
                }
                transition={{ duration: 2.4, ease, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-signal-green"
              />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-signal-green" />
            </span>
            <span>지금 4명의 약사가 응답 중</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
