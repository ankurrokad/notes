"use client";
import { useNotesContextProvider } from "@/context/notesContext";

export default function NotePage() {
  const { selectedNote } = useNotesContextProvider();
  return <div>{selectedNote?.title}</div>;
}
