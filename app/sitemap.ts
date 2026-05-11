import type { MetadataRoute } from "next";
import { BRAND, CATEGORIES } from "@/lib/data";
import { PRODUCTS } from "@/lib/products";

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
    // Trang cửa hàng (listing)
    {
      url: `${BRAND.siteUrl}/san-pham`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    // Trang từng sản phẩm
    ...PRODUCTS.map((p) => ({
      url: `${BRAND.siteUrl}/san-pham/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    // Anchor link sections (cùng trang chủ — priority thấp)
    ...CATEGORIES.map((c) => ({
      url: `${BRAND.siteUrl}/#${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
