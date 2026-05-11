"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger, viewportOnce, luxuryEase } from "@/lib/motion";
import { cn } from "@/lib/cn";

/**
 * SectionHeader luxury — eyebrow + section number (01 / 06) + heading lớn + sub-text.
 * Hỗ trợ light variant cho nền tối.
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  number,
  total,
  align = "center",
  light = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  number?: string | number;     // VD "01"
  total?: string | number;      // VD "06" để hiện "01 / 06"
  align?: "center" | "left";
  light?: boolean;
}) {
  return (
    <motion.div
      variants={stagger(0.12, 0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
      )}
    >
      {(eyebrow || number) && (
        <motion.div
          variants={fadeUp}
          className={cn(
            "mb-7 flex items-center gap-5",
            align === "center" ? "justify-center" : "justify-start",
          )}
        >
          {number && (
            <span className={cn("section-number", light && "text-gold-400/90")}>
              {String(number).padStart(2, "0")}
              {total && <span className="opacity-50"> / {String(total).padStart(2, "0")}</span>}
            </span>
          )}
          {eyebrow && number && (
            <span className={cn("h-px w-8", light ? "bg-gold-400/50" : "bg-brick-500/40")} />
          )}
          {eyebrow && (
            <span
              className={cn(
                "text-[10px] font-semibold uppercase tracking-luxury",
                light ? "text-gold-400" : "text-brick-500",
              )}
            >
              {eyebrow}
            </span>
          )}
        </motion.div>
      )}

      <motion.h2
        variants={{
          hidden: { opacity: 0, y: 32, filter: "blur(10px)" },
          visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 1.6, ease: luxuryEase },
          },
        }}
        className={cn(
          "text-display-lg font-light text-balance",
          light ? "text-cream-50" : "text-wood-900",
        )}
        style={{ letterSpacing: "-0.005em" }}
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          variants={fadeUp}
          className={cn(
            "mx-auto mt-9 max-w-xl text-base leading-[2.05] text-pretty sm:text-[17px]",
            light ? "text-cream-100/82" : "text-wood-500",
          )}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
