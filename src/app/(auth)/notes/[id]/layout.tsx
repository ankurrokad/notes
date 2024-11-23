"use client";
import { useNotesContextProvider } from "@/context/notesContext";
import { useParams } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function NotePageLayout({ children }: { children: ReactNode }) {
  const { id } = useParams();
  const { notes, setSelectedNote } = useNotesContextProvider();

  useEffect(() => {
    const handlePageChange = () => {
      const note = notes.find((note) => note.id === Number(id));
      if (note) {
        setSelectedNote(note);
      }
    };
    handlePageChange();
  }, [id]);

  return <div className="p-4">{children}</div>;
}
