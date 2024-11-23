"use client"
import { useNotesContextProvider } from "@/context/notesContext"
import Link from "next/link"

export default function NotesPage() {
    const { notes } = useNotesContextProvider()
    return <div>
        {
            notes.map((note, index) => {
                return <div key={index}>
                    <Link href={`/notes/${note.id}`}>
                        {note.title}
                    </Link>
                </div>
            })
        }
    </div>
}