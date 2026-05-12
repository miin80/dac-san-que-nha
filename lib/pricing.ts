/**
 * ============================================================================
 * HỆ THỐNG GIÁ COMBO — chuẩn hoá cho mọi sản phẩm
 * ============================================================================
 *
 * Bán hàng không theo từng túi lẻ nữa. Thay vào đó: 4 gói combo mặc định
 * + bảng giá sỉ 2 mức. Áp dụng đồng nhất cho mọi sản phẩm.
 *
 * MUỐN ĐỔI GIÁ COMBO:
 *   Chỉ chỉnh số `price` và `shipping` trong mảng COMBOS bên dưới.
 *   UI sẽ tự cập nhật.
 *
 * MUỐN COMBO RIÊNG CHO TỪNG SẢN PHẨM:
 *   Thêm field `combos?: Combo[]` vào type Product trong lib/products.ts
 *   Trong UI: dùng product.combos ?? COMBOS
 *
 * ============================================================================
 */

import type { Product } from "@/lib/products";

export type Combo = {
  qty: number;            // số túi trong combo
  price: number;          // giá combo (VND)
  shipping: number;       // phí ship (0 = miễn ship)
  badge?: string;         // nhãn nổi bật: "Bán chạy", "Tiết kiệm nhất"
};

export type WholesaleTier = {
  minQty: number;
  pricePerBag: number;
};

/* -------------------------------------------------------------------------- */
/* GIÁ COMBO MẶC ĐỊNH                                                          */
/* -------------------------------------------------------------------------- */
export const COMBOS: Combo[] = [
  { qty: 2, price: 149_000, shipping: 26_000 },
  { qty: 3, price: 199_000, shipping: 0, badge: "Bán chạy" },
  { qty: 4, price: 259_000, shipping: 0 },
  { qty: 5, price: 299_000, shipping: 0, badge: "Tiết kiệm nhất" },
];

/* -------------------------------------------------------------------------- */
/* BẢNG GIÁ SỈ                                                                 */
/* -------------------------------------------------------------------------- */
export const WHOLESALE_TIERS: WholesaleTier[] = [
  { minQty: 10, pricePerBag: 55_000 },
  { minQty: 50, pricePerBag: 50_000 },
];

/* -------------------------------------------------------------------------- */
/* HELPERS                                                                     */
/* -------------------------------------------------------------------------- */

/** Tổng tiền combo = giá combo + phí ship */
export const getComboTotal = (c: Combo) => c.price + c.shipping;

/** Format giá VND có dấu chấm phân cách */
export const formatPrice = (vnd: number): string =>
  new Intl.NumberFormat("vi-VN").format(vnd) + "đ";

/** Combo "Bán chạy" — pre-select mặc định */
export const getDefaultCombo = (): Combo =>
  COMBOS.find((c) => c.badge === "Bán chạy") ?? COMBOS[0];

/** Giá thấp nhất của tất cả combo — dùng cho card "Từ XXX.XXXđ" */
export const getStartingPrice = (): number =>
  Math.min(...COMBOS.map((c) => c.price));

/**
 * Sinh text đặt hàng combo — copy vào clipboard, user dán vào Messenger.
 * Messenger KHÔNG hỗ trợ pre-fill text qua URL nên phải copy thủ công.
 *
 * Format casual + thân thiện, có sẵn cho user chỉ cần dán + thêm địa chỉ.
 */
export const buildOrderMessage = (product: Product, combo: Combo): string => {
  const shipText = combo.shipping === 0 ? "miễn ship" : `+ ${formatPrice(combo.shipping)} ship`;
  const total = getComboTotal(combo);

  return [
    `Chào shop! Mình muốn đặt combo ${combo.qty} túi ${product.name} — ${formatPrice(combo.price)} (${shipText})`,
    `Tổng: ${formatPrice(total)}`,
    "",
    "Họ tên: ",
    "SĐT: ",
    "Địa chỉ: ",
  ].join("\n");
};

/** Text quan tâm sản phẩm — casual, ngắn gọn */
export const buildEnquiryMessage = (product?: Product): string => {
  if (!product) {
    return "Chào shop! Mình muốn tư vấn về đặc sản, vui lòng hỗ trợ giúp mình.";
  }
  return `Chào shop! Mình muốn đặt ${product.name} (${product.weight}) — vui lòng tư vấn giúp mình.`;
};

/** Text hỏi giá sỉ — casual, ngắn gọn */
export const buildWholesaleMessage = (product?: Product): string => {
  const productInfo = product ? `${product.name} (${product.weight})` : "(ghi rõ sản phẩm)";
  return [
    `Chào shop! Mình muốn hỏi giá sỉ ${productInfo}.`,
    "Số lượng dự kiến: ",
    "Vui lòng báo giá giúp mình.",
  ].join("\n");
};
