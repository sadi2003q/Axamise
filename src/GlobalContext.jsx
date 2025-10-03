/* eslint-disable react-refresh/only-export-components */


// GlobalContext.js
import { createContext, useState, useContext } from "react";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [adminEmail, setAdminEmail] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [user_uid, setUser_uid] = useState("Not Defined");
  const [currentName, setCurrentName] = useState(null);


  return (
    <GlobalContext.Provider value={{ 

        adminEmail, 
        setAdminEmail,

        currentUser,
        setCurrentUser,

        user_uid,
        setUser_uid,

        currentName,
        setCurrentName,

    }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  return useContext(GlobalContext);
}
    


/**
 // Usage Example
  import { useGlobal } from "./GlobalContext";

export default function Dashboard() {
  const { email, setEmail, theme, setTheme } = useGlobal();

 */