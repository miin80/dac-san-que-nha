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
 * Sinh text đặt hàng combo để copy vào clipboard, user dán vào Messenger.
 * Messenger không hỗ trợ pre-fill text qua URL nên cần copy thủ công.
 */
export const buildOrderMessage = (product: Product, combo: Combo): string => {
  const shipText = combo.shipping === 0
    ? "Miễn phí ship"
    : `+ ${formatPrice(combo.shipping)} ship`;
  const total = getComboTotal(combo);
  const badge = combo.badge ? ` (${combo.badge})` : "";

  return [
    "🎁 ĐẶT HÀNG — ĐẶC SẢN QUÊ NHÀ",
    "",
    `Sản phẩm: ${product.name} — ${product.weight}`,
    `Combo: ${combo.qty} túi${badge}`,
    `Giá: ${formatPrice(combo.price)} ${shipText}`,
    `Tổng: ${formatPrice(total)}`,
    "",
    "────────────",
    "Họ tên: ",
    "Số điện thoại: ",
    "Địa chỉ: ",
    "",
    "Cảm ơn shop!",
  ].join("\n");
};

/** Text liên hệ chung khi không chọn combo (VD click floating button) */
export const buildEnquiryMessage = (product?: Product): string => {
  if (!product) {
    return "Xin chào shop, mình muốn tư vấn về đặc sản!";
  }
  return [
    `Xin chào shop! Mình quan tâm sản phẩm:`,
    `• ${product.name} (${product.weight})`,
    "",
    "Vui lòng tư vấn giúp mình. Cảm ơn!",
  ].join("\n");
};

/** Text mua sỉ */
export const buildWholesaleMessage = (product?: Product): string => {
  const tierInfo = WHOLESALE_TIERS.map(
    (t) => `• Từ ${t.minQty} túi: ${formatPrice(t.pricePerBag)}/túi`,
  ).join("\n");

  return [
    "💼 HỎI GIÁ SỈ — ĐẶC SẢN QUÊ NHÀ",
    "",
    product
      ? `Sản phẩm: ${product.name} (${product.weight})`
      : "Sản phẩm: (vui lòng ghi rõ loại)",
    "Số lượng dự kiến: ",
    "",
    "Tham khảo:",
    tierInfo,
    "",
    "Liên hệ giúp mình để báo giá chi tiết. Cảm ơn shop!",
  ].join("\n");
};
