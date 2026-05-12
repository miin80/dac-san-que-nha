/**
 * Admin auth helper — kiểm tra password đơn giản qua Authorization header.
 *
 * Workflow:
 *   1. User nhập password ở /admin login form
 *   2. Client lưu password trong sessionStorage (KHÔNG localStorage để hết tab là logout)
 *   3. Mỗi API call gửi password trong header "x-admin-password"
 *   4. Route handler so sánh với env ADMIN_PASSWORD
 *
 * Lý do KHÔNG dùng cookie/session: đây là admin 1 người dùng, đơn giản hoá auth.
 * Password chỉ tồn tại server-side (ADMIN_PASSWORD env), không leak ra client.
 */

import { NextRequest, NextResponse } from "next/server";

const HEADER = "x-admin-password";

export function isAuthorized(req: NextRequest): boolean {
  const provided = req.headers.get(HEADER);
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false; // chưa cấu hình env → block tất cả
  return provided === expected;
}

export function unauthorized() {
  return NextResponse.json(
    { ok: false, error: "Unauthorized" },
    { status: 401 },
  );
}
