"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Facebook, MapPin } from "lucide-react";
import { TESTIMONIALS, BRAND } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StarRating } from "@/components/ui/StarRating";
import { luxuryEase } from "@/lib/motion";

/**
 * Slider cảm nhận khách — luxury paper-note design.
 * Auto-advance 7s. Có CTA dẫn về fanpage để xem review thật.
 */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const timer = useRef<NodeJS.Timeout | null>(null);

  const next = () => setIndex((i) => (i + 1) % TESTIMONIALS.length);
  const prev = () => setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  useEffect(() => {
    timer.current && clearTimeout(timer.current);
    timer.current = setTimeout(next, 8500);  // chậm hơn, editorial nhịp đọc
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [index]);

  const t = TESTIMONIALS[index];

  return (
    <section id="cam-nhan" className="relative bg-cream-50 py-14 sm:py-24 lg:py-40">
      <div className="pointer-events-none absolute inset-0 opacity-40 bg-paper-grain bg-grain" />

      <div className="relative mx-auto max-w-5xl px-6 sm:px-8">
        <SectionHeader
          eyebrow="Cảm nhận khách hàng"
          number="06"
          total="06"
          title="Khách hàng nói gì về chúng tôi"
          description="Niềm tin từ khách hàng trên khắp Việt Nam là động lực để chúng tôi giữ vững chất lượng."
        />

        <div className="relative mt-10 sm:mt-16 lg:mt-20">
          <div className="relative mx-auto max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.figure
                key={t.name + t.content.slice(0, 8)}
                initial={{ opacity: 0, y: 32, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -32, scale: 0.97 }}
                transition={{ duration: 0.7, ease: luxuryEase }}
                className="relative overflow-hidden rounded-[2.5rem] bg-cream-50 p-10 shadow-card sm:p-14 ornament-corner text-wood-700"
              >
                <Quote className="absolute right-10 top-10 h-20 w-20 text-brick-500/10" strokeWidth={1.5} />

                <blockquote className="relative">
                  <StarRating value={t.rating} size={18} />
                  <p
                    className="mt-10 font-display text-[24px] font-light leading-[1.55] text-wood-900 sm:text-[30px] sm:leading-[1.45]"
                    style={{ letterSpacing: "-0.003em" }}
                  >
                    “{t.content}”
                  </p>
                </blockquote>

                <figcaption className="mt-10 flex flex-col gap-3 border-t border-wood-100/70 pt-7 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-display text-[19px] font-medium text-wood-900">
                      {t.name}
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 text-[10px] uppercase tracking-luxury text-brick-500">
                      <MapPin size={11} /> {t.city}
                    </p>
                  </div>
                  {t.product && (
                    <span className="inline-flex items-center self-start rounded-full bg-wood-900/5 px-4 py-2 text-xs font-medium text-wood-700 sm:self-auto">
                      Đã mua: <span className="ml-1.5 font-semibold">{t.product}</span>
                    </span>
                  )}
                </figcaption>
              </motion.figure>
            </AnimatePresence>

            {/* Prev / Next — luxury circle buttons */}
            <button
              onClick={prev}
              aria-label="Cảm nhận trước"
              className="absolute -left-2 top-1/2 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-cream-50 text-wood-900 shadow-card transition-all duration-500 ease-expo-out hover:bg-brick-500 hover:text-cream-50 hover:scale-105 sm:-left-6 lg:-left-16"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              aria-label="Cảm nhận tiếp"
              className="absolute -right-2 top-1/2 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-cream-50 text-wood-900 shadow-card transition-all duration-500 ease-expo-out hover:bg-brick-500 hover:text-cream-50 hover:scale-105 sm:-right-6 lg:-right-16"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Dots */}
          <div className="mt-12 flex items-center justify-center gap-2.5">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Tới cảm nhận ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-600 ease-expo-out ${
                  i === index ? "w-12 bg-brick-500" : "w-4 bg-wood-300/40 hover:bg-wood-500/50"
                }`}
              />
            ))}
          </div>

          {/* CTA Facebook */}
          <div className="mt-14 text-center">
            <a
              href={BRAND.facebook}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full border border-wood-500/25 bg-cream-50 px-7 py-3.5 text-[11px] font-semibold uppercase tracking-luxury text-wood-700 transition-all duration-500 ease-expo-out hover:-translate-y-0.5 hover:border-[#1877F2] hover:bg-[#1877F2] hover:text-cream-50"
            >
              <Facebook size={15} />
              Xem thêm đánh giá thật trên fanpage
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
