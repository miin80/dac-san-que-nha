"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { luxuryEase } from "@/lib/motion";

/**
 * ProductGallery — ảnh hero lớn + dải thumbnail bên dưới.
 * Click thumbnail → đổi ảnh hero với crossfade mượt.
 * Mobile: thumbnail strip scroll ngang, snap.
 */
export function ProductGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-5 lg:gap-6">
      {/* Ảnh hero */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-cream-50 shadow-card">
        <AnimatePresence mode="wait">
          <motion.div
            key={images[active]}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.7, ease: luxuryEase }}
            className="absolute inset-0"
          >
            <Image
              src={images[active]}
              alt={`${alt} — ảnh ${active + 1}`}
              fill
              priority={active === 0}
              sizes="(min-width:1024px) 55vw, 100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Số đếm ảnh — luxury detail */}
        <span className="absolute bottom-5 right-5 inline-flex items-center rounded-full bg-cream-50/90 px-3.5 py-1.5 font-display italic text-xs text-wood-900 backdrop-blur-md tabular-nums">
          {String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </span>
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-3 overflow-x-auto pb-2 lg:gap-4 [&::-webkit-scrollbar]:hidden">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => setActive(i)}
            aria-label={`Xem ảnh ${i + 1}`}
            className={`relative aspect-square w-20 shrink-0 overflow-hidden rounded-2xl transition-all duration-500 ease-expo-out sm:w-24 ${
              i === active
                ? "ring-2 ring-brick-500 ring-offset-2 ring-offset-cream-100"
                : "opacity-60 hover:opacity-100 ring-1 ring-wood-500/15"
            }`}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="96px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
