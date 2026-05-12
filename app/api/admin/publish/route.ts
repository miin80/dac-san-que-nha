/**
 * POST /api/admin/publish
 *
 * Body: { article: Article }
 * Output: { ok, commitSha?, deployUrl?, error? }
 *
 * Workflow:
 *   1. Validate password
 *   2. Validate Article schema (slug duy nhất, fields đủ)
 *   3. Đọc data/articles.json hiện tại từ GitHub
 *   4. Prepend article mới vào mảng (bài mới hiện đầu tiên)
 *   5. Commit lại file qua GitHub API
 *   6. Vercel auto-deploy webhook chạy → bài live sau 2-3 phút
 *
 * KHÔNG ghi filesystem (Vercel serverless read-only) — commit qua GitHub PAT.
 */

import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "@octokit/rest";
import { isAuthorized, unauthorized } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const maxDuration = 30;

const FILE_PATH = "data/articles.json";

function validateArticle(a: unknown): { ok: true; article: Record<string, unknown> } | { ok: false; error: string } {
  if (!a || typeof a !== "object") return { ok: false, error: "Article không phải object" };
  const art = a as Record<string, unknown>;
  const required = ["slug", "title", "excerpt", "category", "coverImage", "coverImageAlt", "publishedAt", "content"];
  for (const f of required) {
    if (!art[f]) return { ok: false, error: `Thiếu field bắt buộc: ${f}` };
  }
  if (typeof art.slug !== "string" || !/^[a-z0-9-]+$/.test(art.slug)) {
    return { ok: false, error: "slug phải là ASCII chữ thường + số + dấu gạch" };
  }
  if (!Array.isArray(art.content) || art.content.length === 0) {
    return { ok: false, error: "content phải là mảng có ít nhất 1 block" };
  }
  return { ok: true, article: art };
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) return unauthorized();

  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_REPO_OWNER;
  const repo = process.env.GITHUB_REPO_NAME;
  const branch = process.env.GITHUB_REPO_BRANCH || "main";

  if (!token || !owner || !repo) {
    return NextResponse.json(
      { ok: false, error: "GITHUB_TOKEN / GITHUB_REPO_OWNER / GITHUB_REPO_NAME chưa cấu hình" },
      { status: 500 },
    );
  }

  const body = await req.json().catch(() => ({}));
  const v = validateArticle(body.article);
  if (!v.ok) return NextResponse.json({ ok: false, error: v.error }, { status: 400 });

  const newArticle = v.article;
  const octokit = new Octokit({ auth: token });

  try {
    // Đọc data/articles.json hiện tại
    const { data: fileData } = await octokit.rest.repos.getContent({
      owner, repo, path: FILE_PATH, ref: branch,
    });
    if (Array.isArray(fileData) || fileData.type !== "file") {
      throw new Error("File path không phải file");
    }
    const sha = fileData.sha;
    const currentContent = Buffer.from(fileData.content, "base64").toString("utf8");
    const articles = JSON.parse(currentContent) as Array<Record<string, unknown>>;

    // Check slug duy nhất
    if (articles.some((a) => a.slug === newArticle.slug)) {
      return NextResponse.json(
        { ok: false, error: `Slug "${newArticle.slug}" đã tồn tại. Đổi slug khác.` },
        { status: 409 },
      );
    }

    // Prepend bài mới (hiện đầu danh sách listing)
    const updated = [newArticle, ...articles];
    const updatedContent = JSON.stringify(updated, null, 2) + "\n";
    const updatedBase64 = Buffer.from(updatedContent, "utf8").toString("base64");

    // Commit
    const commit = await octokit.rest.repos.createOrUpdateFileContents({
      owner, repo, path: FILE_PATH, branch,
      message: `feat(blog): publish "${newArticle.title}" via /admin`,
      content: updatedBase64,
      sha,
      committer: { name: "DSQN Admin Bot", email: "admin@dacsanquenha.vn" },
      author: { name: "DSQN Admin Bot", email: "admin@dacsanquenha.vn" },
    });

    return NextResponse.json({
      ok: true,
      commitSha: commit.data.commit.sha,
      commitUrl: commit.data.commit.html_url,
      publicUrl: `https://dacsanquenha.vn/tin-tuc/${newArticle.slug}`,
      message: "Đã commit. Vercel build sẽ live bài trong 2-3 phút.",
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { ok: false, error: "GitHub API lỗi: " + msg },
      { status: 502 },
    );
  }
}
