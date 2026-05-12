"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeUp, headlineReveal, revealClip, stagger, viewportOnce, luxuryEase } from "@/lib/motion";

/**
 * "KÝ ỨC HƯƠNG VỊ QUÊ NHÀ" — đã trim còn 2 chương để dồn nhịp cho commerce.
 * Chương I: Buổi chợ phiên
 * Chương II: Đêm ba mươi Tết (full-bleed)
 */

function ChapterLabel({ roman, title }: { roman: string; title: string }) {
  return (
    <motion.div variants={fadeUp} className="flex flex-col items-center text-center">
      <span className="font-display italic text-base text-brick-500/85 tracking-wide">
        — Chương {roman} —
      </span>
      <h3
        className="mt-4 font-display text-[28px] font-light italic text-wood-900 sm:text-[36px]"
        style={{ letterSpacing: "-0.005em" }}
      >
        {title}
      </h3>
      <span className="mt-6 h-px w-12 bg-gold-500/55" />
    </motion.div>
  );
}

function ParallaxImage({
  src,
  alt,
  aspect = "aspect-[4/5]",
  className = "",
}: {
  src: string;
  alt: string;
  aspect?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <motion.figure
      ref={ref}
      variants={revealClip}
      className={`relative overflow-hidden rounded-[2rem] shadow-card ${aspect} ${className}`}
    >
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width:1024px) 45vw, 90vw"
          className="object-cover transition-transform duration-[2400ms] ease-expo-out hover:scale-[1.04]"
          style={{ transform: "scale(1.12)" }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-wood-950/12" />
    </motion.figure>
  );
}

export function Memory() {
  return (
    <section id="ky-uc" className="relative overflow-hidden bg-cream-50 py-16 sm:py-28 lg:py-44">
      <div className="pointer-events-none absolute inset-0 warm-light opacity-90" />
      <div className="pointer-events-none absolute inset-0 indo-clouds opacity-30" />

      <div className="relative mx-auto max-w-6xl px-6 sm:px-8">
        {/* HEADER */}
        <motion.div
          variants={stagger(0.18, 0.14)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-center"
        >
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-brick-500/40" />
            <span className="text-[10px] font-medium uppercase tracking-luxury text-brick-500">
              Một thiên ký
            </span>
            <span className="h-px w-10 bg-brick-500/40" />
          </motion.div>

          <motion.h2
            variants={headlineReveal}
            className="mt-10 font-display text-display-lg font-light text-wood-900 text-balance sm:text-display-xl"
            style={{ letterSpacing: "-0.005em" }}
          >
            Ký ức <span className="italic text-brick-500/95">hương vị</span> quê nhà
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-10 max-w-md text-base leading-[2.1] text-wood-500 text-pretty sm:text-[17px]"
          >
            Có những hương vị không nằm trên lưỡi. <br />
            Chúng nằm trong ký ức.
          </motion.p>
        </motion.div>

        {/* ════════════════════════ CHƯƠNG I — Chợ phiên ═══════════════════ */}
        <div className="mt-14 sm:mt-24 lg:mt-44">
          <motion.div
            variants={stagger(0.16, 0.14)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid items-center gap-14 lg:grid-cols-12 lg:gap-24"
          >
            <div className="lg:col-span-6 lg:order-1">
              <ParallaxImage
                src="/images/keo-lac/keo-lac-1.jpg"
                alt="Kẹo lạc bên ấm trà — buổi sớm quê"
              />
              <figcaption className="mt-6 px-2 font-display italic text-sm leading-relaxed text-wood-500">
                Bóng kẹo lạc bên tách trà sớm.
              </figcaption>
            </div>

            <div className="lg:col-span-6 lg:order-2">
              <ChapterLabel roman="I" title="Buổi chợ phiên" />

              <motion.p
                variants={fadeUp}
                className="drop-cap mt-14 text-lg leading-[2.05] text-wood-700 text-pretty sm:text-xl"
              >
                Phiên chợ sớm. Mâm kẹo lạc phủ giấy đỏ. Tiếng rao của bà len qua sương — <em className="font-display italic">“Ai kẹo lạc đê…”</em>
              </motion.p>

              <motion.blockquote
                variants={fadeUp}
                className="mt-10 border-l border-brick-500/45 pl-7"
              >
                <p className="font-display text-xl italic leading-snug text-wood-900 sm:text-2xl">
                  Ngọt của kẹo lạc — không phải ngọt đường. <br />
                  Là ngọt của một buổi sáng đã rất xa.
                </p>
              </motion.blockquote>
            </div>
          </motion.div>
        </div>

        {/* ════════════════════════ CHƯƠNG II — Đêm 30 Tết (Full-bleed) ═══ */}
        <div className="mt-16 sm:mt-28 lg:mt-52">
          <motion.div
            variants={stagger(0.16, 0.14)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <ChapterLabel roman="II" title="Đêm ba mươi Tết" />

            <div className="mx-auto mt-16 max-w-5xl">
              <ParallaxImage
                src="/images/keo-lac/keo-lac-33.jpg"
                alt="Bộ ấm trà cổ và dĩa kẹo lạc — đêm ba mươi Tết"
                aspect="aspect-[21/10]"
                className="shadow-cinematic letterbox rounded-[2.5rem]"
              />
            </div>

            <motion.div variants={fadeUp} className="mx-auto mt-14 max-w-2xl">
              <p className="drop-cap text-lg leading-[2.1] text-wood-700 text-pretty sm:text-xl">
                Mâm bánh kẹo bày lên bàn thờ tổ tiên. Kẹo lạc hồng đỏ tươi. Bánh cáy vàng óng dưới ánh nến. Khói trắng bánh chưng quyện vào sương khuya.
              </p>

              <p
                className="mt-12 text-center font-display text-[26px] font-light italic leading-snug text-brick-500 sm:text-[32px]"
                style={{ letterSpacing: "-0.005em" }}
              >
                Tết về — không phải bằng pháo. <br />
                Tết về bằng mùi mạch nha trong gió.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* CLOSING */}
        <motion.div
          variants={stagger(0.2, 0.16)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 text-center sm:mt-24 lg:mt-44"
        >
          <motion.span
            variants={{
              hidden: { scaleX: 0 },
              visible: { scaleX: 1, transition: { duration: 1.4, ease: luxuryEase } },
            }}
            className="mx-auto block h-px w-16 origin-center bg-gold-500/70"
          />
          <motion.p
            variants={headlineReveal}
            className="mx-auto mt-12 max-w-3xl font-display text-2xl font-light italic leading-[1.4] text-wood-900 text-balance sm:text-[32px]"
            style={{ letterSpacing: "-0.005em" }}
          >
            “Đặc sản quê nhà — không chỉ là vị bánh, viên kẹo. Là cả một thế giới đã rời xa.”
          </motion.p>
          <motion.span
            variants={fadeUp}
            className="mt-10 inline-block text-[10px] uppercase tracking-luxury text-brick-500"
          >
            Đặc Sản Quê Nhà
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}
