/**
 * Motion primitives — Framer Motion variants.
 * Tông cinematic: chậm hơn, easing expo-out, không bouncy.
 */
import type { Variants } from "framer-motion";

// Easing chuẩn — expo-out, mượt như Apple / luxury brands.
export const luxuryEase = [0.16, 1, 0.3, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.4, ease: luxuryEase },
  },
};

export const stagger = (delayChildren = 0.15, staggerChildren = 0.14): Variants => ({
  hidden: {},
  visible: { transition: { delayChildren, staggerChildren } },
});

// Cinematic image reveal — clip-path từ dưới lên (chậm hơn)
export const revealClip: Variants = {
  hidden: { clipPath: "inset(100% 0 0 0)", opacity: 0 },
  visible: {
    clipPath: "inset(0% 0 0 0)",
    opacity: 1,
    transition: { duration: 1.8, ease: luxuryEase },
  },
};

// Headline reveal — blur + fade + slight y
export const headlineReveal: Variants = {
  hidden: { opacity: 0, y: 32, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.6, ease: luxuryEase },
  },
};

export const viewportOnce = { once: true, amount: 0.2 } as const;
export const viewportEarly = { once: true, amount: 0.05 } as const;
