import { updateNote } from "@/lib/supabase/notes.service";
import {
  StrikethroughOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import Link from "@tiptap/extension-link";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from "./style.module.scss";

export default function PageEditorComponent({
  pageContent,
  setPageContent,
}: {
  pageContent: string;
  setPageContent: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { id = "" } = useParams();
  const saveTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        linkOnPaste: true,
        autolink: true,
        HTMLAttributes: {
          target: "_blank",
          rel: "noopener noreferrer",
        },
      }),
    ],
    content: pageContent,
    editorProps: {
      attributes: {
        class: styles.editor || "",
        style: "border:none; outline: none;",
      },
      handleClickOn(view, pos, node) {
        if (node.type.name === "link") {
          const { href } = node.attrs;
          if (href) {
            window.open(href, "_blank");
            return true;
          }
        }
        return false;
      },
    },
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      setPageContent(content);
    },
  });

  const saveNote = async () => {
    if (!id || typeof id !== "string" || !pageContent) return;
    try {
      setIsSaving(true);
      await updateNote(id, pageContent);
    } catch (err) {
      console.error("Auto-save failed:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleBlur = () => {
    saveNote();
  };

  useEffect(() => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      saveNote();
    }, 5000);

    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [pageContent]);

  useEffect(() => {
    return () => {
      editor?.destroy();
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [editor]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
        saveNote();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="h-full flex flex-col gap-2">
      <div className={styles.editorWrapper}>
        <EditorContent editor={editor} onBlur={handleBlur} />
      </div>
      <div className={styles.toolsContainer}>
        {editor && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                className={`font-semibold cursor-pointer select-none ${
                  editor.isActive("heading", { level: 1 })
                    ? "text-primary"
                    : "text-secondary"
                }`}
              >
                H1
              </div>
              <div
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                className={`font-semibold cursor-pointer select-none ${
                  editor.isActive("heading", { level: 2 })
                    ? "text-primary"
                    : "text-secondary"
                }`}
              >
                H2
              </div>
              <div
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
                className={`font-semibold cursor-pointer select-none ${
                  editor.isActive("heading", { level: 3 })
                    ? "text-primary"
                    : "text-secondary"
                }`}
              >
                H3
              </div>

              <div
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={`cursor-pointer select-none ${
                  editor.isActive("strike") ? "text-primary" : "text-secondary"
                }`}
              >
                <StrikethroughOutlined />
              </div>
              <div
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`cursor-pointer select-none ${
                  editor.isActive("bulletList")
                    ? "text-primary"
                    : "text-secondary"
                }`}
              >
                <UnorderedListOutlined />
              </div>
            </div>
          </div>
        )}
        {isSaving && <p className="text-gray-500">Saving...</p>}
      </div>
    </div>
  );
}
