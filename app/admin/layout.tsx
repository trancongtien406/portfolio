import { prisma } from "@/lib/prisma";
import { type ReactNode } from "react";
import AdminSidebar from "./_components/AdminSidebar";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  let postCount = 0;
  let publishedPostCount = 0;
  let projectCount = 0;
  let publishedProjectCount = 0;
  let contactCount = 0;
  let newContactCount = 0;

  try {
    const [posts, publishedPosts, projects, publishedProjects, contacts, newContacts] =
      await Promise.all([
        prisma.blogPost.count(),
        prisma.blogPost.count({ where: { published: true } }),
        prisma.project.count(),
        prisma.project.count({ where: { published: true } }),
        prisma.contactMessage.count(),
        prisma.contactMessage.count({ where: { status: "NEW" } }),
      ]);

    postCount = posts;
    publishedPostCount = publishedPosts;
    projectCount = projects;
    publishedProjectCount = publishedProjects;
    contactCount = contacts;
    newContactCount = newContacts;
  } catch {
    // DB chưa sẵn sàng, hiển thị 0
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.16),_transparent_28%),linear-gradient(180deg,_#fffdf8_0%,_#f4f4f5_48%,_#eef1f4_100%)] text-zinc-900">
      <main className="mx-auto  px-4 py-6 sm:px-6 lg:py-8">
        <div className="grid gap-6 lg:grid-cols-[290px_minmax(0,1fr)] lg:items-start">
          <AdminSidebar
            postCount={postCount}
            publishedPostCount={publishedPostCount}
            projectCount={projectCount}
            publishedProjectCount={publishedProjectCount}
            contactCount={contactCount}
            newContactCount={newContactCount}
          />
          <section className="min-w-0">{children}</section>
        </div>
      </main>
    </div>
  );
}
