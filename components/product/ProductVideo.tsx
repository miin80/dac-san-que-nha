"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { fadeUp, viewportOnce } from "@/lib/motion";

/**
 * ProductVideo — video inline trên trang detail.
 *
 * Pattern: video element LUÔN render (preload metadata, muted).
 * Click play overlay → gọi ref.play() (luôn work vì element đã mount).
 * Sau khi play → ẩn overlay, hiện native controls để user unmute/scrub.
 *
 * KHÔNG còn fallback Facebook tự động — nếu video lỗi, native controls
 * sẽ hiển thị broken state. User có thể tap close hoặc tới Facebook qua FAB.
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

  const handlePlay = async () => {
    const v = videoRef.current;
    if (!v) return;
    try {
      await v.play();
      setStarted(true);
    } catch {
      // Autoplay block trên iOS — vẫn set started để show controls,
      // user có thể tap native play button trong controls
      setStarted(true);
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
      {/* Video LUÔN render nhưng preload="none" — chỉ fetch khi user tap play.
          Tối ưu LCP: trên detail page, video không cần tải đến khi cần. */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        controls={started}
        className="absolute inset-0 h-full w-full bg-wood-950 object-cover"
      />

      {/* Image overlay + play button — phủ lên video cho tới khi user bấm play */}
      {!started && (
        <>
          <Image
            src={poster}
            alt={title}
            fill
            sizes="(min-width:1024px) 70vw, 95vw"
            className="object-cover"
          />
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
    </motion.figure>
  );
}
