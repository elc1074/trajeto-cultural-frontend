import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "purple");

  useEffect(() => {
  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      
      if (parsed && parsed.id) {
        setUser(parsed);
      } else {
        localStorage.removeItem("user");
      }
    }
  } catch {
    localStorage.removeItem("user");
  }
}, []);


  useEffect(() => {
    const root = document.documentElement;

    root.classList.remove("theme-2", "theme-3");
    
    if (theme === "red") {
      root.classList.add("theme-2");
    } else if (theme === "green") {
      root.classList.add("theme-3");
    }
    localStorage.setItem("theme", theme);
}, [theme]);


  const login = (userData) => {
    localStorage.removeItem("pontosVisitados");
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, theme, setTheme, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
