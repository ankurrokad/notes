"use client";
import { useNotesContextProvider } from "@/context/notesContext";
import Link from "next/link";

export default function NotesPage() {
  const { notes } = useNotesContextProvider();
  return (
    <div className="flex flex-col gap-2">
      <div className="text-2xl font-bold">My Notes</div>
      {notes.map((note, index) => {
        return (
          <div key={index}>
            <Link href={`/notes/${note.id}`} className="hover:underline">
              {note.title}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
