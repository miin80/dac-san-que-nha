"use client";

import { useState, useEffect } from "react";
import { Loader2, Sparkles, Upload, LogOut, ExternalLink, AlertCircle, Eye } from "lucide-react";
import type { Article } from "@/lib/articles";

/**
 * /admin — trang bán-tự-động viết bài blog.
 *
 * Flow:
 *   1. Login bằng ADMIN_PASSWORD → lưu sessionStorage
 *   2. Nhập chủ đề + keywords → click Generate
 *   3. /api/admin/generate gọi Claude → trả Article object
 *   4. Preview bài bên dưới form
 *   5. Click Publish → /api/admin/publish commit lên GitHub → Vercel auto-deploy
 *
 * Trang này KHÔNG dùng layout chính của site (Header/Footer) — dedicated workspace.
 */

const CATEGORIES = ["Kiến thức", "Câu chuyện", "Gợi ý quà"];
const STORAGE_KEY = "dsqn-admin-pwd";

export function AdminClient() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);

  // Persist auth across reload via sessionStorage (mất khi đóng tab)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      setPassword(saved);
      setAuthed(true);
    }
  }, []);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!password.trim()) return;
    sessionStorage.setItem(STORAGE_KEY, password);
    setAuthed(true);
  }

  function handleLogout() {
    sessionStorage.removeItem(STORAGE_KEY);
    setPassword("");
    setAuthed(false);
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-wood-950 px-6">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md rounded-2xl bg-cream-50 p-8 shadow-card"
        >
          <h1 className="font-display text-2xl font-light text-wood-900">Admin Login</h1>
          <p className="mt-2 text-sm text-wood-500">
            Trang dành cho quản trị nội dung blog. Cần password.
          </p>
          <label className="mt-6 block text-[10px] font-semibold uppercase tracking-luxury text-wood-700">
            Password
          </label>
          <input
            type="password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-xl border border-wood-100 bg-cream-50 px-4 py-3 text-wood-900 focus:border-brick-400 focus:outline-none focus:ring-2 focus:ring-brick-400/20"
          />
          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-wood-900 px-6 py-3 text-sm font-semibold uppercase tracking-luxury text-cream-50 transition-colors hover:bg-wood-700"
          >
            Đăng nhập
          </button>
        </form>
      </div>
    );
  }

  return <AdminDashboard password={password} onLogout={handleLogout} />;
}

/* -------------------------------------------------------------------------- */
/* DASHBOARD                                                                   */
/* -------------------------------------------------------------------------- */

