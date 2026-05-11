"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Volume2, VolumeX, Play, Facebook } from "lucide-react";
import { REELS, BRAND } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

/**
 * Section Video — KHÔNG dùng autoplay (tránh black screen trên iOS Safari real).
 *
 * Workflow:
 *   1. Mặc định: poster image + nút PLAY to giữa → luôn nhìn thấy thumbnail
 *   2. User TAP play → video.play() với try/catch
 *   3. Nếu play thành công → ẩn poster, show controls native
 *   4. Nếu play fail (rare) → show fallback "Xem trên Facebook"
 *
 * Mobile attributes ESSENTIAL:
 *   - muted (autoplay phải muted trên iOS)
 *   - playsInline (không full-screen tự động)
 *   - preload="metadata" (chỉ load đoạn đầu, tiết kiệm data)
 *   - poster (ảnh hiện trước khi user tap)
 */

function ReelCard({ reel, index }: { reel: typeof REELS[number]; index: number }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [started, setStarted] = useState(false);   // user đã tap play chưa
  const [muted, setMuted] = useState(true);
  const [errored, setErrored] = useState(false);

  const handlePlay = async () => {
    const v = videoRef.current;
    if (!v) return;
    try {
      await v.play();
      setStarted(true);
    } catch {
      // Play fail (rare khi muted + playsInline). Show fallback.
      setErrored(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMuted((m) => !m);
  };

  return (
    <motion.div
      variants={fadeUp}
      className="group relative aspect-[9/16] overflow-hidden rounded-[1.75rem] bg-wood-900 shadow-card ring-1 ring-cream-50/10 ring-inset-luxury"
    >
      {/* Poster image — LUÔN render, đảm bảo không bị màn hình đen */}
      <Image
        src={reel.poster}
        alt={reel.title}
        fill
        sizes="(min-width:1024px) 22vw, (min-width:640px) 45vw, 90vw"
        className="object-cover"
      />

      {/* Video — chỉ render <video> khi user đã tap, tiết kiệm bandwidth mobile */}
      {started && !errored && (
        <video
          ref={videoRef}
          src={reel.src}
          poster={reel.poster}
          muted={muted}
          loop
          playsInline
          preload="metadata"
          controls
          onError={() => setErrored(true)}
          className="absolute inset-0 h-full w-full bg-wood-950 object-cover"
        />
      )}

      {/* Lớp gradient — giúp text caption dễ đọc */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-wood-950/80 via-transparent to-wood-950/30" />

      {/* Số thứ tự */}
      <span className="absolute top-4 left-4 font-display italic text-xs text-cream-50/80 tabular-nums">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Nút mute/unmute (chỉ khi video đang play) */}
      {started && !errored && (
        <button
          onClick={toggleMute}
          aria-label={muted ? "Bật tiếng" : "Tắt tiếng"}
          className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-wood-950/65 text-cream-50 backdrop-blur-md transition-all duration-500 hover:bg-wood-950/85 hover:scale-105 active:scale-95"
        >
          {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
        </button>
      )}

      {/* Play button overlay — hiện cho tới khi user tap */}
      {!started && !errored && (
        <button
          onClick={handlePlay}
          aria-label={`Phát video: ${reel.title}`}
          className="absolute inset-0 z-10 flex items-center justify-center"
        >
          <span className="relative inline-flex h-20 w-20 items-center justify-center rounded-full bg-cream-50/95 text-brick-500 shadow-card transition-transform duration-500 group-hover:scale-110 active:scale-95">
            <span className="absolute inset-0 animate-ping rounded-full bg-cream-50/40" style={{ animationDuration: "2.5s" }} />
            <Play size={26} strokeWidth={1.6} className="relative ml-1.5 fill-current" />
          </span>
        </button>
      )}

      {/* Fallback nếu video lỗi — link sang Facebook */}
      {errored && (
        <div className="absolute inset-0 z-10 flex items-center justify-center p-6">
          <a
            href={BRAND.facebook}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center gap-3 rounded-2xl bg-cream-50/95 px-6 py-5 text-center text-wood-900 shadow-card"
          >
            <Facebook size={22} className="text-[#1877F2]" />
            <span className="text-sm font-semibold">Video đang tải</span>
            <span className="text-xs text-wood-500">Bấm để xem trên Facebook</span>
          </a>
        </div>
      )}

      {/* Caption */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5">
        <p className="font-display text-[19px] font-light text-cream-50 leading-tight">
          {reel.title}
        </p>
        <p className="mt-1.5 text-xs leading-relaxed text-cream-100/80 line-clamp-2">
          {reel.caption}
        </p>
      </div>
    </motion.div>
  );
}

export function VideoReels() {
  return (
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
          variants={stagger(0.08, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-9 grid gap-5 sm:mt-16 sm:gap-7 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-8"
        >
          {REELS.map((r, i) => (
            <ReelCard key={r.id} reel={r} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
