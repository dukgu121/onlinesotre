"use client";

import { motion, useReducedMotion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

export function SuccessAnimation() {
  const reduce = useReducedMotion();

  return (
    <div className="relative w-32 h-32 mx-auto">
      {/* Soft halo */}
      <motion.div
        initial={reduce ? { opacity: 0.3 } : { scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.4 }}
        transition={{ duration: 0.9, ease, delay: 0.2 }}
        className="absolute inset-0 rounded-full bg-sage-100 blur-xl"
      />
      {/* Ring */}
      <motion.div
        initial={reduce ? { opacity: 0.6 } : { scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease }}
        className="absolute inset-2 rounded-full bg-cream-50 border border-sage-200/70"
      />

      <svg
        viewBox="0 0 120 120"
        className="absolute inset-0 w-full h-full"
        fill="none"
      >
        <motion.circle
          cx="60"
          cy="60"
          r="46"
          stroke="#5A6B52"
          strokeWidth="1.6"
          strokeLinecap="round"
          initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease, delay: 0.1 }}
        />
        <motion.path
          d="M40 62 L54 76 L82 46"
          stroke="#3F4D3A"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.7, ease, delay: 0.7 }}
        />
      </svg>
    </div>
  );
}
