import axios from "axios";
import type {
    ProjectApiItem,
    ProjectPaginationMeta,
    ProjectPaginationResponse,
} from "../_types/project";
import type { ProjectItem } from "../types";

function toProjectItem(project: ProjectApiItem): ProjectItem {
  return {
    type: project.type,
    slug: project.slug,
    title: project.title,
    description: project.description,
    stack: project.stack.join(", "),
    imageAlt: project.imageAlt,
    github: project.github,
  };
}

export async function getHomeProjects(): Promise<ProjectItem[]> {
  const { data } = await axios.get<ProjectApiItem[]>("/api/projects", {
    timeout: 10000,
  });

  return data.map(toProjectItem);
}

export async function getProjectsPage(
  page: number,
  limit: number,
  type?: "web" | "app",
): Promise<{ data: ProjectItem[]; pagination: ProjectPaginationMeta }> {
  const { data } = await axios.get<ProjectPaginationResponse>("/api/projects", {
    params: {
      page,
      limit,
      published: true,
      type,
    },
    timeout: 10000,
  });

  return {
    data: data.data.map(toProjectItem),
    pagination: data.pagination,
  };
}
