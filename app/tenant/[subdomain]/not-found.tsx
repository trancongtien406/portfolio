import Link from "next/link";

export default function TenantNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-6 text-center font-sans">
      {/* Icon */}
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-zinc-100 text-4xl">
        🔍
      </div>

      {/* Heading */}
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
        Website không tồn tại
      </h1>

      {/* Description */}
      <p className="mt-3 max-w-md text-base text-zinc-500">
        Subdomain này chưa được đăng ký hoặc đã bị vô hiệu hóa. Vui lòng kiểm
        tra lại địa chỉ URL.
      </p>

      {/* Actions */}
      <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
        <Link
          href={`https://${process.env.NEXT_PUBLIC_ROOT_DOMAIN || "tiendev.id.vn"}`}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-[var(--neo-bg-cream)] transition-colors hover:bg-zinc-800"
        >
          <span>←</span>
          Về trang chủ
        </Link>

        <Link
          href={`https://${process.env.NEXT_PUBLIC_ROOT_DOMAIN || "tiendev.id.vn"}/#create-website`}
          className="inline-flex items-center justify-center rounded-full border border-zinc-300 bg-white px-5 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
        >
          Tạo website mới
        </Link>
      </div>

      {/* Footer hint */}
      <p className="mt-12 text-xs text-zinc-400">
        Powered by{" "}
        <a
          href={`https://${process.env.NEXT_PUBLIC_ROOT_DOMAIN || "tiendev.id.vn"}`}
          className="font-medium text-zinc-500 hover:underline"
        >
          TienDev Platform
        </a>
      </p>
    </div>
  );
}
