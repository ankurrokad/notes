import { useNotesContextProvider } from "@/context/notesContext";
import { FileTextOutlined } from "@ant-design/icons";
import Link from "next/link";

export default function NotesLayoutSidebar() {
  const { notes } = useNotesContextProvider();
  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="text-4xl font-bold">
        <Link href={`/notes`}>Home</Link>
      </div>
      <div className="border-r p-2">
        {notes.map((note, index) => {
          return (
            <div key={index} className="text-lg flex">
              <Link
                href={`/notes/${note.id}`}
                className="hover:underline flex items-center gap-2 p-2"
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
