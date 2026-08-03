import Link from "next/link";
import { Reveal } from "./animations";
import type { BlogPostItem } from "./types";

type BlogTabProps = {
  posts: BlogPostItem[];
  loading: boolean;
  error: string;
};

function formatPostDate(value: string) {
  return new Date(value).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function BlogTab({ posts, loading, error }: BlogTabProps) {
  const featuredPost = posts[0] ?? null;
  const recentPosts = featuredPost ? posts.slice(1, 5) : posts.slice(0, 4);

  return (
    <>
      <div className="flex min-w-0 flex-col gap-4 neo-card bg-[var(--neo-ink)] p-4 text-[var(--neo-bg-cream)] sm:gap-5 sm:p-6">
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
            <div className="min-w-0 border-4 border-[var(--neo-ink)] bg-[var(--neo-bg-cream)] p-3 text-[var(--neo-ink)] neo-hard-shadow-sm">
              <p className="inline-block border-4 border-[var(--neo-ink)] bg-[var(--neo-secondary)] px-2 py-1 text-sm font-black uppercase tracking-[0.2em] text-[var(--neo-ink)] neo-hard-shadow-sm sm:text-base">
                BLOG CỦA TÔI
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-[var(--neo-ink)] sm:text-3xl">
                Bài viết mới về web, app và tư duy làm sản phẩm
              </h2>
              <p className="mt-3 max-w-2xl text-sm font-semibold text-[var(--neo-ink)] sm:text-base">
                Nơi mình ghi lại kinh nghiệm thực chiến, ghi chú kỹ thuật và những bài học rút ra khi xây dựng sản phẩm.
              </p>
            </div>
            <div className="flex flex-shrink-0 flex-col items-start gap-2 text-left text-sm text-[var(--neo-bg-cream)] sm:items-end sm:text-right md:text-base">
              <span className="font-bold">{posts.length} bài viết công khai</span>
              <Link
                href="/blog"
                className="neo-button inline-flex items-center justify-center px-4 py-2 text-xs uppercase tracking-[0.16em] sm:text-sm"
              >
                Xem trang blog
              </Link>
            </div>
          </div>
        </Reveal>

        {loading ? (
          <div className="grid gap-3 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            {[0, 1].map((item) => (
              <div key={item} className="neo-card bg-[var(--neo-bg-cream)] p-4 text-[var(--neo-ink)]">
                <div className="h-6 w-40 animate-shimmer bg-neutral-200" />
                <div className="mt-4 space-y-2">
                  <div className="h-4 w-full animate-shimmer bg-neutral-100" />
                  <div className="h-4 w-11/12 animate-shimmer bg-neutral-100" />
                  <div className="h-4 w-3/4 animate-shimmer bg-neutral-100" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="neo-card border-4 border-red-600 bg-red-200 p-4 text-sm font-bold text-red-900 sm:text-base">
            {error}
          </div>
        ) : posts.length === 0 ? (
          <div className="neo-card bg-[var(--neo-bg-cream)] p-6 text-center text-[var(--neo-ink)]">
            <p className="text-lg font-black">Chưa có bài viết nào để hiển thị.</p>
            <p className="mt-2 text-sm font-semibold sm:text-base">
              Khi có bài viết mới, chúng sẽ xuất hiện tại đây.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            {featuredPost && (
              <Reveal delay={0.08}>
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="group block neo-card bg-[var(--neo-bg-cream)] p-5 text-[var(--neo-ink)] transition-transform duration-150 hover:-translate-y-1 sm:p-6"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="neo-pill bg-[var(--neo-secondary)] px-2 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-[var(--neo-ink)]">
                      Bài mới nhất
                    </span>
                    <time className="text-xs font-bold uppercase tracking-[0.12em] text-neutral-700">
                      {formatPostDate(featuredPost.createdAt)}
                    </time>
                  </div>
                  <h3 className="mt-4 text-2xl font-black tracking-tight sm:text-3xl">
                    {featuredPost.title}
                  </h3>
                  <p className="mt-3 text-sm font-semibold leading-relaxed text-neutral-800 sm:text-base">
                    {featuredPost.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {featuredPost.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="neo-pill bg-[var(--neo-accent)] px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.16em] text-[var(--neo-ink)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center justify-between border-t-4 border-[var(--neo-ink)] pt-3 text-xs font-black uppercase tracking-[0.16em]">
                    <span>Đọc bài viết</span>
                    <span className="text-lg">→</span>
                  </div>
                </Link>
              </Reveal>
            )}

            <div className="flex flex-col gap-3">
              {recentPosts.map((post, index) => (
                <Reveal key={post.slug} delay={0.12 + index * 0.06}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block neo-card bg-[var(--neo-bg-cream)] p-4 text-[var(--neo-ink)] transition-transform duration-150 hover:-translate-y-1"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="text-lg font-black leading-tight sm:text-xl">
                          {post.title}
                        </p>
                        <p className="mt-2 line-clamp-2 text-sm font-semibold text-neutral-700">
                          {post.description}
                        </p>
                      </div>
                      <span className="text-lg font-black">→</span>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <time className="text-[11px] font-bold uppercase tracking-[0.12em] text-neutral-700">
                        {formatPostDate(post.createdAt)}
                      </time>
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="neo-pill bg-[var(--neo-secondary)] px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.16em] text-[var(--neo-ink)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-col gap-3 sm:gap-4">
        <Reveal direction="right" delay={0.15}>
          <div className="neo-card bg-[var(--neo-bg-cream)] p-4 text-[var(--neo-ink)] sm:p-5">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[var(--neo-accent)]">
              Chủ đề chính
            </h3>
            <div className="mt-3 flex flex-wrap gap-2 text-xs sm:text-sm">
              {["Next.js", "TypeScript", "Flutter", "Kiến trúc", "Hiệu năng", "SEO"].map((topic) => (
                <span
                  key={topic}
                  className="neo-pill bg-[var(--neo-secondary)] px-3 py-1 font-black uppercase tracking-[0.16em] text-[var(--neo-ink)]"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal direction="right" delay={0.22}>
          <div className="neo-card bg-[var(--neo-bg-cream)] p-4 text-[var(--neo-ink)] sm:p-5">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[var(--neo-accent)]">
              Mục đích của blog
            </h3>
            <ul className="mt-3 space-y-2 text-sm font-semibold text-neutral-800 sm:text-base">
              {[
                "Chia sẻ kinh nghiệm thực chiến khi build sản phẩm thật.",
                "Ghi lại quyết định kỹ thuật và trade-off quan trọng.",
                "Biến kiến thức dùng hằng ngày thành tài nguyên dễ tra cứu.",
              ].map((item, index) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border-2 border-[var(--neo-ink)] bg-[var(--neo-secondary)] text-[10px] font-black">
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal direction="right" delay={0.29}>
          <div className="neo-card bg-[var(--neo-ink)] p-4 text-[var(--neo-bg-cream)] sm:p-5">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--neo-secondary)]">
              Điều hướng nhanh
            </p>
            <div className="mt-3 flex flex-col gap-2">
              <Link href="/blog" className="neo-button text-center text-sm sm:text-base">
                Xem tất cả bài viết
              </Link>
              {featuredPost && (
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="neo-pill bg-[var(--neo-bg-cream)] px-3 py-2 text-center text-xs font-black uppercase tracking-[0.16em] text-[var(--neo-ink)] transition-transform duration-150 hover:-translate-y-0.5 sm:text-sm"
                >
                  Đọc bài mới nhất
                </Link>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </>
  );
}