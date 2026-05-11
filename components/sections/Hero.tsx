"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { BRAND } from "@/lib/data";
import { luxuryEase } from "@/lib/motion";

/**
 * Hero LUXURY EDITORIAL — không phải banner quảng cáo.
 *
 * Triết lý thiết kế:
 *  - Background BLUR 3-5px + scale 110% (để blur không lộ viền) + opacity giảm,
 *    chỉ là "nền không khí" chứ không phải ảnh quảng cáo.
 *  - Center spotlight ánh sáng warm tone (golden hour) hội tụ vào headline.
 *  - Vignette mạnh các góc — focus trung tâm.
 *  - Inline grain SVG để cảm giác phim 35mm.
 *  - Chỉ có 2 CTA, nhỏ gọn, không to-loud.
 *  - Letterbox top/bottom cinematic.
 *
 * Cảm giác mục tiêu: trang bìa magazine, không phải landing page Facebook.
 */

// Inline SVG grain — chỉ cho Hero, đặc nhẹ hơn so với GrainOverlay global
const heroGrainSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.1 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>`;
const heroGrainUrl = `url("data:image/svg+xml;utf8,${heroGrainSvg.replace(/#/g, "%23")}")`;

export function Hero() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.6]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative h-[112svh] min-h-[700px] w-full overflow-hidden bg-wood-950 letterbox"
    >
      {/* ─────────────── LAYER 1: Ảnh nền — blur + scale + zoom chậm ────────── */}
      <motion.div style={{ y: imageY }} className="absolute inset-0 will-change-transform">
        <div
          className="absolute inset-0 animate-slow-zoom"
          style={{
            transform: "scale(1.15)",
            filter: "blur(4px) saturate(0.85)",
          }}
        >
          <Image
            src="/images/keo-lac/keo-lac-33.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-90"
          />
        </div>
      </motion.div>

      {/* ─────────────── LAYER 2: Uniform dark wash ─────────────────────────── */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-wood-950/55"
      />

      {/* ─────────────── LAYER 3: Strong center vignette ────────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 60% at 50% 50%, transparent 0%, rgba(26,15,8,0.35) 60%, rgba(26,15,8,0.85) 100%)",
        }}
      />

      {/* ─────────────── LAYER 4: Warm center spotlight ─────────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 45% 55% at 50% 42%, rgba(212,176,101,0.14) 0%, rgba(212,176,101,0.05) 35%, transparent 70%)",
        }}
      />

      {/* ─────────────── LAYER 5: Inline grain noise ────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-90"
        style={{
          backgroundImage: heroGrainUrl,
          backgroundSize: "240px 240px",
        }}
      />

      {/* ─────────────── CONTENT ────────────────────────────────────────────── */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 sm:px-8 text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1.4, ease: luxuryEase }}
          className="inline-flex items-center gap-5 text-[10px] font-medium uppercase tracking-luxury text-gold-400/95 sm:text-[11px]"
        >
          <span className="h-px w-14 bg-gold-400/50" />
          Đặc sản truyền thống Việt Nam
          <span className="h-px w-14 bg-gold-400/50" />
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: "blur(14px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 1.1, duration: 1.8, ease: luxuryEase }}
          className="mt-12 max-w-5xl font-display text-display-2xl font-light text-cream-50 text-balance"
          style={{ letterSpacing: "-0.005em" }}
        >
          Chuẩn vị quê, <br />
          <span className="italic text-gold-400/95 font-light">sạch · chất · lành</span>
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.6, duration: 1.4, ease: luxuryEase }}
          className="mt-14 h-px w-28 origin-center bg-gold-400/60"
        />

        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.75, duration: 1.5, ease: luxuryEase }}
          className="mt-10 max-w-lg text-[15px] leading-[1.85] text-cream-50 text-pretty sm:mt-12 sm:text-base sm:leading-[2.05]"
          style={{
            textShadow: "0 1px 12px rgba(26, 15, 8, 0.6), 0 1px 3px rgba(26, 15, 8, 0.4)",
          }}
        >
          Bánh kẹo tuổi thơ — từ bàn tay thợ làng nghề Bắc Bộ,<br className="hidden sm:block" />
          theo công thức gia truyền lưu giữ qua nhiều thế hệ.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.05, duration: 1.4, ease: luxuryEase }}
          className="mt-16 flex flex-col items-center gap-4 sm:flex-row sm:gap-5"
        >
          <Link
            href="#dac-san"
            className="group inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-luxury text-cream-50 transition-colors duration-700 hover:text-gold-400"
          >
            <span className="h-px w-10 bg-cream-50/50 transition-all duration-700 group-hover:w-16 group-hover:bg-gold-400" />
            Khám phá đặc sản
            <ArrowRight size={14} strokeWidth={1.5} className="transition-transform duration-700 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </motion.div>

      {/* ─────────────── Scroll indicator ───────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.7, duration: 1.5 }}
        className="absolute inset-x-0 bottom-10 z-10 flex justify-center"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3 text-cream-100/55"
        >
          <span className="text-[9px] uppercase tracking-luxury">Cuộn xuống</span>
          <ChevronDown size={14} strokeWidth={1.3} />
        </motion.div>
      </motion.div>
    </section>
  );
}
