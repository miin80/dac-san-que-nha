"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import { REELS } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { fadeUp, stagger, viewportEarly, luxuryEase } from "@/lib/motion";

/**
 * Section Video — modal full-screen pattern.
 *
 * Lý do dùng modal thay vì play inline:
 *   - Tap card mở modal → video element được mount fresh → ref.play() work 100%
 *   - Mobile: full-screen experience giống TikTok / Instagram Reels
 *   - Chỉ 1 video play tại 1 thời điểm → tiết kiệm bandwidth
 *   - Có nút đóng X rõ ràng, ESC để đóng, click backdrop để đóng
 */

type Reel = typeof REELS[number];

export function VideoReels() {
  const [activeReel, setActiveReel] = useState<Reel | null>(null);

  return (
    <>
      <section className="relative bg-wood-950 py-14 sm:py-24 lg:py-40 text-cream-50">
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] bg-indochina-grid" />

        <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
          <SectionHeader
            eyebrow="Hậu trường làng nghề"
            number="04"
            total="06"
            title="Xem chúng tôi làm bánh, làm kẹo"
            description="Mỗi đoạn video kể một công đoạn — nấu mạch nha, kéo kẹo, cắt miếng, đóng gói. Bấm vào video để xem."
            light
          />

          <motion.div
            variants={stagger(0.06, 0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            className="mt-9 grid grid-cols-2 gap-4 sm:mt-16 sm:gap-7 lg:mt-20 lg:grid-cols-3 lg:gap-8"
          >
            {REELS.map((r, i) => (
              <ReelCard
                key={r.id}
                reel={r}
                index={i}
                priority={i < 2}
                onPlay={() => setActiveReel(r)}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Modal video — full-screen mobile, centered desktop */}
      <VideoModal reel={activeReel} onClose={() => setActiveReel(null)} />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* ReelCard                                                                    */
/* -------------------------------------------------------------------------- */

function ReelCard({
  reel,
  index,
  priority,
  onPlay,
}: {
  reel: Reel;
  index: number;
  priority: boolean;
  onPlay: () => void;
}) {
  return (
    <motion.button
      variants={fadeUp}
      onClick={onPlay}
      aria-label={`Phát video: ${reel.title}`}
      className="group relative aspect-[9/16] overflow-hidden rounded-[1.75rem] bg-wood-900 text-left shadow-card ring-1 ring-cream-50/10 transition-all duration-700 ease-expo-out hover:-translate-y-1 hover:shadow-card-hover ring-inset-luxury"
    >
      {/* Poster — luôn render, priority cho 2 card đầu */}
      <Image
        src={reel.poster}
        alt={reel.title}
        fill
        sizes="(min-width:1024px) 22vw, 45vw"
        priority={priority}
        className="object-cover transition-transform duration-[1800ms] ease-expo-out group-hover:scale-[1.05]"
      />

      {/* Gradient để text + play button dễ nhìn */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-wood-950/85 via-transparent to-wood-950/35" />

      {/* Số thứ tự */}
      <span className="absolute top-2.5 left-2.5 font-display italic text-[11px] text-cream-50/85 tabular-nums sm:top-4 sm:left-4 sm:text-xs">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Play button overlay */}
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-cream-50/95 text-brick-500 shadow-card transition-transform duration-500 group-hover:scale-110 group-active:scale-95 sm:h-20 sm:w-20">
          <span
            className="absolute inset-0 animate-ping rounded-full bg-cream-50/40"
            style={{ animationDuration: "2.5s" }}
          />
          <Play size={20} strokeWidth={1.6} className="relative ml-1 fill-current sm:ml-1.5" />
        </span>
      </span>

      {/* Caption */}
      <span className="pointer-events-none absolute inset-x-0 bottom-0 p-3 sm:p-5">
        <span className="block font-display text-sm font-light text-cream-50 leading-tight sm:text-[19px]">
          {reel.title}
        </span>
        <span className="mt-1 hidden text-xs leading-relaxed text-cream-100/80 line-clamp-2 sm:mt-1.5 sm:block">
          {reel.caption}
        </span>
      </span>
    </motion.button>
  );
}

/* -------------------------------------------------------------------------- */
/* VideoModal — full-screen mobile, centered desktop                           */
/* -------------------------------------------------------------------------- */

function VideoModal({ reel, onClose }: { reel: Reel | null; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [needsManualPlay, setNeedsManualPlay] = useState(false);

  // ESC để đóng + lock body scroll
  useEffect(() => {
    if (!reel) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [reel, onClose]);

  // Gọi .play() programmatically khi modal mở.
  // Nếu autoplay block (iOS Safari) → show nút "Bấm để phát video".
  useEffect(() => {
    if (!reel) return;
    setNeedsManualPlay(false);
    const v = videoRef.current;
    if (!v) return;
    const t = setTimeout(() => {
      v.play().catch(() => setNeedsManualPlay(true));
    }, 80);
    return () => clearTimeout(t);
  }, [reel]);

  const handleManualPlay = () => {
    const v = videoRef.current;
    if (!v) return;
    v.play()
      .then(() => setNeedsManualPlay(false))
      .catch(() => {
        // Vẫn fail — user tap native play button trong controls
        setNeedsManualPlay(false);
      });
  };

  return (
    <AnimatePresence>
      {reel && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`Video: ${reel.title}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: luxuryEase }}
          onClick={onClose}
          className="fixed inset-0 z-[70] flex flex-col bg-wood-950/95 backdrop-blur-xl"
        >
          {/* ─────────────── TOP BAR: Title + Close X ───────────────
              Đặt ở TOP để không che native controls của video. */}
          <div
            className="relative z-20 flex items-start justify-between gap-4 px-5 pt-5 pb-3 sm:px-8 sm:pt-6 sm:pb-4"
            style={{ paddingTop: "calc(env(safe-area-inset-top) + 1.25rem)" }}
          >
            <div className="flex-1 pointer-events-none">
              <p className="text-[10px] font-semibold uppercase tracking-luxury text-gold-400">
                Hậu trường làng nghề
              </p>
              <p className="mt-1.5 font-display text-lg font-light leading-tight text-cream-50 sm:text-2xl">
                {reel.title}
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Đóng video"
              className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cream-50/15 text-cream-50 backdrop-blur-md transition-all duration-300 hover:bg-cream-50 hover:text-wood-900 active:scale-95 sm:h-14 sm:w-14"
            >
              <X size={22} strokeWidth={1.8} />
            </button>
          </div>

          {/* ─────────────── VIDEO AREA — center, flex-1 ───────────────
              stopPropagation để click vào video không close modal. */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.94, opacity: 0 }}
            transition={{ duration: 0.45, ease: luxuryEase }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex flex-1 items-center justify-center px-0 pb-5 sm:px-6 sm:pb-8"
          >
            {/* Video element — TOÀN bộ thuộc tính theo yêu cầu */}
            <video
              ref={videoRef}
              key={reel.id}
              src={reel.src}
              poster={reel.poster}
              autoPlay
              muted
              controls
              playsInline
              preload="auto"
              className="max-h-full max-w-full bg-wood-950 sm:rounded-2xl"
              style={{ width: "auto", height: "auto", maxHeight: "100%" }}
            />

            {/* Manual play overlay — chỉ hiện khi autoplay block (iOS) */}
            {needsManualPlay && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleManualPlay();
                }}
                className="absolute inset-0 z-10 flex items-center justify-center bg-wood-950/40"
              >
                <span className="flex items-center gap-3 rounded-full bg-cream-50 px-6 py-4 shadow-card">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brick-500 text-cream-50">
                    <Play size={14} strokeWidth={2} className="ml-0.5 fill-current" />
                  </span>
                  <span className="font-display text-base font-medium text-wood-900">
                    Bấm để phát video
                  </span>
                </span>
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
