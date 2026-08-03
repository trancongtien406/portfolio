import Image from "next/image";
import { Reveal } from "./animations";

type ContactTabProps = {
  imgError: boolean;
  setImgError: (value: boolean) => void;
  contactName: string;
  setContactName: (value: string) => void;
  contactEmail: string;
  setContactEmail: (value: string) => void;
  contactType: string;
  setContactType: (value: string) => void;
  contactPhone: string;
  setContactPhone: (value: string) => void;
  contactMessage: string;
  setContactMessage: (value: string) => void;
  contactSubmitted: boolean;
  contactSending: boolean;
  contactError: string;
  onContactSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

export function ContactTab({
  imgError,
  setImgError,
  contactName,
  setContactName,
  contactEmail,
  setContactEmail,
  contactType,
  setContactType,
  contactPhone,
  setContactPhone,
  contactMessage,
  setContactMessage,
  contactSubmitted,
  contactSending,
  contactError,
  onContactSubmit,
}: ContactTabProps) {
  return (
    <>
      <div className="flex min-w-0 flex-col gap-4 neo-card bg-[var(--neo-ink)] p-4 text-[var(--neo-bg-cream)] sm:gap-5 sm:p-6">
        <Reveal>
          <div className="border-4 border-[var(--neo-ink)] bg-[var(--neo-bg-cream)] p-3 text-[var(--neo-ink)] neo-hard-shadow-sm">
            <p className="inline-block border-4 border-[var(--neo-ink)] bg-[var(--neo-secondary)] px-2 py-1 text-sm font-black uppercase tracking-[0.2em] text-[var(--neo-ink)] neo-hard-shadow-sm sm:text-base">
              LIÊN HỆ VỚI TÔI
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-[var(--neo-ink)] sm:text-3xl">
              Cùng xây dựng sản phẩm tiếp theo
            </h2>
            <p className="mt-3 max-w-md text-sm font-semibold text-[var(--neo-ink)] sm:text-base">
              Tôi luôn mở cho các cơ hội hợp tác mới: dự án freelance, vị trí
              full-time hoặc cùng nhau xây dựng một ý tưởng sản phẩm thú vị. Hãy
              liên hệ với tôi và chúng ta sẽ trao đổi thêm!
            </p>
          </div>
        </Reveal>

        <div className="mt-2 grid gap-2 text-sm text-[var(--neo-bg-cream)] sm:grid-cols-2 sm:gap-3 sm:text-base">
          {[
            {
              label: "Email",
              value: "trancongtien406@gmail.com",
            },
            {
              label: "Số điện thoại",
              value: "(+84) 382 802 406",
            },
            {
              label: "Thời gian phản hồi",
              value: "Trong vòng 24h (ngày làm việc)",
            },
          ].map((item, i) => (
            <Reveal key={item.label} delay={0.1 * i}>
              <div className="neo-card bg-[var(--neo-ink)] p-3 transition-transform duration-150 hover:-translate-y-0.5">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[var(--neo-secondary)] sm:text-sm">
                  {item.label}
                </p>
                <p className="mt-1 inline-block break-words border-2 border-[var(--neo-ink)] bg-[var(--neo-bg-cream)] px-2 py-1 text-sm font-black text-[var(--neo-ink)]">
                  {item.value}
                </p>
              </div>
            </Reveal>
          ))}

          <Reveal delay={0.3}>
            <div className="neo-card bg-[var(--neo-ink)] p-3 sm:col-span-2">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-[var(--neo-secondary)] sm:text-sm">
                Mạng xã hội
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5 sm:gap-2">
                {[
                  {
                    href: "https://www.linkedin.com/in/trancongtien406/",
                    icon: "in",
                    name: "LinkedIn",
                  },
                  {
                    href: "https://github.com/tiendev2003",
                    icon: "GH",
                    name: "GitHub",
                  },
                  {
                    href: "https://www.facebook.com/trancongtien406",
                    icon: "FB",
                    name: "Facebook",
                  },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 neo-pill bg-[var(--neo-bg-cream)] px-2.5 py-1.5 text-xs font-black text-[var(--neo-ink)] transition-transform duration-150 hover:-translate-y-0.5 sm:gap-2 sm:px-3 sm:text-sm"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--neo-secondary)] text-xs">
                      {social.icon}
                    </span>
                    <span>{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="neo-card bg-[var(--neo-ink)] p-3 sm:col-span-2">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-[var(--neo-secondary)] sm:text-sm">
                Hình thức làm việc
              </p>
              <p className="mt-2 inline-block border-2 border-[var(--neo-ink)] bg-[var(--neo-bg-cream)] px-2.5 py-1 text-sm font-black text-[var(--neo-ink)]">
                Ưu tiên remote, linh hoạt thời gian; có thể onsite nếu phù hợp.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.3}>
          <div className="mt-2 flex items-center gap-4 neo-card bg-[var(--neo-bg-cream)] p-4 text-[var(--neo-ink)]">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-4 border-[var(--neo-ink)]">
              {!imgError ? (
                <Image
                  src="/profile.jpg"
                  alt="Trần Công Tiến"
                  fill
                  sizes="64px"
                  className="object-cover"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-neutral-900 text-lg font-black text-[var(--neo-bg-cream)]">
                  TC
                </div>
              )}
            </div>
            <div>
              <p className="text-sm font-black text-[var(--neo-ink)]">Trần Công Tiến</p>
              <p className="text-xs font-semibold text-[var(--neo-ink)]">
                Full-stack Web &amp; App Developer
              </p>
              <p className="mt-1 inline-block border-2 border-[var(--neo-ink)] bg-[var(--neo-secondary)] px-2 py-0.5 text-xs font-black text-[var(--neo-ink)]">
                Đà Nẵng, Việt Nam • Sẵn sàng cho dự án mới
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal direction="right" delay={0.15}>
        <div className="min-w-0 neo-card bg-[var(--neo-bg-cream)] p-4 text-[var(--neo-ink)] sm:p-5">
          <h3 className="inline-block border-4 border-[var(--neo-ink)] bg-[var(--neo-secondary)] px-2 py-1 text-sm font-black uppercase tracking-[0.16em] text-[var(--neo-ink)] neo-hard-shadow-sm sm:text-base">
            Liên hệ hợp tác
          </h3>
          <p className="mt-2 text-sm font-semibold text-[var(--neo-ink)] sm:text-base">
            Hãy cho tôi biết một chút về bạn và dự án. Tôi sẽ phản hồi sớm nhất có
            thể.
          </p>
          <form onSubmit={onContactSubmit} className="mt-4 space-y-3 text-sm sm:text-base">
            <div className="grid gap-2 sm:gap-3">
              <div>
                <label
                  htmlFor="contact-name"
                  className="text-sm font-black uppercase tracking-[0.12em] text-[var(--neo-ink)] sm:text-base"
                >
                  Tên của bạn
                </label>
                <input
                  id="contact-name"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="mt-1 w-full rounded-none border-4 border-[var(--neo-ink)] bg-[var(--neo-bg-cream)] px-3 py-2 text-base text-[var(--neo-ink)] outline-none transition-all focus:bg-[var(--neo-secondary)]"
                  placeholder="VD: Nguyễn Văn A"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="text-sm font-black uppercase tracking-[0.12em] text-[var(--neo-ink)] sm:text-base"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="mt-1 w-full rounded-none border-4 border-[var(--neo-ink)] bg-[var(--neo-bg-cream)] px-3 py-2 text-base text-[var(--neo-ink)] outline-none transition-all focus:bg-[var(--neo-secondary)]"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-phone"
                className="text-sm font-black uppercase tracking-[0.12em] text-[var(--neo-ink)] sm:text-base"
              >
                Số điện thoại
              </label>
              <input
                id="contact-phone"
                type="tel"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="mt-1 w-full rounded-none border-4 border-[var(--neo-ink)] bg-[var(--neo-bg-cream)] px-3 py-2 text-base text-[var(--neo-ink)] outline-none transition-all focus:bg-[var(--neo-secondary)]"
                placeholder="+84..."
              />
            </div>

            <div>
              <label
                htmlFor="contact-type"
                className="text-sm font-black uppercase tracking-[0.12em] text-[var(--neo-ink)] sm:text-base"
              >
                Loại hợp tác
              </label>
              <select
                id="contact-type"
                value={contactType}
                onChange={(e) => setContactType(e.target.value)}
                className="mt-1 w-full rounded-none border-4 border-[var(--neo-ink)] bg-[var(--neo-bg-cream)] px-3 py-2 text-base text-[var(--neo-ink)] outline-none transition-all focus:bg-[var(--neo-secondary)]"
              >
                <option>Dự án freelance</option>
                <option>Vị trí full-time</option>
                <option>Hợp tác lâu dài</option>
                <option>Khác</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="text-sm font-black uppercase tracking-[0.12em] text-[var(--neo-ink)] sm:text-base"
              >
                Mô tả ngắn về dự án / nhu cầu
              </label>
              <textarea
                id="contact-message"
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                className="mt-1 w-full rounded-none border-4 border-[var(--neo-ink)] bg-[var(--neo-bg-cream)] px-3 py-2 text-base text-[var(--neo-ink)] outline-none transition-all focus:bg-[var(--neo-secondary)]"
                rows={4}
                placeholder="Ngân sách, thời gian dự kiến, công nghệ mong muốn..."
              />
            </div>

            {contactError && (
              <div className="animate-fade-in neo-card border-4 border-red-600 bg-red-200 px-4 py-3 text-sm text-red-900">
                {contactError}
              </div>
            )}

            {contactSubmitted && (
              <div className="animate-fade-in-up neo-card border-4 border-emerald-500 bg-emerald-200 px-4 py-3 text-sm text-emerald-900">
                <p className="font-semibold">✓ Gửi thành công!</p>
                <p className="mt-1">
                  Cảm ơn bạn! Tôi đã nhận được thông tin và sẽ phản hồi qua email
                  trong vòng 24h.
                </p>
              </div>
            )}

            <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
              <button
                type="submit"
                disabled={contactSending}
                className={[
                  "order-2 flex w-full items-center justify-center px-4 py-2.5 text-sm sm:order-1 sm:w-auto sm:text-base",
                  contactSending
                    ? "cursor-not-allowed neo-button bg-neutral-500 text-[var(--neo-bg-cream)]"
                    : "neo-button",
                ].join(" ")}
              >
                {contactSending ? (
                  <>
                    <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Đang gửi...
                  </>
                ) : (
                  "Gửi thông tin"
                )}
              </button>
            </div>
          </form>
        </div>
      </Reveal>
    </>
  );
}
