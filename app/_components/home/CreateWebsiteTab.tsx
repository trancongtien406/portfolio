import { Reveal } from "./animations";

type CreateWebsiteTabProps = {
  wsSubdomain: string;
  setWsSubdomain: (value: string) => void;
  wsName: string;
  setWsName: (value: string) => void;
  wsDescription: string;
  setWsDescription: (value: string) => void;
  wsOwnerName: string;
  setWsOwnerName: (value: string) => void;
  wsOwnerEmail: string;
  setWsOwnerEmail: (value: string) => void;
  wsPrimaryColor: string;
  setWsPrimaryColor: (value: string) => void;
  wsCreating: boolean;
  wsError: string;
  wsSuccess: { subdomain: string; name: string; url: string } | null;
  wsRecentSites: Array<{ subdomain: string; name: string; createdAt: string }>;
  subdomainValid: boolean | null;
  onCreateWebsite: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

export function CreateWebsiteTab({
  wsSubdomain,
  setWsSubdomain,
  wsName,
  setWsName,
  wsDescription,
  setWsDescription,
  wsOwnerName,
  setWsOwnerName,
  wsOwnerEmail,
  setWsOwnerEmail,
  wsPrimaryColor,
  setWsPrimaryColor,
  wsCreating,
  wsError,
  wsSuccess,
  wsRecentSites,
  subdomainValid,
  onCreateWebsite,
}: CreateWebsiteTabProps) {
  return (
    <>
      <div className="flex min-w-0 flex-col gap-4 rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 p-4 text-zinc-50 shadow-[0_24px_60px_rgba(15,23,42,0.75)] sm:gap-5 sm:rounded-3xl sm:p-6">
        <Reveal>
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-zinc-800/80 px-3 py-1 text-xs font-medium text-zinc-300">
              <span className="h-2 w-2 rounded-full bg-violet-400 animate-pulse" />
              <span>Tạo website trong 30 giây</span>
            </div>
            <p className="mt-3 text-sm uppercase tracking-[0.2em] text-zinc-400 sm:text-base">
              TẠO WEBSITE CỦA BẠN
            </p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
              Website riêng với subdomain miễn phí
            </h2>
            <p className="mt-3 max-w-lg text-sm text-zinc-300 sm:text-base">
              Tạo website cá nhân hoặc doanh nghiệp với subdomain riêng:{" "}
              <span className="font-medium text-zinc-50">yourname.tiendev.id.vn</span>. Hệ thống tự động tạo trang chủ, giới thiệu và liên hệ sẵn cho bạn.
            </p>
          </div>
        </Reveal>

        <form onSubmit={onCreateWebsite} className="space-y-4">
          <Reveal delay={0.1}>
            <div>
              <label htmlFor="ws-subdomain" className="text-sm text-zinc-400">
                Subdomain <span className="text-red-400">*</span>
              </label>
              <div className="mt-1 flex items-center gap-0 overflow-hidden rounded-2xl bg-zinc-800/80 transition-all focus-within:ring-2 focus-within:ring-zinc-600">
                <input
                  id="ws-subdomain"
                  value={wsSubdomain}
                  onChange={(e) =>
                    setWsSubdomain(
                      e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""),
                    )
                  }
                  placeholder="myshop"
                  className="flex-1 border-none bg-transparent px-4 py-2.5 text-base font-medium text-zinc-50 outline-none placeholder:text-zinc-600"
                  required
                  maxLength={63}
                />
                <span className="whitespace-nowrap bg-zinc-700/60 px-3 py-2.5 text-sm text-zinc-400">
                  .tiendev.id.vn
                </span>
              </div>
              {wsSubdomain && (
                <p
                  className={`mt-1 text-xs transition-colors ${subdomainValid ? "text-emerald-400" : "text-red-400"}`}
                >
                  {subdomainValid
                    ? `✓ ${wsSubdomain}.tiendev.id.vn — hợp lệ`
                    : "✗ Chỉ dùng a-z, 0-9, dấu gạch ngang. Tối thiểu 3 ký tự."}
                </p>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div>
              <label htmlFor="ws-name" className="text-sm text-zinc-400">
                Tên website <span className="text-red-400">*</span>
              </label>
              <input
                id="ws-name"
                value={wsName}
                onChange={(e) => setWsName(e.target.value)}
                placeholder="My Awesome Shop"
                className="mt-1 w-full rounded-2xl bg-zinc-800/80 px-4 py-2.5 text-base font-medium text-zinc-50 outline-none placeholder:text-zinc-600 transition-all focus:ring-2 focus:ring-zinc-600"
                required
              />
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div>
              <label htmlFor="ws-description" className="text-sm text-zinc-400">
                Mô tả ngắn
              </label>
              <textarea
                id="ws-description"
                value={wsDescription}
                onChange={(e) => setWsDescription(e.target.value)}
                placeholder="Website bán hàng online, portfolio cá nhân, ..."
                rows={2}
                className="mt-1 w-full rounded-2xl bg-zinc-800/80 px-4 py-2.5 text-base text-zinc-50 outline-none placeholder:text-zinc-600 transition-all focus:ring-2 focus:ring-zinc-600"
              />
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="ws-owner-name" className="text-sm text-zinc-400">
                  Tên của bạn <span className="text-red-400">*</span>
                </label>
                <input
                  id="ws-owner-name"
                  value={wsOwnerName}
                  onChange={(e) => setWsOwnerName(e.target.value)}
                  placeholder="Nguyễn Văn A"
                  className="mt-1 w-full rounded-2xl bg-zinc-800/80 px-4 py-2.5 text-base text-zinc-50 outline-none placeholder:text-zinc-600 transition-all focus:ring-2 focus:ring-zinc-600"
                  required
                />
              </div>
              <div>
                <label htmlFor="ws-owner-email" className="text-sm text-zinc-400">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  id="ws-owner-email"
                  type="email"
                  value={wsOwnerEmail}
                  onChange={(e) => setWsOwnerEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="mt-1 w-full rounded-2xl bg-zinc-800/80 px-4 py-2.5 text-base text-zinc-50 outline-none placeholder:text-zinc-600 transition-all focus:ring-2 focus:ring-zinc-600"
                  required
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div>
              <label htmlFor="ws-primary-color" className="text-sm text-zinc-400">
                Màu chủ đạo
              </label>
              <div className="mt-1 flex flex-wrap items-center gap-3">
                <input
                  id="ws-primary-color"
                  type="color"
                  value={wsPrimaryColor}
                  onChange={(e) => setWsPrimaryColor(e.target.value)}
                  className="h-9 w-9 shrink-0 cursor-pointer rounded-lg border border-zinc-700 bg-transparent sm:h-10 sm:w-10 sm:rounded-xl"
                />
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {[
                    "#18181b",
                    "#1e40af",
                    "#059669",
                    "#dc2626",
                    "#7c3aed",
                    "#ea580c",
                    "#0891b2",
                    "#be185d",
                  ].map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setWsPrimaryColor(color)}
                      className={[
                        "h-7 w-7 rounded-full border-2 transition-all duration-300 hover:scale-125 sm:h-8 sm:w-8",
                        wsPrimaryColor === color
                          ? "border-white scale-110"
                          : "border-transparent",
                      ].join(" ")}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {wsError && (
            <div className="animate-fade-in rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {wsError}
            </div>
          )}

          {wsSuccess && (
            <div className="animate-fade-in-up rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
              <p className="font-semibold">
                ✓ Website &ldquo;{wsSuccess.name}&rdquo; đã được tạo thành công!
              </p>
              <p className="mt-1">
                Truy cập ngay:{" "}
                <a
                  href={wsSuccess.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-emerald-200 underline"
                >
                  {wsSuccess.url}
                </a>
              </p>
            </div>
          )}

          <Reveal delay={0.35}>
            <button
              type="submit"
              disabled={wsCreating || !subdomainValid}
              className={[
                "flex w-full items-center justify-center rounded-2xl px-6 py-3 text-base font-semibold shadow-sm transition-all duration-300",
                wsCreating || !subdomainValid
                  ? "cursor-not-allowed bg-zinc-700 text-zinc-400"
                  : "bg-zinc-50 text-zinc-900 hover:bg-white hover:shadow-lg hover:-translate-y-0.5",
              ].join(" ")}
            >
              {wsCreating ? (
                <>
                  <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Đang tạo website...
                </>
              ) : (
                "Tạo website ngay"
              )}
            </button>
          </Reveal>
        </form>
      </div>

      <div className="flex min-w-0 flex-col gap-3 sm:gap-4">
        <Reveal direction="right" delay={0.15}>
          <div className="min-w-0 overflow-hidden rounded-2xl bg-white p-3 shadow-[0_18px_40px_rgba(15,23,42,0.18)] sm:rounded-3xl sm:p-4">
            <h3 className="text-sm font-medium text-zinc-600">Xem trước website</h3>
            <div
              className="mt-3 overflow-hidden rounded-2xl border border-zinc-200 transition-all duration-500"
              style={{ minHeight: 200 }}
            >
              <div className="flex items-center gap-2 border-b border-zinc-200 bg-zinc-100 px-3 py-2">
                <div className="flex gap-1">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </div>
                <div className="flex-1 rounded-md bg-white px-2 py-0.5 text-xs text-zinc-400">
                  {wsSubdomain ? `${wsSubdomain}.tiendev.id.vn` : "yourname.tiendev.id.vn"}
                </div>
              </div>
              <div className="p-4">
                <div
                  className="rounded-xl px-4 py-3 transition-colors duration-500"
                  style={{ backgroundColor: wsPrimaryColor }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[var(--neo-bg-cream)] text-xs font-bold text-[var(--neo-ink)]">
                        {wsName ? wsName.charAt(0).toUpperCase() : "W"}
                      </div>
                      <span className="text-sm font-semibold text-[var(--neo-ink)]">
                        {wsName || "Tên website"}
                      </span>
                    </div>
                    <div className="flex gap-2 text-[10px] text-[color:rgba(0,0,0,0.7)]">
                      <span>Trang chủ</span>
                      <span>Giới thiệu</span>
                      <span>Liên hệ</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-2 px-1">
                  <div className="h-5 w-3/4 rounded bg-zinc-200 animate-shimmer" />
                  <div className="h-3 w-full rounded bg-zinc-100" />
                  <div className="h-3 w-5/6 rounded bg-zinc-100" />
                  <div className="mt-4 h-3 w-2/3 rounded bg-zinc-100" />
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal direction="right" delay={0.25}>
          <div className="rounded-2xl bg-white p-3 shadow-sm sm:rounded-3xl sm:p-4">
            <h3 className="text-sm font-medium text-zinc-600">Bạn sẽ nhận được</h3>
            <ul className="mt-3 space-y-2 text-sm text-zinc-600">
              {[
                {
                  text: (
                    <>
                      Subdomain riêng:{" "}
                      <span className="font-medium text-zinc-900">
                        {wsSubdomain || "yourname"}.tiendev.id.vn
                      </span>
                    </>
                  ),
                },
                { text: "3 trang sẵn có: Trang chủ, Giới thiệu, Liên hệ" },
                { text: "Giao diện responsive, tối ưu mobile" },
                { text: "Tuỳ chỉnh màu chủ đạo theo thương hiệu" },
                { text: "Tạo website chỉ trong vài giây" },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-[10px] text-zinc-600">
                    ✓
                  </span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {wsRecentSites.length > 0 && (
          <Reveal direction="right" delay={0.3}>
            <div className="rounded-2xl bg-white p-3 shadow-sm sm:rounded-3xl sm:p-4">
              <h3 className="text-sm font-medium text-zinc-600">Website vừa tạo</h3>
              <div className="mt-3 space-y-2">
                {wsRecentSites.map((site) => {
                  const url =
                    typeof window !== "undefined" && window.location.hostname === "localhost"
                      ? `http://${site.subdomain}.localhost:3000`
                      : `https://${site.subdomain}.tiendev.id.vn`;

                  return (
                    <div
                      key={site.subdomain}
                      className="flex items-center justify-between rounded-2xl bg-zinc-50 px-3 py-2 transition-all hover:bg-zinc-100"
                    >
                      <div>
                        <p className="text-sm font-medium text-zinc-900">{site.name}</p>
                        <p className="text-xs text-zinc-500">{site.subdomain}.tiendev.id.vn</p>
                      </div>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-zinc-900 px-3 py-1 text-xs font-medium text-[var(--neo-bg-cream)] transition-all hover:bg-zinc-800 hover:shadow-sm"
                      >
                        Truy cập
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </>
  );
}
