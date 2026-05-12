import type { Metadata } from "next";
import { AdminClient } from "./AdminClient";

// Đánh dấu noindex — Google không crawl /admin
export const metadata: Metadata = {
  title: "Admin — Đặc Sản Quê Nhà",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminClient />;
}
