"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { luxuryEase, viewportOnce } from "@/lib/motion";

/**
 * Cinematic interlude — section full-bleed dùng để ngắt nhịp giữa nội dung.
 * Ảnh nền lớn + vignette + 1 câu quote italic Lora ở giữa.
 * Có parallax nhẹ khi scroll (ảnh dịch chậm hơn nội dung).
 */
export function Interlude({
  image,
  alt,
  quote,
  attribution,
}: {
  image: string;
  alt: string;
  quote: string;
  attribution?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Parallax: ảnh dịch -10% → +10% trong khi scroll
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1.2]);

  return (
    <section
      ref={ref}
      className="relative h-[88svh] min-h-[560px] w-full overflow-hidden bg-wood-950"
    >
      {/* Ảnh nền với parallax */}
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Vignette + gradient tối */}
      <div className="absolute inset-0 bg-gradient-to-b from-wood-950/40 via-wood-950/20 to-wood-950/70" />
      <div className="absolute inset-0 bg-vignette" />

      {/* Texture giấy nhẹ */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay bg-paper-grain bg-grain" />

      {/* Quote ở giữa */}
      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <motion.figure
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={{
            hidden: {},
            visible: { transition: { delayChildren: 0.1, staggerChildren: 0.18 } },
          }}
          className="max-w-3xl text-center"
        >
          <motion.span
            variants={{
              hidden: { opacity: 0, scaleX: 0 },
              visible: { opacity: 1, scaleX: 1, transition: { duration: 1.2, ease: luxuryEase } },
            }}
            className="mx-auto block h-px w-16 origin-center bg-gold-500"
          />
          <motion.blockquote
            variants={{
              hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
              visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.4, ease: luxuryEase } },
            }}
            className="mt-8 font-display text-3xl italic leading-snug text-cream-50 text-balance sm:text-4xl md:text-5xl"
          >
            “{quote}”
          </motion.blockquote>
          {attribution && (
            <motion.figcaption
              variants={{
                hidden: { opacity: 0, y: 14 },
                visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: luxuryEase } },
              }}
              className="mt-8 text-[11px] uppercase tracking-luxury text-gold-400"
            >
              — {attribution}
            </motion.figcaption>
          )}
        </motion.figure>
      </div>
    </section>
  );
}
