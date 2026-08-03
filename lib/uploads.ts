import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const MAX_FILE_SIZE = 8 * 1024 * 1024;

const MIME_TO_EXTENSION: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/avif": ".avif",
  "image/svg+xml": ".svg",
};

function sanitizeFolder(folder: string) {
  const normalized = folder.trim().toLowerCase();

  if (!/^[a-z0-9/-]+$/.test(normalized)) {
    throw new Error("Thư mục upload không hợp lệ.");
  }

  return normalized.replace(/^\/+|\/+$/g, "") || "general";
}

function resolveExtension(file: File) {
  const fromMime = MIME_TO_EXTENSION[file.type];
  if (fromMime) return fromMime;

  const ext = path.extname(file.name).toLowerCase();
  if (Object.values(MIME_TO_EXTENSION).includes(ext)) {
    return ext;
  }

  throw new Error("Định dạng ảnh chưa được hỗ trợ.");
}

export async function saveUploadedImage(file: File, folder: string) {
  if (!file.type.startsWith("image/")) {
    throw new Error("Chỉ hỗ trợ upload file ảnh.");
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error("Ảnh vượt quá giới hạn 8MB.");
  }

  const safeFolder = sanitizeFolder(folder);
  const extension = resolveExtension(file);
  const fileName = `${Date.now()}-${randomUUID()}${extension}`;
  const targetDirectory = path.join(process.cwd(), "public", "uploads", safeFolder);
  const targetPath = path.join(targetDirectory, fileName);
  const buffer = Buffer.from(await file.arrayBuffer());

  await mkdir(targetDirectory, { recursive: true });
  await writeFile(targetPath, buffer);

  return {
    fileName,
    url: `/uploads/${safeFolder}/${fileName}`,
  };
}