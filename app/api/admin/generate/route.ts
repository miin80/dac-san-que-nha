/**
 * POST /api/admin/generate
 *
 * Body: { topic, keywords[], category, relatedProducts[] }
 * Output: Article object (theo type Article trong lib/articles.ts)
 *
 * Workflow:
 *   1. Validate password (header x-admin-password)
 *   2. Call Claude API với system prompt định hướng giọng văn + JSON schema
 *   3. Parse response → return Article object
 *   4. KHÔNG lưu gì — chỉ generate. Lưu xảy ra ở /api/admin/publish.
 */

import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { isAuthorized, unauthorized } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const maxDuration = 60; // cho phép Claude generate tới 60s

const SYSTEM_PROMPT = `Bạn là biên tập viên content của thương hiệu "Đặc Sản Quê Nhà" — bánh kẹo truyền thống Việt Nam, làng nghề Bắc Bộ, bán qua Facebook Messenger.

Phong cách viết:
- Editorial luxury, cảm hứng từ Aesop / La Mer / Hermès editorial
- Tiếng Việt chuẩn, giọng văn ấm áp, kể chuyện
- KHÔNG hard-sell, KHÔNG khen quá lố
- Kết hợp dữ kiện (lịch sử, cách làm) + cảm xúc (ký ức, gia đình)
- 600-1000 từ

Sản phẩm có sẵn (dùng làm relatedProductSlugs nếu phù hợp):
- keo-lac-410g (Kẹo lạc cao cấp)
- keo-doi-lac-410g (Kẹo dồi lạc thủ công)
- keo-me-den-410g (Kẹo mè đen Nam Định)
- keo-vung-trang-410g (Kẹo vừng trắng)
- banh-cay-thai-binh-410g (Bánh cáy Thái Bình)
- keo-lac-hong-410g (Kẹo lạc hồng)

Ảnh có sẵn trong /public/images/ (chọn 2-3 ảnh phù hợp):
- /images/keo-lac/keo-lac-1.jpg, keo-lac-2.jpg, keo-lac-8.jpg, keo-lac-12.jpg, keo-lac-13.jpg, keo-lac-20.jpg, keo-lac-25.jpg, keo-lac-33.jpg
- /images/keo-doi/keo-doi-1.jpg, keo-doi-5.jpg, keo-doi-8.jpg, keo-doi-11.jpg
- /images/keo-me-den/keo-me-den-1.jpg, keo-me-den-5.jpg, keo-me-den-8.jpg, keo-me-den-12.jpg
- /images/keo-vung/keo-vung-1.jpg, keo-vung-3.jpg, keo-vung-14.jpg, keo-vung-15.jpg
- /images/banh-cay/banh-cay-1.jpg, banh-cay-2.jpg, banh-cay-3.jpg, banh-cay-4.jpg
- /images/keo-lac-hong/keo-lac-hong-2.jpg, keo-lac-hong-3.jpg, keo-lac-hong-4.jpg, keo-lac-hong-8.jpg

OUTPUT: chỉ trả về JSON object hợp lệ (không kèm markdown code fence, không comment), theo schema:

{
  "slug": "ascii-khong-dau-cach-bang-dau-gach",
  "title": "Tiêu đề H1 hấp dẫn — 50-70 ký tự",
  "excerpt": "1-2 câu mô tả, 150-200 ký tự",
  "category": "Kiến thức" | "Câu chuyện" | "Gợi ý quà",
  "coverImage": "/images/<thu-muc>/<ten-file>.jpg",
  "coverImageAlt": "Mô tả ảnh để alt + SEO",
  "publishedAt": "YYYY-MM-DD (hôm nay)",
  "readingMinutes": 5-8,
  "metaTitle": "SEO title <= 60 ký tự",
  "metaDescription": "SEO description <= 160 ký tự",
  "seoKeywords": ["từ khoá 1", "từ khoá 2", ...],
  "content": [
    { "type": "paragraph", "dropCap": true, "text": "Đoạn mở đầu có drop-cap..." },
    { "type": "heading", "level": 2, "text": "..." },
    { "type": "paragraph", "text": "..." },
    { "type": "image", "src": "/images/...", "alt": "...", "caption": "..." },
    { "type": "heading", "level": 2, "text": "..." },
    { "type": "paragraph", "text": "..." },
    { "type": "list", "items": ["...", "..."] },
    { "type": "quote", "text": "...", "attribution": "Đặc Sản Quê Nhà" },
    { "type": "callout", "title": "Mẹo", "text": "..." }
  ],
  "relatedProductSlugs": ["slug-1", "slug-2"]
}

Yêu cầu content blocks:
- 1 paragraph mở đầu CÓ dropCap: true
- 3-5 heading level 2
- 2-3 image (inline, từ list ảnh có sẵn ở trên)
- 1 quote
- 1 list bullet
- Optionally 1 callout cho mẹo/lưu ý
- Kết thúc bằng paragraph cảm xúc, không CTA hard-sell

CHỈ trả JSON. Không text khác. Không \`\`\`json fence.`;

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) return unauthorized();

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: "ANTHROPIC_API_KEY chưa cấu hình trên server" },
      { status: 500 },
    );
  }

  const body = await req.json().catch(() => ({}));
  const topic = (body.topic || "").toString().trim();
  const keywords = Array.isArray(body.keywords) ? body.keywords : [];
  const category = (body.category || "Kiến thức").toString();

  if (!topic) {
    return NextResponse.json(
      { ok: false, error: "Vui lòng nhập chủ đề bài viết" },
      { status: 400 },
    );
  }

  const userPrompt = [
    `Chủ đề: ${topic}`,
    `Danh mục đề xuất: ${category}`,
    keywords.length ? `Từ khoá SEO: ${keywords.join(", ")}` : "",
    `Ngày publish (cho field publishedAt): ${new Date().toISOString().slice(0, 10)}`,
    "",
    "Hãy viết bài theo schema JSON đã yêu cầu. Chỉ trả JSON.",
  ].filter(Boolean).join("\n");

  try {
    const anthropic = new Anthropic({ apiKey });
    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 8000,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userPrompt }],
    });

    const text = response.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("");

    // Strip code fence nếu Claude vô tình bọc ```json
    const cleaned = text
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    let article;
    try {
      article = JSON.parse(cleaned);
    } catch (parseErr) {
      return NextResponse.json(
        {
          ok: false,
          error: "AI trả về JSON không hợp lệ. Thử lại hoặc rephrase chủ đề.",
          raw: cleaned.substring(0, 500),
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, article });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { ok: false, error: "Claude API lỗi: " + msg },
      { status: 502 },
    );
  }
}
