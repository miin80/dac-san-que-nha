/**
 * ============================================================================
 * HỆ THỐNG BÀI VIẾT (BLOG) — load từ data/articles.json
 * ============================================================================
 *
 * QUY TRÌNH THÊM BÀI MỚI:
 *   Cách 1 — Qua trang /admin (bán tự động):
 *     1. Login /admin với ADMIN_PASSWORD
 *     2. Nhập chủ đề + keywords → bấm Generate
 *     3. AI (Claude) sinh bài → review preview
 *     4. Bấm Publish → auto commit vào data/articles.json qua GitHub API
 *     5. Vercel auto-deploy → bài live sau 2-3 phút
 *
 *   Cách 2 — Sửa tay JSON:
 *     1. Mở data/articles.json
 *     2. Copy 1 object làm template, đổi slug/title/content
 *     3. git push → Vercel build
 *
 * Cấu trúc CONTENT BLOCKS giúp render an toàn (không dangerouslySetInnerHTML)
 * + SEO-friendly heading hierarchy.
 * ============================================================================
 */

import articlesData from "@/data/articles.json";

export type ArticleBlock =
  | { type: "paragraph"; text: string; dropCap?: boolean }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "callout"; title?: string; text: string };

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  coverImage: string;
  coverImageAlt: string;
  publishedAt: string;
  readingMinutes: number;
  metaTitle?: string;
  metaDescription?: string;
  seoKeywords?: string[];
  content: ArticleBlock[];
  relatedProductSlugs?: string[];
};

/* -------------------------------------------------------------------------- */
/* ARTICLES — load từ JSON                                                     */
/* -------------------------------------------------------------------------- */
export const ARTICLES: Article[] = articlesData as Article[];

/* -------------------------------------------------------------------------- */
/* HELPER FUNCTIONS                                                            */
/* -------------------------------------------------------------------------- */

export const getAllArticles = (): Article[] =>
  [...ARTICLES].sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

export const getArticleBySlug = (slug: string): Article | undefined =>
  ARTICLES.find((a) => a.slug === slug);

export const getRelatedArticles = (slug: string, limit = 2): Article[] => {
  const current = getArticleBySlug(slug);
  if (!current) return [];
  return getAllArticles()
    .filter((a) => a.slug !== slug && a.category === current.category)
    .slice(0, limit);
};

/** Format ngày tháng tiếng Việt */
export const formatDate = (iso: string): string => {
  const d = new Date(iso);
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(d);
};

/** Format ngày ngắn — VD "15 Tháng 3" */
export const formatDateShort = (iso: string): string => {
  const d = new Date(iso);
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "long",
  }).format(d);
};
