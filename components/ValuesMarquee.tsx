"use client";

/**
 * Marquee dải giá trị thương hiệu chạy ngang vô tận — luxury signature.
 *
 * Implementation: 1 chuỗi text liên tục với " · " làm separator THẬT trong text
 *   → HTML rendered có nội dung readable: "A · B · C · D · ..."
 *   → Copy text, screen-reader, SEO scrape đều nhận đúng separator (không dính chữ)
 * Duplicate sequence 2 lần để animate translateX(-50%) loop seamless.
 */
const VALUES = [
  "Thủ công làng nghề",
  "Nguyên liệu Việt 100%",
  "Không phẩm màu",
  "Không phụ gia",
  "Mạch nha tự nấu",
  "Lạc rang vàng tay",
  "Chuẩn vị quê",
  "Sạch — Chất — Lành",
];

export function ValuesMarquee({
  variant = "light",
}: {
  variant?: "light" | "dark";
}) {
  // Join với " · " (space + middle dot + space) — separator nằm TRONG text content
  // Thêm " · " ở cuối để loop sang vòng 2 không bị 2 giá trị dính nhau
  const sequence = VALUES.join(" · ") + " · ";

  return (
    <div
      className={`relative overflow-hidden border-y py-8 sm:py-11 ${
        variant === "light"
          ? "border-wood-500/15 bg-cream-50/40"
          : "border-cream-50/10 bg-wood-950"
      }`}
    >
      <div className="flex w-max animate-marquee whitespace-nowrap will-change-transform">
        {/* 2 lần để seamless loop. aria-hidden ở bản 2 để screen-reader đọc 1 lần. */}
        <span
          className={`font-display text-[28px] font-medium italic leading-none sm:text-[38px] ${
            variant === "light" ? "text-wood-900" : "text-cream-50"
          }`}
          style={{ letterSpacing: "-0.005em" }}
        >
          {sequence}
        </span>
        <span
          aria-hidden="true"
          className={`font-display text-[28px] font-medium italic leading-none sm:text-[38px] ${
            variant === "light" ? "text-wood-900" : "text-cream-50"
          }`}
          style={{ letterSpacing: "-0.005em" }}
        >
          {sequence}
        </span>
      </div>
    </div>
  );
}
