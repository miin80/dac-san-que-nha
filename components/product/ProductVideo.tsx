"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, Facebook } from "lucide-react";
import { BRAND } from "@/lib/data";
import { fadeUp, viewportOnce } from "@/lib/motion";

/**
 * ProductVideo — video inline trên trang detail.
 *
 * Pattern: video element LUÔN render (preload metadata, muted).
 * Click play overlay → gọi ref.play() (luôn work vì element đã mount).
 * Sau khi play → ẩn overlay, hiện native controls để user unmute/scrub.
 *
 * Nếu video lỗi load → onError trigger fallback "Xem trên Facebook".
 */
export function ProductVideo({
  src,
  poster,
  title,
}: {
  src: string;
  poster: string;
  title: string;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [started, setStarted] = useState(false);
  const [errored, setErrored] = useState(false);

  const handlePlay = async () => {
    const v = videoRef.current;
    if (!v) return;
    try {
      await v.play();
      setStarted(true);
    } catch {
      setErrored(true);
    }
  };

  return (
    <motion.figure
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="relative mx-auto aspect-[16/10] max-w-4xl overflow-hidden rounded-[2.5rem] bg-wood-900 shadow-cinematic letterbox"
    >
      {/* Video — LUÔN render. Muted để autoplay work trên iOS sau user tap. */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        controls={started && !errored}
        /* Chỉ fallback khi codec/src thật sự lỗi (code 3, 4).
           Không fallback cho network glitch hoặc autoplay block. */
        onError={(e) => {
          const code = (e.currentTarget as HTMLVideoElement).error?.code;
          if (code === 3 || code === 4) setErrored(true);
        }}
        className="absolute inset-0 h-full w-full bg-wood-950 object-cover"
      />

      {/* Image overlay — phủ lên video cho tới khi user bấm play.
          Đảm bảo không bao giờ thấy video element trống/đen. */}
      {!started && !errored && (
        <>
          <Image
            src={poster}
            alt={title}
            fill
            sizes="(min-width:1024px) 70vw, 95vw"
            className="object-cover"
          />
          {/* Play button — onClick gọi handlePlay */}
          <button
            onClick={handlePlay}
            aria-label={`Phát video: ${title}`}
            className="absolute inset-0 z-10 flex items-center justify-center"
          >
            <span className="relative inline-flex h-20 w-20 items-center justify-center rounded-full bg-cream-50/95 text-brick-500 shadow-card transition-transform duration-500 hover:scale-110 active:scale-95">
              <span
                className="absolute inset-0 animate-ping rounded-full bg-cream-50/40"
                style={{ animationDuration: "2.5s" }}
              />
              <Play size={28} strokeWidth={1.6} className="relative ml-1.5 fill-current" />
            </span>
          </button>
        </>
      )}

      {/* Fallback nếu video lỗi */}
      {errored && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-wood-950/95 p-6">
          <a
            href={BRAND.facebook}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center gap-3 rounded-2xl bg-cream-50 px-7 py-6 text-center text-wood-900 shadow-card"
          >
            <Facebook size={26} className="text-[#1877F2]" />
            <span className="text-sm font-semibold">Video đang tải</span>
            <span className="text-xs text-wood-500">Bấm để xem trên Facebook</span>
          </a>
        </div>
      )}
    </motion.figure>
  );
}
