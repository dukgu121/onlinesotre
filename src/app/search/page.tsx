"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Sparkles } from "lucide-react";
import { SearchInput } from "@/components/search/SearchInput";
import { RecentSearches } from "@/components/search/RecentSearches";
import { PopularSearches } from "@/components/search/PopularSearches";
import { Suggestions } from "@/components/search/Suggestions";
import { SearchResults } from "@/components/search/SearchResults";
import { products, type Product } from "@/lib/data";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "atelier.search.recent.v1";
const MAX_RECENTS = 8;
const ease = [0.22, 1, 0.36, 1] as const;

const PHARMACIST_PROMPTS = [
  "환절기 면역",
  "야근 후 피로",
  "잠 못 드는 밤",
  "장 컨디션",
  "임산부 첫 처방",
  "눈의 피로",
];

function searchProducts(q: string, list: Product[]): Product[] {
  const query = q.trim().toLowerCase();
  if (!query) return [];
  return list.filter((p) => {
    const hay = [
      p.name,
      p.nameEn ?? "",
      p.brand,
      p.categoryName,
      p.category,
      p.hero,
      ...(p.ingredients ?? []),
    ]
      .join(" ")
      .toLowerCase();
    return hay.includes(query);
  });
}

function buildCompletions(q: string, list: Product[]): string[] {
  const query = q.trim().toLowerCase();
  if (!query) return [];
  const set = new Set<string>();
  list.forEach((p) => {
    [p.name, p.nameEn ?? "", p.categoryName, p.brand, ...(p.ingredients ?? [])].forEach((t) => {
      if (t && t.toLowerCase().includes(query) && t.toLowerCase() !== query) {
        set.add(t);
      }
    });
  });
  return Array.from(set).slice(0, 5);
}

export default function SearchPage() {
  const reduce = useReducedMotion();
  const [value, setValue] = useState("");
  const [recents, setRecents] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Load recents
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setRecents(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  // Persist recents
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recents));
    } catch {}
  }, [recents, hydrated]);

  const commitTerm = useCallback((term: string) => {
    const t = term.trim();
    if (!t) return;
    setRecents((prev) => {
      const next = [t, ...prev.filter((x) => x !== t)].slice(0, MAX_RECENTS);
      return next;
    });
  }, []);

  const onPickTerm = useCallback(
    (term: string) => {
      setValue(term);
      commitTerm(term);
    },
    [commitTerm]
  );

  const removeRecent = useCallback((term: string) => {
    setRecents((prev) => prev.filter((x) => x !== term));
  }, []);

  const clearRecents = useCallback(() => setRecents([]), []);

  const hasQuery = value.trim().length > 0;

  const results = useMemo(
    () => (hasQuery ? searchProducts(value, products) : []),
    [value, hasQuery]
  );

  const completions = useMemo(
    () => (hasQuery ? buildCompletions(value, products) : []),
    [value, hasQuery]
  );

  return (
    <div className="container max-w-[480px] pt-4 pb-24">
      {/* Eyebrow */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: -6 }}
        animate={reduce ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="flex items-center gap-3 mb-3"
      >
        <span className="block w-6 h-px bg-ink-300" />
        <span className="eyebrow">Search · 처방 찾기</span>
      </motion.div>

      <SearchInput
        value={value}
        onChange={setValue}
        onSubmit={(v) => commitTerm(v)}
      />

      <div className="relative mt-7">
        <AnimatePresence mode="wait" initial={false}>
          {!hasQuery ? (
            <motion.div
              key="empty"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.42, ease }}
              className="space-y-9"
            >
              <RecentSearches
                recents={recents}
                onPick={onPickTerm}
                onRemove={removeRecent}
                onClear={clearRecents}
              />

              <PopularSearches onPick={onPickTerm} />

              <section className="space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-sage-700" strokeWidth={1.6} />
                  <h2 className="text-body-sm font-medium text-ink-700 tracking-tight">
                    약사가 추천하는 검색
                  </h2>
                </div>
                <p className="text-[11px] text-ink-500 tracking-tight">
                  오늘의 처방을 위한 작은 단서.
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {PHARMACIST_PROMPTS.map((p, i) => (
                    <motion.button
                      key={p}
                      type="button"
                      onClick={() => onPickTerm(p)}
                      initial={reduce ? false : { opacity: 0, scale: 0.94 }}
                      animate={reduce ? undefined : { opacity: 1, scale: 1 }}
                      transition={{ duration: 0.45, delay: i * 0.04, ease }}
                      className={cn(
                        "tap inline-flex items-center h-9 px-3.5 rounded-full",
                        "bg-sage-100/60 border border-sage-200/60 text-body-sm text-sage-800 tracking-tight",
                        "hover:bg-sage-100 transition-colors duration-320 ease-premium"
                      )}
                    >
                      {p}
                    </motion.button>
                  ))}
                </div>
              </section>

              <div className="rule mt-6" />

              <p className="text-center text-[11px] text-ink-500 tracking-tight">
                약사에게 직접 묻고 싶다면{" "}
                <a href="/consult" className="text-sage-700 underline underline-offset-2">
                  1:1 상담
                </a>
                도 가능합니다.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={`q-${value}-${results.length}`}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.42, ease }}
              className="space-y-7"
            >
              <Suggestions
                query={value}
                completions={completions}
                products={results}
                onPickTerm={onPickTerm}
              />
              <div className="rule" />
              <SearchResults query={value} results={results} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
