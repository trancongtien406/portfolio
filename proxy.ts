import type { ProxyConfig } from "next/server";
import { NextRequest, NextResponse } from "next/server";

/**
 * Proxy xử lý subdomain routing (Next.js 16 – thay thế middleware.ts).
 *
 * Khi user truy cập: myshop.tiendev.id.vn
 * → Rewrite nội bộ sang: /tenant/myshop
 *
 * Khi user truy cập: myshop.tiendev.id.vn/about
 * → Rewrite nội bộ sang: /tenant/myshop/about
 */

// Domain chính (thay bằng domain thật khi deploy)
const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "tiendev.id.vn";

// Danh sách host được coi là "domain chính" (không rewrite)
const MAIN_HOSTS = [
  "localhost",
  "localhost:3000",
  "127.0.0.1",
  "127.0.0.1:3000",
  ROOT_DOMAIN,
  `www.${ROOT_DOMAIN}`,
];

export default function proxy(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get("host") || "";

  // Bỏ qua nếu là domain chính
  if (MAIN_HOSTS.some((h) => hostname === h || hostname.startsWith(`${h}:`))) {
    return NextResponse.next();
  }

  // Bỏ qua static files và API routes
  if (
    url.pathname.startsWith("/_next") ||
    url.pathname.startsWith("/api") ||
    url.pathname.startsWith("/favicon") ||
    url.pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Trích subdomain từ hostname.
  // VD: myshop.tiendev.id.vn → subdomain = "myshop"
  // VD: myshop.localhost:3000 → subdomain = "myshop"
  let subdomain: string | null = null;

  // Cho localhost: myshop.localhost:3000
  if (hostname.includes("localhost")) {
    const parts = hostname.split(".");
    if (parts.length > 1) {
      subdomain = parts[0];
    }
  } else {
    // Cho production: myshop.tiendev.id.vn
    const hostnameWithoutPort = hostname.split(":")[0];
    const rootParts = ROOT_DOMAIN.split(".");
    const hostParts = hostnameWithoutPort.split(".");

    if (hostParts.length > rootParts.length) {
      subdomain = hostParts
        .slice(0, hostParts.length - rootParts.length)
        .join(".");
    }
  }

  // Nếu không có subdomain → truy cập bình thường
  if (!subdomain) {
    return NextResponse.next();
  }

  // Rewrite URL sang /tenant/[subdomain]/...
  const path = url.pathname === "/" ? "" : url.pathname;
  url.pathname = `/tenant/${subdomain}${path}`;

  return NextResponse.rewrite(url);
}

export const config: ProxyConfig = {
  matcher: [
    // Match tất cả trừ static files
    "/((?!_next/static|_next/image|favicon.ico|icon|apple-touch-icon|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
