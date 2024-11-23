"use client";
import PageEditorComponent from "@/components/notes/page";
import { useNotesContextProvider } from "@/context/notesContext";

export default function NotePage() {
  const { selectedNote } = useNotesContextProvider();
  return (
    <div className="flex flex-col gap-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="text-4xl font-bold">{selectedNote?.title}</div>
        <div className="text-gray-500">Saving</div>
      </div>
      {/* Body */}
      <div className="p-4">
        <PageEditorComponent />
      </div>
    </div>
  );
}
