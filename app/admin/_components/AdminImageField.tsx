"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";

export type ImageInputMode = "upload" | "url";

export function AdminImageField({
  label,
  value,
  mode,
  onModeChange,
  onChange,
  folder,
  id,
  placeholder = "https://example.com/image.jpg",
}: {
  label: string;
  value: string;
  mode: ImageInputMode;
  onModeChange: (mode: ImageInputMode) => void;
  onChange: (value: string) => void;
  folder: string;
  id?: string;
  placeholder?: string;
}) {
  const fallbackId = useId();
  const inputId = id || fallbackId;
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleUpload(file: File) {
    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/uploads", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Upload ảnh thất bại.");
        return;
      }

      onChange(data.url || "");
    } catch {
      setError("Không thể upload ảnh lúc này.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={inputId} className="block text-sm font-medium text-zinc-700">
          {label}
        </label>
        <div className="flex overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 p-1">
          <button
            type="button"
            onClick={() => onModeChange("upload")}
            className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
              mode === "upload"
                ? "bg-zinc-950 text-[var(--neo-bg-cream)]"
                : "text-zinc-600 hover:bg-white"
            }`}
          >
            Upload file
          </button>
          <button
            type="button"
            onClick={() => onModeChange("url")}
            className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
              mode === "url"
                ? "bg-zinc-950 text-[var(--neo-bg-cream)]"
                : "text-zinc-600 hover:bg-white"
            }`}
          >
            Dùng URL
          </button>
        </div>
      </div>

      {mode === "upload" ? (
        <div className="rounded-[24px] border border-dashed border-zinc-300 bg-zinc-50 p-4">
          <input
            ref={fileInputRef}
            id={inputId}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) {
                void handleUpload(file);
              }
            }}
          />
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {uploading ? "Đang upload..." : "Chọn ảnh từ máy"}
            </button>
            <span className="text-xs text-zinc-500">JPG, PNG, WebP, GIF, AVIF, SVG. Tối đa 8MB.</span>
          </div>
          <input
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="/uploads/blog/ten-anh.jpg"
            className="mt-3 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900"
          />
        </div>
      ) : (
        <input
          id={inputId}
          type="url"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900"
        />
      )}

      {error ? <p className="text-xs font-medium text-rose-600">{error}</p> : null}

      {value ? (
        <div className="overflow-hidden rounded-[24px] border border-zinc-200 bg-white">
          <div className="relative aspect-[16/9] bg-zinc-100">
            <Image src={value} alt={label} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" unoptimized />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-100 px-4 py-3">
            <p className="min-w-0 flex-1 truncate text-xs text-zinc-500">{value}</p>
            <button
              type="button"
              onClick={() => onChange("")}
              className="rounded-full border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-600 transition hover:bg-rose-50"
            >
              Xóa ảnh
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}