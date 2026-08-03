import type { AssistantAction, ProjectItem, RentalTab } from "./types";

export const rentalTabs: RentalTab[] = [
  "Giới thiệu",
  "Dự án",
  "Blog",
  "Tạo website",
  "CV",
  "Liên hệ",
];

export const assistantQuickActions: AssistantAction[] = [
  "Dự án tiêu biểu",
  "Công nghệ sử dụng",
  "Hồ sơ / CV",
  "Trao đổi hợp tác",
];

export const TYPING_TEXTS = [
  "Full-stack Web Developer",
  "Flutter App Developer",
  "UI/UX Enthusiast",
  "Problem Solver",
];

export const STATS = [
  { label: "Năm kinh nghiệm", value: 3, suffix: "+" },
  { label: "Dự án hoàn thành", value: 15, suffix: "+" },
  { label: "Khách hàng hài lòng", value: 10, suffix: "+" },
  { label: "Công nghệ thành thạo", value: 12, suffix: "" },
];

export const SKILLS = [
  { name: "React / Next.js", level: 90 },
  { name: "TypeScript", level: 85 },
  { name: "Tailwind CSS", level: 92 },
  { name: "Node.js / Express", level: 80 },
  { name: "PostgreSQL / MongoDB", level: 75 },
  { name: "Flutter / Dart", level: 70 },
  { name: "Git / CI/CD", level: 82 },
  { name: "Docker", level: 60 },
];

export const JOURNEY = [
  {
    year: "2023",
    title: "Bắt đầu hành trình lập trình",
    desc: "Học lập trình web với HTML, CSS, JavaScript. Tự tay xây dựng dự án đầu tay và khám phá thế giới code.",
  },
  {
    year: "2024",
    title: "Chuyên sâu React & Next.js",
    desc: "Tập trung vào React ecosystem, xây dựng ứng dụng web phức tạp. Nhận dự án freelance đầu tiên.",
  },
  {
    year: "2025",
    title: "Mở rộng sang Mobile App",
    desc: "Học Flutter phát triển ứng dụng cross-platform. Hoàn thành nhiều dự án cho khách hàng thực tế.",
  },
  {
    year: "2026",
    title: "Full-stack Developer",
    desc: "Phát triển toàn diện web & mobile. Xây dựng portfolio platform, tiếp tục nhận những dự án mới.",
  },
];

export const SERVICES = [
  {
    icon: "🌐",
    title: "Website & Landing Page",
    desc: "Thiết kế và phát triển website giới thiệu, landing page chuyên nghiệp, tối ưu SEO và tốc độ tải.",
  },
  {
    icon: "⚙️",
    title: "Web Application",
    desc: "Xây dựng web app phức tạp: quản lý, dashboard, CRUD, real-time và tích hợp API bên thứ ba.",
  },
  {
    icon: "📱",
    title: "Mobile App (Flutter)",
    desc: "Phát triển ứng dụng di động cross-platform cho cả iOS & Android với giao diện mượt mà.",
  },
  {
    icon: "🛠️",
    title: "Tư vấn & Bảo trì",
    desc: "Tư vấn kiến trúc hệ thống, code review, tối ưu hiệu năng và bảo trì dự án dài hạn.",
  },
];

export const PROJECTS: ProjectItem[] = [];

export const BLOG_POSTS = [];
