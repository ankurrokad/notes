import { useNotesContextProvider } from "@/context/notesContext"
import Link from "next/link"

export default function NotesLayoutSidebar() {
    const { notes } = useNotesContextProvider()
    return <div>
        <div>
            <Link href={`/notes`}>
                Home
            </Link>
        </div>
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