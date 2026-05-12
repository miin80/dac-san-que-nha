import type { MetadataRoute } from "next";
import { BRAND, CATEGORIES } from "@/lib/data";
import { PRODUCTS } from "@/lib/products";
import { ARTICLES } from "@/lib/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    // Trang chủ
    {
      url: BRAND.siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    // Cửa hàng (listing)
    {
      url: `${BRAND.siteUrl}/cua-hang`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    // Tin tức (listing)
    {
      url: `${BRAND.siteUrl}/tin-tuc`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    // Sản phẩm chi tiết
    ...PRODUCTS.map((p) => ({
      url: `${BRAND.siteUrl}/san-pham/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    // Bài viết chi tiết
    ...ARTICLES.map((a) => ({
      url: `${BRAND.siteUrl}/tin-tuc/${a.slug}`,
      lastModified: new Date(a.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    // Anchor categories trên homepage
    ...CATEGORIES.map((c) => ({
      url: `${BRAND.siteUrl}/#${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
