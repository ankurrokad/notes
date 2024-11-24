"use client";
import { useNotesContextProvider } from "@/context/notesContext";
import { createNote } from "@/lib/supabase/notes.service";
import { ModelNote } from "@/types/notes";
import {
  CheckOutlined,
  CloseOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { Button, Input } from "antd";
import Link from "next/link";
import { useState } from "react";

export default function NotesLayoutSidebar() {
  const { notes } = useNotesContextProvider();
  const [newNoteName, setNewNoteName] = useState("");
  const [showInput, setShowInput] = useState(false);
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
        <div className="p-2">
          {showInput ? (
            <div className="flex items-center gap-2">
              <Input
                placeholder="Enter Page Name"
                value={newNoteName}
                onChange={(e) => setNewNoteName(e.target.value)}
              />
              <CheckOutlined onClick={handleNoteNameSubmit} />
              <CloseOutlined onClick={() => setShowInput(false)} />
            </div>
          ) : (
            <Button type="link" onClick={() => setShowInput(true)}>
              + Add New Note
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
