"use client";

import { isExternalImageUrl } from "@/lib/image-utils";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import {
    BlogForm,
    EMPTY_BLOG,
    SectionCard,
    formatDate,
    type BlogPost,
} from "../_components/shared";

export default function AdminBlogPage() {
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [form, setForm] = useState(EMPTY_BLOG);
  const [editId, setEditId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchPosts = useCallback(async () => {
    const res = await fetch("/api/blog");
    if (res.ok) setPosts(await res.json());
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  function startEdit(post: BlogPost) {
    setEditId(post.id);
    setForm({
      title: post.title,
      slug: post.slug,
      description: post.description,
      content: post.content,
      tags: post.tags.join(", "),
      coverImage: post.coverImage || "",
      coverImageMode: post.coverImage && isExternalImageUrl(post.coverImage) ? "url" : "upload",
      published: post.published,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setEditId(null);
    setForm(EMPTY_BLOG);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const payload = {
      title: form.title,
      slug: form.slug,
      description: form.description,
      content: form.content,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      coverImage: form.coverImage || null,
      published: form.published,
    };

    try {
      const url = editId ? `/api/blog/${editId}` : "/api/blog";
      const res = await fetch(url, {
        method: editId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        setMessage({ type: "error", text: data.error || "Có lỗi xảy ra khi lưu bài viết." });
        return;
      }

      setMessage({
        type: "success",
        text: editId ? "Đã cập nhật bài viết." : "Đã tạo bài viết mới.",
      });
      cancelEdit();
      fetchPosts();
    } catch {
      setMessage({ type: "error", text: "Lỗi kết nối server." });
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Bạn chắc chắn muốn xóa bài viết này?")) return;

    const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
    if (!res.ok) {
      setMessage({ type: "error", text: "Không thể xóa bài viết." });
      return;
    }

    setMessage({ type: "success", text: "Đã xóa bài viết." });
    fetchPosts();
    if (editId === id) cancelEdit();
  }

  async function togglePublish(post: BlogPost) {
    const res = await fetch(`/api/blog/${post.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...post, published: !post.published }),
    });

    if (!res.ok) {
      setMessage({ type: "error", text: "Không thể cập nhật trạng thái bài viết." });
      return;
    }

    fetchPosts();
  }

  return (
    <>
      {/* Page header */}
      <div className="rounded-[32px] border border-zinc-200 bg-white/90 px-5 py-5 shadow-[0_20px_60px_-40px_rgba(24,24,27,0.45)] sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">Blog</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
              Quản lý bài viết blog
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600">
              Bài viết SEO, nội dung dài và trạng thái publish.
            </p>
          </div>
          <div className="shrink-0 rounded-2xl bg-zinc-100 px-4 py-3 text-sm text-zinc-600">
            <span className="font-semibold text-zinc-950">{posts.length}</span> bài viết
          </div>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`mt-6 rounded-2xl px-4 py-3 text-sm font-medium ring-1 ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
              : "bg-rose-50 text-rose-700 ring-rose-200"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Content */}
      <div className="mt-6 space-y-6">
        <SectionCard
          title={editId ? "Chỉnh sửa bài viết" : "Tạo bài viết mới"}
          description="Tập trung vào slug, mô tả và nội dung HTML để phục vụ SEO và trang chi tiết."
        >
          <BlogForm
            form={form}
            setForm={setForm}
            editId={editId}
            loading={loading}
            onSubmit={handleSubmit}
            onCancel={cancelEdit}
          />
        </SectionCard>

        <SectionCard
          title="Danh sách bài viết"
          description="Theo dõi trạng thái publish và cập nhật nhanh từng bài viết."
          action={
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-600">
              {posts.length} bài viết
            </span>
          }
        >
          {posts.length === 0 ? (
            <p className="text-sm text-zinc-500">Chưa có bài viết nào.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-sm">
                <thead>
                  <tr className="border-b border-zinc-100 text-left text-xs uppercase tracking-[0.16em] text-zinc-400">
                    <th className="pb-3 pr-4">Bài viết</th>
                    <th className="pb-3 pr-4">Trạng thái</th>
                    <th className="pb-3 pr-4">Tags</th>
                    <th className="pb-3 pr-4">Ngày tạo</th>
                    <th className="pb-3 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {posts.map((post) => (
                    <tr key={post.id} className="align-top">
                      <td className="py-4 pr-4">
                        <p className="font-semibold text-zinc-900">{post.title}</p>
                        <p className="mt-1 text-xs text-zinc-500">/{post.slug}</p>
                        <p className="mt-2 line-clamp-2 text-sm text-zinc-500">{post.description}</p>
                      </td>
                      <td className="py-4 pr-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                            post.published
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-zinc-100 text-zinc-600"
                          }`}
                        >
                          {post.published ? "Public" : "Draft"}
                        </span>
                      </td>
                      <td className="py-4 pr-4">
                        <div className="flex max-w-[220px] flex-wrap gap-2">
                          {post.tags.length ? (
                            post.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs text-zinc-600"
                              >
                                {tag}
                              </span>
                            ))
                          ) : (
                            <span className="text-xs text-zinc-400">Chưa có tags</span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 pr-4 text-zinc-500">{formatDate(post.createdAt)}</td>
                      <td className="py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => togglePublish(post)}
                            className="rounded-full border border-zinc-200 px-3 py-2 text-xs font-medium text-zinc-700 transition hover:bg-zinc-50"
                          >
                            {post.published ? "Ẩn bài" : "Xuất bản"}
                          </button>
                          <button
                            onClick={() => startEdit(post)}
                            className="rounded-full border border-zinc-200 px-3 py-2 text-xs font-medium text-zinc-700 transition hover:bg-zinc-50"
                          >
                            Sửa
                          </button>
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="rounded-full border border-rose-200 px-3 py-2 text-xs font-medium text-rose-600 transition hover:bg-rose-50"
                          >
                            Xóa
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </SectionCard>
      </div>
    </>
  );
}
