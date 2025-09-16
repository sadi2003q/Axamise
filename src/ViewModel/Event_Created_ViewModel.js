// Firestore connection from firebase
import { db } from "../firebase";

// Firestore functions
import { collection, doc, setDoc, addDoc, getDoc } from "firebase/firestore";

/**
 * Upload or update an event
 * @param {Object} event - Event data
 * @param {string|null} uid - Optional UID of the event. If provided, updates that document.
 */
export async function _Upload_Event(event, uid = null) {
    try {
        if (uid) {
            // 🔹 Update existing event or create if missing
            const docRef = doc(db, "Events", uid);
            await setDoc(
                docRef,
                {
                    title: event.title,
                    startTime: event.startTime,
                    description: event.description,
                    hours: event.duration.hours,
                    minutes: event.duration.minutes,
                    date: event.date,
                    createdBy: event.createdBy,
                    createdBy_uid: event.createdBy_uid,
                },
                { merge: true } // ensures update or creation
            );
            return { success: true, data: { ...event, id: uid }, updatedOrCreated: true };
        } else {
            // 🔹 Create new event
            const docRef = await addDoc(collection(db, "Events"), {
                title: event.title,
                startTime: event.startTime,
                description: event.description,
                hours: event.duration.hours,
                minutes: event.duration.minutes,
                date: event.date,
                createdBy: event.createdBy,
                createdBy_uid: event.createdBy_uid,
            });
            return { success: true, data: { ...event, id: docRef.id }, created: true };
        }
    } catch (error) {
        console.error("❌ Error uploading event:", error);
        return { success: false, error: error.message || error };
    }
}

/**
 * Fetch a single event by its ID
 * @param {string} eventID - UID of the event
 */
export const Fetch_Event = async (eventID) => {
    try {
        const eventRef = doc(db, "Events", eventID); // Reference to the specific document
        const eventSnap = await getDoc(eventRef); // Fetch the document

        if (eventSnap.exists()) {
            return { success: true, data: { id: eventSnap.id, ...eventSnap.data() } }; // Document found
        } else {
            return { success: false, error: "Event not found" }; // Document not found
        }
    } catch (error) {
        console.error(`❌ Error fetching the event: ${error}`);
        return { success: false, error: error.message || error };
    }
};