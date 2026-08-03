import type { Page } from "@/app/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ subdomain: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { subdomain } = await params;
  const tenant = await prisma.tenant.findUnique({
    where: { subdomain, status: "ACTIVE" },
  });

  if (!tenant) return { title: "Website không tồn tại" };

  return {
    title: tenant.name,
    description: tenant.description || `Website ${tenant.name}`,
  };
}

export default async function TenantHomePage({ params }: Props) {
  const { subdomain } = await params;

  const tenant = await prisma.tenant.findUnique({
    where: { subdomain, status: "ACTIVE" },
    include: { pages: { orderBy: { sortOrder: "asc" } } },
  });

  if (!tenant) notFound();

  const homePage = tenant.pages.find((p: Page) => p.slug === "home");

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900">
      {/* Header */}
      <header
        className="sticky top-0 z-20 border-b border-zinc-200/70 backdrop-blur-md"
        style={{ backgroundColor: tenant.primaryColor }}
      >
        <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            {tenant.logoUrl ? (
              <img
                src={tenant.logoUrl}
                alt={tenant.name}
                className="h-7 w-7 shrink-0 rounded-lg object-cover sm:h-8 sm:w-8"
              />
            ) : (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/20 text-xs font-bold text-[var(--neo-bg-cream)] sm:h-9 sm:w-9 sm:rounded-xl sm:text-sm">
                {tenant.name.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="truncate text-base font-semibold text-[var(--neo-bg-cream)] sm:text-lg">
              {tenant.name}
            </span>
          </div>

          <nav className="flex min-w-0 gap-1 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0">
            {tenant.pages.map((page: Page) => (
              <a
                key={page.slug}
                href={page.slug === "home" ? "/" : `/${page.slug}`}
                className="shrink-0 rounded-full px-2.5 py-1.5 text-xs font-medium text-[color:rgba(255,255,255,0.8)] transition-colors hover:bg-white/10 hover:text-[var(--neo-bg-cream)] sm:px-3 sm:text-sm"
              >
                {page.title}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        {homePage ? (
          <div
            className="prose prose-zinc prose-sm max-w-none sm:prose-base"
            dangerouslySetInnerHTML={{ __html: homePage.content }}
          />
        ) : (
          <div className="text-center">
            <h1 className="text-2xl font-semibold sm:text-3xl">
              Chào mừng đến với {tenant.name}
            </h1>
            <p className="mt-3 text-zinc-500">
              {tenant.description || "Website đang được xây dựng."}
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white py-6 sm:py-8">
        <div className="mx-auto max-w-5xl px-4 text-center text-xs text-zinc-500 sm:px-6 sm:text-sm">
          <p>
            © {new Date().getFullYear()} {tenant.name}. Tạo bởi{" "}
            <span className="font-medium text-zinc-700">{tenant.ownerName}</span>
          </p>
          <p className="mt-1">
            Powered by{" "}
            <a
              href="https://tiendev.id.vn"
              className="font-medium text-zinc-700 hover:underline"
            >
              TienDev Platform
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
