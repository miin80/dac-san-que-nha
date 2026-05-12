/**
 * Toàn bộ dữ liệu phụ trợ của website tập trung tại đây.
 *
 * Sản phẩm chi tiết (giá / mô tả / ảnh / video) đặt riêng trong `lib/products.ts`
 * để dễ thêm / sửa sản phẩm mà không ảnh hưởng các khối khác.
 *
 * File này chứa:
 *   - BRAND          → thông tin thương hiệu, SĐT, link mạng xã hội
 *   - CATEGORIES     → 6 danh mục đặc sản (homepage Categories section)
 *   - TESTIMONIALS   → cảm nhận khách (mẫu — thay bằng review thật khi có)
 *   - REELS          → video TikTok/Reel cho section hậu trường
 *   - formatPrice    → helper hiển thị giá VND
 */

export type Category = {
  slug: string;
  name: string;
  short: string;            // mô tả ngắn 1 dòng cho card danh mục
  description: string;      // mô tả dài cho trang chi tiết / SEO
  image: string;
  accent: "brick" | "tea" | "gold" | "wood";
};

/* ----------------------------- THÔNG TIN THƯƠNG HIỆU -----------------------------
 * Kênh bán hàng duy nhất: FACEBOOK MESSENGER.
 * (Đã loại bỏ Zalo theo yêu cầu tập trung 100% vào Facebook.)
 *
 * Trường cần update khi đổi:
 *   - hotline / hotlineHref → SĐT
 *   - facebook              → URL fanpage
 *   - messenger             → URL m.me (handle fanpage)
 *   - address / hours       → địa chỉ + giờ mở cửa thật
 *   - siteUrl               → domain sau khi gắn
 */
export const BRAND = {
  name: "Đặc Sản Quê Nhà",
  tagline: "Chuẩn vị quê — sạch · chất · lành",
  subTagline: "Những món bánh kẹo tuổi thơ mang đậm hương vị Việt",
  hotline: "055.988.6533",
  hotlineHref: "tel:+84559886533",
  messenger: "https://m.me/dacsanquenhaa",
  facebook: "https://www.facebook.com/dacsanquenhaa",
  facebookReels: "https://www.facebook.com/dacsanquenhaa/reels/",
  email: "",
  address: "Làng nghề bánh kẹo truyền thống Bắc Bộ — Việt Nam",
  hours: "8:00 – 21:00 mỗi ngày",
  siteUrl: "https://dacsanquenha.vn",
};

