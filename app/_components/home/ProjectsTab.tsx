import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./animations";
import type { ProjectItem } from "./types";

type ProjectsTabProps = {
  projects: ProjectItem[];
  projectsLoading: boolean;
  projectsError: string;
  projectTotal: number;
  projectTotalPages: number;
  projectLimit: number;
  projectPage: number;
  setProjectPage: (value: number | ((prev: number) => number)) => void;
  projectFilter: "all" | "web" | "app";
  setProjectFilter: (value: "all" | "web" | "app") => void;
};

export function ProjectsTab({
  projects,
  projectsLoading,
  projectsError,
  projectTotal,
  projectTotalPages,
  projectLimit,
  projectPage,
  setProjectPage,
  projectFilter,
  setProjectFilter,
}: ProjectsTabProps) {
  const totalPages = Math.max(1, projectTotalPages);
  const currentPage = Math.min(Math.max(projectPage, 1), totalPages);
  const startIndex = (currentPage - 1) * projectLimit;

  return (
    <>
      <div className="flex min-w-0 flex-col gap-4 neo-card bg-[var(--neo-ink)] p-4 text-[var(--neo-bg-cream)] sm:gap-5 sm:p-6">
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
            <div className="min-w-0 border-4 border-[var(--neo-ink)] bg-[var(--neo-bg-cream)] p-3 text-[var(--neo-ink)] neo-hard-shadow-sm">
              <p className="inline-block border-4 border-[var(--neo-ink)] bg-[var(--neo-secondary)] px-2 py-1 text-sm font-black uppercase tracking-[0.2em] text-[var(--neo-ink)] neo-hard-shadow-sm sm:text-base">
                DỰ ÁN CỦA TÔI
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-[var(--neo-ink)] sm:text-3xl">
                Một số sản phẩm tiêu biểu
              </h2>
              <p className="mt-3 max-w-md text-sm font-semibold text-[var(--neo-ink)] sm:text-base">
                Tôi ưu tiên chất lượng sản phẩm, trải nghiệm người dùng và khả
                năng mở rộng trong tương lai. Dưới đây là một vài dự án thực tế
                mà tôi cảm thấy tự hào.
              </p>
            </div>
            <div className="flex flex-shrink-0 flex-col items-start gap-2 text-left text-sm text-[var(--neo-bg-cream)] sm:items-end sm:text-right md:text-base">
              <span className="font-bold">{projectTotal}+ dự án đã thực hiện</span>
              <div className="flex flex-wrap items-center gap-1 neo-pill bg-[var(--neo-bg-cream)] px-2 py-1 text-[10px] text-[var(--neo-ink)]">
                {(["all", "web", "app"] as const).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => {
                      setProjectFilter(f);
                      setProjectPage(1);
                    }}
                    className={[
                      "rounded-full px-2 py-0.5 font-black uppercase tracking-[0.16em] transition-all duration-150",
                      projectFilter === f
                        ? "bg-[var(--neo-ink)] text-[var(--neo-bg-cream)]"
                        : "bg-[var(--neo-secondary)] text-[var(--neo-ink)] hover:bg-[var(--neo-accent)]",
                    ].join(" ")}
                  >
                    {f === "all" ? "Tất cả" : f === "web" ? "Web" : "App"}
                  </button>
                ))}
              </div>
              <span className="text-xs font-medium">
                Trang {currentPage}/{totalPages}
              </span>
            </div>
          </div>
        </Reveal>

        {projectsError ? (
          <div className="neo-card border-4 border-red-600 bg-red-200 p-4 text-sm font-bold text-red-900 sm:text-base">
            {projectsError}
          </div>
        ) : projectsLoading ? (
          <div className="mt-4 grid gap-2 text-sm text-[var(--neo-bg-cream)] sm:grid-cols-2 sm:gap-3">
            {[0, 1, 2, 3].map((item) => (
              <div key={item} className="neo-card bg-[var(--neo-bg-cream)] p-3">
                <div className="h-6 w-2/3 animate-shimmer bg-neutral-200" />
                <div className="mt-3 h-4 w-full animate-shimmer bg-neutral-100" />
                <div className="mt-2 h-4 w-5/6 animate-shimmer bg-neutral-100" />
              </div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="neo-card bg-[var(--neo-bg-cream)] p-6 text-center text-[var(--neo-ink)]">
            <p className="text-lg font-black">Chưa có dự án nào trong bộ lọc này.</p>
          </div>
        ) : (
          <div className="mt-4 grid gap-2 text-sm text-[var(--neo-bg-cream)] sm:grid-cols-2 sm:gap-3">
            {projects.map((project, i) => (
            <Reveal key={project.title} delay={0.08 * i}>
              <Link
                href={`/projects/${project.slug}`}
                className="group block neo-card bg-[var(--neo-bg-cream)] p-2.5 transition-transform duration-150 hover:-translate-y-1 sm:p-3"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
                  <div className="relative h-24 w-full shrink-0 overflow-hidden bg-[var(--neo-bg-cream)] sm:h-20 sm:w-24">
                    <Image
                      src="/demo.jpg"
                      alt={project.imageAlt || project.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 96px"
                      loading="lazy"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-black text-[var(--neo-ink)] sm:text-base">
                        {project.title}
                      </p>
                      <span className="whitespace-nowrap neo-pill bg-[var(--neo-secondary)] px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.16em] text-[var(--neo-ink)] sm:text-[11px]">
                        {project.type === "app" ? "APP" : "WEB"}
                      </span>
                    </div>
                    <p className="mt-1 line-clamp-2 text-xs text-[var(--neo-ink)] sm:line-clamp-none sm:text-base">
                      {project.description}
                    </p>
                    <p className="mt-1 truncate text-xs text-[var(--neo-ink)] sm:text-base">
                      Stack: {project.stack}
                    </p>
                  </div>
                </div>
              </Link>
            </Reveal>
            ))}
          </div>
        )}

        <Reveal delay={0.1}>
          <div className="mt-4 flex flex-col gap-2 neo-card bg-[var(--neo-ink)] px-3 py-2 text-sm text-[var(--neo-bg-cream)] sm:flex-row sm:items-center sm:justify-between">
            <span className="truncate text-xs">
              Hiển thị {projectTotal === 0 ? 0 : startIndex + 1} –{" "}
              {Math.min(startIndex + projectLimit, projectTotal)} trên{" "}
              {projectTotal} dự án{" "}
              {projectFilter === "web"
                ? "Web"
                : projectFilter === "app"
                  ? "App"
                  : "Web & App"}
            </span>
            <div className="flex flex-shrink-0 items-center justify-end gap-2 sm:justify-start">
              <button
                type="button"
                onClick={() => setProjectPage((p) => Math.max(1, p - 1))}
                disabled={projectsLoading || currentPage === 1}
                className={[
                  "neo-pill px-3 py-1 text-xs font-black uppercase tracking-[0.16em] transition-all duration-150",
                  projectsLoading || currentPage === 1
                    ? "cursor-not-allowed bg-neutral-400 text-neutral-700"
                    : "bg-[var(--neo-secondary)] text-[var(--neo-ink)] hover:bg-[var(--neo-accent)]",
                ].join(" ")}
              >
                Trước
              </button>
              <button
                type="button"
                onClick={() => setProjectPage((p) => Math.min(totalPages, p + 1))}
                disabled={projectsLoading || currentPage === totalPages}
                className={[
                  "neo-pill px-3 py-1 text-xs font-black uppercase tracking-[0.16em] transition-all duration-150",
                  projectsLoading || currentPage === totalPages
                    ? "cursor-not-allowed bg-neutral-400 text-neutral-700"
                    : "bg-[var(--neo-secondary)] text-[var(--neo-ink)] hover:bg-[var(--neo-accent)]",
                ].join(" ")}
              >
                Sau
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="flex min-w-0 flex-col gap-3 sm:gap-4">
        <Reveal direction="right" delay={0.15}>
          <div className="neo-card bg-[var(--neo-bg-cream)] p-3 sm:p-4">
            <h3 className="text-sm font-black">Cách tôi làm dự án</h3>
            <p className="mt-1 text-base text-neutral-800">
              Quy trình làm việc rõ ràng, minh bạch và tập trung vào giá trị thực tế.
            </p>
            <ul className="mt-3 space-y-2 text-base text-neutral-800">
              {[
                "Trao đổi yêu cầu, phạm vi và mục tiêu sản phẩm.",
                "Đề xuất kiến trúc, công nghệ và timeline triển khai.",
                "Triển khai từng phần, demo sớm để nhận feedback.",
                "Tối ưu hiệu năng, xử lý edge case và viết tài liệu.",
                "Bàn giao, hỗ trợ deploy và bảo trì nếu cần.",
              ].map((step, i) => (
                <li key={step} className="flex items-start gap-2">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center neo-pill bg-[var(--neo-secondary)] text-[10px] font-black text-[var(--neo-ink)]">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal direction="right" delay={0.25}>
          <div className="neo-card bg-[var(--neo-bg-cream)] p-3 sm:p-4">
            <h3 className="text-sm font-black">Muốn xem thêm chi tiết?</h3>
            <p className="mt-1 text-base text-neutral-800">
              Bạn có thể yêu cầu demo, mã nguồn hoặc mô tả kỹ thuật cho từng dự án.
            </p>
            <p className="mt-3 text-base text-neutral-800">
              Hãy chuyển sang tab <span className="font-semibold text-zinc-900">Liên hệ</span>{" "}
              để gửi cho tôi thông tin dự án hoặc câu hỏi.
            </p>
          </div>
        </Reveal>
      </div>
    </>
  );
}
