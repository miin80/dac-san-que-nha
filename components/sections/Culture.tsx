"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, stagger, viewportOnce, luxuryEase, revealClip } from "@/lib/motion";

/**
 * Section "Hương vị quê hương" — cinematic full-width.
 * 2 ảnh cinematic 5/7 col + nội dung 5/7 col, generous whitespace, quote italic lớn.
 */
export function Culture() {
  return (
    <section id="huong-vi" className="relative py-14 sm:py-24 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <motion.div
          variants={stagger(0.12, 0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid items-center gap-16 lg:grid-cols-12 lg:gap-24"
        >
          {/* Cụm ảnh trái */}
          <div className="relative lg:col-span-7">
            <motion.div
              variants={revealClip}
              className="relative aspect-[16/11] overflow-hidden rounded-[2.5rem] shadow-card"
            >
              <Image
                src="/images/banh-cay/banh-cay-3.jpg"
                alt="Tách trà và miếng bánh cáy"
                fill
                sizes="(min-width:1024px) 55vw, 90vw"
                className="object-cover transition-transform duration-[1500ms] ease-expo-out hover:scale-[1.05]"
              />
            </motion.div>
            <motion.div
              variants={revealClip}
              transition={{ delay: 0.2 }}
              className="absolute -bottom-14 -right-4 hidden aspect-[3/4] w-[36%] overflow-hidden rounded-[2rem] shadow-card-hover ring-[10px] ring-cream-100 sm:block"
            >
              <Image
                src="/images/keo-lac/keo-lac-33.jpg"
                alt="Bộ ấm trà cổ và dĩa kẹo lạc"
                fill
                sizes="(min-width:1024px) 22vw, 35vw"
                className="object-cover transition-transform duration-[1500ms] ease-expo-out hover:scale-[1.05]"
              />
            </motion.div>

            {/* Quote nổi - chỉ desktop, xoay nhẹ kiểu giấy ghi tay */}
            <motion.div
              initial={{ opacity: 0, rotate: -8, y: 20 }}
              whileInView={{ opacity: 1, rotate: -3, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: 0.5, duration: 1.1, ease: luxuryEase }}
              className="absolute -top-8 -left-4 hidden max-w-xs rounded-2xl bg-cream-50 p-5 shadow-card ring-1 ring-wood-100/60 lg:block"
            >
              <p className="font-display text-base italic text-wood-900 leading-snug">
                “Một ấm trà, vài miếng kẹo lạc — là đủ một chiều quê.”
              </p>
            </motion.div>
          </div>

          {/* Nội dung phải */}
          <div className="lg:col-span-5">
            <motion.div variants={fadeUp} className="flex items-center gap-5">
              <span className="section-number">05 / 06</span>
              <span className="h-px w-8 bg-brick-500/40" />
              <span className="text-[10px] font-semibold uppercase tracking-luxury text-brick-500">
                Hương vị quê hương
              </span>
            </motion.div>

            <motion.h2
              variants={{
                hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
                visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.15, ease: luxuryEase } },
              }}
              className="mt-8 font-display text-display-lg font-light text-wood-900 text-balance"
            >
              Một ấm trà nóng. <br />
              <span className="italic text-brick-500/95">Một đĩa kẹo.</span> <br />
              Một chiều quê.
            </motion.h2>

            <motion.p variants={fadeUp} className="mt-8 text-lg leading-[1.85] text-wood-500 sm:text-xl">
              Người Việt mình thưởng trà chậm. Tách trà bốc khói, đĩa bánh cáy cắt vuông vắn, miếng kẹo lạc giòn rụm — đủ để câu chuyện kéo dài cả chiều, đủ để Tết tròn vị, đủ để khách đến nhà nhớ mãi.
            </motion.p>

            <motion.p variants={fadeUp} className="mt-5 text-base leading-[1.85] text-wood-500">
              Mỗi miếng bánh kẹo trong khay chè quê không chỉ là món ăn — đó là cái cớ để gia đình quây quần, là tấm lòng người ở quê gửi gắm.
            </motion.p>

            {/* Khối quote dài */}
            <motion.blockquote
              variants={fadeUp}
              className="mt-12 rounded-2xl border-l-2 border-brick-500 bg-cream-50/80 p-7 backdrop-blur-sm"
            >
              <p className="font-display text-lg italic leading-relaxed text-wood-900 sm:text-xl">
                “Quà quê không nằm ở giá tiền. Nó nằm ở chỗ — người làm nhớ ai, người ăn nhớ gì.”
              </p>
              <footer className="mt-4 text-[10px] uppercase tracking-luxury text-brick-500">
                — Đặc Sản Quê Nhà
              </footer>
            </motion.blockquote>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
