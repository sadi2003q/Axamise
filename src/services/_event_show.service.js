// Data Retrieval from Firestore
import { doc, collection, query, where, getDocs, deleteDoc } from "firebase/firestore";

import { Database } from "../Utilities.js";

// Firebase connection for Firestore
import { db } from "../firebase";

import { EVENT_APPROVAL_STATUS } from "../Utilities.js";


export class EventShowService {


    // Retrieve all Events created by a specific user
    GetAllEvents = async (uid) => {
        try {
            console.log(`id : ${uid}`)
            // Reference to "Events" collection
            const eventsRef = collection(db, Database.event);

            // Query for events where createdBy_uid == uid
            const q = query(
                eventsRef,
                where("createdBy_uid", "==", uid),
                where("status", "==", EVENT_APPROVAL_STATUS.approved)
            );

            // Execute query
            const querySnapshot = await getDocs(q);

            // Map documents into array
            const events = querySnapshot.docs.map((doc) => ({
                id: doc.id,       // include doc id
                ...doc.data(),    // spread event fields
            }));

            return { success: true, data: events };
        } catch (error) {
            console.error("Error retrieving events:", error);
            return { success: false, error };
        }
    };




    Delete_Event = async (eventID) => {
        try {
            if (!eventID) return { success: false, error: "No eventID provided" };

            // Reference to the specific document
            const eventRef = doc(db, "Events", eventID);

            // Delete the document
            await deleteDoc(eventRef);

            return { success: true, message: "Event deleted successfully" };
        } catch (error) {
            console.error(`Error deleting the event: ${error}`);
            return { success: false, error: error.message || error };
        }
    };
}


