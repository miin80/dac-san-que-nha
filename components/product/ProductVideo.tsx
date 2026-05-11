"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";
import { fadeUp, viewportOnce } from "@/lib/motion";

/**
 * ProductVideo — video MP4 thật autoplay khi vào viewport.
 * Click vào video → toggle play/pause. Nút loa → toggle muted.
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
          if (entry.isIntersecting) video.play().catch(() => {});
          else video.pause();
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

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  return (
    <motion.figure
      ref={containerRef}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="relative mx-auto aspect-[16/10] max-w-4xl overflow-hidden rounded-[2.5rem] shadow-cinematic letterbox"
    >
      <div className="absolute inset-0">
        <Image src={poster} alt={title} fill sizes="(min-width:1024px) 70vw, 95vw" className="object-cover" />
      </div>

      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted={muted}
        loop
        playsInline
        preload="metadata"
        onClick={togglePlay}
        className="absolute inset-0 h-full w-full cursor-pointer object-cover"
      />

      <button
        onClick={(e) => { e.stopPropagation(); setMuted((m) => !m); }}
        aria-label={muted ? "Bật tiếng" : "Tắt tiếng"}
        className="absolute right-5 top-5 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-wood-950/55 text-cream-50 backdrop-blur-md transition-all hover:bg-wood-950/85 hover:scale-105"
      >
        {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>

      {!playing && (
        <button
          onClick={togglePlay}
          aria-label="Phát video"
          className="absolute inset-0 z-10 flex items-center justify-center"
        >
          <span className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-cream-50/92 text-brick-500 shadow-card transition-transform duration-500 hover:scale-110">
            <Play size={26} className="ml-1 fill-current" />
          </span>
        </button>
      )}
    </motion.figure>
  );
}
