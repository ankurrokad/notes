"use client";
import { useNotesContextProvider } from "@/context/notesContext";
import { useParams } from "next/navigation";

export default function NotePage() {
  const { selectedNote } = useNotesContextProvider();
  return <div>{selectedNote?.title}</div>;
}
