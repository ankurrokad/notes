import { ModelNote } from "@/types/notes";
import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
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
  const [notes, setNotes] = useState<ModelNote[]>([
    {
      id: 1,
      title: "Note 1",
      note: "",
    },
    {
      id: 2,
      title: "Note 2",
      note: "",
    },
    {
      id: 3,
      title: "Note 3",
      note: "",
    },
    {
      id: 4,
      title: "Note 4",
      note: "",
    },
  ]);

  const [selectedNote, setSelectedNote] = useState<ModelNote | null>(null);
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