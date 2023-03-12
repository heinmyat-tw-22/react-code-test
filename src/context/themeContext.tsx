import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext({
  toggleTheme: () => {},
  themeMode: false,
});

export const ThemeContextProvider = ({ children }: any) => {
  const [themeMode, setThemeMode] = useState<boolean>(
    JSON.parse(localStorage.getItem("themeMode") || "false")
  );

  const toggleTheme = () => {
    setThemeMode(!themeMode);
  };

  useEffect(() => {
    localStorage.setItem("themeMode", JSON.stringify(themeMode));
  }, [themeMode]);

  return (
    <ThemeContext.Provider value={{ toggleTheme, themeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
