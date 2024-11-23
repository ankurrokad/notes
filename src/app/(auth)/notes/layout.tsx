"use client";
import { NotesContextDataProvider } from "@/context/notesContext";
import { ReactNode } from "react";
import NotesLayoutSidebar from "./_components/sideBar";

export default function NotePageLayout({ children }: { children: ReactNode }) {
  return (
    <NotesContextDataProvider>
      <div className="flex p-4 h-screen w-full">
        <div className="w-1/5 p-4">
          <NotesLayoutSidebar />
        </div>
        <div className="w-4/5">{children}</div>
      </div>
    </NotesContextDataProvider>
  );
}
