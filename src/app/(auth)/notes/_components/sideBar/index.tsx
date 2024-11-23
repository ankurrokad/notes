import { useNotesContextProvider } from "@/context/notesContext";
import { FileTextOutlined } from "@ant-design/icons";
import Link from "next/link";

export default function NotesLayoutSidebar() {
  const { notes } = useNotesContextProvider();
  const { setSelectedNote } = useNotesContextProvider();
  return (
    <div className="flex flex-col gap-2">
      <div className="text-2xl font-bold">
        <Link href={`/notes`}>Home</Link>
      </div>
      <div className="border-r">
        {notes.map((note, index) => {
          return (
            <div key={index} className="text-lg">
              <Link
                href={`/notes/${note.id}`}
                className="hover:underline flex items-center gap-2 p-2"
                onClick={() => setSelectedNote(note)}
              >
                <FileTextOutlined />
                {note.title}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
