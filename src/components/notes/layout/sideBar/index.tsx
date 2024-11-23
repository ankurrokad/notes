"use client";
import { useNotesContextProvider } from "@/context/notesContext";
import { createNote } from "@/lib/supabase/notes.service";
import { ModelNote } from "@/types/notes";
import { FileTextOutlined } from "@ant-design/icons";
import { Button, Popover } from "antd";
import Link from "next/link";
import { useState } from "react";

export default function NotesLayoutSidebar() {
  const { notes } = useNotesContextProvider();
  const [newNoteName, setNewNoteName] = useState("");
  // const { forward } = useRouter();
  // const router = useRouter();

  const handleNoteNameSubmit = async () => {
    try {
      const newNote: ModelNote[] = await createNote(newNoteName, ""); // Assuming content is empty initially
      if (newNote && newNote[0] && newNote[0].id) {
        window.location.href = `/notes/${newNote[0].id}`;
      }
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  const popoverContent = (
    <div>
      <input
        type="text"
        value={newNoteName}
        onChange={(e) => setNewNoteName(e.target.value)}
        placeholder="Enter note name"
        className="border p-2 rounded w-full"
      />
      <Button onClick={handleNoteNameSubmit} type="primary" className="mt-2">
        Create Note
      </Button>
    </div>
  );

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
        <Popover content={popoverContent} title="Add New Note" trigger="click">
          <Button type="link" className="mt-4">
            + Add New Note
          </Button>
        </Popover>
      </div>
    </div>
  );
}
