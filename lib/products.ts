/**
 * ============================================================================
 * HỆ THỐNG SẢN PHẨM (catalog)
 * ============================================================================
 *
 * Dữ liệu thật ở `data/products.json` — JSON pure, không cần kiến thức code.
 * File này chỉ load JSON + cung cấp type + helper functions.
 *
 * ❶ THÊM SẢN PHẨM MỚI:
 *   - Mở file `data/products.json`
 *   - Copy 1 object trong mảng → đổi `id`, `slug`, `name`, `price`...
 *   - Save → Next.js auto build URL `/san-pham/<slug>`
 *
 * ❷ THÊM DANH MỤC MỚI:
 *   - Hiện có 4 main categories: Kẹo / Bánh / Combo / Quà biếu
 *   - Thêm vào `MAIN_CATEGORIES` bên dưới + dùng tên đó trong field `category`
 *
 * ❸ BADGE:
 *   - "Bán chạy", "Mới", "Tiến vua", "Quà Tết", "Yêu thích"…
 *   - Hoặc null nếu không cần badge
 *
 * ============================================================================
 */

import productsData from "@/data/products.json";

export type ProductSpec = { label: string; value: string };

/** Main categories cho filter trang /cua-hang */
export type MainCategory = "Kẹo" | "Bánh" | "Combo" | "Quà biếu";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: MainCategory;
  /** Tên category con để hiển thị (VD: "Kẹo lạc", "Bánh cáy") */
  categoryName: string;
  price: number;
  oldPrice?: number | null;
  weight: string;
  images: string[];
  video?: string;
  shortDescription: string;
  description: string;
  /** Đoạn storytelling — không bắt buộc */
  story?: string | null;
  /** Thành phần chính (single string, hiển thị card) */
  ingredients: string;
  /** Lý do nên mua — bullet points hiển thị trên detail page */
  reasonsToBuy?: string[];
  /** Bảng thông số chi tiết */
  specs?: ProductSpec[];
  badge?: string | null;
  isBestSeller?: boolean;
  featured?: boolean;
  available: boolean;
  /** Gợi ý combo — hiển thị trên detail page */
  comboSuggestion?: string;
  /** Text mặc định để copy vào Messenger khi user click "Đặt hàng" */
  facebookMessageText?: string;
};

/* -------------------------------------------------------------------------- */
/* MAIN CATEGORIES — dùng cho filter /cua-hang                                 */
/* -------------------------------------------------------------------------- */
export const MAIN_CATEGORIES: { value: MainCategory; label: string }[] = [
  { value: "Kẹo",      label: "Kẹo" },
  { value: "Bánh",     label: "Bánh" },
  { value: "Combo",    label: "Combo" },
  { value: "Quà biếu", label: "Quà biếu" },
];

/* -------------------------------------------------------------------------- */
/* PRODUCTS — load từ JSON                                                     */
/* -------------------------------------------------------------------------- */
export const PRODUCTS: Product[] = productsData as Product[];

/* -------------------------------------------------------------------------- */
/* HELPER FUNCTIONS                                                            */
/* -------------------------------------------------------------------------- */

export const getAllProducts = (): Product[] => PRODUCTS;

export const getProductBySlug = (slug: string): Product | undefined =>
  PRODUCTS.find((p) => p.slug === slug);

export const getProductsByCategory = (category: MainCategory | string): Product[] =>
  PRODUCTS.filter((p) => p.category === category);

export const getFeaturedProducts = (): Product[] =>
  PRODUCTS.filter((p) => p.featured);

export const getBestSellers = (): Product[] =>
  PRODUCTS.filter((p) => p.isBestSeller);

export const getRelatedProducts = (slug: string, limit = 3): Product[] => {
  const current = getProductBySlug(slug);
  if (!current) return [];
  const sameCategory = PRODUCTS.filter(
    (p) => p.category === current.category && p.slug !== slug,
  );
  const others = PRODUCTS.filter(
    (p) => p.category !== current.category && p.slug !== slug,
  );
  return [...sameCategory, ...others].slice(0, limit);
};

/** Số lượng sản phẩm trong mỗi main category — dùng để hiển thị badge count */
export const getCategoryCounts = (): Record<MainCategory, number> => {
  const counts: Record<string, number> = {};
  MAIN_CATEGORIES.forEach((c) => { counts[c.value] = 0; });
  PRODUCTS.forEach((p) => { counts[p.category] = (counts[p.category] || 0) + 1; });
  return counts as Record<MainCategory, number>;
};
