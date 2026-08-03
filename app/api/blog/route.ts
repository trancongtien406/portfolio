import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const pageParam = searchParams.get("page");
  const limitParam = searchParams.get("limit");
  const publishedParam = searchParams.get("published");

  const hasPagination = pageParam !== null || limitParam !== null;
  const parsedPage = Number(pageParam || "1");
  const parsedLimit = Number(limitParam || "9");
  const page = Number.isFinite(parsedPage) && parsedPage > 0 ? Math.floor(parsedPage) : 1;
  const limit = Number.isFinite(parsedLimit) && parsedLimit > 0
    ? Math.min(50, Math.floor(parsedLimit))
    : 9;

  const where =
    publishedParam === "true"
      ? { published: true }
      : publishedParam === "false"
        ? { published: false }
        : undefined;

  if (!hasPagination) {
    const posts = await prisma.blogPost.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(posts);
  }

  const total = await prisma.blogPost.count({ where });
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const safePage = Math.min(page, totalPages);

  const posts = await prisma.blogPost.findMany({
    where,
    orderBy: { createdAt: "desc" },
    skip: (safePage - 1) * limit,
    take: limit,
  });

  return NextResponse.json({
    data: posts,
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
    const { title, slug, description, content, tags, coverImage, published } =
      body;

    if (!title || !slug || !description || !content) {
      return NextResponse.json(
        { error: "Thiếu thông tin bắt buộc: title, slug, description, content" },
        { status: 400 },
      );
    }

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      return NextResponse.json(
        { error: "Slug không hợp lệ. Chỉ dùng a-z, 0-9 và dấu gạch ngang." },
        { status: 400 },
      );
    }

    const existing = await prisma.blogPost.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json(
        { error: "Slug đã tồn tại" },
        { status: 409 },
      );
    }

    const post = await prisma.blogPost.create({
      data: {
        title,
        slug,
        description,
        content,
        tags: tags || [],
        coverImage: coverImage || null,
        published: published ?? false,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Lỗi server" },
      { status: 500 },
    );
  }
}
