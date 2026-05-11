"use client";

import { motion, type Variants } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { type ReactNode } from "react";

/**
 * Wrap children và áp dụng fade-up khi scroll vào viewport.
 * Dùng cho hầu hết block nội dung (paragraph, card, image…).
 */
export function FadeIn({
  children,
  delay = 0,
  className,
  as: Tag = "div",
  variants = fadeUp,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  variants?: Variants;
}) {
  const MotionTag = motion[Tag as "div"];
  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}