/* --------------------------------- DANH MỤC ---------------------------------- */
export const CATEGORIES: Category[] = [
  {
    slug: "keo-lac",
    name: "Kẹo lạc",
    short: "Giòn rụm, ngọt thanh, đậm vị lạc rang",
    description:
      "Kẹo lạc thủ công làm từ lạc nhân rang vàng cùng đường mật vàng óng, cắt miếng vuông vắn, giòn tan, thơm mùi mạch nha truyền thống của làng nghề Bắc Bộ.",
    image: "/images/keo-lac/keo-lac-1.jpg",
    accent: "brick",
  },
  {
    slug: "keo-doi-lac",
    name: "Kẹo dồi lạc",
    short: "Vỏ trắng giòn nhẹ, nhân lạc bùi béo",
    description:
      "Kẹo dồi lạc với lớp vỏ kéo trắng mịn bao quanh nhân lạc rang giã thô — khi nhai phát ra tiếng tách giòn, vị ngọt thanh hậu bùi, một thức quà gắn liền tuổi thơ.",
    image: "/images/keo-doi/keo-doi-1.jpg",
    accent: "wood",
  },
  {
    slug: "keo-me-den",
    name: "Kẹo mè đen",
    short: "Hương mè đen rang, đậm đà tinh tế",
    description:
      "Kẹo mè đen được làm từ mè đen rang chín tới, hòa cùng mạch nha tự nhiên, dậy mùi thơm bùi rất riêng. Ăn không ngán, hợp khẩu vị người sành ẩm thực.",
    image: "/images/keo-me-den/keo-me-den-1.jpg",
    accent: "wood",
  },
  {
    slug: "keo-vung",
    name: "Kẹo vừng (mè trắng)",
    short: "Vừng trắng rang vàng, ngọt nhẹ thanh tao",
    description:
      "Kẹo vừng cắt thanh dài, mặt phủ vừng trắng rang vàng đều, giòn tan khi cắn, ngọt nhẹ thanh tao — đặc sản trứ danh của vùng Nam Định.",
    image: "/images/keo-vung/keo-vung-14.jpg",
    accent: "gold",
  },
  {
    slug: "banh-cay",
    name: "Bánh cáy",
    short: "Tinh hoa làng nghề Thái Bình",
    description:
      "Bánh cáy Thái Bình — đặc sản tiến vua từ thế kỷ XVIII. Hòa quyện gạo nếp, lạc, vừng, gừng, mỡ phần, mứt bí… cắt miếng vuông, vị ngọt nhẹ, dẻo bùi, hợp uống trà.",
    image: "/images/banh-cay/banh-cay-3.jpg",
    accent: "gold",
  },
  {
    slug: "keo-lac-hong",
    name: "Kẹo lạc hồng",
    short: "Sắc hồng rực rỡ, vị lạc đậm đà",
    description:
      "Kẹo lạc hồng với sắc đỏ tươi đặc trưng từ mạch nha gấc tự nhiên, vị ngọt vừa phải, nhân lạc rang nguyên hạt — món quà mang lại may mắn cho ngày đầu năm.",
    image: "/images/keo-lac-hong/keo-lac-hong-4.jpg",
    accent: "brick",
  },
];

/* -------------------------------- CẢM NHẬN KHÁCH ------------------------------- */
/**
 * ⚠️ Đây là review mẫu để demo bố cục.
 * KHI CÓ REVIEW THẬT TỪ FANPAGE: chụp screenshot bình luận khách thật, lưu vào
 * /public/reviews/<n>.jpg rồi đổi `source` thành "facebook" + thêm field `screenshot`.
 * Hoặc copy y nguyên nội dung bình luận thật ở đây, giữ tên + thành phố như khách viết.
 */
export type Testimonial = {
  name: string;
  city: string;
  rating: number;
  content: string;
  product?: string;     // sản phẩm khách đã mua
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Chị Mai Anh",
    city: "Hà Nội",
    rating: 5,
    content:
      "Ăn miếng kẹo lạc thấy y như hồi bé bà ngoại hay mua cho. Giòn, thơm, lạc rất bùi. Mình mua biếu Tết, ai nhận cũng khen.",
    product: "Kẹo lạc cao cấp",
  },
  {
    name: "Anh Quốc Việt",
    city: "TP. Hồ Chí Minh",
    rating: 5,
    content:
      "Bánh cáy đóng gói rất đẹp, ăn cùng tách trà sen chiều thứ Bảy là chuẩn bài. Sẽ đặt thêm để biếu sếp dịp này.",
    product: "Bánh cáy Thái Bình",
  },
  {
    name: "Cô Hồng",
    city: "Nam Định",
    rating: 5,
    content:
      "Nhà mình ở Nam Định mà vẫn đặt vì kẹo dồi của bên này làm khéo hơn ngoài chợ. Vỏ giòn, nhân vừa miệng. Cảm ơn shop.",
    product: "Kẹo dồi lạc",
  },
  {
    name: "Chị Thu Trang",
    city: "Đà Nẵng",
    rating: 5,
    content:
      "Kẹo mè đen thơm thật sự, vị mè không bị khét. Đóng túi sạch sẽ, ship nhanh. Sẽ ủng hộ shop dài dài.",
    product: "Kẹo mè đen",
  },
  {
    name: "Anh Hoàng",
    city: "Hải Phòng",
    rating: 5,
    content:
      "Kẹo lạc hồng màu đẹp, đặt làm quà Tết cho khách công ty, ai cũng thích vì vừa lạ vừa quen.",
    product: "Kẹo lạc hồng",
  },
  {
    name: "Chị Linh",
    city: "Vũng Tàu",
    rating: 5,
    content:
      "Mua thử một combo 6 loại, cả nhà ăn hết trong 3 ngày. Combo này quá đáng đồng tiền. Sẽ đặt lại.",
    product: "Combo 6 loại đặc sản",
  },
];

