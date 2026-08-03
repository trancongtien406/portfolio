import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Các subdomain không được phép đăng ký
const RESERVED_SUBDOMAINS = [
  "www",
  "api",
  "admin",
  "dashboard",
  "mail",
  "ftp",
  "ns1",
  "ns2",
  "blog",
  "shop",
  "app",
  "dev",
  "staging",
  "test",
];

// GET: Lấy danh sách tenants
export async function GET() {
  try {
    const tenants = await prisma.tenant.findMany({
      orderBy: { createdAt: "desc" },
      include: { pages: { orderBy: { sortOrder: "asc" } } },
    });
    return NextResponse.json(tenants);
  } catch (error) {
    console.error("Failed to fetch tenants:", error);
    return NextResponse.json(
      { error: "Không thể tải danh sách website" },
      { status: 500 }
    );
  }
}

// POST: Tạo website mới
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { subdomain, name, description, ownerName, ownerEmail, primaryColor } =
      body;

    // Validate required fields
    if (!subdomain || !name || !ownerName || !ownerEmail) {
      return NextResponse.json(
        {
          error:
            "Vui lòng điền đầy đủ: subdomain, tên website, tên chủ sở hữu và email",
        },
        { status: 400 }
      );
    }

    // Validate subdomain format: chỉ chữ thường, số, dấu gạch ngang; 3-63 ký tự
    const subdomainRegex = /^[a-z0-9]([a-z0-9-]{1,61}[a-z0-9])?$/;
    if (!subdomainRegex.test(subdomain)) {
      return NextResponse.json(
        {
          error:
            "Subdomain không hợp lệ. Chỉ sử dụng chữ thường (a-z), số (0-9) và dấu gạch ngang (-). Tối thiểu 3, tối đa 63 ký tự. Không bắt đầu/kết thúc bằng dấu gạch ngang.",
        },
        { status: 400 }
      );
    }

    // Check reserved subdomains
    if (RESERVED_SUBDOMAINS.includes(subdomain)) {
      return NextResponse.json(
        { error: `Subdomain "${subdomain}" đã được sử dụng cho hệ thống` },
        { status: 400 }
      );
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(ownerEmail)) {
      return NextResponse.json(
        { error: "Email không hợp lệ" },
        { status: 400 }
      );
    }

    // Check if subdomain already exists
    const existing = await prisma.tenant.findUnique({
      where: { subdomain },
    });
    if (existing) {
      return NextResponse.json(
        { error: `Subdomain "${subdomain}" đã được sử dụng bởi người khác` },
        { status: 409 }
      );
    }

    // Create the tenant with default pages
    const tenant = await prisma.tenant.create({
      data: {
        subdomain,
        name,
        description: description || null,
        ownerName,
        ownerEmail,
        primaryColor: primaryColor || "#18181b",
        pages: {
          create: [
            {
              slug: "home",
              title: "Trang chủ",
              content: `<h1>Chào mừng đến với ${name}</h1>\n<p>Website được tạo bởi ${ownerName}.</p>\n<p>${description || "Chưa có mô tả."}</p>`,
              sortOrder: 0,
            },
            {
              slug: "about",
              title: "Giới thiệu",
              content: `<h1>Giới thiệu</h1>\n<p>Đây là trang giới thiệu của ${name}.</p>\n<p>Chủ sở hữu: ${ownerName}</p>\n<p>Email: ${ownerEmail}</p>`,
              sortOrder: 1,
            },
            {
              slug: "contact",
              title: "Liên hệ",
              content: `<h1>Liên hệ</h1>\n<p>Hãy liên hệ với chúng tôi qua email: ${ownerEmail}</p>`,
              sortOrder: 2,
            },
          ],
        },
      },
      include: { pages: true },
    });

    return NextResponse.json(tenant, { status: 201 });
  } catch (error) {
    console.error("Failed to create tenant:", error);
    return NextResponse.json(
      { error: "Không thể tạo website. Vui lòng thử lại sau." },
      { status: 500 }
    );
  }
}