function AdminDashboard({ password, onLogout }: { password: string; onLogout: () => void }) {
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [generating, setGenerating] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [article, setArticle] = useState<Article | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [publishResult, setPublishResult] = useState<{ publicUrl: string; commitUrl: string } | null>(null);

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!topic.trim() || generating) return;
    setGenerating(true);
    setError(null);
    setArticle(null);
    setPublishResult(null);

    try {
      const res = await fetch("/api/admin/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-password": password },
        body: JSON.stringify({
          topic: topic.trim(),
          keywords: keywords.split(",").map((k) => k.trim()).filter(Boolean),
          category,
        }),
      });
      const data = await res.json();
      if (!data.ok) {
        setError(data.error || "Lỗi không xác định");
      } else {
        setArticle(data.article);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setGenerating(false);
    }
  }

  async function handlePublish() {
    if (!article || publishing) return;
    setPublishing(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-password": password },
        body: JSON.stringify({ article }),
      });
      const data = await res.json();
      if (!data.ok) {
        setError(data.error || "Lỗi không xác định");
      } else {
        setPublishResult({ publicUrl: data.publicUrl, commitUrl: data.commitUrl });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setPublishing(false);
    }
  }

  function handleReset() {
    setArticle(null);
    setError(null);
    setPublishResult(null);
    setTopic("");
    setKeywords("");
  }

  return (
    <div className="min-h-screen bg-wood-950 text-cream-50">
      {/* Top bar */}
      <header className="border-b border-cream-50/10 px-6 py-4 sm:px-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div>
            <h1 className="font-display text-xl font-light">Admin · Blog generator</h1>
            <p className="mt-0.5 text-[11px] text-cream-100/55">
              AI viết bài → preview → publish lên GitHub
            </p>
          </div>
          <button
            onClick={onLogout}
            className="inline-flex items-center gap-2 rounded-full border border-cream-50/20 px-4 py-2 text-xs text-cream-100/75 transition-colors hover:bg-cream-50/10 hover:text-cream-50"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8 sm:px-10 sm:py-12">
        {/* PUBLISH SUCCESS BANNER */}
        {publishResult && (
          <div className="mb-8 rounded-2xl border border-tea-500/40 bg-tea-500/15 p-6">
            <p className="font-display text-2xl font-light text-cream-50">🎉 Đã publish</p>
            <p className="mt-2 text-sm text-cream-100/85">
              Commit đã tạo. Vercel đang build, bài sẽ live trong ~2-3 phút.
            </p>
            <div className="mt-4 flex flex-wrap gap-3 text-xs">
              <a href={publishResult.publicUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-cream-50 px-4 py-2 font-semibold text-wood-900 transition-colors hover:bg-cream-100">
                <ExternalLink size={12} /> Xem bài (đợi Vercel build)
              </a>
              <a href={publishResult.commitUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-cream-50/30 px-4 py-2 text-cream-100/85 transition-colors hover:bg-cream-50/10">
                <ExternalLink size={12} /> Xem commit GitHub
              </a>
              <button onClick={handleReset} className="rounded-full px-4 py-2 text-cream-100/75 transition-colors hover:text-cream-50">
                Viết bài mới
              </button>
            </div>
          </div>
        )}

        {/* ERROR BANNER */}
        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-brick-500/40 bg-brick-500/15 p-4 text-sm text-cream-50">
            <AlertCircle size={18} className="mt-0.5 shrink-0 text-brick-400" />
            <div className="flex-1">
              <p className="font-semibold">Lỗi</p>
              <p className="mt-1 text-cream-100/85">{error}</p>
            </div>
            <button onClick={() => setError(null)} className="text-cream-100/60 hover:text-cream-50">×</button>
          </div>
        )}

        {/* FORM */}
        {!publishResult && (
          <form onSubmit={handleGenerate} className="grid gap-5 rounded-3xl bg-cream-50/[0.04] p-6 ring-1 ring-cream-50/10 sm:p-8">
            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-luxury text-gold-400">
                Chủ đề bài viết
              </label>
              <input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="VD: Kẹo dồi lạc khác kẹo lạc thế nào?"
                disabled={generating}
                className="mt-2 w-full rounded-xl bg-cream-50/[0.04] px-4 py-3 text-cream-50 ring-1 ring-cream-50/15 placeholder-cream-100/40 focus:outline-none focus:ring-2 focus:ring-gold-400"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-luxury text-gold-400">
                  Từ khoá SEO (cách nhau bằng dấu phẩy)
                </label>
                <input
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="kẹo dồi lạc, đặc sản Bắc Bộ, ..."
                  disabled={generating}
                  className="mt-2 w-full rounded-xl bg-cream-50/[0.04] px-4 py-3 text-cream-50 ring-1 ring-cream-50/15 placeholder-cream-100/40 focus:outline-none focus:ring-2 focus:ring-gold-400"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-luxury text-gold-400">
                  Danh mục
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  disabled={generating}
                  className="mt-2 w-full rounded-xl bg-cream-50/[0.04] px-4 py-3 text-cream-50 ring-1 ring-cream-50/15 focus:outline-none focus:ring-2 focus:ring-gold-400"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c} className="bg-wood-950">{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={!topic.trim() || generating}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 px-8 py-4 text-sm font-bold uppercase tracking-luxury text-wood-950 transition-all hover:bg-gold-400 disabled:cursor-wait disabled:opacity-60"
            >
              {generating ? (
                <><Loader2 size={16} className="animate-spin" /> AI đang viết (~30-60s)…</>
              ) : (
                <><Sparkles size={16} /> Generate bài viết</>
              )}
            </button>
          </form>
        )}

        {/* PREVIEW */}
        {article && !publishResult && (
          <section className="mt-10">
            <div className="mb-4 flex items-center gap-3">
              <Eye size={18} className="text-gold-400" />
              <h2 className="font-display text-xl font-light text-cream-50">Preview</h2>
              <span className="text-xs text-cream-100/55">Review kỹ trước khi publish</span>
            </div>

            <article className="rounded-3xl bg-cream-50 p-7 text-wood-900 shadow-card sm:p-10">
              <div className="text-[10px] font-semibold uppercase tracking-luxury text-brick-500">
                {article.category} · {article.readingMinutes ?? 5} phút đọc
              </div>
              <h1 className="mt-3 font-display text-3xl font-light leading-tight text-wood-900 sm:text-4xl">
                {article.title}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-wood-500 sm:text-[17px]">
                {article.excerpt}
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3 text-xs text-wood-500 sm:grid-cols-4">
                <Field label="Slug" value={article.slug} />
                <Field label="Publish date" value={article.publishedAt} />
                <Field label="Cover" value={article.coverImage} />
                <Field label="Related products" value={(article.relatedProductSlugs || []).join(", ") || "—"} />
              </div>

              <hr className="my-7 border-wood-100" />

              {/* Content blocks render */}
              <div className="space-y-5">
                {article.content.map((block, i) => (
                  <BlockPreview key={i} block={block} />
                ))}
              </div>

              <hr className="my-7 border-wood-100" />

              <details className="text-xs text-wood-500">
                <summary className="cursor-pointer font-semibold">Xem JSON raw (để debug)</summary>
                <pre className="mt-3 max-h-96 overflow-auto rounded-xl bg-wood-950 p-4 text-[11px] text-cream-100/85">
                  {JSON.stringify(article, null, 2)}
                </pre>
              </details>
            </article>

            {/* PUBLISH BAR */}
            <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
              <button
                onClick={handleReset}
                disabled={publishing}
                className="rounded-full border border-cream-50/20 px-6 py-3 text-sm text-cream-100/75 transition-colors hover:bg-cream-50/10 hover:text-cream-50"
              >
                Bỏ, generate lại
              </button>
              <button
                onClick={handlePublish}
                disabled={publishing}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-tea-500 px-8 py-3 text-sm font-bold uppercase tracking-luxury text-cream-50 transition-all hover:bg-tea-700 disabled:cursor-wait disabled:opacity-60"
              >
                {publishing ? (
                  <><Loader2 size={16} className="animate-spin" /> Đang commit GitHub…</>
                ) : (
                  <><Upload size={16} /> Publish — auto deploy</>
                )}
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-wood-50/40 px-3 py-2">
      <div className="text-[9px] uppercase tracking-luxury text-wood-500">{label}</div>
      <div className="mt-0.5 truncate font-mono text-[11px] text-wood-700" title={value}>{value}</div>
    </div>
  );
}

function BlockPreview({ block }: { block: Article["content"][number] }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className={`leading-relaxed text-wood-700 ${block.dropCap ? "first-letter:font-display first-letter:text-5xl first-letter:float-left first-letter:pr-3 first-letter:leading-[0.85] first-letter:text-brick-500 first-letter:italic" : ""}`}>
          {block.text}
        </p>
      );
    case "heading": {
      const Tag = block.level === 2 ? "h2" : "h3";
      return <Tag className={`font-display font-light text-wood-900 ${block.level === 2 ? "text-2xl mt-8" : "text-xl mt-6"}`}>{block.text}</Tag>;
    }
    case "image":
      return (
        <figure className="my-6">
          <div className="aspect-[16/10] overflow-hidden rounded-xl bg-wood-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={block.src} alt={block.alt} className="h-full w-full object-cover" />
          </div>
          {block.caption && <figcaption className="mt-3 text-center text-sm italic text-wood-500">{block.caption}</figcaption>}
        </figure>
      );
    case "quote":
      return (
        <blockquote className="border-l-2 border-brick-500/50 pl-5">
          <p className="font-display text-xl font-light italic text-wood-900">{block.text}</p>
          {block.attribution && <cite className="mt-2 block text-sm not-italic text-wood-500">— {block.attribution}</cite>}
        </blockquote>
      );
    case "list":
      return (
        <ul className="ml-6 list-disc space-y-2 text-wood-700">
          {block.items.map((it, i) => <li key={i}>{it}</li>)}
        </ul>
      );
    case "callout":
      return (
        <aside className="rounded-2xl border border-gold-500/40 bg-gold-500/10 p-5">
          {block.title && <p className="text-[10px] font-bold uppercase tracking-luxury text-gold-600">{block.title}</p>}
          <p className="mt-2 text-wood-700">{block.text}</p>
        </aside>
      );
    default:
      return null;
  }
}
