/* eslint-disable no-unused-vars */


// Data Retrieval from Firestore
import { doc, collection, query, where, getDocs, deleteDoc } from "firebase/firestore";

import { Database } from "../Utilities.js";

// Firebase connection for Firestore
import { db } from "../firebase";


import { EventShowService } from "./_event_show.service.js"; 




export class Admin_ApproveEventService   {
    constructor() {
    }


    GetAllEvents = async () => {
        

        try {
            console.log("Retrieving all events from Firestore...");
            
            const res = await getDocs(collection(db, Database.event));
            const events = res.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            console.log(`Retrieved ${events.length} events.`);
            return { success: true, data: events };
        } catch (error) {
            console.error("Error retrieving events:", error);
            return { success: false, error };
        }
    }

}   




