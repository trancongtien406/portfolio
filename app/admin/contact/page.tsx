"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
    type ContactMessage,
    type ContactStatus,
    CONTACT_STATUS_LABEL,
    CONTACT_STATUS_OPTIONS,
    SectionCard,
    StatusBadge,
    formatDate,
} from "../_components/shared";

export default function AdminContactPage() {
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [contactFilter, setContactFilter] = useState<ContactStatus | "ALL">("ALL");
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const [contactLoadingId, setContactLoadingId] = useState<string | null>(null);

  const fetchContacts = useCallback(async () => {
    const res = await fetch("/api/contact");
    if (res.ok) setContacts(await res.json());
  }, []);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  useEffect(() => {
    if (!contacts.length) {
      setSelectedContactId(null);
      return;
    }
    if (!selectedContactId || !contacts.some((c) => c.id === selectedContactId)) {
      setSelectedContactId(contacts[0].id);
    }
  }, [contacts, selectedContactId]);

  const filteredContacts = useMemo(() => {
    if (contactFilter === "ALL") return contacts;
    return contacts.filter((c) => c.status === contactFilter);
  }, [contactFilter, contacts]);

  const selectedContact = useMemo(
    () => contacts.find((c) => c.id === selectedContactId) ?? null,
    [contacts, selectedContactId],
  );

  const newContactCount = contacts.filter((c) => c.status === "NEW").length;

  async function updateContactStatus(id: string, status: ContactStatus) {
    setContactLoadingId(id);
    setMessage(null);

    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();

      if (!res.ok) {
        setMessage({ type: "error", text: data.error || "Không thể cập nhật liên hệ." });
        return;
      }

      setMessage({ type: "success", text: "Đã cập nhật trạng thái liên hệ." });
      fetchContacts();
    } catch {
      setMessage({ type: "error", text: "Lỗi kết nối server." });
    } finally {
      setContactLoadingId(null);
    }
  }

  async function handleContactDelete(id: string) {
    if (!window.confirm("Bạn chắc chắn muốn xóa tin nhắn liên hệ này?")) return;

    setContactLoadingId(id);
    try {
      const res = await fetch(`/api/contact/${id}`, { method: "DELETE" });
      if (!res.ok) {
        setMessage({ type: "error", text: "Không thể xóa liên hệ." });
        return;
      }
      setMessage({ type: "success", text: "Đã xóa tin nhắn liên hệ." });
      fetchContacts();
    } catch {
      setMessage({ type: "error", text: "Lỗi kết nối server." });
    } finally {
      setContactLoadingId(null);
    }
  }

  return (
    <>
      {/* Page header */}
      <div className="rounded-[32px] border border-zinc-200 bg-white/90 px-5 py-5 shadow-[0_20px_60px_-40px_rgba(24,24,27,0.45)] sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">Contact</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
              Quản lý hộp thư liên hệ
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600">
              Inbox khách hàng và luồng xử lý phản hồi.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <div className="rounded-2xl bg-zinc-100 px-4 py-3 text-sm text-zinc-600">
              <span className="font-semibold text-zinc-950">{contacts.length}</span> tin nhắn
            </div>
            {newContactCount > 0 && (
              <div className="rounded-2xl bg-amber-50 px-4 py-3 text-sm text-amber-800 ring-1 ring-amber-200">
                {newContactCount} liên hệ mới
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`mt-6 rounded-2xl px-4 py-3 text-sm font-medium ring-1 ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
              : "bg-rose-50 text-rose-700 ring-rose-200"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Content */}
      <div className="mt-6">
        <SectionCard
          title="Hộp thư liên hệ"
          description="Theo dõi toàn bộ lead từ form contact và cập nhật trạng thái xử lý ngay trong admin."
          action={
            <div className="flex flex-wrap gap-2">
              {CONTACT_STATUS_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setContactFilter(option.value)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                    contactFilter === option.value
                      ? "bg-zinc-950 text-[var(--neo-bg-cream)]"
                      : "border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          }
        >
          {contacts.length === 0 ? (
            <p className="text-sm text-zinc-500">Chưa có tin nhắn liên hệ nào được lưu.</p>
          ) : (
            <div className="grid gap-5 xl:grid-cols-[420px_minmax(0,1fr)]">
              {/* Contact list */}
              <div className="space-y-3">
                {filteredContacts.length === 0 ? (
                  <div className="rounded-3xl border border-dashed border-zinc-200 px-4 py-8 text-center text-sm text-zinc-500">
                    Không có liên hệ nào trong bộ lọc hiện tại.
                  </div>
                ) : (
                  filteredContacts.map((contact) => (
                    <button
                      key={contact.id}
                      onClick={() => setSelectedContactId(contact.id)}
                      className={`w-full rounded-3xl border px-4 py-4 text-left transition ${
                        selectedContactId === contact.id
                          ? "border-zinc-950 bg-zinc-950 text-[var(--neo-bg-cream)]"
                          : "border-zinc-200 bg-zinc-50 hover:bg-white"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold">{contact.name}</p>
                          <p
                            className={`mt-1 truncate text-xs ${
                              selectedContactId === contact.id
                                ? "text-[color:rgba(255,255,255,0.6)]"
                                : "text-zinc-500"
                            }`}
                          >
                            {contact.email}
                          </p>
                        </div>
                        <StatusBadge status={contact.status} />
                      </div>
                          <p
                            className={`mt-3 line-clamp-2 text-sm ${
                              selectedContactId === contact.id
                                ? "text-[color:rgba(255,255,255,0.7)]"
                                : "text-zinc-600"
                            }`}
                          >
                        {contact.message}
                      </p>
                      <div
                        className={`mt-3 flex items-center justify-between text-xs ${
                          selectedContactId === contact.id
                            ? "text-[color:rgba(255,255,255,0.6)]"
                            : "text-zinc-500"
                        }`}
                      >
                        <span>{contact.type || "Không rõ nhu cầu"}</span>
                        <span>{formatDate(contact.createdAt)}</span>
                      </div>
                    </button>
                  ))
                )}
              </div>

              {/* Contact detail */}
              <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5">
                {selectedContact ? (
                  <div className="space-y-5">
                    <div className="flex flex-col gap-4 border-b border-zinc-200 pb-5 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-xl font-semibold tracking-tight text-zinc-950">
                          {selectedContact.name}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-3 text-sm text-zinc-600">
                          <a
                            href={`mailto:${selectedContact.email}`}
                            className="hover:text-zinc-950"
                          >
                            {selectedContact.email}
                          </a>
                          {selectedContact.phone && (
                            <a
                              href={`tel:${selectedContact.phone}`}
                              className="hover:text-zinc-950"
                            >
                              {selectedContact.phone}
                            </a>
                          )}
                          <span>{selectedContact.type || "Không rõ nhu cầu"}</span>
                        </div>
                      </div>
                      <StatusBadge status={selectedContact.status} />
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                      {(["NEW", "READ", "REPLIED", "ARCHIVED"] as ContactStatus[]).map((status) => (
                        <button
                          key={status}
                          onClick={() => updateContactStatus(selectedContact.id, status)}
                          disabled={
                            contactLoadingId === selectedContact.id ||
                            selectedContact.status === status
                          }
                          className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                            selectedContact.status === status
                              ? "bg-zinc-950 text-[var(--neo-bg-cream)]"
                              : "border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-100"
                          } disabled:cursor-not-allowed disabled:opacity-60`}
                        >
                          {CONTACT_STATUS_LABEL[status]}
                        </button>
                      ))}
                    </div>

                    <div className="whitespace-pre-wrap rounded-3xl bg-white p-5 text-sm leading-7 text-zinc-700 ring-1 ring-zinc-200">
                      {selectedContact.message}
                    </div>

                    <div className="grid gap-3 text-sm text-zinc-500 sm:grid-cols-2">
                      <div className="rounded-2xl bg-white px-4 py-3 ring-1 ring-zinc-200">
                        <p className="text-xs uppercase tracking-[0.16em] text-zinc-400">Nhận lúc</p>
                        <p className="mt-2 font-medium text-zinc-800">
                          {formatDate(selectedContact.createdAt)}
                        </p>
                      </div>
                      <div className="rounded-2xl bg-white px-4 py-3 ring-1 ring-zinc-200">
                        <p className="text-xs uppercase tracking-[0.16em] text-zinc-400">
                          Phản hồi lúc
                        </p>
                        <p className="mt-2 font-medium text-zinc-800">
                          {selectedContact.repliedAt
                            ? formatDate(selectedContact.repliedAt)
                            : "Chưa cập nhật"}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <a
                        href={`mailto:${selectedContact.email}?subject=${encodeURIComponent("Phản hồi từ Trần Công Tiến")}`}
                        className="rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-[var(--neo-bg-cream)] transition hover:bg-zinc-800"
                      >
                        Gửi email phản hồi
                      </a>
                      <button
                        onClick={() => handleContactDelete(selectedContact.id)}
                        disabled={contactLoadingId === selectedContact.id}
                        className="rounded-full border border-rose-200 px-5 py-3 text-sm font-semibold text-rose-600 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        Xóa liên hệ
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex min-h-[320px] items-center justify-center rounded-3xl border border-dashed border-zinc-200 bg-white text-sm text-zinc-500">
                    Chọn một liên hệ để xem chi tiết.
                  </div>
                )}
              </div>
            </div>
          )}
        </SectionCard>
      </div>
    </>
  );
}
