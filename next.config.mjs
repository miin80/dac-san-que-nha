/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },

  // Redirect URL cũ /san-pham → /cua-hang (giữ SEO, tránh 404 cho link cũ)
  // /san-pham/[slug] vẫn hoạt động cho từng trang sản phẩm chi tiết.
  async redirects() {
    return [
      {
        source: "/san-pham",
        destination: "/cua-hang",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