/* ---------------------- VIDEO / REELS ---------------------- */
/**
 * Reels dùng video MP4 thật trong /public/videos.
 * `poster` là ảnh hiện trước khi video load — chọn ảnh sản phẩm liên quan.
 * Component VideoReels render thẻ <video> autoplay muted loop playsinline kiểu TikTok.
 */
export type Reel = {
  id: string;
  title: string;
  caption: string;
  poster: string;
  src: string;
  /** Optional: URL Facebook Reel cụ thể. Nếu không có, fallback dùng BRAND.facebookReels.
   *  Khi có URL cụ thể (e.g. https://www.facebook.com/.../videos/123456), điền vào đây
   *  để user xem được đúng reel trên FB khi mobile không decode được MP4. */
  facebookUrl?: string;
};

export const REELS: Reel[] = [
  {
    id: "r-keo-lac",
    title: "Kẹo lạc — nét đẹp dân gian",
    caption: "Lạc rang vàng, mạch nha tự nấu, cắt miếng vuông vắn đều tay.",
    poster: "/images/keo-lac/keo-lac-1.jpg",
    src: "/videos/keo-lac/keo-lac-1.mp4",
  },
  {
    id: "r-keo-doi",
    title: "Kéo kẹo dồi lạc thủ công",
    caption: "Khoảnh khắc kéo kẹo trắng muốt — nghề truyền đời của làng.",
    poster: "/images/keo-doi/keo-doi-1.jpg",
    src: "/videos/keo-doi/keo-doi-1.mp4",
  },
  {
    id: "r-banh-cay",
    title: "Bánh cáy làng Nguyễn",
    caption: "Đặc sản tiến vua Thái Bình — chuẩn vị xưa, dẻo bùi đậm đà.",
    poster: "/images/banh-cay/banh-cay-3.jpg",
    src: "/videos/banh-cay/banh-cay-1.mp4",
  },
  {
    id: "r-keo-me-den",
    title: "Kẹo mè đen rang già lửa",
    caption: "Mè đen rang chín tới, mạch nha vàng óng — dậy mùi thơm bùi.",
    poster: "/images/keo-me-den/keo-me-den-1.jpg",
    src: "/videos/keo-me-den/keo-me-den-1.mp4",
  },
  {
    id: "r-keo-vung",
    title: "Kẹo vừng cao cấp thủ công",
    caption: "Vừng trắng phủ đều, giòn tan, ngọt thanh — đặc sản Nam Định.",
    poster: "/images/keo-vung/keo-vung-14.jpg",
    src: "/videos/keo-vung/keo-vung-1.mp4",
  },
  {
    id: "r-keo-lac-hong",
    title: "Kẹo lạc hồng — sắc đỏ may mắn",
    caption: "Màu đỏ tự nhiên từ gấc, vị ngọt vừa, lạc rang nguyên hạt.",
    poster: "/images/keo-lac-hong/keo-lac-hong-4.jpg",
    src: "/videos/keo-lac-hong/keo-lac-hong-1.mp4",
  },
];

/* -------------------------------- ĐỊNH DẠNG ---------------------------------- */
export const formatPrice = (vnd: number) =>
  new Intl.NumberFormat("vi-VN").format(vnd) + "₫";
