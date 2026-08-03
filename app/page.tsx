"use client";

import { useEffect, useMemo, useState } from "react";
import { AboutTab } from "./_components/home/AboutTab";
import { BlogTab } from "./_components/home/BlogTab";
import { ContactTab } from "./_components/home/ContactTab";
import { CreateWebsiteTab } from "./_components/home/CreateWebsiteTab";
import { CvTab } from "./_components/home/CvTab";
import { Header } from "./_components/home/Header";
import { ProjectsTab } from "./_components/home/ProjectsTab";
import { getProjectsPage } from "./_components/home/_services/projectApi";
import { BLOG_POSTS, PROJECTS, TYPING_TEXTS } from "./_components/home/constants";
import { useTyping } from "./_components/home/hooks";
import type {
    AssistantAction,
    BlogPostItem,
    ProjectItem,
    RentalTab,
} from "./_components/home/types";

const PROJECTS_PER_PAGE = 10;

export default function Home() {
  const [activeTab, setActiveTab] = useState<RentalTab>("Giới thiệu");
  const [tabKey, setTabKey] = useState(0);

  const [imgError, setImgError] = useState(false);

  const [projects, setProjectsData] = useState<ProjectItem[]>(PROJECTS);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [projectsError, setProjectsError] = useState("");
  const [projectTotal, setProjectTotal] = useState(0);
  const [projectTotalPages, setProjectTotalPages] = useState(1);
  const [projectLimit, setProjectLimit] = useState(PROJECTS_PER_PAGE);
  const [blogPosts, setBlogPosts] = useState<BlogPostItem[]>(BLOG_POSTS);
  const [blogLoading, setBlogLoading] = useState(true);
  const [blogError, setBlogError] = useState("");
  const [projectPage, setProjectPage] = useState(1);
  const [projectFilter, setProjectFilter] = useState<"all" | "web" | "app">(
    "all",
  );

  const [location, setLocation] = useState("Đà Nẵng, Việt Nam");
  const [cardHolder, setCardHolder] = useState("Trần Công Tiến");
  const [cardLast4, setCardLast4] = useState("2020");

  const [selectedAssistantAction, setSelectedAssistantAction] =
    useState<AssistantAction>("Dự án tiêu biểu");
  const [assistantInput, setAssistantInput] = useState(
    "Giới thiệu cho tôi dự án web tiêu biểu nhất mà bạn đã làm, kèm link demo và mã nguồn.",
  );
  const [assistantMessages, setAssistantMessages] = useState<string[]>([]);

  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactType, setContactType] = useState("Dự án freelance");
  const [contactPhone, setContactPhone] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactSending, setContactSending] = useState(false);
  const [contactError, setContactError] = useState("");

  const [wsSubdomain, setWsSubdomain] = useState("");
  const [wsName, setWsName] = useState("");
  const [wsDescription, setWsDescription] = useState("");
  const [wsOwnerName, setWsOwnerName] = useState("");
  const [wsOwnerEmail, setWsOwnerEmail] = useState("");
  const [wsPrimaryColor, setWsPrimaryColor] = useState("#18181b");
  const [wsCreating, setWsCreating] = useState(false);
  const [wsError, setWsError] = useState("");
  const [wsSuccess, setWsSuccess] = useState<{
    subdomain: string;
    name: string;
    url: string;
  } | null>(null);
  const [wsRecentSites, setWsRecentSites] = useState<
    Array<{ subdomain: string; name: string; createdAt: string }>
  >([]);

  const typedTitle = useTyping(TYPING_TEXTS);

  const subdomainValid = useMemo(() => {
    if (!wsSubdomain) return null;
    return /^[a-z0-9]([a-z0-9-]{1,61}[a-z0-9])?$/.test(wsSubdomain);
  }, [wsSubdomain]);

  useEffect(() => {
    setProjectsLoading(true);
    setProjectsError("");

    getProjectsPage(
      projectPage,
      PROJECTS_PER_PAGE,
      projectFilter === "all" ? undefined : projectFilter,
    )
      .then(({ data, pagination }) => {
        setProjectsData(data);
        setProjectTotal(pagination.total);
        setProjectTotalPages(pagination.totalPages);
        setProjectLimit(pagination.limit);

        if (pagination.page !== projectPage) {
          setProjectPage(pagination.page);
        }
      })
      .catch(() => {
        setProjectsError("Không thể tải danh sách dự án lúc này.");
        setProjectsData([]);
        setProjectTotal(0);
        setProjectTotalPages(1);
      })
      .finally(() => {
        setProjectsLoading(false);
      });
  }, [projectPage, projectFilter]);

  useEffect(() => {
    setBlogLoading(true);

    fetch("/api/blog")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Không thể tải danh sách blog lúc này.");
        }

        return res.json();
      })
      .then((data: BlogPostItem[]) => {
        setBlogPosts(data.filter((post) => post.published));
        setBlogError("");
      })
      .catch((error: unknown) => {
        setBlogError(
          error instanceof Error
            ? error.message
            : "Không thể tải danh sách blog lúc này.",
        );
      })
      .finally(() => {
        setBlogLoading(false);
      });
  }, []);

  const handleTabSwitch = (tab: RentalTab) => {
    setActiveTab(tab);
    setTabKey((k) => k + 1);
  };

  const handleCreateWebsite = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWsError("");
    setWsSuccess(null);
    setWsCreating(true);

    try {
      const res = await fetch("/api/tenants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subdomain: wsSubdomain.toLowerCase().trim(),
          name: wsName.trim(),
          description: wsDescription.trim(),
          ownerName: wsOwnerName.trim(),
          ownerEmail: wsOwnerEmail.trim(),
          primaryColor: wsPrimaryColor,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setWsError(data.error || "Có lỗi xảy ra");
        return;
      }

      const siteUrl =
        typeof window !== "undefined" && window.location.hostname === "localhost"
          ? `http://${data.subdomain}.localhost:3000`
          : `https://${data.subdomain}.tiendev.id.vn`;

      setWsSuccess({ subdomain: data.subdomain, name: data.name, url: siteUrl });

      setWsRecentSites((prev) =>
        [
          {
            subdomain: data.subdomain,
            name: data.name,
            createdAt: new Date().toISOString(),
          },
          ...prev,
        ].slice(0, 5),
      );

      setWsSubdomain("");
      setWsName("");
      setWsDescription("");
      setWsOwnerName("");
      setWsOwnerEmail("");
      setWsPrimaryColor("#18181b");
    } catch {
      setWsError("Lỗi kết nối server. Vui lòng thử lại.");
    } finally {
      setWsCreating(false);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContactSending(true);
    setContactError("");
    setContactSubmitted(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactName.trim(),
          email: contactEmail.trim(),
          phone: contactPhone.trim(),
          type: contactType,
          message: contactMessage.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setContactError(data.error || "Gửi thất bại. Vui lòng thử lại.");
        return;
      }

      setContactSubmitted(true);
      setContactName("");
      setContactEmail("");
      setContactPhone("");
      setContactType("Dự án freelance");
      setContactMessage("");
    } catch {
      setContactError("Lỗi kết nối. Vui lòng kiểm tra mạng và thử lại.");
    } finally {
      setContactSending(false);
    }
  };

  const handleSendAssistant = () => {
    const trimmed = assistantInput.trim();
    if (!trimmed) return;

    const summary = `Yêu cầu (${selectedAssistantAction} • ${activeTab}): ${trimmed}`;
    setAssistantMessages((prev) => [summary, ...prev].slice(0, 4));
  };

  return (
    <div className="min-h-screen overflow-x-hidden neo-page animate-fade-in">
      <main className="relative mx-auto flex min-h-screen max-w-6xl flex-col gap-4 px-4 py-6 sm:gap-6 sm:px-6 sm:py-8">
        <Header
          activeTab={activeTab}
          onSwitchTab={handleTabSwitch}
          imgError={imgError}
          setImgError={setImgError}
          location={location}
          setLocation={setLocation}
        />

        <section
          key={tabKey}
          className="tab-content-enter grid min-w-0 gap-4 sm:gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,1.4fr)]"
        >
          {activeTab === "Giới thiệu" && (
            <AboutTab
              imgError={imgError}
              setImgError={setImgError}
              location={location}
              typedTitle={typedTitle}
              cardHolder={cardHolder}
              setCardHolder={setCardHolder}
              cardLast4={cardLast4}
              setCardLast4={setCardLast4}
              selectedAssistantAction={selectedAssistantAction}
              setSelectedAssistantAction={setSelectedAssistantAction}
              assistantInput={assistantInput}
              setAssistantInput={setAssistantInput}
              assistantMessages={assistantMessages}
              onSendAssistant={handleSendAssistant}
            />
          )}

          {activeTab === "Dự án" && (
            <ProjectsTab
              projects={projects}
              projectsLoading={projectsLoading}
              projectsError={projectsError}
              projectTotal={projectTotal}
              projectTotalPages={projectTotalPages}
              projectLimit={projectLimit}
              projectPage={projectPage}
              setProjectPage={setProjectPage}
              projectFilter={projectFilter}
              setProjectFilter={setProjectFilter}
            />
          )}

          {activeTab === "Blog" && (
            <BlogTab
              posts={blogPosts}
              loading={blogLoading}
              error={blogError}
            />
          )}

          {activeTab === "CV" && <CvTab />}

          {activeTab === "Tạo website" && (
            <CreateWebsiteTab
              wsSubdomain={wsSubdomain}
              setWsSubdomain={setWsSubdomain}
              wsName={wsName}
              setWsName={setWsName}
              wsDescription={wsDescription}
              setWsDescription={setWsDescription}
              wsOwnerName={wsOwnerName}
              setWsOwnerName={setWsOwnerName}
              wsOwnerEmail={wsOwnerEmail}
              setWsOwnerEmail={setWsOwnerEmail}
              wsPrimaryColor={wsPrimaryColor}
              setWsPrimaryColor={setWsPrimaryColor}
              wsCreating={wsCreating}
              wsError={wsError}
              wsSuccess={wsSuccess}
              wsRecentSites={wsRecentSites}
              subdomainValid={subdomainValid}
              onCreateWebsite={handleCreateWebsite}
            />
          )}

          {activeTab === "Liên hệ" && (
            <ContactTab
              imgError={imgError}
              setImgError={setImgError}
              contactName={contactName}
              setContactName={setContactName}
              contactEmail={contactEmail}
              setContactEmail={setContactEmail}
              contactType={contactType}
              setContactType={setContactType}
              contactPhone={contactPhone}
              setContactPhone={setContactPhone}
              contactMessage={contactMessage}
              setContactMessage={setContactMessage}
              contactSubmitted={contactSubmitted}
              contactSending={contactSending}
              contactError={contactError}
              onContactSubmit={handleContactSubmit}
            />
          )}
        </section>
      </main>
    </div>
  );
}
