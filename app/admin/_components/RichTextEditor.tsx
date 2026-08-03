"use client";

import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useRef, useState } from "react";

function ToolbarButton({
  label,
  active,
  onClick,
  disabled,
}: {
  label: string;
  active?: boolean;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`rounded-xl border px-3 py-2 text-xs font-semibold transition ${
        active
          ? "border-zinc-950 bg-zinc-950 text-[var(--neo-bg-cream)]"
          : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
      } disabled:cursor-not-allowed disabled:opacity-40`}
    >
      {label}
    </button>
  );
}

export function RichTextEditor({
  label,
  value,
  onChange,
  required,
  uploadFolder = "blog-content",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  uploadFolder?: string;
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [showHtml, setShowHtml] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3, 4] } }),
      Underline,
      Image,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: "_blank",
        },
      }),
      Placeholder.configure({ placeholder: "Viết nội dung bài blog ở đây..." }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: value,
    onUpdate: ({ editor: instance }) => {
      onChange(instance.getHTML());
    },
    editorProps: {
      attributes: {
        class: "tiptap min-h-[420px] focus:outline-none",
      },
    },
  });

  useEffect(() => {
    if (!editor) {
      return;
    }

    const currentHtml = editor.getHTML();
    if (value !== currentHtml) {
      editor.commands.setContent(value || "", { emitUpdate: false });
    }
  }, [editor, value]);

  async function handleImageUpload(file: File) {
    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", uploadFolder);

      const res = await fetch("/api/uploads", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Upload ảnh thất bại.");
        return;
      }

      editor?.chain().focus().setImage({ src: data.url, alt: file.name }).run();
    } catch {
      setError("Không thể upload ảnh trong nội dung.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  function handleSetLink() {
    const previousUrl = editor?.getAttributes("link").href;
    const url = window.prompt("Nhập link", previousUrl || "https://");

    if (url === null || !editor) {
      return;
    }

    if (!url.trim()) {
      editor.chain().focus().unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url.trim() }).run();
  }

  function handleInsertImageByUrl() {
    const url = window.prompt("Nhập URL ảnh", "https://");
    if (!url?.trim() || !editor) {
      return;
    }

    editor.chain().focus().setImage({ src: url.trim() }).run();
  }

  return (
    <div>
      <div className="mb-1.5 flex items-center gap-2 text-sm font-medium text-zinc-700">
        <span>{label}</span>
        {required ? <span className="text-rose-500">*</span> : null}
      </div>

      <div className="rounded-[28px] border border-zinc-200 bg-white">
        <div className="flex flex-wrap gap-2 border-b border-zinc-100 bg-zinc-50 p-3">
          <ToolbarButton label="B" active={editor?.isActive("bold")} onClick={() => editor?.chain().focus().toggleBold().run()} />
          <ToolbarButton label="I" active={editor?.isActive("italic")} onClick={() => editor?.chain().focus().toggleItalic().run()} />
          <ToolbarButton label="U" active={editor?.isActive("underline")} onClick={() => editor?.chain().focus().toggleUnderline().run()} />
          <ToolbarButton label="H2" active={editor?.isActive("heading", { level: 2 })} onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} />
          <ToolbarButton label="H3" active={editor?.isActive("heading", { level: 3 })} onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} />
          <ToolbarButton label="Quote" active={editor?.isActive("blockquote")} onClick={() => editor?.chain().focus().toggleBlockquote().run()} />
          <ToolbarButton label="• List" active={editor?.isActive("bulletList")} onClick={() => editor?.chain().focus().toggleBulletList().run()} />
          <ToolbarButton label="1. List" active={editor?.isActive("orderedList")} onClick={() => editor?.chain().focus().toggleOrderedList().run()} />
          <ToolbarButton label="Trái" active={editor?.isActive({ textAlign: "left" })} onClick={() => editor?.chain().focus().setTextAlign("left").run()} />
          <ToolbarButton label="Giữa" active={editor?.isActive({ textAlign: "center" })} onClick={() => editor?.chain().focus().setTextAlign("center").run()} />
          <ToolbarButton label="Phải" active={editor?.isActive({ textAlign: "right" })} onClick={() => editor?.chain().focus().setTextAlign("right").run()} />
          <ToolbarButton label="Link" active={editor?.isActive("link")} onClick={handleSetLink} />
          <ToolbarButton label="Ảnh URL" onClick={handleInsertImageByUrl} />
          <ToolbarButton label={uploading ? "Đang upload..." : "Ảnh máy"} onClick={() => fileInputRef.current?.click()} disabled={uploading} />
          <ToolbarButton label="Undo" onClick={() => editor?.chain().focus().undo().run()} disabled={!editor?.can().chain().focus().undo().run()} />
          <ToolbarButton label="Redo" onClick={() => editor?.chain().focus().redo().run()} disabled={!editor?.can().chain().focus().redo().run()} />
          <ToolbarButton label={showHtml ? "Ẩn HTML" : "Xem HTML"} active={showHtml} onClick={() => setShowHtml((prev) => !prev)} />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) {
                void handleImageUpload(file);
              }
            }}
          />
        </div>

        <div className="p-4">
          <EditorContent editor={editor} />
        </div>

        {showHtml ? (
          <div className="border-t border-zinc-100 p-4">
            <textarea
              rows={12}
              value={value}
              onChange={(event) => onChange(event.target.value)}
              className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900"
            />
          </div>
        ) : null}
      </div>

      {error ? <p className="mt-2 text-xs font-medium text-rose-600">{error}</p> : null}
      <textarea readOnly required={required} value={value.replace(/<[^>]+>/g, "").trim()} className="sr-only" tabIndex={-1} aria-hidden="true" />
    </div>
  );
}