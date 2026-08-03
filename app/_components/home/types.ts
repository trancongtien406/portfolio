export type RentalTab =
  | "Giới thiệu"
  | "Dự án"
  | "Blog"
  | "Tạo website"
  | "CV"
  | "Liên hệ";

export type AssistantAction =
  | "Dự án tiêu biểu"
  | "Công nghệ sử dụng"
  | "Hồ sơ / CV"
  | "Trao đổi hợp tác";

export type ProjectItem = {
  type: string;
  slug: string;
  title: string;
  description: string;
  stack: string;
  imageAlt: string | null;
  github: string | null;
};

export type BlogPostItem = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  coverImage: string | null;
  createdAt: string;
  published: boolean;
};
