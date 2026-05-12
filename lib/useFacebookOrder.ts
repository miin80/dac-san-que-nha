"use client";

import { useCallback, useState } from "react";
import { BRAND } from "@/lib/data";

/**
 * Hook đặt hàng qua Messenger Facebook.
 *
 * Workflow: Messenger không hỗ trợ pre-fill text qua URL nên phải copy thủ công:
 *   1. Copy text đặt hàng vào clipboard
 *   2. Mở m.me link → Messenger
 *   3. Hiển thị toast "Đã sao chép — dán vào Messenger"
 *   4. User dán (Ctrl+V / paste) vào ô chat
 *
 * Trả về:
 *   - `triggerOrder(text)` → action click button
 *   - `copied` → boolean, đang hiện "đã sao chép" hay không
 */
export function useFacebookOrder() {
  const [copied, setCopied] = useState(false);

  const triggerOrder = useCallback(async (text: string) => {
    // Try copy clipboard (có thể fail nếu user chưa interact, hoặc browser cũ)
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Clipboard fail (browser cũ / không có quyền) — fallback dùng input ẩn
      try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      } catch {
        // Hoàn toàn fail — vẫn mở Messenger, user phải tự gõ
      }
    }

    // Mở Messenger sau 350ms để toast kịp hiện trước khi user chuyển tab
    setTimeout(() => {
      window.open(BRAND.messenger, "_blank", "noopener");
    }, 350);
  }, []);

  return { triggerOrder, copied };
}
