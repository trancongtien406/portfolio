import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 - Không tìm thấy trang",
  description: "Trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.",
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center neo-page px-4 text-center font-sans">
      <div className="relative mb-8 neo-card bg-[var(--neo-secondary)] px-8 py-6 sm:px-10 sm:py-8">
        <span className="block text-[6rem] font-black leading-none tracking-tighter sm:text-[8rem]">
          404
        </span>
        <p className="mt-3 text-lg font-black uppercase tracking-[0.25em]">
          Không tìm thấy trang
        </p>
      </div>

      <p className="max-w-md text-sm text-neutral-800 sm:text-base">
        Trang bạn đang tìm kiếm không tồn tại, đã bị xóa hoặc đường dẫn không
        chính xác.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="neo-button px-6 py-2.5 text-xs sm:text-sm"
        >
          Về trang chủ
        </Link>
        <Link
          href={"/blog" as any}
          className="neo-pill border-4 border-[var(--neo-ink)] bg-[var(--neo-bg-cream)] px-6 py-2.5 text-xs font-black uppercase tracking-[0.18em] sm:text-sm"
        >
          Xem Blog
        </Link>
      </div>
    </div>
  );
}
