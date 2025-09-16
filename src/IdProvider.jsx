import { useState, useEffect } from "react";
import { IdContext } from "./IdContext";

export const IdProvider = ({ children }) => {
  // Initialize from localStorage so it persists after refresh
  const [id, setId] = useState(() => localStorage.getItem("userId") || "");
  const [currentName, setCurrentName] = useState(() => localStorage.getItem("userName") || "");

  // Whenever id changes, save to localStorage
  useEffect(() => {
    if (id) {
      localStorage.setItem("userId", id);
      localStorage.setItem("userName", currentName);
    } else {
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
    }
  }, [id]);

  // useEffect(() => {

  //   if(currentName) {
  //     localStorage.setItem("userName", currentName);
  //   } else {
  //     localStorage.removeItem("userName");
  //   }


  // }, [id, currentName])

  return <IdContext.Provider value={{ id, setId, currentName, setCurrentName }}>{children}</IdContext.Provider>;
};
