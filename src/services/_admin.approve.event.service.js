/* eslint-disable no-unused-vars */


// Data Retrieval from Firestore
import { doc, collection, query, where, getDocs, deleteDoc } from "firebase/firestore";

import { Database } from "../Utilities.js";

// Firebase connection for Firestore
import { db } from "../firebase";


import { EventShowService } from "./_event_show.service.js"; 




export class Admin_ApproveEventService extends EventShowService  {
    constructor() {
        super();
    }

    
}



