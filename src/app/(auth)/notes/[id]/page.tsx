"use client";
import PageEditorComponent from "@/components/notes/pageEditorComponent";
import { useAppContextProvider } from "@/context/appContext";
import { fetchNoteById } from "@/lib/supabase/notes.service";
import { ModelNote } from "@/types/notes";
import { CloseOutlined } from "@ant-design/icons";
import { Skeleton } from "antd";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function NotePage() {
  const { isMobile } = useAppContextProvider();
  const { id } = useParams();
  const [note, setNote] = useState<ModelNote | null>(null);
  const [pageContent, setPageContent] = useState<string>("");

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPageContent = async () => {
      setPageContent("");
      setIsLoading(true);
      if (id && typeof id === "string") {
        try {
          const note = await fetchNoteById(id);
          setNote(note);
          setPageContent(note.content);
        } catch (err) {
          console.error("Failed to load note content:", err);
        } finally {
          setIsLoading(false);
        }
      }
    };
    loadPageContent();
  }, [id]);

  return (
    <div className="flex flex-col gap-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="text-4xl font-bold">
          <div>{note?.title}</div>
        </div>
        <div>
          {isMobile && (
            <Link href={`/notes`}>
              <CloseOutlined />
            </Link>
          )}
        </div>
      </div>
      {/* Body */}
      <div className="p-4 select-text">
        {isLoading ? (
          <Skeleton />
        ) : (
          <PageEditorComponent
            pageContent={pageContent}
            setPageContent={setPageContent}
          />
        )}
      </div>
    </div>
  );
}
