"use client";
import { useAppContextProvider } from "@/context/appContext";
import { NotesContextDataProvider } from "@/context/notesContext";
import { useParams } from "next/navigation";
import { ReactNode } from "react";
import NotesLayoutSidebar from "../../../components/notes/layout/sideBar";

export default function NotePageLayout({ children }: { children: ReactNode }) {
  const { id } = useParams();
  const { isMobile } = useAppContextProvider();

  return (
    <NotesContextDataProvider>
      <div className="flex p-4 h-screen w-full">
        {isMobile ? (
          <>
            {!id && ( // Only show sidebar if no note is selected
              <div className="w-full">
                <NotesLayoutSidebar />
              </div>
            )}
            {id && ( // Only show children if a note is selected
              <div className="w-full">{children}</div>
            )}
          </>
        ) : (
          // For desktop and larger screens, show both
          <>
            <div className="w-1/5">
              <NotesLayoutSidebar />
            </div>
            <div className="w-4/5">{children}</div>
          </>
        )}
      </div>
    </NotesContextDataProvider>
  );
}
