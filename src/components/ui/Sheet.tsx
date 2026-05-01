"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type SheetProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  side?: "bottom" | "right";
  className?: string;
  ariaLabel?: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function Sheet({
  open, onClose, children, side = "bottom", className, ariaLabel,
}: SheetProps) {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const variants =
    side === "bottom"
      ? { initial: { y: "100%" }, animate: { y: 0 }, exit: { y: "100%" } }
      : { initial: { x: "100%" }, animate: { x: 0 }, exit: { x: "100%" } };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80]"
          initial="initial" animate="animate" exit="exit"
          aria-label={ariaLabel}
          role="dialog"
          aria-modal
        >
          <motion.div
            className="absolute inset-0 bg-ink-900/35 backdrop-blur-sm"
            variants={{
              initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 },
            }}
            transition={{ duration: reduce ? 0 : 0.32, ease }}
            onClick={onClose}
          />
          <motion.div
            className={cn(
              "absolute bg-cream-50 shadow-lift overflow-hidden",
              side === "bottom"
                ? "left-0 right-0 bottom-0 max-h-[92vh] rounded-t-2xl"
                : "top-0 bottom-0 right-0 w-[88vw] max-w-md",
              className
            )}
            variants={variants}
            transition={{ duration: reduce ? 0 : 0.48, ease }}
            drag={side === "bottom" ? "y" : false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.4 }}
            onDragEnd={(_, info) => {
              if (side === "bottom" && info.offset.y > 120) onClose();
            }}
          >
            {side === "bottom" && (
              <div className="pt-2 pb-1 flex justify-center">
                <span className="block w-10 h-1 rounded-full bg-ink-200" />
              </div>
            )}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
