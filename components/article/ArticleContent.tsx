"use client";

import Image from "next/image";
import { type ArticleBlock } from "@/lib/articles";

/**
 * ArticleContent — render mảng ArticleBlock thành JSX an toàn.
 * Không dùng dangerouslySetInnerHTML. Mỗi loại block có style luxury riêng:
 *   - paragraph (có thể drop-cap)
 *   - heading H2/H3 (italic accent brick)
 *   - image (caption italic)
 *   - quote (border-l brick, italic Cormorant lớn)
 *   - list (bullet brick)
 *   - callout (box vàng có icon)
 */
export function ArticleContent({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="space-y-7 sm:space-y-9">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p
                key={i}
                className={
                  block.dropCap
                    ? "drop-cap text-lg leading-[2.05] text-wood-700 text-pretty sm:text-xl"
                    : "text-lg leading-[2.05] text-wood-700 text-pretty sm:text-[19px]"
                }
              >
                {block.text}
              </p>
            );

          case "heading":
            if (block.level === 2) {
              return (
                <h2
                  key={i}
                  className="mt-12 pt-2 font-display text-[28px] font-light leading-[1.2] text-wood-900 sm:text-[36px]"
                  style={{ letterSpacing: "-0.005em" }}
                >
                  {block.text}
                </h2>
              );
            }
            return (
              <h3
                key={i}
                className="mt-8 font-display text-[22px] font-light leading-[1.25] text-wood-900 sm:text-[26px]"
                style={{ letterSpacing: "-0.005em" }}
              >
                {block.text}
              </h3>
            );

          case "image":
            return (
              <figure key={i} className="my-10 sm:my-14">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.5rem] shadow-card sm:rounded-[2rem]">
                  <Image
                    src={block.src}
                    alt={block.alt}
                    fill
                    sizes="(min-width:1024px) 720px, 95vw"
                    className="object-cover transition-transform duration-[1800ms] ease-expo-out hover:scale-[1.03]"
                  />
                </div>
                {block.caption && (
                  <figcaption className="mt-4 text-center font-quote italic text-sm leading-relaxed text-wood-500 sm:text-[15px]">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );

          case "quote":
            return (
              <blockquote
                key={i}
                className="my-10 border-l-2 border-brick-500/55 pl-6 sm:my-14 sm:pl-9"
              >
                <p
                  className="font-display text-[22px] font-light italic leading-[1.45] text-wood-900 sm:text-[30px]"
                  style={{ letterSpacing: "-0.003em" }}
                >
                  “{block.text}”
                </p>
                {block.attribution && (
                  <footer className="mt-4 text-[10px] uppercase tracking-luxury text-brick-500/80">
                    — {block.attribution}
                  </footer>
                )}
              </blockquote>
            );

          case "list": {
            const Tag = block.ordered ? "ol" : "ul";
            return (
              <Tag
                key={i}
                className={
                  block.ordered
                    ? "list-decimal space-y-3 pl-6 text-lg leading-[1.85] text-wood-700 marker:font-display marker:text-brick-500 sm:text-[19px]"
                    : "list-none space-y-3 text-lg leading-[1.85] text-wood-700 sm:text-[19px]"
                }
              >
                {block.items.map((item, j) => (
                  <li
                    key={j}
                    className={
                      block.ordered
                        ? ""
                        : "relative pl-7 before:absolute before:left-0 before:top-[0.9em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-brick-500/70"
                    }
                  >
                    {item}
                  </li>
                ))}
              </Tag>
            );
          }

          case "callout":
            return (
              <aside
                key={i}
                className="my-10 rounded-2xl border border-gold-500/30 bg-gold-500/10 p-6 sm:p-8"
              >
                {block.title && (
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-luxury text-gold-600">
                    💡 {block.title}
                  </p>
                )}
                <p className="text-base leading-[1.85] text-wood-700 sm:text-[17px]">
                  {block.text}
                </p>
              </aside>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
