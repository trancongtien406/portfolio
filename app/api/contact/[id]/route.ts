import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const ALLOWED_STATUSES = new Set(["NEW", "READ", "REPLIED", "ARCHIVED"]);

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const nextStatus = String(body.status || "").toUpperCase();

    if (!ALLOWED_STATUSES.has(nextStatus)) {
      return NextResponse.json(
        { error: "Trạng thái liên hệ không hợp lệ." },
        { status: 400 },
      );
    }

    const updated = await prisma.contactMessage.update({
      where: { id },
      data: {
        status: nextStatus as "NEW" | "READ" | "REPLIED" | "ARCHIVED",
        repliedAt: nextStatus === "REPLIED" ? new Date() : null,
      },
    });

    return NextResponse.json(updated);
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
    await prisma.contactMessage.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}