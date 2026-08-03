"use client";

import { isExternalImageUrl } from "@/lib/image-utils";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import {
    EMPTY_PROJECT,
    ProjectForm,
    SectionCard,
    type Project,
} from "../_components/shared";

export default function AdminProjectsPage() {
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState(EMPTY_PROJECT);
  const [editId, setEditId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchProjects = useCallback(async () => {
    const res = await fetch("/api/projects");
    if (res.ok) setProjects(await res.json());
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  function startEdit(project: Project) {
    setEditId(project.id);
    setForm({
      title: project.title,
      slug: project.slug,
      type: project.type,
      description: project.description,
      longDescription: project.longDescription || "",
      stack: project.stack.join(", "),
      features: project.features.join(" | "),
      github: project.github || "",
      demoUrl: project.demoUrl || "",
      coverImage: project.coverImage || "",
      coverImageMode: project.coverImage && isExternalImageUrl(project.coverImage) ? "url" : "upload",
      imageAlt: project.imageAlt || "",
      published: project.published,
      sortOrder: project.sortOrder,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setEditId(null);
    setForm(EMPTY_PROJECT);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const payload = {
      title: form.title,
      slug: form.slug,
      type: form.type,
      description: form.description,
      longDescription: form.longDescription,
      stack: form.stack
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      features: form.features
        .split("|")
        .map((t) => t.trim())
        .filter(Boolean),
      github: form.github || null,
      demoUrl: form.demoUrl || null,
      coverImage: form.coverImage || null,
      imageAlt: form.imageAlt || null,
      published: form.published,
      sortOrder: form.sortOrder,
    };

    try {
      const url = editId ? `/api/projects/${editId}` : "/api/projects";
      const res = await fetch(url, {
        method: editId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        setMessage({ type: "error", text: data.error || "Có lỗi xảy ra khi lưu dự án." });
        return;
      }

      setMessage({
        type: "success",
        text: editId ? "Đã cập nhật dự án." : "Đã thêm dự án mới.",
      });
      cancelEdit();
      fetchProjects();
    } catch {
      setMessage({ type: "error", text: "Lỗi kết nối server." });
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Bạn chắc chắn muốn xóa dự án này?")) return;

    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (!res.ok) {
      setMessage({ type: "error", text: "Không thể xóa dự án." });
      return;
    }

    setMessage({ type: "success", text: "Đã xóa dự án." });
    fetchProjects();
    if (editId === id) cancelEdit();
  }

  async function togglePublish(project: Project) {
    const res = await fetch(`/api/projects/${project.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...project, published: !project.published }),
    });

    if (!res.ok) {
      setMessage({ type: "error", text: "Không thể cập nhật trạng thái dự án." });
      return;
    }

    fetchProjects();
  }

  return (
    <>
      {/* Page header */}
      <div className="rounded-[32px] border border-zinc-200 bg-white/90 px-5 py-5 shadow-[0_20px_60px_-40px_rgba(24,24,27,0.45)] sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">Projects</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
              Quản lý danh sách dự án
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600">
              Danh sách dự án, thứ tự hiển thị và metadata.
            </p>
          </div>
          <div className="shrink-0 rounded-2xl bg-zinc-100 px-4 py-3 text-sm text-zinc-600">
            <span className="font-semibold text-zinc-950">{projects.length}</span> dự án
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
          title={editId ? "Chỉnh sửa dự án" : "Thêm dự án mới"}
          description="Sắp xếp dự án theo ưu tiên hiển thị và kiểm soát metadata hiển thị ngoài website."
        >
          <ProjectForm
            form={form}
            setForm={setForm}
            editId={editId}
            loading={loading}
            onSubmit={handleSubmit}
            onCancel={cancelEdit}
          />
        </SectionCard>

        <SectionCard
          title="Danh sách dự án"
          description="Xem nhanh loại dự án, stack công nghệ và trạng thái hiển thị."
          action={
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-600">
              {projects.length} dự án
            </span>
          }
        >
          {projects.length === 0 ? (
            <p className="text-sm text-zinc-500">Chưa có dự án nào.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[780px] text-sm">
                <thead>
                  <tr className="border-b border-zinc-100 text-left text-xs uppercase tracking-[0.16em] text-zinc-400">
                    <th className="pb-3 pr-4">Dự án</th>
                    <th className="pb-3 pr-4">Loại</th>
                    <th className="pb-3 pr-4">Thứ tự</th>
                    <th className="pb-3 pr-4">Công nghệ</th>
                    <th className="pb-3 pr-4">Trạng thái</th>
                    <th className="pb-3 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {projects.map((project) => (
                    <tr key={project.id} className="align-top">
                      <td className="py-4 pr-4">
                        <p className="font-semibold text-zinc-900">{project.title}</p>
                        <p className="mt-1 text-xs text-zinc-500">/{project.slug}</p>
                        <p className="mt-2 line-clamp-2 text-sm text-zinc-500">
                          {project.description}
                        </p>
                      </td>
                      <td className="py-4 pr-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                            project.type === "web"
                              ? "bg-sky-100 text-sky-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {project.type === "web" ? "Web" : "App"}
                        </span>
                      </td>
                      <td className="py-4 pr-4 text-zinc-600">{project.sortOrder}</td>
                      <td className="py-4 pr-4">
                        <div className="flex max-w-[240px] flex-wrap gap-2">
                          {project.stack.length ? (
                            <>
                              {project.stack.slice(0, 4).map((tech) => (
                                <span
                                  key={tech}
                                  className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs text-zinc-600"
                                >
                                  {tech}
                                </span>
                              ))}
                              {project.stack.length > 4 && (
                                <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs text-zinc-500">
                                  +{project.stack.length - 4}
                                </span>
                              )}
                            </>
                          ) : (
                            <span className="text-xs text-zinc-400">Chưa có stack</span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 pr-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                            project.published
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-zinc-100 text-zinc-600"
                          }`}
                        >
                          {project.published ? "Đang hiển thị" : "Đang ẩn"}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => togglePublish(project)}
                            className="rounded-full border border-zinc-200 px-3 py-2 text-xs font-medium text-zinc-700 transition hover:bg-zinc-50"
                          >
                            {project.published ? "Ẩn" : "Hiện"}
                          </button>
                          <button
                            onClick={() => startEdit(project)}
                            className="rounded-full border border-zinc-200 px-3 py-2 text-xs font-medium text-zinc-700 transition hover:bg-zinc-50"
                          >
                            Sửa
                          </button>
                          <button
                            onClick={() => handleDelete(project.id)}
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
