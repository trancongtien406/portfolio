"use client";

import { type Dispatch, type FormEvent, type ReactNode, type SetStateAction } from "react";
import { AdminImageField, type ImageInputMode } from "./AdminImageField";
import { RichTextEditor } from "./RichTextEditor";

// ─── Interfaces ───────────────────────────────────────────────────────────────

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
  coverImage: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  slug: string;
  type: string;
  title: string;
  description: string;
  longDescription: string | null;
  stack: string[];
  features: string[];
  github: string | null;
  demoUrl: string | null;
  coverImage: string | null;
  imageAlt: string | null;
  published: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface BlogFormState {
  title: string;
  slug: string;
  description: string;
  content: string;
  tags: string;
  coverImage: string;
  coverImageMode: ImageInputMode;
  published: boolean;
}

export interface ProjectFormState {
  title: string;
  slug: string;
  type: string;
  description: string;
  longDescription: string;
  stack: string;
  features: string;
  github: string;
  demoUrl: string;
  coverImage: string;
  coverImageMode: ImageInputMode;
  imageAlt: string;
  published: boolean;
  sortOrder: number;
}

export type ContactStatus = "NEW" | "READ" | "REPLIED" | "ARCHIVED";

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  type: string | null;
  message: string;
  status: ContactStatus;
  repliedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

// ─── Form defaults ────────────────────────────────────────────────────────────

export const EMPTY_BLOG: BlogFormState = {
  title: "",
  slug: "",
  description: "",
  content: "",
  tags: "",
  coverImage: "",
  coverImageMode: "upload",
  published: false,
};

export const EMPTY_PROJECT: ProjectFormState = {
  title: "",
  slug: "",
  type: "web",
  description: "",
  longDescription: "",
  stack: "",
  features: "",
  github: "",
  demoUrl: "",
  coverImage: "",
  coverImageMode: "upload",
  imageAlt: "",
  published: true,
  sortOrder: 0,
};

// ─── Contact constants ────────────────────────────────────────────────────────

export const CONTACT_STATUS_OPTIONS: Array<{ value: ContactStatus | "ALL"; label: string }> = [
  { value: "ALL", label: "Tất cả" },
  { value: "NEW", label: "Mới" },
  { value: "READ", label: "Đã đọc" },
  { value: "REPLIED", label: "Đã phản hồi" },
  { value: "ARCHIVED", label: "Lưu trữ" },
];

export const CONTACT_STATUS_LABEL: Record<ContactStatus, string> = {
  NEW: "Mới",
  READ: "Đã đọc",
  REPLIED: "Đã phản hồi",
  ARCHIVED: "Lưu trữ",
};

export const CONTACT_STATUS_CLASS: Record<ContactStatus, string> = {
  NEW: "bg-amber-100 text-amber-800 ring-amber-200",
  READ: "bg-sky-100 text-sky-800 ring-sky-200",
  REPLIED: "bg-emerald-100 text-emerald-800 ring-emerald-200",
  ARCHIVED: "bg-zinc-200 text-zinc-700 ring-zinc-300",
};

// ─── Utils ────────────────────────────────────────────────────────────────────

