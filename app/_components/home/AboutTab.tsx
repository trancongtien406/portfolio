import Image from "next/image";
import { AnimCounter, Reveal, SkillBar } from "./animations";
import {
  assistantQuickActions,
  JOURNEY,
  SERVICES,
  SKILLS,
  STATS,
} from "./constants";
import type { AssistantAction } from "./types";

type AboutTabProps = {
  imgError: boolean;
  setImgError: (value: boolean) => void;
  location: string;
  typedTitle: string;
  cardHolder: string;
  setCardHolder: (value: string) => void;
  cardLast4: string;
  setCardLast4: (value: string) => void;
  selectedAssistantAction: AssistantAction;
  setSelectedAssistantAction: (value: AssistantAction) => void;
  assistantInput: string;
  setAssistantInput: (value: string) => void;
  assistantMessages: string[];
  onSendAssistant: () => void;
};

export function AboutTab({
  imgError,
  setImgError,
  location,
  typedTitle,
  cardHolder,
  setCardHolder,
  cardLast4,
  setCardLast4,
  selectedAssistantAction,
  setSelectedAssistantAction,
  assistantInput,
  setAssistantInput,
  assistantMessages,
  onSendAssistant,
}: AboutTabProps) {
  return (
    <>
      <div className="flex min-w-0 flex-col gap-6 neo-card bg-[var(--neo-ink)] p-5 text-[var(--neo-bg-cream)] sm:gap-7 sm:p-7">
        <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-start lg:gap-8">
          <Reveal delay={0.1}>
            <div className="relative shrink-0">
              <div className="profile-glow">
                <div className="relative z-[1] h-36 w-36 overflow-hidden rounded-full border-4 border-zinc-700/50 sm:h-44 sm:w-44">
                  {!imgError ? (
                    <Image
                      src="/profile.jpg"
                      alt="Trần Công Tiến"
                      fill
                      sizes="(max-width: 640px) 144px, 176px"
                      className="object-cover"
                      priority
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-neutral-900 text-4xl font-black text-[var(--neo-bg-cream)] sm:text-5xl">
                      TC
                    </div>
                  )}
                </div>
              </div>
              <span className="absolute bottom-2 right-2 z-[2] flex h-5 w-5 items-center justify-center">
                <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
                <span className="relative h-3.5 w-3.5 rounded-full border-2 border-zinc-900 bg-emerald-400" />
              </span>
            </div>
          </Reveal>

          <div className="min-w-0 flex-1 text-center lg:text-left">
            <Reveal delay={0.15}>
              <div className="inline-flex items-center gap-2 neo-chip bg-[var(--neo-secondary)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--neo-ink)]">
                <span className="h-2 w-2 animate-ping rounded-full bg-emerald-500" />
                <span>Sẵn sàng cho dự án tiếp theo</span>
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <p className="mt-3 text-sm font-black uppercase tracking-[0.25em] text-[var(--neo-secondary)] sm:text-base">
                TRẦN CÔNG TIẾN
              </p>
              <h1 className="mt-1 min-h-[2.4em] text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                <span className="typing-cursor inline-block border-4 border-[var(--neo-ink)] bg-[var(--neo-secondary)] px-2 py-1 text-[var(--neo-ink)] neo-hard-shadow-sm sm:px-3">
                  {typedTitle}
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.35}>
              <p className="mt-4 max-w-xl text-sm leading-relaxed bg-[var(--neo-bg-cream)] text-[var(--neo-ink)] sm:text-base">
                Tôi là <span className="font-medium">Trần Công Tiến</span>, một
                <span className="font-medium"> lập trình viên website và ứng dụng tại Đà Nẵng</span>.
                Tôi chuyên thiết kế và xây dựng <span className="font-medium">website</span>
                lẫn <span className="font-medium">ứng dụng di động</span> hiện đại,
                tập trung vào{" "}
                <span className="font-medium">trải nghiệm người dùng</span>,{" "}
                <span className="font-medium">hiệu năng</span> và{" "}
                <span className="font-medium">clean code</span>. Ngoài lúc code,
                bạn có thể thấy tôi đang tìm hiểu tech trends mới hoặc uống một ly
                cà phê tại quán quen.
              </p>
            </Reveal>

            <Reveal delay={0.45}>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                {[
                  { color: "bg-emerald-400", label: "Web • React / Next.js" },
                  { color: "bg-sky-400", label: "Mobile • Flutter" },
                  { color: "bg-amber-400", label: "Back-end • Node.js" },
                ].map((tag) => (
                  <span
                    key={tag.label}
                    className="inline-flex items-center gap-1.5 neo-pill bg-[var(--neo-bg-cream)] px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[var(--neo-ink)] transition-transform hover:-translate-y-0.5"
                  >
                    <span className={`h-2 w-2 rounded-full ${tag.color}`} />
                    <span>{tag.label}</span>
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.2}>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className="group neo-card bg-[var(--neo-bg-cream)] p-3.5 text-center transition-transform duration-150 hover:-translate-y-1"
                style={{ transitionDelay: `${i * 0.05}s` }}
              >
                <p className="text-2xl font-black text-[var(--neo-ink)] sm:text-3xl">
                  <AnimCounter target={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-xs text-[var(--neo-ink)] transition-colors">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.25em] text-[var(--neo-secondary)]">
              DỊCH VỤ CỦA TÔI
            </h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {SERVICES.map((s, i) => (
                <Reveal key={s.title} delay={0.1 * i}>
                  <div className="group neo-card bg-[var(--neo-bg-cream)] p-3.5 transition-transform duration-150 hover:-translate-y-1">
                    <span className="neo-badge flex h-10 w-10 shrink-0 items-center justify-center text-xl">
                      {s.icon}
                    </span>
                    <div>
                      <p className="text-sm font-black text-[var(--neo-ink)]">
                        {s.title}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-[var(--neo-ink)]">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.25em] text-[var(--neo-secondary)]">
              KỸ NĂNG CHÍNH
            </h3>
            <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {SKILLS.map((sk, i) => (
                <SkillBar
                  key={sk.name}
                  name={sk.name}
                  level={sk.level}
                  delay={i * 0.08}
                />
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.35}>
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.25em] text-[var(--neo-secondary)]">
              HÀNH TRÌNH CỦA TÔI
            </h3>
            <div className="relative mt-4 ml-4 border-l-4 border-[var(--neo-secondary)] pl-6 space-y-4 timeline-line">
              {JOURNEY.map((item, i) => (
                <Reveal key={item.year} delay={0.12 * i} direction="left">
                  <div className="relative border-4 border-[var(--neo-ink)] bg-[var(--neo-bg-cream)] p-3 neo-hard-shadow-sm">
                    <span className="absolute -left-[33px] top-1 flex h-3.5 w-3.5 items-center justify-center">
                      <span className="absolute h-full w-full animate-ping rounded-full bg-zinc-500 opacity-20" />
                      <span className="relative h-3 w-3 rounded-full border-2 border-zinc-500 bg-zinc-900" />
                    </span>
                    <span className="inline-block neo-pill bg-[var(--neo-secondary)] px-2 py-0.5 text-[11px] font-black text-[var(--neo-ink)]">
                      {item.year}
                    </span>
                    <p className="mt-1 text-sm font-black text-[var(--neo-ink)]">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-[var(--neo-ink)]">
                      {item.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="neo-card bg-[var(--neo-bg-cream)] p-4 text-[var(--neo-ink)] sm:p-5">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1.2fr)]">
              <div className="flex flex-col justify-between gap-3">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-[0.25em] text-[var(--neo-accent)]">
                    CÁCH TÔI LÀM VIỆC
                  </h3>
                  <p className="mt-2 text-sm font-semibold leading-relaxed text-[var(--neo-ink)] sm:text-base">
                    Thiết kế hệ thống rõ ràng, triển khai chắc chắn, tối ưu trải
                    nghiệm và dễ bảo trì.
                  </p>
                </div>
                <ul className="mt-1 space-y-2 text-xs font-semibold text-[var(--neo-ink)] sm:text-sm">
                  {[
                    "Phân tích kỹ yêu cầu & đề xuất kiến trúc phù hợp.",
                    "Xây dựng UI/UX mượt mà, đồng nhất trên nhiều thiết bị.",
                    "Ưu tiên clean code, pattern dễ hiểu cho team.",
                    "Theo dõi và tối ưu hiệu năng sau khi deploy.",
                  ].map((item, i) => (
                    <li
                      key={item}
                      className="flex items-start gap-2"
                      style={{
                        opacity: 1,
                        animationDelay: `${0.08 * i}s`,
                      }}
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border-2 border-[var(--neo-ink)] bg-[var(--neo-secondary)] text-[10px] font-black">
                        {i + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="neo-card bg-[var(--neo-ink)] p-3 text-[var(--neo-bg-cream)] sm:p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-black uppercase tracking-[0.2em] text-[var(--neo-secondary)]">
                    Stack chính
                  </p>
                  <span className="neo-pill bg-[var(--neo-secondary)] px-2 py-0.5 text-[10px] font-black text-[var(--neo-ink)] sm:text-[11px]">
                    JS • TS • Flutter
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-[var(--neo-ink)]">
                  {[
                    {
                      label: "Web",
                      value: "React, Next.js, Tailwind",
                    },
                    {
                      label: "Mobile app",
                      value: "Flutter, REST API",
                    },
                    {
                      label: "Workflow",
                      value: "Git, CI/CD, code review",
                    },
                    {
                      label: "Định hướng",
                      value: "Sản phẩm lâu dài, MVP rõ ràng",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="border-4 border-[var(--neo-ink)] bg-[var(--neo-bg-cream)] p-2 transition-transform duration-150 hover:-translate-y-1"
                    >
                      <p className="text-[11px] font-black uppercase tracking-[0.12em] text-[var(--neo-accent)]">
                        {item.label}
                      </p>
                      <p className="mt-1 text-[13px] font-semibold text-[var(--neo-ink)]">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="grid gap-2 text-sm sm:grid-cols-3 sm:gap-3">
            {[
              {
                label: "Vị trí hiện tại",
                value: location || "Cập nhật nơi làm việc",
              },
              {
                label: "Công nghệ chính",
                value: "JavaScript • TypeScript • React • Next.js • Node.js",
              },
              {
                label: "Kinh nghiệm",
                value: "3+ năm phát triển web & mobile",
              },
            ].map((card) => (
              <div
                key={card.label}
                className="neo-card bg-[var(--neo-bg-cream)] p-3 text-[var(--neo-ink)] transition-transform duration-150 hover:-translate-y-1"
              >
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[var(--neo-accent)]">
                  {card.label}
                </p>
                <p className="mt-1 text-sm font-black sm:text-base">{card.value}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="flex min-w-0 flex-col gap-3 sm:gap-4">
        <Reveal delay={0.2} direction="right">
          <div className="relative neo-card bg-[var(--neo-bg-cream)] p-4 sm:p-5">
            <div className="relative flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden bg-[var(--neo-ink)] neo-hard-shadow-sm">
                  {!imgError ? (
                    <Image
                      src="/profile.jpg"
                      alt="Trần Công Tiến"
                      fill
                      sizes="48px"
                      className="object-cover"
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center text-lg font-black text-[var(--neo-bg-cream)]">
                      TC
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-neutral-700 sm:text-sm">
                    Portfolio Snapshot
                  </p>
                  <p className="mt-0.5 truncate text-sm font-black text-[var(--neo-ink)] sm:text-base">
                    {cardHolder || "Trần Công Tiến"}
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-sm text-neutral-800">
                <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between">
                  <span className="font-medium">Kinh nghiệm</span>
                  <span className="font-black">3+ năm</span>
                </div>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
                  <span className="shrink-0 font-medium">Trạng thái</span>
                  <span className="inline-flex w-fit items-center gap-1 neo-pill bg-emerald-400 px-2 py-1 text-[11px] font-black sm:py-0.5 sm:text-xs">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--neo-ink)]" />
                    <span className="break-words">Đang nhận dự án mới</span>
                  </span>
                </div>
                <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between">
                  <span className="font-medium">Nơi làm việc</span>
                  <span className="break-words text-right text-sm font-black sm:max-w-[55%] sm:truncate">
                    {location || "Cập nhật nơi làm việc"}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between border-t-4 border-[var(--neo-ink)] pt-3 text-[10px] text-neutral-800 sm:text-[11px]">
                <span>Bắt đầu code từ</span>
                <span className="font-mono font-black">•••• {cardLast4 || "2020"}</span>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.3} direction="right">
          <div className="neo-card bg-[var(--neo-bg-cream)] p-3 sm:p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="text-xs font-black uppercase tracking-[0.25em] text-[var(--neo-accent)] sm:text-base">
                  Trợ lý Portfolio
                </h3>
                <p className="mt-1 text-sm font-semibold text-[var(--neo-ink)] sm:text-base">
                  Bạn muốn tìm hiểu điều gì về tôi?
                </p>
              </div>
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center border-4 border-[var(--neo-ink)] bg-[var(--neo-secondary)] text-base font-black text-[var(--neo-ink)] neo-hard-shadow-sm transition-transform duration-150 hover:-translate-y-0.5"
              >
                ×
              </button>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-1.5 text-sm sm:mt-4 sm:gap-2 sm:text-base">
              {assistantQuickActions.map((item) => {
                const isActive = item === selectedAssistantAction;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setSelectedAssistantAction(item);
                      if (item === "Dự án tiêu biểu")
                        setAssistantInput(
                          "Giới thiệu cho tôi dự án web tiêu biểu nhất mà bạn đã làm, kèm link demo và mã nguồn.",
                        );
                      else if (item === "Công nghệ sử dụng")
                        setAssistantInput(
                          "Liệt kê các công nghệ chính bạn đang sử dụng cho frontend, backend và hạ tầng.",
                        );
                      else if (item === "Hồ sơ / CV")
                        setAssistantInput(
                          "Gửi cho tôi link tải CV mới nhất của bạn.",
                        );
                      else if (item === "Trao đổi hợp tác")
                        setAssistantInput(
                          "Tôi muốn trao đổi về một cơ hội hợp tác / dự án freelance với bạn.",
                        );
                    }}
                    className={[
                      "flex items-center justify-between neo-card bg-[var(--neo-bg-cream)] px-2.5 py-1.5 text-left text-sm font-black text-[var(--neo-ink)] transition-transform duration-150 sm:px-3 sm:py-2 sm:text-base",
                      isActive
                        ? "bg-[var(--neo-secondary)] neo-sticker-tilt-1"
                        : "bg-[var(--neo-bg-cream)] neo-sticker-tilt-2",
                    ].join(" ")}
                  >
                    <span>{item}</span>
                    <span className="flex h-5 w-5 items-center justify-center border-2 border-[var(--neo-ink)] bg-[var(--neo-secondary)] text-center text-[10px] font-black">
                      →
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-3 neo-card bg-[var(--neo-ink)] px-3 py-2 text-sm font-semibold sm:mt-4 sm:py-2.5 sm:text-base">
              {assistantMessages[0] ? (
                <span className="line-clamp-2">Yêu cầu gần nhất: {assistantMessages[0]}</span>
              ) : (
                <span className="inline-flex flex-wrap items-center gap-1.5 leading-relaxed">
                  Hãy bắt đầu bằng cách hỏi tôi về{" "}
                  <span className="neo-pill bg-[var(--neo-secondary)] px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.14em] text-[var(--neo-ink)] sm:text-[11px]">
                    Dự án
                  </span>
                  hoặc{" "}
                  <span className="neo-pill bg-[var(--neo-accent)] px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.14em] text-[var(--neo-ink)] sm:text-[11px]">
                    Công nghệ
                  </span>
                  bạn quan tâm.
                </span>
              )}
            </div>

            <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="flex min-w-0 flex-1 items-center gap-2 border-4 border-[var(--neo-ink)] bg-[var(--neo-white)] px-3 py-2 text-sm text-[var(--neo-ink)] neo-hard-shadow-sm sm:text-base">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <input
                  value={assistantInput}
                  onChange={(e) => setAssistantInput(e.target.value)}
                  placeholder="Nhập câu hỏi của bạn về tôi hoặc dự án…"
                  aria-label="Câu hỏi cho trợ lý"
                  className="min-w-0 flex-1 border-none bg-transparent text-sm font-semibold text-[var(--neo-ink)] outline-none placeholder:text-neutral-500 sm:text-base"
                />
              </div>
              <button
                type="button"
                onClick={onSendAssistant}
                className="neo-button flex h-10 shrink-0 items-center justify-center px-4 text-sm sm:text-base"
              >
                Gửi
              </button>
            </div>

            {assistantMessages.length > 1 && (
              <div className="mt-3 space-y-1.5 neo-card bg-[var(--neo-bg-cream)] p-3 text-base text-neutral-800">
                {assistantMessages.slice(1).map((msg, index) => (
                  <p key={msg + index} className="line-clamp-1">
                    • {msg}
                  </p>
                ))}
              </div>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.4} direction="right">
          <div className="flex h-full flex-col overflow-hidden neo-card bg-[var(--neo-bg-cream)] p-3 sm:p-4">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[var(--neo-accent)]">
              Thông tin nhanh
            </h3>
            <p className="mt-0.5 text-xs font-semibold text-[var(--neo-ink)]">
              Tech chính & cách liên hệ với tôi.
            </p>

            <div className="mt-3 neo-card bg-[var(--neo-ink)] p-3 text-xs text-[var(--neo-bg-cream)]">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--neo-secondary)]">
                    TỪ NĂM
                  </span>
                  <input
                    value={cardLast4}
                    onChange={(e) =>
                      setCardLast4(e.target.value.replace(/\D/g, "").slice(0, 4))
                    }
                    aria-label="Từ năm"
                    placeholder="2020"
                    className="mt-1 w-24 border-4 border-[var(--neo-ink)] bg-[var(--neo-bg-cream)] px-2 py-1 text-sm font-black text-[var(--neo-ink)] outline-none"
                  />
                </div>
                <div className="flex flex-1 flex-col items-start">
                  <span className="text-[10px] uppercase tracking-[0.14em] text-[var(--neo-secondary)] break-words">
                    NGƯỜI THỰC HIỆN
                  </span>
                  <input
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    aria-label="Người thực hiện"
                    className="mt-1 w-full max-w-full border-4 border-[var(--neo-ink)] bg-[var(--neo-bg-cream)] px-2 py-1 text-sm font-black text-[var(--neo-ink)] outline-none"
                  />
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="neo-pill bg-emerald-400 px-2 py-0.5 text-[10px] font-black text-[var(--neo-ink)]">
                  Đang mở cho cơ hội mới
                </span>
                <span className="text-[10px] text-zinc-400">Web & App (Flutter)</span>
              </div>
            </div>

            <div className="mt-3 space-y-2 text-xs text-[var(--neo-ink)]">
              <div className="neo-card bg-[var(--neo-bg-cream)] p-2">
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[var(--neo-accent)]">
                  Stack ưa thích
                </p>
                <span className="mt-1 block text-right text-[11px] font-black">
                  React / Next.js • Flutter • Node.js
                </span>
              </div>
              <div className="neo-card bg-[var(--neo-bg-cream)] p-2">
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[var(--neo-accent)]">
                  Kênh liên hệ ưu tiên
                </p>
                <p className="mt-0.5 w-full break-words text-[11px] font-black text-[var(--neo-ink)]">
                  Email: trancongtien40@gmail.com
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </>
  );
}
