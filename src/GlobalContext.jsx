/* eslint-disable react-refresh/only-export-components */


// GlobalContext.js
import { createContext, useState, useContext } from "react";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [adminEmail, setAdminEmail] = useState(null);


  return (
    <GlobalContext.Provider value={{ 

        adminEmail, 
        setAdminEmail, 


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