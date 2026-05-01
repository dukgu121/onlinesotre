"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Paperclip, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const TOPICS = ["수면", "면역", "위·장", "여성", "임산부", "기타"] as const;
type Topic = (typeof TOPICS)[number];

const MAX = 500;

export function ConsultForm() {
  const reduce = useReducedMotion();
  const [topic, setTopic] = useState<Topic>("수면");
  const [body, setBody] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting || submitted) return;
    setSubmitting(true);
    // simulate async
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <section className="container max-w-[480px] py-8">
      <div className="rounded-xl bg-cream-50 border border-ink-100/60 hairline shadow-card overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {submitted ? (
            <motion.div
              key="ok"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.55, ease }}
              className="px-6 py-10 text-center"
            >
              <div className="mx-auto w-16 h-16 rounded-full bg-sage-100 border border-sage-200/60 flex items-center justify-center">
                <motion.svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-sage-800"
                >
                  <motion.path
                    d="M6 14.5L12 20.5L23 8.5"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.7, delay: 0.1, ease }}
                  />
                </motion.svg>
              </div>
              <div className="mt-5 eyebrow text-sage-800">Sent</div>
              <h3 className="mt-2 font-serif text-display-sm text-ink-900 tracking-tight">
                정 약사가 곧 답변드립니다
              </h3>
              <p className="mt-3 text-body-sm text-ink-500 leading-relaxed">
                평균 7분 · 알림으로 도착해요.
              </p>
              <div className="mt-4 mx-auto w-12 h-px bg-ink-200" />
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setBody("");
                }}
                className="tap mt-5 text-[11px] tracking-[0.18em] uppercase text-ink-500 hover:text-ink-800"
              >
                다른 질문 더하기
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={reduce ? false : { opacity: 0 }}
              animate={reduce ? undefined : { opacity: 1 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.4, ease }}
              onSubmit={onSubmit}
              className="p-5 space-y-5"
            >
              {/* Topic */}
              <div>
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="block w-4 h-px bg-ink-300" />
                  <span className="eyebrow">Topic · 주제</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {TOPICS.map((t) => {
                    const active = topic === t;
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTopic(t)}
                        className={cn(
                          "tap inline-flex items-center h-9 px-3.5 rounded-full text-body-sm tracking-tight border transition-colors duration-320 ease-premium",
                          active
                            ? "bg-ink-800 text-cream-50 border-ink-900/40"
                            : "bg-cream-50 text-ink-700 border-ink-100 hover:border-ink-300"
                        )}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Body */}
              <div>
                <label htmlFor="consult-body" className="flex items-center gap-2 mb-2.5">
                  <span className="block w-4 h-px bg-ink-300" />
                  <span className="eyebrow">Question · 질문</span>
                </label>
                <textarea
                  id="consult-body"
                  value={body}
                  onChange={(e) => setBody(e.target.value.slice(0, MAX))}
                  placeholder="어떤 점이 신경 쓰이세요? 예) 새벽 3시쯤 자주 깨고, 다시 잠들기 어려워요."
                  rows={6}
                  className={cn(
                    "w-full bg-cream rounded-md border border-ink-100 hairline",
                    "p-4 text-body text-ink-800 placeholder:text-ink-400 leading-relaxed tracking-tight",
                    "outline-none focus:border-sage-400 transition-colors duration-320 ease-premium resize-none"
                  )}
                />
                <div className="mt-2 flex items-center justify-between">
                  <button
                    type="button"
                    className="tap inline-flex items-center gap-1.5 text-[11px] tracking-tight text-ink-500 hover:text-ink-800"
                    aria-label="파일 첨부"
                  >
                    <Paperclip className="w-3.5 h-3.5" strokeWidth={1.6} />
                    사진 · 처방전 첨부
                  </button>
                  <span className="text-[11px] text-ink-400 tabular">
                    {body.length} / {MAX}
                  </span>
                </div>
              </div>

              {/* Submit */}
              <motion.div whileTap={reduce ? undefined : { scale: 0.98 }}>
                <Button
                  type="submit"
                  variant="ink"
                  size="lg"
                  fullWidth
                  disabled={body.trim().length < 4 || submitting}
                  trailing={
                    submitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.9, ease: "linear", repeat: Infinity }}
                        className="w-3.5 h-3.5 border border-cream-50/60 border-t-cream-50 rounded-full"
                      />
                    ) : (
                      <Send className="w-4 h-4" strokeWidth={1.6} />
                    )
                  }
                >
                  {submitting ? "보내는 중…" : "약사에게 보내기"}
                </Button>
              </motion.div>

              <p className="text-[11px] text-ink-500 text-center leading-relaxed">
                상담 내용은 약사 외에 공개되지 않으며, 처방의 참고 자료로만 사용됩니다.
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