export function generateSlug(title: string) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function formatDate(value: string) {
  return new Date(value).toLocaleString("vi-VN", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

// ─── UI Components ────────────────────────────────────────────────────────────

export function InputField({
  id,
  label,
  required,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  id: string;
  label: string;
  required?: boolean;
  value: string | number;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-zinc-700">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900"
      />
    </div>
  );
}

export function TextareaField({
  id,
  label,
  required,
  value,
  onChange,
  rows = 4,
  placeholder,
}: {
  id: string;
  label: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-zinc-700">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      <textarea
        id={id}
        required={required}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900"
      />
    </div>
  );
}

export function SectionCard({
  title,
  description,
  children,
  action,
}: {
  title: string;
  description: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <section className="rounded-[28px] border border-zinc-200 bg-white p-5 shadow-[0_20px_60px_-40px_rgba(24,24,27,0.45)] sm:p-6">
      <div className="flex flex-col gap-3 border-b border-zinc-100 pb-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-zinc-950">{title}</h2>
          <p className="mt-1 text-sm text-zinc-500">{description}</p>
        </div>
        {action}
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export function StatusBadge({ status }: { status: ContactStatus }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${CONTACT_STATUS_CLASS[status]}`}
    >
      {CONTACT_STATUS_LABEL[status]}
    </span>
  );
}

export function BlogForm({
  form,
  setForm,
  editId,
  loading,
  onSubmit,
  onCancel,
}: {
  form: BlogFormState;
  setForm: Dispatch<SetStateAction<BlogFormState>>;
  editId: string | null;
  loading: boolean;
  onSubmit: (e: FormEvent) => void;
  onCancel: () => void;
}) {
  return (
    <form onSubmit={onSubmit} className="grid gap-4 lg:grid-cols-2">
      <div className="grid gap-4">
        <InputField
          id="blog-title"
          label="Tiêu đề"
          required
          value={form.title}
          onChange={(value) =>
            setForm((prev) => ({
              ...prev,
              title: value,
              slug: editId ? prev.slug : generateSlug(value),
            }))
          }
        />
        <InputField
          id="blog-slug"
          label="Slug"
          required
          value={form.slug}
          onChange={(value) => setForm((prev) => ({ ...prev, slug: value }))}
        />
        <InputField
          id="blog-desc"
          label="Mô tả ngắn"
          required
          value={form.description}
          onChange={(value) => setForm((prev) => ({ ...prev, description: value }))}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <InputField
            id="blog-tags"
            label="Tags"
            value={form.tags}
            onChange={(value) => setForm((prev) => ({ ...prev, tags: value }))}
            placeholder="nextjs, react, prisma"
          />
          <AdminImageField
            label="Ảnh bìa"
            value={form.coverImage}
            mode={form.coverImageMode}
            onModeChange={(value) => setForm((prev) => ({ ...prev, coverImageMode: value }))}
            onChange={(value) => setForm((prev) => ({ ...prev, coverImage: value }))}
            folder="blog"
            id="blog-cover"
          />
        </div>
        <label className="inline-flex items-center gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-700">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => setForm((prev) => ({ ...prev, published: e.target.checked }))}
            className="h-4 w-4 rounded border-zinc-300"
          />
          Xuất bản ngay sau khi lưu
        </label>
      </div>

      <div className="grid gap-4">
        <RichTextEditor
          label="Nội dung bài viết (HTML)"
          required
          value={form.content}
          onChange={(value) => setForm((prev) => ({ ...prev, content: value }))}
          uploadFolder="blog-content"
        />
        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-[var(--neo-bg-cream)] transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Đang xử lý..." : editId ? "Cập nhật bài viết" : "Tạo bài viết"}
          </button>
          {editId && (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-full border border-zinc-200 px-5 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
            >
              Hủy chỉnh sửa
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

export function ProjectForm({
  form,
  setForm,
  editId,
  loading,
  onSubmit,
  onCancel,
}: {
  form: ProjectFormState;
  setForm: Dispatch<SetStateAction<ProjectFormState>>;
  editId: string | null;
  loading: boolean;
  onSubmit: (e: FormEvent) => void;
  onCancel: () => void;
}) {
  return (
    <form onSubmit={onSubmit} className="grid gap-4 lg:grid-cols-2">
      <div className="grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <InputField
            id="proj-title"
            label="Tên dự án"
            required
            value={form.title}
            onChange={(value) =>
              setForm((prev) => ({
                ...prev,
                title: value,
                slug: editId ? prev.slug : generateSlug(value),
              }))
            }
          />
          <InputField
            id="proj-slug"
            label="Slug"
            required
            value={form.slug}
            onChange={(value) => setForm((prev) => ({ ...prev, slug: value }))}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-[1fr_180px]">
          <div>
            <label htmlFor="proj-type" className="mb-1.5 block text-sm font-medium text-zinc-700">
              Loại dự án <span className="text-rose-500">*</span>
            </label>
            <select
              id="proj-type"
              value={form.type}
              onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value }))}
              className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900"
            >
              <option value="web">Web</option>
              <option value="app">App</option>
            </select>
          </div>
          <InputField
            id="proj-sort"
            label="Ưu tiên hiển thị"
            type="number"
            value={form.sortOrder}
            onChange={(value) =>
              setForm((prev) => ({
                ...prev,
                sortOrder: Number.parseInt(value, 10) || 0,
              }))
            }
          />
        </div>
        <InputField
          id="proj-desc"
          label="Mô tả ngắn"
          required
          value={form.description}
          onChange={(value) => setForm((prev) => ({ ...prev, description: value }))}
        />
        <TextareaField
          id="proj-longdesc"
          label="Mô tả chi tiết"
          rows={8}
          value={form.longDescription}
          onChange={(value) => setForm((prev) => ({ ...prev, longDescription: value }))}
        />
      </div>

      <div className="grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <InputField
            id="proj-stack"
            label="Công nghệ"
            value={form.stack}
            onChange={(value) => setForm((prev) => ({ ...prev, stack: value }))}
            placeholder="Next.js, React, Tailwind"
          />
          <InputField
            id="proj-features"
            label="Tính năng"
            value={form.features}
            onChange={(value) => setForm((prev) => ({ ...prev, features: value }))}
            placeholder="Auth | Dashboard | Realtime"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <InputField
            id="proj-github"
            label="GitHub URL"
            value={form.github}
            onChange={(value) => setForm((prev) => ({ ...prev, github: value }))}
          />
          <InputField
            id="proj-demo"
            label="Demo URL"
            value={form.demoUrl}
            onChange={(value) => setForm((prev) => ({ ...prev, demoUrl: value }))}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminImageField
            label="Ảnh bìa"
            value={form.coverImage}
            mode={form.coverImageMode}
            onModeChange={(value) => setForm((prev) => ({ ...prev, coverImageMode: value }))}
            onChange={(value) => setForm((prev) => ({ ...prev, coverImage: value }))}
            folder="projects"
            id="proj-cover"
          />
          <InputField
            id="proj-alt"
            label="Alt ảnh"
            value={form.imageAlt}
            onChange={(value) => setForm((prev) => ({ ...prev, imageAlt: value }))}
          />
        </div>
        <label className="inline-flex items-center gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-700">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => setForm((prev) => ({ ...prev, published: e.target.checked }))}
            className="h-4 w-4 rounded border-zinc-300"
          />
          Hiển thị dự án trên website
        </label>
        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-[var(--neo-bg-cream)] transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Đang xử lý..." : editId ? "Cập nhật dự án" : "Thêm dự án"}
          </button>
          {editId && (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-full border border-zinc-200 px-5 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
            >
              Hủy chỉnh sửa
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
