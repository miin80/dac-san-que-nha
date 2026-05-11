"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Volume2, VolumeX, Play, Facebook } from "lucide-react";
import { BRAND } from "@/lib/data";
import { fadeUp, viewportOnce } from "@/lib/motion";

/**
 * ProductVideo — tap to play (không autoplay) để tránh black screen mobile.
 * Mặc định: hiện poster + nút PLAY to. Tap → play.
 * Nếu fail (rất hiếm) → fallback link Facebook.
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
  const [muted, setMuted] = useState(true);
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
      <Image
        src={poster}
        alt={title}
        fill
        sizes="(min-width:1024px) 70vw, 95vw"
        className="object-cover"
      />

      {started && !errored && (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted={muted}
          loop
          playsInline
          preload="metadata"
          controls
          onError={() => setErrored(true)}
          className="absolute inset-0 h-full w-full bg-wood-950 object-cover"
        />
      )}

      {started && !errored && (
        <button
          onClick={(e) => { e.stopPropagation(); setMuted((m) => !m); }}
          aria-label={muted ? "Bật tiếng" : "Tắt tiếng"}
          className="absolute right-5 top-5 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-wood-950/55 text-cream-50 backdrop-blur-md transition-all hover:bg-wood-950/85 hover:scale-105"
        >
          {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      )}

      {!started && !errored && (
        <button
          onClick={handlePlay}
          aria-label={`Phát video: ${title}`}
          className="absolute inset-0 z-10 flex items-center justify-center"
        >
          <span className="relative inline-flex h-20 w-20 items-center justify-center rounded-full bg-cream-50/95 text-brick-500 shadow-card transition-transform duration-500 hover:scale-110 active:scale-95">
            <span className="absolute inset-0 animate-ping rounded-full bg-cream-50/40" style={{ animationDuration: "2.5s" }} />
            <Play size={28} strokeWidth={1.6} className="relative ml-1.5 fill-current" />
          </span>
        </button>
      )}

      {errored && (
        <div className="absolute inset-0 z-10 flex items-center justify-center p-6">
          <a
            href={BRAND.facebook}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center gap-3 rounded-2xl bg-cream-50/95 px-7 py-6 text-center text-wood-900 shadow-card"
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
