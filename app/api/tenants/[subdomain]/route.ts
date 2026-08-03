import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// GET: Lấy thông tin tenant theo subdomain
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ subdomain: string }> }
) {
  try {
    const { subdomain } = await params;

    const tenant = await prisma.tenant.findUnique({
      where: { subdomain },
      include: { pages: { orderBy: { sortOrder: "asc" } } },
    });

    if (!tenant) {
      return NextResponse.json(
        { error: "Website không tồn tại" },
        { status: 404 }
      );
    }

    return NextResponse.json(tenant);
  } catch (error) {
    console.error("Failed to fetch tenant:", error);
    return NextResponse.json(
      { error: "Không thể tải thông tin website" },
      { status: 500 }
    );
  }
}

// PATCH: Cập nhật tenant
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ subdomain: string }> }
) {
  try {
    const { subdomain } = await params;
    const body = await request.json();
    const { name, description, primaryColor, logoUrl, status } = body;

    const tenant = await prisma.tenant.update({
      where: { subdomain },
      data: {
        ...(name && { name }),
        ...(description !== undefined && { description }),
        ...(primaryColor && { primaryColor }),
        ...(logoUrl !== undefined && { logoUrl }),
        ...(status && { status }),
      },
      include: { pages: true },
    });

    return NextResponse.json(tenant);
  } catch (error) {
    console.error("Failed to update tenant:", error);
    return NextResponse.json(
      { error: "Không thể cập nhật website" },
      { status: 500 }
    );
  }
}

// DELETE: Xoá tenant
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ subdomain: string }> }
) {
  try {
    const { subdomain } = await params;

    await prisma.tenant.delete({
      where: { subdomain },
    });

    return NextResponse.json({ message: "Đã xoá website thành công" });
  } catch (error) {
    console.error("Failed to delete tenant:", error);
    return NextResponse.json(
      { error: "Không thể xoá website" },
      { status: 500 }
    );
  }
}
