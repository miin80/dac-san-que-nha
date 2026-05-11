"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Volume2, VolumeX, Play } from "lucide-react";
import { REELS } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

/**
 * Section Video — <video> MP4 thật, autoplay khi vào viewport.
 * Click vào video toggle play/pause. Nút loa góc trên phải toggle muted.
 */

function ReelCard({ reel, index }: { reel: typeof REELS[number]; index: number }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    const video = videoRef.current;
    if (!node || !video) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 },
    );
    io.observe(node);

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);

    return () => {
      io.disconnect();
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, []);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMuted((m) => !m);
  };

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  return (
    <motion.div
      ref={containerRef}
      variants={fadeUp}
      className="group relative aspect-[9/16] overflow-hidden rounded-[2rem] shadow-card ring-1 ring-cream-50/10 transition-all duration-800 ease-expo-out hover:-translate-y-1.5 hover:shadow-card-hover ring-inset-luxury"
    >
      <div className="absolute inset-0">
        <Image
          src={reel.poster}
          alt={reel.title}
          fill
          sizes="(min-width:1024px) 22vw, (min-width:640px) 45vw, 90vw"
          className="object-cover"
        />
      </div>

      <video
        ref={videoRef}
        src={reel.src}
        poster={reel.poster}
        muted={muted}
        loop
        playsInline
        preload="metadata"
        onClick={togglePlay}
        className="absolute inset-0 h-full w-full cursor-pointer object-cover"
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-wood-950/85 via-transparent to-wood-950/30" />

      {/* Số thứ tự nhỏ */}
      <span className="absolute top-4 left-4 font-display italic text-xs text-cream-50/80 tabular-nums">
        {String(index + 1).padStart(2, "0")}
      </span>

      <button
        onClick={toggleMute}
        aria-label={muted ? "Bật tiếng" : "Tắt tiếng"}
        className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-wood-950/55 text-cream-50 backdrop-blur-md transition-all duration-500 hover:bg-wood-950/85 hover:scale-105"
      >
        {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
      </button>

      {!playing && (
        <button
          onClick={togglePlay}
          aria-label="Phát video"
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-cream-50/95 text-brick-500 shadow-card transition-transform duration-500 group-hover:scale-110">
            <Play size={20} className="ml-1 fill-current" />
          </span>
        </button>
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6">
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
    <section className="relative bg-wood-950 py-32 sm:py-44 text-cream-50">
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] bg-indochina-grid" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <SectionHeader
          eyebrow="Hậu trường làng nghề"
          number="04"
          total="06"
          title="Xem chúng tôi làm bánh, làm kẹo"
          description="Mỗi đoạn video kể một công đoạn — nấu mạch nha, kéo kẹo, cắt miếng, đóng gói. Chạm vào video để bật tiếng."
          light
        />

        <motion.div
          variants={stagger(0.1, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-20 grid gap-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
        >
          {REELS.map((r, i) => (
            <ReelCard key={r.id} reel={r} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
