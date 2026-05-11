"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { type Article, formatDate } from "@/lib/articles";
import { fadeUp, viewportOnce } from "@/lib/motion";

/**
 * ArticleCard — card hiển thị 1 bài viết trên grid listing.
 * Click toàn card → trang chi tiết.
 */
export function ArticleCard({ article }: { article: Article }) {
  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="group relative overflow-hidden rounded-[2rem] bg-cream-50 shadow-card transition-all duration-700 ease-expo-out hover:-translate-y-1.5 hover:shadow-card-hover"
    >
      <Link href={`/tin-tuc/${article.slug}`} className="flex h-full flex-col">
        {/* Cover */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={article.coverImage}
            alt={article.coverImageAlt}
            fill
            sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 90vw"
            className="object-cover transition-transform duration-[1800ms] ease-expo-out group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-wood-950/30 via-transparent to-transparent" />
          {/* Category tag */}
          <span className="absolute top-5 left-5 rounded-full bg-cream-50/95 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-luxury text-brick-500 backdrop-blur-md">
            {article.category}
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-6 sm:p-7">
          {/* Meta */}
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-luxury text-wood-500">
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
            <span className="h-1 w-1 rounded-full bg-wood-300" />
            <span className="inline-flex items-center gap-1">
              <Clock size={11} strokeWidth={1.8} />
              {article.readingMinutes} phút đọc
            </span>
          </div>

          {/* Title */}
          <h3
            className="mt-4 font-display text-[22px] font-light leading-[1.25] text-wood-900 transition-colors duration-500 group-hover:text-brick-500 sm:text-[24px]"
            style={{ letterSpacing: "-0.005em" }}
          >
            {article.title}
          </h3>

          {/* Excerpt */}
          <p className="mt-4 line-clamp-3 text-sm leading-[1.85] text-wood-500">
            {article.excerpt}
          </p>

          {/* CTA */}
          <div className="mt-6 flex items-center gap-2 pt-5 border-t border-wood-100/60 text-[10px] font-semibold uppercase tracking-luxury text-wood-700 transition-colors duration-500 group-hover:text-brick-500">
            <span className="h-px w-8 bg-wood-500/40 transition-all duration-500 group-hover:w-12 group-hover:bg-brick-500" />
            Đọc bài viết
            <ArrowUpRight
              size={13}
              strokeWidth={1.8}
              className="ml-auto transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
