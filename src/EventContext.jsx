import { createContext, useState, useContext } from "react";
import {Events_Model} from "./models/Event_Model.js";

// 1️⃣ Create context
const EventContext = createContext();

// 2️⃣ Create provider
export const EventProvider = ({ children }) => {
    const [globEvent, setGlobEvent] = useState(
        new Events_Model({
            title: "",
            description: "",
            date: "2023-10-01",
            startTime: "10:00",
            duration: { hours: 0, minutes: 0 },
            createdBy: "current name is undefined",
            createdBy_uid: "not defined",
            createdAt: Date.now(),
            allQuestions: []
        })
    );

    return (
        <EventContext.Provider value={{ globEvent, setGlobEvent }}>
            {children}
        </EventContext.Provider>
    );
};

// 3️⃣ Custom hook for easy usage
export const useEvent = () => useContext(EventContext);