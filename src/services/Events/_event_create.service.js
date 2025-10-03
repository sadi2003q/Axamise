
// File Path: src/services/_event_create.service.js



// Firestore connection from firebase
import { db } from "../../firebase.js";

import { Database } from "../../Utilities.ts";



// Firestore functions
import { collection, doc, setDoc, addDoc, getDoc } from "firebase/firestore";



export class EventCreateService {

    constructor(event) {
        this.event = event;
    }


    /**
     * 🔹 Create a new event
     */
    _Upload_Event = async () => {
        try {
            const docRef = await addDoc(collection(db, Database.event), {
                title: this.event.title,
                startTime: this.event.startTime,
                status: 'pending',
                description: this.event.description,
                hours: this.event.duration?.hours ?? 0,
                minutes: this.event.duration?.minutes ?? 0,
                date: this.event.date,
                createdBy: this.event.createdBy,
                createdBy_uid: this.event.createdBy_uid,
            });

            return {
                success: true,
                data: { ...this.event, id: docRef.id },
                created: true,
            };
        } catch (error) {
            console.error("❌ Error creating event:", error);
            return { success: false, error: error.message || error };
        }
    };


    /**
     * 🔹 Update an existing event by UID
     * @param {string} uid - Event ID
     */
    _Update_Event = async (uid) => {
        try {
            if (!uid) throw new Error("Event UID is required for update.");

            const docRef = doc(db, "Events", uid);
            await setDoc(
                docRef,
                {
                    title: this.event.title,
                    startTime: this.event.startTime,
                    description: this.event.description,
                    hours: this.event.duration?.hours ?? 0,
                    minutes: this.event.duration?.minutes ?? 0,
                    date: this.event.date,
                    createdBy: this.event.createdBy,
                    createdBy_uid: this.event.createdBy_uid,
                },
                // { merge: true } // update only specified fields
            );

            return {
                success: true,
                data: { ...this.event, id: uid },
                updated: true,
            };
        } catch (error) {
            console.error("❌ Error updating event:", error);
            return { success: false, error: error.message || error };
        }
    };



    /**
     * Fetch a single event by its ID
     * @param {string} eventID - UID of the event
     */
    _Fetch_Event = async (eventID) => {
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


}














