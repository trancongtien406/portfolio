import axios from "axios";
import { headers } from "next/headers";
import "server-only";
import type { BlogPaginationResponse } from "../_types/blog";

function resolveBaseUrl(host: string) {
  const isLocal = host.includes("localhost") || host.startsWith("127.0.0.1");
  const protocol = isLocal ? "http" : "https";
  return `${protocol}://${host}`;
}

export async function getPublishedBlogPage(
  page: number,
  limit: number,
): Promise<BlogPaginationResponse> {
  const h = await headers();
  const forwardedHost = h.get("x-forwarded-host");
  const host = forwardedHost ?? h.get("host") ?? "localhost:3000";
  const baseURL = resolveBaseUrl(host);

  const { data } = await axios.get<BlogPaginationResponse>("/api/blog", {
    baseURL,
    params: {
      page,
      limit,
      published: true,
    },
    timeout: 10000,
  });

  return data;
}
