import { fetchAllNotes } from "@/lib/supabase/notes.service";
import { ModelNote } from "@/types/notes";
import { message } from "antd";
import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface NotesContextDataType {
  notes: ModelNote[];
  setNotes: Dispatch<SetStateAction<ModelNote[]>>;

  selectedNote: ModelNote | null;
  setSelectedNote: Dispatch<SetStateAction<ModelNote | null>>;
}

const NotesData = createContext<NotesContextDataType | undefined>(undefined);

export const NotesContextDataProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [notes, setNotes] = useState<ModelNote[]>([]);
  const [selectedNote, setSelectedNote] = useState<ModelNote | null>(null);

  useEffect(() => {
    const loadNotes = async () => {
      setIsLoading(true);
      try {
        const data = await fetchAllNotes();
        setNotes(data);
      } catch (err: any) {
        message.error(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadNotes();
  }, []);

  return (
    <NotesData.Provider
      value={{
        notes,
        setNotes,
        selectedNote,
        setSelectedNote,
      }}
    >
      {children}
    </NotesData.Provider>
  );
};

export const useNotesContextProvider = (): NotesContextDataType => {
  const context = useContext(NotesData);
  if (!context) {
    throw new Error("No context provider set in Layout.");
  }
  return context;
};
