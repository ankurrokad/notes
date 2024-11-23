import { updateNote } from "@/lib/supabase/notes.service";
import {
  StrikethroughOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
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
  const saveTimerRef = useRef<NodeJS.Timeout | null>(null); // Timer reference for auto-save
  const [isSaving, setIsSaving] = useState(false); // Track save state

  const editor = useEditor({
    extensions: [StarterKit],
    content: pageContent,
    editorProps: {
      attributes: {
        style: "border:none; outline: none;",
      },
    },
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      setPageContent(content);
    },
  });

  // Function to save the note
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

  // Auto-save on blur
  const handleBlur = () => {
    saveNote();
  };

  // Auto-save every 5 seconds if content changes
  useEffect(() => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      saveNote();
    }, 5000);

    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [pageContent]); // Restart timer whenever pageContent changes

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      editor?.destroy();
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [editor]);

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
