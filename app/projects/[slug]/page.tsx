import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  try {
    const projects = await prisma.project.findMany({
      where: { published: true },
      select: { slug: true },
    });
    return projects.map((p) => ({ slug: p.slug }));
  } catch {
    // CI/build without DB — pages resolve on-demand at runtime
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await prisma.project.findUnique({
    where: { slug, published: true },
  });
  if (!project) return {};

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} | Trần Công Tiến`,
      description: project.description,
      type: "article",
      url: `/projects/${project.slug}`,
    },
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await prisma.project.findUnique({
    where: { slug, published: true },
  });
  if (!project) notFound();

  const relatedProjects = await prisma.project.findMany({
    where: {
      type: project.type,
      slug: { not: project.slug },
      published: true,
    },
    take: 4,
    orderBy: { sortOrder: "asc" },
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    author: {
      "@type": "Person",
      name: "Trần Công Tiến",
      url: "https://tiendev.id.vn",
    },
    url: `https://tiendev.id.vn/projects/${project.slug}`,
    keywords: project.stack.join(", "),
  };

  return (
    <div className="min-h-screen neo-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <header className="sticky top-0 z-20 bg-[var(--neo-secondary)] neo-card px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Link
            href="/"
            className="text-xs font-black uppercase tracking-[0.2em]"
          >
            ← Quay lại Portfolio
          </Link>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="neo-button px-3 py-1.5 text-[10px]"
            >
              GitHub →
            </a>
          )}
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Badge */}
        <span className="inline-block neo-pill bg-[var(--neo-secondary)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em]">
          {project.type === "app" ? "Mobile App" : "Web"}
        </span>

        <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
          {project.title}
        </h1>

        <p className="mt-4 text-lg leading-relaxed text-neutral-800">
          {project.longDescription}
        </p>

        {/* Cover Image */}
        <div className="relative mt-8 aspect-video overflow-hidden neo-card bg-[var(--neo-bg-cream)]">
          <Image
            src={project.coverImage || "/demo.jpg"}
            alt={project.imageAlt || project.title}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            unoptimized={Boolean(project.coverImage)}
          />
        </div>

        {/* Stack */}
        <section className="mt-10">
          <h2 className="text-lg font-black">
            Công nghệ sử dụng
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="neo-pill bg-[var(--neo-bg-cream)] px-3 py-1.5 text-sm font-black"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="mt-10">
          <h2 className="text-lg font-black">
            Tính năng chính
          </h2>
          <ul className="mt-3 space-y-2">
            {project.features.map((feat) => (
              <li key={feat} className="flex items-start gap-2 text-neutral-800">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center neo-pill bg-emerald-400 text-xs font-black">
                  ✓
                </span>
                {feat}
              </li>
            ))}
          </ul>
        </section>

        {/* CTA */}
        <section className="mt-12 neo-card bg-[var(--neo-bg-cream)] p-6 text-center">
          <p className="text-lg font-black">
            Bạn muốn xây dựng dự án tương tự?
          </p>
          <p className="mt-2 text-sm text-neutral-700">
            Hãy liên hệ với tôi để trao đổi chi tiết về yêu cầu và báo giá.
          </p>
          <Link
            href="/#lien-he"
            className="mt-4 inline-block neo-button px-6 py-2.5 text-sm"
          >
            Liên hệ ngay
          </Link>
        </section>

        {/* Related projects */}
        <section className="mt-12">
          <h2 className="text-lg font-black">
            Dự án liên quan
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {relatedProjects.map((p) => (
                <Link
                  key={p.slug}
                  href={`/projects/${p.slug}`}
                  className="group neo-card bg-[var(--neo-bg-cream)] p-4 transition-transform duration-150 hover:-translate-y-1"
                >
                  <p className="font-black group-hover:underline">
                    {p.title}
                  </p>
                  <p className="mt-1 line-clamp-2 text-sm text-neutral-700">
                    {p.description}
                  </p>
                </Link>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
}
