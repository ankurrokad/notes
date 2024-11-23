import {
  StrikethroughOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Dispatch, SetStateAction, useEffect } from "react";
import styles from "./style.module.scss";

type Props = {
  pageContent: string;
  setPageContent: Dispatch<SetStateAction<string>>;
};

export default function PageEditorComponent({
  pageContent,
  setPageContent,
}: Props) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: pageContent, // Initialize with the passed content
    editorProps: {
      attributes: {
        style: "min-height: calc(100vh - 40rem); border:none; outline: none;",
      },
    },
    onUpdate: ({ editor }) => {
      setPageContent(editor.getHTML()); // Update state with the new HTML content
    },
  });

  // Clean up the editor instance when the component unmounts
  useEffect(() => {
    return () => {
      editor?.destroy();
    };
  }, [editor]);

  return (
    <div className={styles.editorWrapper}>
      <EditorContent editor={editor} />
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
      </div>
    </div>
  );
}
