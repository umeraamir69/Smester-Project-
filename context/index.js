import React, { createContext, useState, useEffect } from "react";
import { useMediaQuery } from "@react-hook/media-query";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isLGScreen = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    setIsSidebarOpen(isLGScreen);
  }, [isLGScreen]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <GlobalContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      {children}
    </GlobalContext.Provider>
  );
}
