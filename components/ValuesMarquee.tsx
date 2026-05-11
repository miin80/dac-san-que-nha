"use client";

/**
 * Marquee dải giá trị thương hiệu chạy ngang vô tận — luxury signature
 * (Hermès, Aesop, La Mer hay dùng kiểu này để ngắt nhịp giữa các section).
 *
 * Cách lặp: duplicate nội dung 2 lần, animate translateX(-50%) → seamless loop.
 */
const VALUES = [
  "Thủ công làng nghề",
  "Nguyên liệu Việt 100%",
  "Không phẩm màu",
  "Không phụ gia",
  "Mạch nha tự nấu",
  "Lạc rang vàng tay",
  "Chuẩn vị quê",
  "Sạch · Chất · Lành",
];

export function ValuesMarquee({
  variant = "light",
}: {
  variant?: "light" | "dark";
}) {
  const items = [...VALUES, ...VALUES];
  return (
    <div
      className={`relative overflow-hidden border-y py-7 sm:py-9 ${
        variant === "light"
          ? "border-wood-500/15 bg-cream-50/40"
          : "border-cream-50/10 bg-wood-950"
      }`}
    >
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap will-change-transform sm:gap-16">
        {items.map((v, i) => (
          <span key={i} className="flex items-center gap-12 sm:gap-16">
            <span
              className={`font-display text-2xl italic sm:text-3xl ${
                variant === "light" ? "text-wood-900/80" : "text-cream-50/90"
              }`}
            >
              {v}
            </span>
            <span
              className={`inline-block h-1.5 w-1.5 rounded-full ${
                variant === "light" ? "bg-brick-500" : "bg-gold-500"
              }`}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
