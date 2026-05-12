"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CATEGORIES } from "@/lib/data";
import { fadeUp, stagger, viewportOnce, viewportEarly, luxuryEase } from "@/lib/motion";
import { SectionHeader } from "@/components/ui/SectionHeader";

/**
 * Danh mục đặc sản — 6 card chia 1/2/3 cột.
 * Mỗi card aspect 3/4 (cao hơn 4/5 cũ = cinematic hơn), hover zoom + overlay đậm thêm,
 * có số thứ tự sản phẩm rất nhỏ ở góc trên trái.
 */
export function Categories() {
  return (
    <section id="dac-san" className="relative bg-cream-50 py-14 sm:py-24 lg:py-40">
      <div className="pointer-events-none absolute inset-0 opacity-40 bg-paper-grain bg-grain" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <SectionHeader
          eyebrow="Danh mục đặc sản"
          number="02"
          total="06"
          title="Mỗi món bánh kẹo, một miền ký ức"
          description="Sáu hương vị truyền thống được tuyển chọn từ những làng nghề Bắc Bộ — đại diện cho tinh hoa bánh kẹo Việt qua bao thế hệ."
        />

        <motion.div
          variants={stagger(0.12, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportEarly}
          className="mt-9 grid gap-5 sm:mt-16 sm:gap-7 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-8"
        >
          {CATEGORIES.map((c, i) => (
            <motion.article
              key={c.slug}
              variants={fadeUp}
              id={c.slug}
              className="group relative aspect-[3/4] overflow-hidden rounded-[2rem] shadow-card transition-all duration-800 ease-expo-out hover:-translate-y-2 hover:shadow-card-hover"
            >
              <Image
                src={c.image}
                alt={c.name}
                fill
                sizes="(min-width:1024px) 32vw, (min-width:640px) 50vw, 100vw"
                className="object-cover transition-transform duration-[1500ms] ease-expo-out group-hover:scale-[1.08]"
              />

              {/* Overlay gradient — sâu hơn ở dưới */}
              <div className="absolute inset-0 bg-gradient-to-t from-wood-950/90 via-wood-950/35 to-transparent transition-opacity duration-700 group-hover:from-wood-950/95" />

              {/* Số chương — italic Lora luxury detail, không có background tag */}
              <span className="absolute top-7 left-7 font-display italic text-sm text-cream-50/80 tabular-nums">
                — {String(i + 1).padStart(2, "0")} —
              </span>

              {/* Nội dung */}
              <div className="absolute inset-x-0 bottom-0 p-7 sm:p-8">
                <div className="overflow-hidden">
                  <motion.h3
                    initial={{ y: 8 }}
                    whileInView={{ y: 0 }}
                    viewport={viewportOnce}
                    transition={{ duration: 0.8, ease: luxuryEase }}
                    className="font-display text-[26px] font-light text-cream-50 sm:text-[32px] leading-[1.15]"
                  >
                    {c.name}
                  </motion.h3>
                </div>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-cream-100/85">
                  {c.short}
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <span className="h-px w-8 bg-gold-400/70 transition-all duration-500 group-hover:w-14" />
                  <Link
                    href={`/cua-hang#${c.slug}`}
                    className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-luxury text-cream-50 transition-colors group-hover:text-gold-400"
                  >
                    Xem sản phẩm
                    <ArrowUpRight
                      size={13}
                      className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
