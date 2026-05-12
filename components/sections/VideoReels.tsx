"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Facebook, Check, ArrowRight, Phone } from "lucide-react";
import { REELS, BRAND } from "@/lib/data";
import { buildEnquiryMessage } from "@/lib/pricing";
import { useFacebookOrder } from "@/lib/useFacebookOrder";
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

// 3 cam kết chính — gọn, dễ nhớ, đúng pattern của shop bánh kẹo truyền thống
const TRUST_POINTS = [
  "Làm thủ công mỗi ngày",
  "Không chất bảo quản",
  "Giao hàng toàn quốc",
];

export function VideoReels() {
  const [activeReel, setActiveReel] = useState<Reel | null>(null);
  const { triggerOrder, copied } = useFacebookOrder();

  return (
    <>
      <section className="relative bg-wood-950 py-16 sm:py-28 lg:py-44 text-cream-50">
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] bg-indochina-grid" />

        <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
          {/* ────────── HEADER (custom, lớn hơn SectionHeader mặc định) ────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 1.2, ease: luxuryEase }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="flex items-center justify-center gap-3 sm:gap-5">
              <span className="font-display italic text-sm text-gold-400/90 tabular-nums">
                04 <span className="opacity-50">/ 06</span>
              </span>
              <span className="h-px w-8 bg-gold-400/40" />
              <span className="text-[10px] font-semibold uppercase tracking-luxury text-gold-400">
                Hậu trường làng nghề
              </span>
            </div>

            <h2
              className="mt-7 font-display text-[40px] font-light leading-[1.05] text-cream-50 text-balance sm:text-[64px] lg:text-[80px]"
              style={{ letterSpacing: "-0.015em" }}
            >
              Xem chúng tôi <br className="hidden sm:block" />
              <span className="italic text-gold-400">làm bánh, làm kẹo</span>
            </h2>

            <p className="mx-auto mt-7 max-w-xl text-[15px] leading-[1.9] text-cream-50 sm:mt-9 sm:text-[17px] sm:leading-[2]">
              Mỗi đoạn video kể một công đoạn — nấu mạch nha, kéo kẹo, cắt miếng, đóng gói. <strong className="font-semibold">Bấm vào video để xem.</strong>
            </p>
          </motion.div>

          {/* ────────── GRID VIDEOS ────────── */}
          <motion.div
            variants={stagger(0.06, 0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            className="mt-10 grid grid-cols-2 gap-4 sm:mt-16 sm:gap-7 lg:mt-20 lg:grid-cols-3 lg:gap-8"
          >
            {REELS.map((r, i) => (
              <ReelCard
                key={r.id}
                reel={r}
                index={i}
                onPlay={() => setActiveReel(r)}
              />
            ))}
          </motion.div>

          {/* ─────────────── CONVERSION BLOCK — trust + headline + big CTA ────────────
              Đây là điểm chốt đơn sau khi xem video. */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1, ease: luxuryEase }}
            className="mx-auto mt-16 max-w-3xl text-center sm:mt-24 lg:mt-28"
          >
            {/* 3 Trust badges */}
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 sm:gap-x-10">
              {TRUST_POINTS.map((point) => (
                <li
                  key={point}
                  className="inline-flex items-center gap-2.5 text-[15px] font-medium text-cream-50 sm:text-base"
                >
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-tea-500 text-cream-50 shadow-soft">
                    <Check size={13} strokeWidth={2.8} />
                  </span>
                  {point}
                </li>
              ))}
            </ul>

            {/* Hook line lớn */}
            <p
              className="mt-10 font-display text-[28px] font-light italic leading-[1.2] text-cream-50 sm:mt-12 sm:text-[40px]"
              style={{ letterSpacing: "-0.01em" }}
            >
              Sẵn sàng nếm thử <span className="text-gold-400">hương vị quê</span>?
            </p>

            {/* ───────── CÚ ĐẤM CHỐT — combo highlight ───────── */}
            <div className="mt-10 grid grid-cols-1 gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-4">
              <div className="rounded-2xl border border-brick-500/40 bg-brick-500/10 p-5 text-left sm:p-6">
                <p className="text-[10px] font-bold uppercase tracking-luxury text-brick-400">
                  🔥 Combo bán chạy nhất
                </p>
                <p
                  className="mt-3 font-display text-[24px] font-light text-cream-50 sm:text-[28px]"
                  style={{ letterSpacing: "-0.005em" }}
                >
                  3 túi — <span className="font-medium text-gold-400">199.000đ</span>
                </p>
                <p className="mt-1 text-sm text-cream-100/80">Miễn phí ship toàn quốc</p>
              </div>

              <div className="rounded-2xl border border-gold-500/40 bg-gold-500/10 p-5 text-left sm:p-6">
                <p className="text-[10px] font-bold uppercase tracking-luxury text-gold-400">
                  💰 Tiết kiệm nhất
                </p>
                <p
                  className="mt-3 font-display text-[24px] font-light text-cream-50 sm:text-[28px]"
                  style={{ letterSpacing: "-0.005em" }}
                >
                  5 túi — <span className="font-medium text-gold-400">299.000đ</span>
                </p>
                <p className="mt-1 text-sm text-cream-100/80">Miễn ship · Tiết kiệm 51.000đ</p>
              </div>
            </div>

            {/* Gợi ý quyết định */}
            <p className="mt-7 text-sm text-cream-100/85 sm:text-[15px]">
              👉 <strong className="font-semibold text-cream-50">Nên thử:</strong> Combo 3 túi (199.000đ) — phù hợp ăn thử + được miễn ship
            </p>

            {/* CTA STACK — 2 nút rõ ràng:
                  1. PRIMARY: nút xanh "Nhắn Facebook" — pulse-glow, ăn tiền
                  2. SECONDARY: nút outline "Gọi điện" — cho user thích gọi hơn nhắn
                Tách bằng cụm "hoặc" mảnh ở giữa để rõ ràng đây là 2 lựa chọn riêng. */}
            <div className="mt-8 flex flex-col items-center gap-5 sm:mt-10">
              <button
                onClick={() => triggerOrder(buildEnquiryMessage())}
                className="group inline-flex animate-pulse-glow items-center justify-center gap-3 rounded-full bg-[#0084FF] px-10 py-[22px] text-[17px] font-bold text-cream-50 transition-all duration-500 ease-expo-out hover:-translate-y-1 hover:scale-[1.04] hover:!animate-none hover:bg-[#0070D9] hover:shadow-[0_28px_56px_-12px_rgba(0,132,255,0.85)] active:scale-100 sm:px-12 sm:py-6 sm:text-lg motion-reduce:animate-none"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="transition-transform duration-500 group-hover:scale-110">
                  <path d="M12 2C6.486 2 2 6.262 2 11.5c0 2.928 1.404 5.55 3.612 7.288v3.462l3.303-1.814c.984.272 2.012.416 3.085.416 5.514 0 10-4.262 10-9.5S17.514 2 12 2zm.926 12.79l-2.55-2.73-5.05 2.73 5.55-5.9 2.62 2.73 4.98-2.73-5.55 5.9z" />
                </svg>
                <span className="tracking-wide">Nhắn Facebook để đặt hàng ngay</span>
                <ArrowRight size={20} strokeWidth={2.4} className="transition-transform duration-500 group-hover:translate-x-1" />
              </button>

              {/* "hoặc" mảnh — ngắt rõ giữa 2 lựa chọn */}
              <div className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-luxury text-cream-100/40">
                <span className="h-px w-8 bg-cream-100/25" />
                hoặc
                <span className="h-px w-8 bg-cream-100/25" />
              </div>

              <a
                href={BRAND.hotlineHref}
                className="group inline-flex items-center justify-center gap-3 rounded-full border border-cream-50/40 bg-cream-50/5 px-9 py-4 text-[15px] font-semibold text-cream-50 backdrop-blur-md transition-all duration-500 ease-expo-out hover:-translate-y-0.5 hover:border-cream-50 hover:bg-cream-50 hover:text-wood-900 sm:px-11 sm:py-[18px] sm:text-base"
              >
                <Phone size={18} strokeWidth={2} className="transition-transform duration-500 group-hover:rotate-12" />
                Gọi {BRAND.hotline}
              </a>

              {copied && (
                <span className="mt-2 inline-flex items-center gap-2 rounded-full bg-tea-500/25 px-4 py-2 text-xs text-tea-100">
                  <Check size={13} strokeWidth={2.5} />
                  Đã sao chép tin nhắn — dán vào Messenger
                </span>
              )}
            </div>
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
  onPlay,
}: {
  reel: Reel;
  index: number;
  onPlay: () => void;
}) {
  return (
    <motion.button
      variants={fadeUp}
      onClick={onPlay}
      aria-label={`Phát video: ${reel.title}`}
      className="group relative aspect-[9/16] overflow-hidden rounded-[1.75rem] bg-wood-900 text-left shadow-card ring-1 ring-cream-50/10 transition-all duration-700 ease-expo-out hover:-translate-y-1 hover:shadow-card-hover ring-inset-luxury"
    >
      {/* Poster lazy — section below the fold, không cần priority */}
      <Image
        src={reel.poster}
        alt={reel.title}
        fill
        sizes="(min-width:1024px) 22vw, 45vw"
        loading="lazy"
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
  /** Sau 6 giây nếu video vẫn chưa playable (readyState < 3),
   *  hiển thị overlay fallback to Facebook Reels. */
  const [loadFailed, setLoadFailed] = useState(false);

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

  // Reset state + gọi .play() khi modal mở.
  // Nếu autoplay block (iOS Safari) → show nút "Bấm để phát video".
  // Nếu sau 6s vẫn không play được → hiển thị fallback FB Reels.
  useEffect(() => {
    if (!reel) return;
    setNeedsManualPlay(false);
    setLoadFailed(false);

    const v = videoRef.current;
    if (!v) return;

    const playTimer = setTimeout(() => {
      v.play().catch(() => setNeedsManualPlay(true));
    }, 80);

    // 6s timeout — nếu video chưa playable (readyState < 3 = HAVE_FUTURE_DATA)
    // → coi như iOS Safari không decode được file MP4 này → suggest FB Reels.
    const failTimer = setTimeout(() => {
      if (v.readyState < 3) setLoadFailed(true);
    }, 6000);

    return () => {
      clearTimeout(playTimer);
      clearTimeout(failTimer);
    };
  }, [reel]);

  const handleManualPlay = () => {
    const v = videoRef.current;
    if (!v) return;
    v.play()
      .then(() => setNeedsManualPlay(false))
      .catch(() => setNeedsManualPlay(false));
  };

  // URL Facebook fallback — ưu tiên reel.facebookUrl nếu có, fallback BRAND.facebookReels
  const fbUrl = reel?.facebookUrl ?? BRAND.facebookReels;

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
              className="bg-wood-950 sm:rounded-2xl"
              style={{
                width: "auto",
                height: "auto",
                // 500-600px wide trên desktop (max-w-[560px]), full screen mobile.
                // Cap max-height theo 85vh để không vượt khung nhìn.
                maxWidth: "min(560px, 100%)",
                maxHeight: "min(85vh, 996px)",
              }}
            />

            {/* Manual play overlay — chỉ hiện khi autoplay block (iOS) */}
            {needsManualPlay && !loadFailed && (
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

            {/* Fallback overlay khi video không decode được sau 6s (iOS codec issue).
                Conversion-first: Messenger CTA primary, FB Reels secondary. */}
            {loadFailed && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute inset-0 z-10 flex items-center justify-center bg-wood-950/85 backdrop-blur-md p-6"
              >
                <div className="flex max-w-sm flex-col items-center gap-5 rounded-3xl bg-cream-50 p-8 text-center shadow-card">
                  <p className="font-display text-xl font-medium text-wood-900">
                    Video không tải được trên trình duyệt
                  </p>
                  <p className="text-sm leading-relaxed text-wood-500">
                    Bạn có thể nhắn shop để được tư vấn ngay, hoặc xem video trên Facebook.
                  </p>
                  {/* PRIMARY CTA — Messenger để chốt đơn */}
                  <a
                    href={BRAND.messenger}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2.5 rounded-full bg-[#0084FF] px-7 py-4 text-sm font-semibold text-cream-50 transition-all hover:-translate-y-0.5 hover:bg-[#0070D9] hover:shadow-card"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 2C6.486 2 2 6.262 2 11.5c0 2.928 1.404 5.55 3.612 7.288v3.462l3.303-1.814c.984.272 2.012.416 3.085.416 5.514 0 10-4.262 10-9.5S17.514 2 12 2zm.926 12.79l-2.55-2.73-5.05 2.73 5.55-5.9 2.62 2.73 4.98-2.73-5.55 5.9z" />
                    </svg>
                    Nhắn Facebook để đặt hàng
                  </a>
                  {/* SECONDARY — Facebook Reels link nhẹ */}
                  <a
                    href={fbUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-wood-500 underline underline-offset-4 transition-colors hover:text-brick-500"
                  >
                    Hoặc xem video trên Facebook Reels →
                  </a>
                </div>
              </div>
            )}
          </motion.div>

          {/* ─────────────── BOTTOM: CTA chính = "Nhắn Facebook đặt hàng" ───────────────
              Mục tiêu: giữ khách trong web, biến lượt xem video thành đơn hàng.
              FB Reels chuyển thành link phụ nhẹ phía dưới. */}
          <div
            className="relative z-20 flex flex-col items-center gap-3 px-5 pb-5 sm:pb-6"
            style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 1.25rem)" }}
          >
            {/* PRIMARY — Messenger để chốt đơn */}
            <a
              href={BRAND.messenger}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2.5 rounded-full bg-[#0084FF] px-7 py-3.5 text-sm font-semibold text-cream-50 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0070D9]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.486 2 2 6.262 2 11.5c0 2.928 1.404 5.55 3.612 7.288v3.462l3.303-1.814c.984.272 2.012.416 3.085.416 5.514 0 10-4.262 10-9.5S17.514 2 12 2zm.926 12.79l-2.55-2.73-5.05 2.73 5.55-5.9 2.62 2.73 4.98-2.73-5.55 5.9z" />
              </svg>
              Nhắn Facebook để đặt hàng
            </a>

            {/* SECONDARY — Facebook Reels link nhỏ, opacity nhẹ */}
            <a
              href={fbUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-[11px] text-cream-50/55 underline-offset-4 transition-colors hover:text-cream-50/90 hover:underline"
            >
              Xem reel trên Facebook
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
