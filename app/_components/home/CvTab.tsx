import { Reveal } from "./animations";

function handleDownloadCv() {
  if (typeof window === "undefined") return;
  const printWindow = window.open("", "_blank", "width=900,height=1200");
  if (!printWindow) return;

  const html = `
    <html>
      <head>
        <title>CV - Trần Công Tiến</title>
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            background: #f4f1e9;
            padding: 16px;
          }
          h1, h2, h3 {
            font-weight: 800;
            letter-spacing: 0.16em;
            text-transform: uppercase;
          }
          .page {
            width: 210mm;
            height: 297mm;
            margin: 0 auto;
            background: #ffffff;
            border: 4px solid #000000;
            box-shadow: 8px 8px 0px 0px #000000;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            font-size: 11px;
            line-height: 1.5;
            color: #020617;
          }
          .cv-header {
            border-bottom: 4px solid #000000;
            background: #fde047;
            padding: 18px 24px;
          }
          .cv-header-top {
            display: flex;
            justify-content: space-between;
            gap: 12px;
            align-items: flex-end;
          }
          .cv-header-name {
            font-size: 22px;
          }
          .cv-header-role {
            margin-top: 4px;
            font-size: 10px;
          }
          .cv-header-contact {
            font-size: 10px;
            text-align: right;
          }
          .cv-body {
            flex: 1;
            display: flex;
            gap: 18px;
            padding: 16px 22px;
          }
          .cv-col-left {
            flex: 1;
            max-width: 46%;
            border-right: 4px solid #000000;
            padding-right: 16px;
          }
          .cv-col-right {
            flex: 1.4;
            max-width: 54%;
            padding-left: 4px;
          }
          .cv-footer-row {
            margin-top: 12px;
            padding-top: 8px;
            border-top: 2px solid #000000;
            display: flex;
            justify-content: space-between;
            gap: 12px;
            font-size: 9px;
          }
          .cv-section {
            margin-bottom: 12px;
          }
          .cv-section-title {
            font-size: 10px;
            border-bottom: 2px solid #000000;
            padding-bottom: 4px;
            margin-bottom: 4px;
          }
          .cv-tag {
            font-size: 9px;
            font-weight: 700;
            text-transform: uppercase;
          }
          .cv-list {
            margin: 4px 0 0 14px;
          }
          .cv-list li {
            margin-bottom: 2px;
          }
          @page {
            size: A4;
            margin: 0;
          }
          @media print {
            body {
              padding: 0;
              background: #ffffff;
            }
            .page {
              box-shadow: none;
              border: 0;
            }
          }
        </style>
      </head>
      <body>
        <div class="page">
          <div class="cv-header">
            <div class="cv-header-top">
              <div>
                <h1 class="cv-header-name">Trần Công Tiến</h1>
                <div class="cv-header-role">Full-stack Web & Mobile Developer</div>
              </div>
              <div class="cv-header-contact">
                <div>Đà Nẵng, Việt Nam</div>
                <div>Email: trancongtien406@gmail.com</div>
                <div>Tel: (+84) 382 802 406</div>
                <div>GitHub: github.com/tiendev2003</div>
                <div>LinkedIn: /in/trancongtien406</div>
              </div>
            </div>
          </div>
          <div class="cv-body">
            <div class="cv-col-left">
              <div class="cv-section">
                <h3 class="cv-section-title">Tóm tắt</h3>
                <p>
                  Lập trình viên full‑stack tập trung vào Next.js, React, Node.js và Flutter.
                  Yêu thích xây dựng sản phẩm có trải nghiệm người dùng tốt, code rõ ràng,
                  dễ mở rộng và dễ bảo trì.
                </p>
              </div>
              <div class="cv-section">
                <h3 class="cv-section-title">Kỹ năng chính</h3>
                <p><span class="cv-tag">Frontend:</span> React, Next.js, TypeScript, Tailwind CSS</p>
                <p><span class="cv-tag">Backend:</span> Node.js, Express, REST API, Prisma, PostgreSQL</p>
                <p><span class="cv-tag">Mobile:</span> Flutter, Dart, state management (Provider/BLoC)</p>
                <p><span class="cv-tag">Khác:</span> Git, CI/CD, Docker, tối ưu hiệu năng</p>
              </div>
              <div class="cv-section">
                <h3 class="cv-section-title">Thông tin nhanh</h3>
                <p><span class="cv-tag">Kinh nghiệm:</span> 3+ năm phát triển web & mobile (dự án cá nhân và freelance).</p>
                <p><span class="cv-tag">Ngôn ngữ:</span> JavaScript, TypeScript, Dart.</p>
                <p><span class="cv-tag">Mục tiêu:</span> Tham gia team sản phẩm hoặc nhận dự án freelance dài hạn về web/app.</p>
              </div>
            </div>
            <div class="cv-col-right">
              <div class="cv-section">
                <h3 class="cv-section-title">Kinh nghiệm tiêu biểu</h3>
                <p class="cv-tag">Portfolio & blog cá nhân</p>
                <p class="cv-tag">Next.js • Prisma • PostgreSQL • Tailwind</p>
                <ul class="cv-list">
                  <li>Mục tiêu: website cá nhân + blog để giới thiệu bản thân, dự án và chia sẻ kiến thức.</li>
                  <li>Vai trò: tự thiết kế UI/UX, code full‑stack, triển khai production.</li>
                  <li>Chức năng: trang danh sách / chi tiết bài viết, phân loại theo tag, hiển thị dự án tiêu biểu.</li>
                  <li>Quản lý: kết nối admin dashboard để quản lý bài viết, dự án, dữ liệu liên hệ.</li>
                  <li>Kết quả: tối ưu SEO cơ bản (meta, Open Graph) và tốc độ tải trang ổn định.</li>
                </ul>
                <br/>
                <p class="cv-tag">Web app quản lý (demo)</p>
                <p class="cv-tag">React • REST API</p>
                <ul class="cv-list">
                  <li>Mục tiêu: ứng dụng web quản lý dữ liệu (khách hàng, đơn hàng, task...) dùng nội bộ.</li>
                  <li>Chức năng: CRUD đầy đủ, tìm kiếm, lọc, phân trang trên bảng dữ liệu.</li>
                  <li>Kiến trúc: tách rõ API service, component UI, state; dễ tái sử dụng và mở rộng.</li>
                  <li>Bảo mật: phân quyền cơ bản giữa admin và user thường.</li>
                  <li>Kết quả: dashboard gọn, dễ thao tác, thuận tiện cho việc mở rộng thêm module quản lý khác.</li>
                </ul>
                <br/>
                <p class="cv-tag">Ứng dụng Flutter (demo)</p>
                <p class="cv-tag">Flutter • REST API</p>
                <ul class="cv-list">
                  <li>Mục tiêu: app mobile hiển thị danh sách dữ liệu từ REST API (tin tức / sản phẩm / task...).</li>
                  <li>Nền tảng: phát triển và test trên Android & iOS (dev).</li>
                  <li>UI/UX: tối ưu layout cho nhiều kích thước màn hình, gesture tự nhiên.</li>
                  <li>Trạng thái: xử lý loading, lỗi, empty state rõ ràng.</li>
                  <li>Kết quả: app chạy mượt, dễ mở rộng thêm màn hình và tính năng mới.</li>
                </ul>
              </div>
              <div class="cv-section">
                <h3 class="cv-section-title">Công cụ & workflow</h3>
                <p><span class="cv-tag">Công cụ:</span> VS Code, GitHub, Figma, Postman, Docker.</p>
                <p><span class="cv-tag">Quy trình:</span> phân tích yêu cầu → đề xuất giải pháp → chia sprint nhỏ → demo sớm → tối ưu & bàn giao.</p>
                <p><span class="cv-tag">Làm việc nhóm:</span> quen với code review, convention chung và CI/CD cơ bản.</p>
              </div>
              <div class="cv-section">
                <h3 class="cv-section-title">Học vấn & định hướng</h3>
                <p>
                  2023 – nay: tập trung tự học lập trình Web & Mobile thông qua tài liệu
                  chính thống và dự án thực tế; định hướng trở thành full‑stack developer
                  tham gia các sản phẩm dài hạn.
                </p>
              </div>
              <div class="cv-footer-row">
                <div>
                  <span class="cv-tag">Sở thích:</span> đọc sách về sản phẩm, học công nghệ mới, nghe nhạc, cafe & gặp gỡ cộng đồng dev.
                </div>
                <div>
                  <span class="cv-tag">Trạng thái:</span> mở cho cơ hội freelance & full‑time phù hợp.
                </div>
              </div>
            </div>
          </div>
        </div>
        <script>
          window.onload = function () {
            window.print();
          };
        </script>
      </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
}

export function CvTab() {
  return (
    <>
      <div className="flex min-w-0 flex-col gap-4 neo-card bg-[var(--neo-ink)] p-4 text-[var(--neo-bg-cream)] sm:gap-5 sm:p-6">
        <Reveal>
          <div className="flex items-center justify-between gap-3 border-4 border-[var(--neo-ink)] bg-[var(--neo-bg-cream)] p-3 text-[var(--neo-ink)] neo-hard-shadow-sm">
            <div>
              <p className="inline-block border-4 border-[var(--neo-ink)] bg-[var(--neo-secondary)] px-2 py-1 text-xs font-black uppercase tracking-[0.2em] text-[var(--neo-ink)] neo-hard-shadow-sm sm:text-sm">
                CV / HỒ SƠ LÀM VIỆC
              </p>
              <h2 className="mt-2 text-xl font-black tracking-tight text-[var(--neo-ink)] sm:text-2xl">
                CV dạng trang A4, gọn và rõ ràng
              </h2>
            </div>
            <button
              type="button"
              onClick={handleDownloadCv}
              className="neo-button shrink-0 px-3 py-2 text-xs sm:px-4 sm:text-sm"
            >
              Tải / In CV
            </button>
          </div>
        </Reveal>

        {/* Khung CV A4 */}
        <Reveal delay={0.1}>
          <div className="flex justify-center overflow-auto rounded-none border-4 border-[var(--neo-ink)] bg-[var(--neo-bg-cream)] p-3 neo-hard-shadow-sm">
            <div className="relative w-full max-w-4xl bg-white text-[var(--neo-ink)] shadow-[8px_8px_0px_0px_#000]">
              {/* Tỉ lệ gần A4: 210 x 297 */}
              <div
                id="cv-a4"
                className="aspect-[210/297] w-full overflow-hidden border-4 border-[var(--neo-ink)]"
              >
                <div className="flex h-full flex-col">
                  {/* Header CV */}
                  <div className="border-b-4 border-[var(--neo-ink)] bg-[var(--neo-secondary)] px-6 py-4">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <h1 className="text-2xl font-black uppercase tracking-[0.24em] text-[var(--neo-ink)] sm:text-3xl">
                          Trần Công Tiến
                        </h1>
                        <p className="mt-1 text-xs font-black uppercase tracking-[0.22em] text-[var(--neo-ink)] sm:text-sm">
                          Full‑stack Web &amp; Mobile Developer
                        </p>
                      </div>
                      <div className="mt-2 flex flex-col items-start gap-0.5 text-[10px] font-semibold sm:items-end sm:text-[11px]">
                        <span>Đà Nẵng, Việt Nam</span>
                        <span>Email: trancongtien406@gmail.com</span>
                        <span>Tel: (+84) 382 802 406</span>
                        <span>GitHub: github.com/tiendev2003</span>
                        <span>LinkedIn: /in/trancongtien406</span>
                      </div>
                    </div>
                  </div>

                  {/* Nội dung 2 cột */}
                  <div className="flex flex-1 flex-col gap-4 px-5 py-4 text-xs leading-relaxed sm:flex-row sm:gap-6 sm:text-[13px]">
                    {/* Cột trái */}
                    <div className="flex-1 space-y-3 border-b-4 border-[var(--neo-ink)] pb-3 sm:border-b-0 sm:border-r-4 sm:pb-0 sm:pr-4">
                      <section>
                        <h3 className="border-b-2 border-[var(--neo-ink)] pb-1 text-[11px] font-black uppercase tracking-[0.18em]">
                          Tóm tắt
                        </h3>
                        <p className="mt-1">
                          Lập trình viên full‑stack tập trung vào Next.js, React, Node.js
                          và Flutter. Yêu thích xây dựng sản phẩm có trải nghiệm người
                          dùng tốt, code rõ ràng, dễ mở rộng và dễ bảo trì.
                        </p>
                      </section>

                      <section>
                        <h3 className="border-b-2 border-[var(--neo-ink)] pb-1 text-[11px] font-black uppercase tracking-[0.18em]">
                          Kỹ năng chính
                        </h3>
                        <div className="mt-1 grid grid-cols-2 gap-x-3 gap-y-1">
                          <div>
                            <p className="font-black">Frontend</p>
                            <p>React, Next.js, TypeScript, Tailwind CSS</p>
                          </div>
                          <div>
                            <p className="font-black">Backend</p>
                            <p>Node.js, Express, REST API, Prisma, PostgreSQL</p>
                          </div>
                          <div>
                            <p className="font-black">Mobile</p>
                            <p>Flutter, Dart (Provider/BLoC)</p>
                          </div>
                          <div>
                            <p className="font-black">Khác</p>
                            <p>Git, CI/CD, Docker, tối ưu hiệu năng</p>
                          </div>
                        </div>
                      </section>

                      <section>
                        <h3 className="border-b-2 border-[var(--neo-ink)] pb-1 text-[11px] font-black uppercase tracking-[0.18em]">
                          Thông tin nhanh
                        </h3>
                        <ul className="mt-1 space-y-1.5">
                          <li className="flex items-start gap-2">
                            <span className="mt-0.5 h-3 w-3 border-2 border-[var(--neo-ink)] bg-[var(--neo-secondary)]" />
                            <span>
                              <span className="font-black">Kinh nghiệm:</span> 3+ năm
                              phát triển web &amp; mobile (thực chiến dự án cá nhân
                              và freelance).
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="mt-0.5 h-3 w-3 border-2 border-[var(--neo-ink)] bg-[var(--neo-secondary)]" />
                            <span>
                              <span className="font-black">Ngôn ngữ:</span> JavaScript,
                              TypeScript, Dart.
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="mt-0.5 h-3 w-3 border-2 border-[var(--neo-ink)] bg-[var(--neo-secondary)]" />
                            <span>
                              <span className="font-black">Mục tiêu:</span> Tham gia
                              team sản phẩm hoặc nhận các dự án freelance dài hạn
                              về web/app.
                            </span>
                          </li>
                        </ul>
                      </section>
                    </div>

                    {/* Cột phải */}
                    <div className="flex-[1.4] space-y-3 sm:pl-1">
                      <section>
                        <h3 className="border-b-2 border-[var(--neo-ink)] pb-1 text-[11px] font-black uppercase tracking-[0.18em]">
                          Kinh nghiệm tiêu biểu
                        </h3>
                        <div className="mt-1 space-y-3">
                          <div>
                            <p className="font-black">
                              Portfolio &amp; blog cá nhân
                            </p>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.14em]">
                              Next.js • Prisma • PostgreSQL • Tailwind
                            </p>
                            <ul className="mt-1 list-disc pl-4">
                              <li><span className="font-semibold">Mục tiêu:</span> Website cá nhân + blog để giới thiệu bản thân, dự án và viết bài chia sẻ kinh nghiệm.</li>
                              <li><span className="font-semibold">Vai trò:</span> tự thiết kế UI/UX, code full‑stack, triển khai production.</li>
                              <li><span className="font-semibold">Chi tiết:</span> hệ thống blog có trang danh sách, chi tiết bài viết, phân loại theo tag.</li>
                              <li><span className="font-semibold">Quản lý:</span> kết nối admin dashboard để tạo/sửa/xoá bài viết, dự án, dữ liệu liên hệ.</li>
                              <li><span className="font-semibold">Kết quả:</span> trang tải nhanh, tối ưu SEO cơ bản (meta, Open Graph) và dễ mở rộng thêm tính năng.</li>
                            </ul>
                          </div>

                          <div>
                            <p className="font-black">
                              Web app quản lý (demo)
                            </p>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.14em]">
                              React • REST API
                            </p>
                            <ul className="mt-1 list-disc pl-4">
                              <li><span className="font-semibold">Mục tiêu:</span> Ứng dụng web quản lý dữ liệu (ví dụ: khách hàng, đơn hàng, task...).</li>
                              <li><span className="font-semibold">Chức năng:</span> CRUD đầy đủ, tìm kiếm, lọc, phân trang trên bảng dữ liệu.</li>
                              <li><span className="font-semibold">Kiến trúc:</span> tách rõ layer API service, component UI, state; dễ tái sử dụng.</li>
                              <li><span className="font-semibold">Bảo mật:</span> phân quyền cơ bản giữa admin và user thường.</li>
                              <li><span className="font-semibold">Kết quả:</span> dashboard gọn, dễ thao tác, thuận tiện cho việc mở rộng thêm module quản lý khác.</li>
                            </ul>
                          </div>

                          <div>
                            <p className="font-black">
                              Ứng dụng Flutter (demo)
                            </p>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.14em]">
                              Flutter • REST API
                            </p>
                            <ul className="mt-1 list-disc pl-4">
                              <li><span className="font-semibold">Mục tiêu:</span> Ứng dụng mobile hiển thị danh sách dữ liệu từ REST API (tin tức / sản phẩm / task...).</li>
                              <li><span className="font-semibold">Công nghệ:</span> Flutter, REST API, state management đơn giản.</li>
                              <li><span className="font-semibold">UI/UX:</span> tối ưu layout cho nhiều kích thước màn hình, gesture tự nhiên.</li>
                              <li><span className="font-semibold">Trạng thái:</span> xử lý rõ ràng các trạng thái loading, lỗi, empty state.</li>
                              <li><span className="font-semibold">Kết quả:</span> app chạy mượt trên Android/iOS (dev), dễ mở rộng thêm màn hình mới.</li>
                            </ul>
                          </div>
                        </div>
                      </section>

                      <section>
                        <h3 className="border-b-2 border-[var(--neo-ink)] pb-1 text-[11px] font-black uppercase tracking-[0.18em]">
                          Học vấn &amp; định hướng
                        </h3>
                        <p className="mt-1">
                          2023 – nay: tập trung tự học lập trình Web &amp; Mobile
                          thông qua tài liệu chính thống và dự án thực tế; định hướng
                          trở thành full‑stack developer tham gia các sản phẩm dài
                          hạn.
                        </p>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="flex min-w-0 flex-col gap-3 sm:gap-4">
        <Reveal direction="right" delay={0.15}>
          <div className="neo-card bg-[var(--neo-bg-cream)] p-4 text-[var(--neo-ink)] sm:p-5">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[var(--neo-accent)]">
              Gợi ý sử dụng
            </h3>
            <ul className="mt-3 space-y-1.5 text-sm font-semibold text-neutral-800 sm:text-base">
              <li>
                <span className="font-black">Trên desktop:</span> bạn có thể chụp
                màn hình hoặc in trực tiếp trang CV này từ trình duyệt.
              </li>
              <li>
                <span className="font-black">Khi gửi cho nhà tuyển dụng:</span>{" "}
                đính kèm link portfolio kèm tab CV này để họ xem bản online.
              </li>
              <li>
                <span className="font-black">Có thể tuỳ biến:</span> nội dung,
                kinh nghiệm, kỹ năng… theo từng vị trí ứng tuyển.
              </li>
            </ul>
          </div>
        </Reveal>
      </div>
    </>
  );
}

