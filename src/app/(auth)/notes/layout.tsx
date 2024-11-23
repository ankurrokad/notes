"use client"
import { NotesContextDataProvider } from "@/context/notesContext";
import { ReactNode } from "react";
import NotesLayoutSidebar from "./_components/sideBar";

export default function NotePageLayout({ children }: { children: ReactNode }) {
    return <NotesContextDataProvider>
        <div className="flex ">
            <div className="w-1/3">
                <NotesLayoutSidebar />
            </div>
            <div className="w-2/3">
                {children}
            </div>
        </div>
    </NotesContextDataProvider>

}