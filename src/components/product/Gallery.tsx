"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { Heart, Share2 } from "lucide-react";
import { ProductImage } from "@/components/ui/ProductImage";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

type Composition = {
  ratio: "square" | "portrait" | "tall";
  align: "center" | "tilt" | "zoom";
};

const COMPOSITIONS: Composition[] = [
  { ratio: "portrait", align: "center" },
  { ratio: "portrait", align: "tilt" },
  { ratio: "portrait", align: "zoom" },
];

export function Gallery({ product }: { product: Product }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [liked, setLiked] = useState(false);
  const [pulse, setPulse] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.98]);
  const vignetteOpacity = useTransform(scrollYProgress, [0, 1], [0.45, reduce ? 0.45 : 0.85]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const w = el.clientWidth;
      if (!w) return;
      const idx = Math.round(el.scrollLeft / w);
      if (idx !== active) setActive(idx);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [active]);

  const onLikeTap = () => {
    setLiked((v) => !v);
    setPulse((p) => p + 1);
  };

  const onShare = async () => {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({
          title: product.name,
          text: product.hero,
          url: typeof window !== "undefined" ? window.location.href : undefined,
        });
      } catch {
        /* user dismissed */
      }
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-cream-100"
      style={{ height: "100vh", maxHeight: 760, minHeight: 560 }}
    >
      {/* Editorial top label */}
      <div className="absolute top-0 inset-x-0 z-20 pt-[64px] px-5 flex items-start justify-between pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.2 }}
          className="flex flex-col gap-1"
        >
          <span className="eyebrow text-ink-700">{product.brand}</span>
          <span className="text-[10px] tracking-[0.18em] uppercase text-ink-500">
            {product.categoryName}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.28 }}
          className="flex items-center gap-1.5 pointer-events-auto"
        >
          <button
            aria-label="공유"
            onClick={onShare}
            className="tap p-2 rounded-full bg-cream-50/80 backdrop-blur-sm hairline border border-ink-100/60 text-ink-700"
          >
            <Share2 className="w-[18px] h-[18px]" strokeWidth={1.6} />
          </button>
          <button
            aria-label={liked ? "찜 해제" : "찜하기"}
            aria-pressed={liked}
            onClick={onLikeTap}
            className="tap relative p-2 rounded-full bg-cream-50/80 backdrop-blur-sm hairline border border-ink-100/60"
          >
            <motion.span
              key={pulse}
              initial={{ scale: 1 }}
              animate={{ scale: liked ? [1, 1.32, 1] : [1, 0.86, 1] }}
              transition={{ duration: 0.46, ease }}
              className="block"
            >
              <Heart
                className={cn(
                  "w-[18px] h-[18px] transition-colors duration-320",
                  liked ? "text-signal-red" : "text-ink-700"
                )}
                strokeWidth={1.6}
                fill={liked ? "currentColor" : "none"}
              />
            </motion.span>
            <AnimatePresence>
              {liked && (
                <motion.span
                  key={`ripple-${pulse}`}
                  initial={{ scale: 0.6, opacity: 0.4 }}
                  animate={{ scale: 2.2, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease }}
                  className="absolute inset-0 rounded-full border border-signal-red/60 pointer-events-none"
                />
              )}
            </AnimatePresence>
          </button>
        </motion.div>
      </div>

      {/* Gallery carousel */}
      <motion.div
        style={{ scale }}
        className="absolute inset-0 flex items-center justify-center px-5 pt-[84px] pb-12"
      >
        <div
          ref={scrollerRef}
          className="snap-row no-scrollbar w-full h-full overflow-x-auto flex"
        >
          {COMPOSITIONS.map((c, i) => (
            <div
              key={i}
              className="snap-item shrink-0 w-full h-full flex items-center justify-center px-1"
            >
              <GalleryFrame product={product} composition={c} index={i} />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Vignette overlay */}
      <motion.div
        style={{ opacity: vignetteOpacity }}
        className="absolute inset-0 pointer-events-none bg-vignette"
        aria-hidden
      />

      {/* Page indicator */}
      <div className="absolute bottom-6 inset-x-0 z-20 flex items-center justify-center gap-1.5">
        {COMPOSITIONS.map((_, i) => (
          <button
            key={i}
            aria-label={`${i + 1}번째 이미지`}
            onClick={() => {
              const el = scrollerRef.current;
              if (!el) return;
              el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
            }}
            className="tap h-1.5 rounded-full overflow-hidden"
          >
            <motion.span
              layout
              transition={{ duration: 0.42, ease }}
              className={cn(
                "block h-1.5 rounded-full transition-colors duration-320",
                active === i ? "bg-ink-800 w-6" : "bg-ink-300 w-1.5"
              )}
            />
          </button>
        ))}
      </div>
    </section>
  );
}

function GalleryFrame({
  product,
  composition,
  index,
}: {
  product: Product;
  composition: Composition;
  index: number;
}) {
  const reduce = useReducedMotion();

  if (composition.align === "tilt") {
    return (
      <motion.div
        initial={{ opacity: 0, rotate: -3, scale: 0.96 }}
        animate={{ opacity: 1, rotate: reduce ? 0 : -2.5, scale: 1 }}
        transition={{ duration: 0.9, ease, delay: 0.1 }}
        className="relative w-[78%] max-w-[340px]"
      >
        <ProductImage product={product} ratio="portrait" animate={false} />
        <div className="absolute -top-3 -right-3 w-16 h-16 rounded-full bg-cream-50 hairline border border-ink-100 shadow-card flex flex-col items-center justify-center">
          <span className="text-[8px] tracking-[0.2em] uppercase text-ink-500">
            № {String(index + 1).padStart(2, "0")}
          </span>
          <span className={cn("font-serif text-title-md", product.accent)}>
            {product.glyph}
          </span>
        </div>
      </motion.div>
    );
  }

  if (composition.align === "zoom") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease }}
        className="relative w-[88%] max-w-[400px]"
      >
        <div
          className={cn(
            "relative aspect-[4/5] rounded-lg overflow-hidden bg-gradient-to-br paper-grain",
            product.imageTone
          )}
        >
          <div className="absolute inset-0 bg-vignette opacity-50 pointer-events-none" />
          <div className="absolute inset-x-6 top-6 flex items-center justify-between text-ink-600">
            <span className="text-[9px] tracking-[0.22em] uppercase">
              Ingredient · Glyph
            </span>
            <span className="text-[9px] tracking-[0.22em] uppercase">
              {product.capacity.split("·")[0].trim()}
            </span>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.86, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.1, ease, delay: 0.2 }}
              className={cn(
                "font-serif leading-none select-none",
                product.accent
              )}
              style={{ fontSize: "clamp(140px, 36vw, 200px)" }}
            >
              {product.glyph}
            </motion.div>
          </div>
          <div className="absolute inset-x-6 bottom-6 flex items-end justify-between text-ink-600">
            <span className="text-[10px] tracking-[0.2em] uppercase">
              {product.brand}
            </span>
            <span className="font-serif italic text-body-sm text-ink-700">
              {product.nameEn ?? product.categoryName}
            </span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease }}
      className="w-[82%] max-w-[360px]"
    >
      <ProductImage product={product} ratio="portrait" animate={false} />
    </motion.div>
  );
}
