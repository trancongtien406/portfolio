export type ProjectApiItem = {
  type: string;
  slug: string;
  title: string;
  description: string;
  stack: string[];
  imageAlt: string | null;
  github: string | null;
  published: boolean;
};

export type ProjectPaginationResponse = {
  data: ProjectApiItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasPrev: boolean;
    hasNext: boolean;
  };
};

export type ProjectPaginationMeta = ProjectPaginationResponse["pagination"];
