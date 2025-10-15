// File: src/Services/Admin/_admin.approve.event.service.js


/* eslint-disable no-unused-vars */


// Data Retrieval from Firestore
import {doc, collection, query, where, getDocs, deleteDoc, setDoc, updateDoc} from "firebase/firestore";

import { Database } from "../../Utilities";

// Firebase connection for Firestore
import { db } from "../../firebase.js";


import { EVENT_APPROVAL_STATUS } from "../../Utilities";
import { BaseApprovalService } from './_base/_base.approval.service'
import { Firebase_Response} from "../../Utilities";


export class Admin_ApproveEventService  extends BaseApprovalService {

    constructor() {
        super();
    }


    // Retrieve all events from Firestore
    getAllPending = async () => {
        

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

    approve = async (id: string, isModificationRequired : Boolean = false, mainFunctionCode: string = ''): Promise<Firebase_Response> => {
        try {


            const updateData: Record<string, any> = {
                status: isModificationRequired
                    ? EVENT_APPROVAL_STATUS.modify
                    : EVENT_APPROVAL_STATUS.approved,
            };

            // ✅ Only add mainFunctionCode if NOT modification
            if (!isModificationRequired) {
                updateData.mainFunctionCode = mainFunctionCode;
            }

            await updateDoc(doc(db, Database.event, id), updateData);
            return { success: true };
        } catch (error) {
            console.error("Error approving event:", error);
            return { success: false, error };
        }
    }



















}   




