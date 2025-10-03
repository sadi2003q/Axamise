/* eslint-disable no-unused-vars */


// Data Retrieval from Firestore
import {doc, collection, query, where, getDocs, deleteDoc, setDoc, updateDoc} from "firebase/firestore";

import { Database } from "../../Utilities.ts";

// Firebase connection for Firestore
import { db } from "../../firebase.js";


import { EVENT_APPROVAL_STATUS } from "../../Utilities.ts";

export class Admin_ApproveEventService   {
    constructor() {
    }


    GetAllEvents = async () => {
        

        try {
            console.log("Retrieving all events from Firestore...");

            const eventRef = collection(db, Database.event);
            const q = query(
                eventRef,
                where("status", "==", EVENT_APPROVAL_STATUS.pending)
            )

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
    }



    approveEvent = async ({eventID, modify = false}={}) => {
        try {
            await updateDoc(doc(db, Database.event, eventID), {
                status: modify ?EVENT_APPROVAL_STATUS.modify : EVENT_APPROVAL_STATUS.approved,
            });
        } catch (error) {
            console.error("Error retrieving events:", error);
            return { success: false, error };
        }
    }








}   




