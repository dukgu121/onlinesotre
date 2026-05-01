"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { categories } from "@/lib/data";

type Props = {
  activeSlug?: string;
  /** TopBar height offset in px so this can stick under it */
  topOffset?: number;
};

/**
 * Sticky horizontal chip rail.
 * - Active chip uses layoutId to morph between selections.
 * - Becomes blurred/hairline when scrolled past hero.
 */
export function CategoryRail({ activeSlug, topOffset = 56 }: Props) {
  const [activated, setActivated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      // Activate translucent state once the rail starts sticking
      setActivated(r.top <= topOffset + 1);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [topOffset]);

  // Auto-scroll active chip into view
  const trackRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!activeSlug || !trackRef.current) return;
    const node = trackRef.current.querySelector<HTMLAnchorElement>(
      `[data-slug="${activeSlug}"]`
    );
    if (node) {
      node.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeSlug, reduce]);

  const items = [{ slug: "all", name: "전체", nameEn: "All" }, ...categories];

  return (
    <div
      ref={ref}
      className={cn(
        "sticky z-30 transition-[background-color,backdrop-filter,border-color] duration-320 ease-premium",
        activated
          ? "bg-cream-50/85 backdrop-blur-md hairline-b"
          : "bg-cream/0"
      )}
      style={{ top: topOffset }}
    >
      <div
        ref={trackRef}
        className="container max-w-[480px] overflow-x-auto no-scrollbar snap-row py-3"
      >
        <div className="flex gap-2 pr-6">
          {items.map((c) => {
            const isActive =
              (c.slug === "all" && !activeSlug) || c.slug === activeSlug;
            const href = c.slug === "all" ? "/c/all" : `/c/${c.slug}`;
            return (
              <Link
                key={c.slug}
                href={href}
                data-slug={c.slug}
                prefetch={false}
                className={cn(
                  "tap snap-item relative flex items-center gap-1.5 h-9 px-4 rounded-full",
                  "text-body-sm font-medium whitespace-nowrap transition-colors duration-320",
                  isActive
                    ? "text-cream-50"
                    : "text-ink-600 border border-ink-200 hover:text-ink-800"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="category-pill"
                    className="absolute inset-0 rounded-full bg-ink-900 -z-0"
                    transition={
                      reduce
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 380, damping: 32 }
                    }
                  />
                )}
                <span className="relative z-10">{c.name}</span>
                {("nameEn" in c) && c.nameEn && (
                  <span
                    className={cn(
                      "relative z-10 text-[10px] tracking-[0.18em] uppercase font-serif italic",
                      isActive ? "text-cream-200/80" : "text-ink-400"
                    )}
                  >
                    {c.nameEn}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
