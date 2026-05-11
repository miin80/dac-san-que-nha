"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, viewportOnce, stagger, revealClip, luxuryEase, headlineReveal } from "@/lib/motion";

/**
 * Section "Câu chuyện thương hiệu" — editorial luxury, không phải pillar box.
 *
 * Bố cục: 2 cột so le trên dưới, mỗi "lát cắt" có:
 *   - Ảnh thật vuông góc với text
 *   - 1 nhãn nhỏ (Nguyên liệu / Cách làm / ...)
 *   - 1 câu khẳng định italic Lora
 *   - 2-3 dòng mô tả ngắn
 *
 * KHÔNG dùng icon Wheat/Hand/Leaf/Heart (cảm giác SaaS landing page).
 */

type Vignette = {
  label: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  reverse?: boolean;
};

const VIGNETTES: Vignette[] = [
  {
    label: "Nguyên liệu",
    title: "Lạc rang vàng, mạch nha tự nấu",
    body: "Hạt lạc tuyển vùng Nghệ — Hà Tĩnh, rang tay đến độ vàng nâu vừa độ. Mạch nha đun lửa nhỏ suốt nhiều giờ. Không phẩm màu, không phụ gia.",
    image: "/images/keo-lac/keo-lac-2.jpg",
    imageAlt: "Cận cảnh kẹo lạc với hạt lạc rang nguyên vẹn",
  },
  {
    label: "Bàn tay nghệ nhân",
    title: "Mẻ kẹo nấu sớm, kéo bằng tay",
    body: "Bốn giờ sáng, làng đã thức. Bác thợ kéo từng mẻ kẹo dồi trắng muốt — hai cánh tay chai sạn vì mấy chục năm cầm cây kéo gỗ.",
    image: "/images/keo-doi/keo-doi-1.jpg",
    imageAlt: "Kẹo dồi lạc thủ công bên ấm gốm cổ",
    reverse: true,
  },
  {
    label: "Hương vị quê",
    title: "Một đời thợ, một nghề thủ công",
    body: "Công thức truyền nhiều thế hệ. Người làm nhớ ai — người ăn nhớ gì. Mỗi miếng kẹo gói lại ký ức Tết quê, phiên chợ chiều, ấm trà bố pha.",
    image: "/images/banh-cay/banh-cay-3.jpg",
    imageAlt: "Bánh cáy và tách trà — chiều quê yên ả",
  },
];

function VignetteRow({ v, index }: { v: Vignette; index: number }) {
  const reverse = v.reverse;
  return (
    <motion.div
      variants={stagger(0.16, 0.14)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="grid items-center gap-12 lg:grid-cols-12 lg:gap-20"
    >
      {/* Ảnh */}
      <motion.figure
        variants={revealClip}
        className={`relative lg:col-span-7 ${reverse ? "lg:order-2" : "lg:order-1"}`}
      >
        <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] shadow-card">
          <Image
            src={v.image}
            alt={v.imageAlt}
            fill
            sizes="(min-width:1024px) 55vw, 90vw"
            className="object-cover transition-transform duration-[2200ms] ease-expo-out hover:scale-[1.04]"
          />
          {/* Light wash bottom — depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-wood-950/12 to-transparent" />
        </div>
      </motion.figure>

      {/* Nội dung */}
      <div className={`lg:col-span-5 ${reverse ? "lg:order-1 lg:pr-6" : "lg:order-2 lg:pl-6"}`}>
        <motion.div variants={fadeUp} className="flex items-center gap-4">
          <span className="font-display italic text-sm text-brick-500/85 tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="h-px w-8 bg-brick-500/40" />
          <span className="text-[10px] font-medium uppercase tracking-luxury text-brick-500">
            {v.label}
          </span>
        </motion.div>

        <motion.h3
          variants={headlineReveal}
          className="mt-7 font-display text-3xl font-light text-wood-900 leading-[1.15] text-balance sm:text-[36px]"
          style={{ letterSpacing: "-0.005em" }}
        >
          {v.title}
        </motion.h3>

        <motion.p
          variants={fadeUp}
          className="mt-8 text-base leading-[2] text-wood-500 text-pretty sm:text-[17px]"
        >
          {v.body}
        </motion.p>
      </div>
    </motion.div>
  );
}

export function Story() {
  return (
    <section id="gioi-thieu" className="relative py-16 sm:py-28 lg:py-48">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        {/* ────────── HEADER ────────── */}
        <motion.div
          variants={stagger(0.18, 0.14)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-5">
            <span className="section-number">03 / 06</span>
            <span className="h-px w-8 bg-brick-500/40" />
            <span className="text-[10px] font-medium uppercase tracking-luxury text-brick-500">
              Câu chuyện thương hiệu
            </span>
          </motion.div>

          <motion.h2
            variants={headlineReveal}
            className="mt-10 font-display text-display-lg font-light text-wood-900 text-balance"
            style={{ letterSpacing: "-0.005em" }}
          >
            Hương vị tuổi thơ, <br />
            <span className="italic text-brick-500/95">gói trong từng miếng quà quê</span>
          </motion.h2>

          <motion.span
            variants={{
              hidden: { scaleX: 0 },
              visible: { scaleX: 1, transition: { duration: 1.4, ease: luxuryEase } },
            }}
            className="mx-auto mt-12 block h-px w-20 origin-center bg-gold-500/60"
          />

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-12 max-w-xl text-base leading-[2] text-wood-500 text-pretty sm:text-[17px]"
          >
            Chúng tôi bắt đầu từ ký ức rất đỗi quen thuộc — chiếc kẹo lạc bố mua sau phiên chợ, đĩa bánh cáy bà bày khi nhà có khách, ấm trà sen chiều ba mươi Tết.
          </motion.p>
        </motion.div>

        {/* ────────── VIGNETTES (3 rows, alternating) ────────── */}
        <div className="mt-16 space-y-20 sm:mt-28 sm:space-y-28 lg:mt-44 lg:space-y-44">
          {VIGNETTES.map((v, i) => (
            <VignetteRow key={v.title} v={v} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
