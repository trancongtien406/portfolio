import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPublishedBlogPage } from "./_services/blogApi";

const POSTS_PER_PAGE = 9;

export const metadata: Metadata = {
  title: "Blog SEO Web & App",
  description:
    "Blog của Trần Công Tiến, lập trình viên website và ứng dụng tại Đà Nẵng, chia sẻ kiến thức SEO, web app, mobile app và kinh nghiệm triển khai thực tế.",
  keywords: [
    "Trần Công Tiến",
    "blog Trần Công Tiến",
    "lập trình viên website Đà Nẵng",
    "lập trình viên ứng dụng Đà Nẵng",
    "SEO website Đà Nẵng",
    "thiết kế website Đà Nẵng",
  ],
  openGraph: {
    title: "Blog SEO Web & App | Trần Công Tiến",
    description:
      "Chia sẻ kiến thức lập trình, SEO website và kinh nghiệm phát triển web, app tại Đà Nẵng.",
    url: "/blog",
  },
  alternates: {
    canonical: "/blog",
  },
};

export default async function BlogListPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const rawPage = Number(page);
  const currentPage = Number.isFinite(rawPage) && rawPage > 0 ? Math.floor(rawPage) : 1;

  const payload = await getPublishedBlogPage(currentPage, POSTS_PER_PAGE);
  const posts = payload.data;
  const safePage = payload.pagination.page;
  const totalPosts = payload.pagination.total;
  const totalPages = payload.pagination.totalPages;

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="min-h-screen neo-page">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-[var(--neo-secondary)] neo-card px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Link
            href="/"
            className="text-xs font-black uppercase tracking-[0.2em]"
          >
            ← Quay lại Portfolio
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="neo-card bg-[var(--neo-bg-cream)] p-6 sm:p-8">
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
            Blog
          </h1>
          <p className="mt-3 text-base text-neutral-700 sm:text-lg">
            Chia sẻ kiến thức, kinh nghiệm và các case study thực chiến về SEO,
            website và ứng dụng của Trần Công Tiến tại Đà Nẵng.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="mt-10 neo-card bg-[var(--neo-bg-cream)] p-8 text-center">
            <p className="text-lg font-medium">
              Chưa có bài viết nào. Hãy quay lại sau nhé!
            </p>
          </div>
        ) : (
          <div className="mt-8 space-y-6">
            <div className="neo-card bg-[var(--neo-bg-cream)] p-4 text-sm font-bold sm:text-base">
              Trang {safePage}/{totalPages} • {totalPosts} bài viết
            </div>

            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block neo-card bg-[var(--neo-bg-cream)] p-5 transition-transform duration-150 hover:-translate-y-1 sm:p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  {post.coverImage ? (
                    <div className="relative hidden h-28 w-36 shrink-0 overflow-hidden border-4 border-[var(--neo-ink)] bg-white md:block">
                      <Image src={post.coverImage} alt={post.title} fill sizes="144px" className="object-cover" unoptimized />
                    </div>
                  ) : null}
                  <div className="min-w-0 flex-1">
                    <h2 className="text-xl font-black tracking-tight">
                      {post.title}
                    </h2>
                    <p className="mt-2 line-clamp-2 text-sm text-neutral-700 sm:text-base">
                      {post.description}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <time className="text-xs font-medium">
                        {new Date(post.createdAt).toLocaleDateString("vi-VN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="neo-pill bg-[var(--neo-secondary)] px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.16em]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="mt-1 shrink-0 text-2xl font-black">
                    →
                  </span>
                </div>
              </Link>
            ))}

            <nav className="neo-card bg-[var(--neo-bg-cream)] p-4" aria-label="Phân trang bài viết blog">
              <div className="flex flex-wrap items-center justify-center gap-2">
                {safePage > 1 ? (
                  <Link href={`/blog?page=${safePage - 1}`} className="neo-button px-3 py-2 text-xs sm:text-sm">
                    ← Trước
                  </Link>
                ) : (
                  <span className="neo-button cursor-not-allowed bg-neutral-200 px-3 py-2 text-xs text-neutral-500 sm:text-sm">
                    ← Trước
                  </span>
                )}

                {pageNumbers.map((pageNumber) => {
                  const isActive = pageNumber === safePage;
                  return isActive ? (
                    <span
                      key={pageNumber}
                      className="neo-pill bg-[var(--neo-secondary)] px-3 py-2 text-xs font-black sm:text-sm"
                    >
                      {pageNumber}
                    </span>
                  ) : (
                    <Link
                      key={pageNumber}
                      href={`/blog?page=${pageNumber}`}
                      className="neo-button px-3 py-2 text-xs sm:text-sm"
                    >
                      {pageNumber}
                    </Link>
                  );
                })}

                {safePage < totalPages ? (
                  <Link href={`/blog?page=${safePage + 1}`} className="neo-button px-3 py-2 text-xs sm:text-sm">
                    Sau →
                  </Link>
                ) : (
                  <span className="neo-button cursor-not-allowed bg-neutral-200 px-3 py-2 text-xs text-neutral-500 sm:text-sm">
                    Sau →
                  </span>
                )}
              </div>
            </nav>
          </div>
        )}
      </main>
    </div>
  );
}
