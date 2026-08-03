import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    select: {
      title: true,
      description: true,
      slug: true,
      coverImage: true,
      tags: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  if (!post) return {};

  const image = post.coverImage || "/opengraph-image";

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: "Tran Cong Tien", url: "https://tiendev.id.vn" }],
    openGraph: {
      title: `${post.title} | Trần Công Tiến`,
      description: post.description,
      type: "article",
      url: `/blog/${post.slug}`,
      publishedTime: post.createdAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: ["Trần Công Tiến"],
      tags: post.tags,
      images: [
        {
          url: image,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Trần Công Tiến`,
      description: post.description,
      images: [image],
    },
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug, published: true },
  });

  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    author: {
      "@type": "Person",
      name: "Trần Công Tiến",
      url: "https://tiendev.id.vn",
    },
    datePublished: post.createdAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    url: `https://tiendev.id.vn/blog/${post.slug}`,
    keywords: post.tags.join(", "),
  };

  return (
    <div className="min-h-screen neo-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <header className="sticky top-0 z-20 bg-[var(--neo-secondary)] neo-card px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link
            href="/blog"
            className="text-xs font-black uppercase tracking-[0.2em]"
          >
            ← Tất cả bài viết
          </Link>
          <Link
            href="/"
            className="text-xs font-black uppercase tracking-[0.2em]"
          >
            Portfolio
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
          <time>
            {post.createdAt.toLocaleDateString("vi-VN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="neo-pill bg-[var(--neo-secondary)] px-2.5 py-0.5 text-[10px] font-black uppercase tracking-[0.16em]"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
          {post.title}
        </h1>

        <p className="mt-4 text-lg text-neutral-700">{post.description}</p>

        {post.coverImage ? (
          <div className="relative mt-6 aspect-[16/9] overflow-hidden neo-card bg-[var(--neo-bg-cream)]">
            <Image src={post.coverImage} alt={post.title} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" unoptimized />
          </div>
        ) : null}

        {/* Content */}
        <article
          className="blog-content mt-8"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Footer */}
        <div className="mt-12 border-t-4 border-[var(--neo-ink)] pt-8">
          <div className="neo-card bg-[var(--neo-bg-cream)] p-6 text-center">
            <p className="text-lg font-black">
              Bạn thấy bài viết hữu ích?
            </p>
            <p className="mt-2 text-sm text-neutral-700">
              Hãy liên hệ nếu bạn muốn trao đổi thêm hoặc cần tư vấn dự án.
            </p>
            <Link
              href="/"
              className="mt-4 inline-block neo-button px-6 py-2.5 text-sm"
            >
              Xem Portfolio
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
