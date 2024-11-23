// services/notesService.ts

import { supabase } from "@/lib/supabase";
import { ModelNote } from "@/types/notes";

/**
 * Fetches all notes from the Supabase database.
 * @returns A promise resolving to an array of notes or an error.
 */
export const fetchAllNotes = async () => {
  const { data, error } = await supabase
    .from("notes")
    .select("*") // Select all columns
    .order("created_at", { ascending: false }); // Optional: Order by created_at

  if (error) {
    console.error("Error fetching notes:", error.message);
    throw new Error(error.message);
  }

  return data; // Return fetched notes
};

/**
 * Updates a specific note's content in the Supabase database.
 * @param noteId - The ID of the note to update.
 * @param content - The new content of the note.
 */
export const updateNote = async (noteId: string, content: string) => {
  const { error } = await supabase
    .from("notes")
    .update({ content })
    .eq("id", noteId);

  if (error) {
    console.error("Error updating note:", error.message);
    throw new Error(error.message);
  }
};

// services/notesService.ts

/**
 * Fetches a single note by its ID.
 * @param noteId - The ID of the note to fetch.
 * @returns A promise resolving to the note object or an error.
 */
export const fetchNoteById = async (noteId: string) => {
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("id", noteId)
    .single(); // Ensures only one row is returned

  if (error) {
    console.error("Error fetching note by ID:", error.message);
    throw new Error(error.message);
  }

  return data; // Returns the fetched note object
};

/**
 * Creates a new note in the Supabase database.
 * @param title - The title of the note.
 * @param content - The content of the note.
 * @returns A promise resolving to the created note object or an error.
 */
export const createNote = async (
  title: string,
  content: string
): Promise<ModelNote[]> => {
  const { data, error } = await supabase
    .from("notes")
    .insert([{ title, content }])
    .select();
  if (data) {
    return data as ModelNote[];
  } else if (error) {
    console.error("Error creating note:", error.message);
    throw new Error(error.message);
  } else {
    return [];
  }
};
