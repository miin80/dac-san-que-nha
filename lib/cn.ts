/**
 * Tiện ích nối className — gộp các chuỗi class, bỏ qua falsy.
 * Không phụ thuộc clsx/tailwind-merge để giữ bundle nhẹ.
 */
export function cn(...inputs: Array<string | undefined | null | false>): string {
  return inputs.filter(Boolean).join(" ");
}
