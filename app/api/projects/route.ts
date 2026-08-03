import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const pageParam = searchParams.get("page");
  const limitParam = searchParams.get("limit");
  const publishedParam = searchParams.get("published");
  const typeParam = searchParams.get("type");

  const hasPagination = pageParam !== null || limitParam !== null;
  const parsedPage = Number(pageParam || "1");
  const parsedLimit = Number(limitParam || "9");
  const page = Number.isFinite(parsedPage) && parsedPage > 0 ? Math.floor(parsedPage) : 1;
  const limit = Number.isFinite(parsedLimit) && parsedLimit > 0
    ? Math.min(50, Math.floor(parsedLimit))
    : 9;

  const where = {
    ...(publishedParam === "true"
      ? { published: true }
      : publishedParam === "false"
        ? { published: false }
        : {}),
    ...(typeParam === "web" || typeParam === "app" ? { type: typeParam } : {}),
  };

  if (!hasPagination) {
    const projects = await prisma.project.findMany({
      where,
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });

    return NextResponse.json(projects);
  }

  const total = await prisma.project.count({ where });
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const safePage = Math.min(page, totalPages);

  const projects = await prisma.project.findMany({
    where,
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    skip: (safePage - 1) * limit,
    take: limit,
  });

  return NextResponse.json({
    data: projects,
    pagination: {
      page: safePage,
      limit,
      total,
      totalPages,
      hasPrev: safePage > 1,
      hasNext: safePage < totalPages,
    },
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      title, slug, type, description, longDescription,
      stack, features, github, demoUrl, coverImage, imageAlt,
      published, sortOrder,
    } = body;

    if (!title || !slug || !type || !description) {
      return NextResponse.json(
        { error: "Thiếu thông tin bắt buộc: title, slug, type, description" },
        { status: 400 },
      );
    }

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      return NextResponse.json(
        { error: "Slug không hợp lệ. Chỉ dùng a-z, 0-9 và dấu gạch ngang." },
        { status: 400 },
      );
    }

    const existing = await prisma.project.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json(
        { error: "Slug đã tồn tại" },
        { status: 409 },
      );
    }

    const project = await prisma.project.create({
      data: {
        title,
        slug,
        type,
        description,
        longDescription: longDescription || null,
        stack: stack || [],
        features: features || [],
        github: github || null,
        demoUrl: demoUrl || null,
        coverImage: coverImage || null,
        imageAlt: imageAlt || null,
        published: published ?? true,
        sortOrder: sortOrder ?? 0,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}
