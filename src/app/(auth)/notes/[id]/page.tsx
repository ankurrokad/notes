"use client";
import PageEditorComponent from "@/components/notes/pageEditorComponent";
import { useAppContextProvider } from "@/context/appContext";
import { useNotesContextProvider } from "@/context/notesContext";
import { CloseOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useState } from "react";

export default function NotePage() {
  const { isMobile } = useAppContextProvider();
  const { selectedNote } = useNotesContextProvider();

  const [pageContent, setPageContent] = useState(selectedNote?.note || "");

  return (
    <div className="flex flex-col gap-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="text-4xl font-bold">
          <div>{selectedNote?.title}</div>
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
        <PageEditorComponent
          pageContent={pageContent}
          setPageContent={setPageContent}
        />
      </div>
    </div>
  );
}
