export type BlogPostListItem = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  coverImage: string | null;
  createdAt: string;
};

export type BlogPaginationResponse = {
  data: BlogPostListItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasPrev: boolean;
    hasNext: boolean;
  };
};
