"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    href: "/admin/blog",
    label: "Blog",
    description: "Bài viết SEO, nội dung dài và trạng thái publish.",
  },
  {
    href: "/admin/projects",
    label: "Projects",
    description: "Danh sách dự án, thứ tự hiển thị và metadata.",
  },
  {
    href: "/admin/contact",
    label: "Contact",
    description: "Inbox khách hàng và luồng xử lý phản hồi.",
  },
];

export default function AdminSidebar({
  postCount,
  publishedPostCount,
  projectCount,
  publishedProjectCount,
  contactCount,
  newContactCount,
}: {
  postCount: number;
  publishedPostCount: number;
  projectCount: number;
  publishedProjectCount: number;
  contactCount: number;
  newContactCount: number;
}) {
  const pathname = usePathname();

  const counts: Record<string, number> = {
    "/admin/blog": postCount,
    "/admin/projects": projectCount,
    "/admin/contact": contactCount,
  };

  const overview = [
    { label: "Bài viết", value: postCount, detail: `${publishedPostCount} bài đang public` },
    { label: "Dự án", value: projectCount, detail: `${publishedProjectCount} dự án đang hiển thị` },
    { label: "Liên hệ mới", value: newContactCount, detail: `${contactCount} tin nhắn đã lưu` },
  ];

  return (
    <aside className="lg:sticky lg:top-6">
      <div className="overflow-hidden rounded-[32px] border border-zinc-200 bg-zinc-950 text-[var(--neo-bg-cream)] shadow-[0_30px_80px_-40px_rgba(24,24,27,0.8)]">
        {/* Brand */}
        <div className="border-b border-white/10 px-5 py-6 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/45">Portfolio CMS</p>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight">Admin</h1>
          <p className="mt-2 text-sm leading-6 text-white/65">
            Quản lý tập trung blog, project và contact.
          </p>
          <Link
            href="/"
            className="mt-5 inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-[var(--neo-bg-cream)] transition hover:bg-white/10"
          >
            Về trang chủ
          </Link>
        </div>

        {/* Navigation */}
        <div className="px-3 py-3">
          <p className="px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
            Điều hướng
          </p>
          <div className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href as Route}
                  className={`flex w-full items-start justify-between rounded-2xl px-4 py-4 transition ${
                    isActive
                      ? "bg-white text-zinc-950"
                      : "text-white/75 hover:bg-white/6 hover:text-[var(--neo-bg-cream)]"
                  }`}
                >
                  <div className="min-w-0 pr-3">
                    <p className="text-sm font-semibold">{item.label}</p>
                    <p
                      className={`mt-1 text-xs leading-5 ${isActive ? "text-zinc-500" : "text-white/45"}`}
                    >
                      {item.description}
                    </p>
                  </div>
                  <span
                    className={`mt-0.5 shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                      isActive
                        ? "bg-zinc-100 text-zinc-800"
                        : "bg-white/10 text-[var(--neo-bg-cream)]"
                    }`}
                  >
                    {counts[item.href]}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Overview */}
        <div className="border-t border-white/10 px-5 py-5 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">Tổng quan</p>
          <div className="mt-3 space-y-3">
            {overview.map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm text-white/60">{item.label}</p>
                  <p className="text-lg font-semibold text-[var(--neo-bg-cream)]">{item.value}</p>
                </div>
                <p className="mt-1 text-xs leading-5 text-white/45">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
