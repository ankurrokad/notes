import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AppContextDataType {
  isMobile: boolean;
}

const AppData = createContext<AppContextDataType | undefined>(undefined);

export const AppContextDataProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust breakpoint for "mobile"
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return <AppData.Provider value={{ isMobile }}>{children}</AppData.Provider>;
};

export const useAppContextProvider = (): AppContextDataType => {
  const context = useContext(AppData);
  if (!context) {
    throw new Error("No context provider set in Layout.");
  }
  return context;
};
