import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) {
    return NextResponse.json({ error: "Không tìm thấy" }, { status: 404 });
  }
  return NextResponse.json(project);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const {
      title, slug, type, description, longDescription,
      stack, features, github, demoUrl, coverImage, imageAlt,
      published, sortOrder,
    } = body;

    if (!title || !slug || !type || !description) {
      return NextResponse.json(
        { error: "Thiếu thông tin bắt buộc" },
        { status: 400 },
      );
    }

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      return NextResponse.json(
        { error: "Slug không hợp lệ" },
        { status: 400 },
      );
    }

    const existing = await prisma.project.findUnique({ where: { slug } });
    if (existing && existing.id !== id) {
      return NextResponse.json(
        { error: "Slug đã được sử dụng bởi dự án khác" },
        { status: 409 },
      );
    }

    const project = await prisma.project.update({
      where: { id },
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

    return NextResponse.json(project);
  } catch {
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}
