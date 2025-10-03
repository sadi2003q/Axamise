
// Event_Create View Model
/*

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
 */


// Event_show_View_Model
/*
// Data Retrieval from Firestore
import { doc, collection, query, where, getDocs, deleteDoc } from "firebase/firestore";

// Firebase connection for Firestore
import { db } from "../firebase";

// Retrieve all Events created by a specific user
export const GetAllEvents = async (uid) => {
    try {
        console.log(`id : ${uid}`)
        // Reference to "Events" collection
        const eventsRef = collection(db, "Events");

        // Query for events where createdBy_uid == uid
        const q = query(eventsRef, where("createdBy_uid", "==", uid));

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




export const Delete_Event = async (eventID) => {
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
 */

// Login View Model
/*
// src/viewmodels/LoginViewModel.js
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

class LoginViewModel {
    async login(email, password) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return { success: true, user: userCredential.user, id: userCredential.user.uid };
        } catch (error) {
            return { success: false, error };
        }
    }

    async getUserInfo(uid) {
        try {
            const userDoc = await getDoc(doc(db, "Students", uid));
            if (userDoc.exists()) {
                return { success: true, data: userDoc.data() };
            } else {
                return { success: false, error: "User not found" };
            }
        } catch (error) {
            return { success: false, error };
        }
    }
}

export default new LoginViewModel();

 */


// Question Create View Model
/*
// Firestore connection from firebase
import { Database } from "../Utilities.ts";
import { db } from "../firebase";

// Data Setting on firestore
import { collection, addDoc, doc, getDoc, setDoc } from "firebase/firestore";


export const isFormValid = (question) => {
    return (
        question.title.trim() !== "" &&
        question.description.trim() !== "" &&
        question.mark !== -1 &&
        question.difficulty.trim() !== "" &&
        question.type.trim() !== "" &&
        question.event_uid.trim() !== "" &&
        question.createdBy.trim() !== "" &&
        question.createdBy_uid.trim() !== ""
    );
};

export async function _Upload_question(question, event) {
    try {
        console.log('Before Uploading')
        await addDoc(collection(db, "questions"), {
            createdBy: question.createdBy ?? "No Title Found" ,
            createdBy_uid: question.createdBy_uid ?? "NO Created by UID",
            description: question.description ?? "--" ,
            difficulty: question.difficulty ?? "--" ,
            event_uid: event ?? "--" ,
            mark: question.mark ?? 0 ,
            title: question.title ?? "No title Found",
            type: question.type ?? "No Type Found",

        });


        console.log('After Uploading')

        return { success: true, data: question };
    } catch (error) {
        console.error("Error uploading event:", error);
        return { success: false, error: error };
    }
}


export const _Update_specific_Question = async (id, question) => {
    try {
        // Reference to the specific document
        const docRef = doc(db, Database.question, id);

        // Replace the entire document with new data
        await setDoc(docRef, {
            ...question,
            updatedAt: new Date().toISOString(), // optional field
        });

        return { success: true, data: { id, ...question } };
    } catch (error) {
        console.error("Error updating question:", error);
        return { success: false, error };
    }
};


export const _Fetch_specific_question = async (id) => {
    try {
        const docRef = doc(db, Database.question, id);   // reference to the specific document
        const docSnap = await getDoc(docRef);      // fetch the document

        if (docSnap.exists()) {
            // include the document ID as uid for consistency
            return { success: true, data: { uid: docSnap.id, ...docSnap.data() } };
        } else {
            return { success: false, error: "Question not found" };
        }
    } catch (error) {
        console.error("Error fetching question:", error);
        return { success: false, error };
    }
};



 */

// Question List View Model
/*
// Firestore connection from firebase
import { db } from "../firebase";
import { Database } from "../Utilities.ts";

// Firestore methods
import { doc, collection, getDocs, deleteDoc } from "firebase/firestore";


export const _Fetch_All_Question = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, Database.question));

        // Map all documents into an array
        const questions = querySnapshot.docs.map((doc) => ({
            id: doc.id,        // document ID
            ...doc.data(),     // document fields
        }));

        return { success: true, data: questions };
    } catch (error) {
        console.error("Error fetching questions:", error);
        return { success: false, error: "Error fetching questions" };
    }
};


export const _Delete_Specific_Function = async (id) => {
    try {

        // Reference to the specific document
        const docRef = doc(db, Database.question, id);

        // Delete the document
        await deleteDoc(docRef);

        return { success: true, message: `Question with ID ${id} deleted successfully` };
    } catch (error) {
        console.log(`Error while Deleting Question : ${error}`)
        return {success: false, error: error}
    }
}
 */

// Signup View Model
/*

// Firebase Authentication methods
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

// Authentication connection from firebase
import { auth, googleProvider } from "../firebase";

// Firestore connection from firebase
import { db } from "../firebase";

// Data Setting on firestore
import { doc, setDoc } from "firebase/firestore";


// User Authentication with Email and Password
export async function _SignUp_EmailPassword(student) {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            student.email,
            student.password
        );
        return { success: true, user: userCredential.user, id: userCredential.user.uid };
    } catch (error) {
        return { success: false, error };
    }
}


// User Authentication with Google
export async function _SignUp_Google() {
    try {
        const userCredential = await signInWithPopup(auth, googleProvider);
        return { success: true, user: userCredential.user, id: userCredential.user.uid };
    } catch (error) {
        return { success: false, error };
    }
}



// User Information Storage in Firestore
export async function _StoreUserInfo(student, uid) {
    console.log('within _StoreUserInfo function : '+uid);
    try {
        await setDoc(doc(db, "Students", uid), {
            firstName: student.firstName ,
            lastName: student.lastName ,
            email: student.email ,
            gender: student.gender ,
            id: student.id,
            image: student.image ?? "" ,
            dob: student.dob ? new Date(student.dob) : null,  // ✅ store as Timestamp
        });
        return { success: true };
    } catch (error) {
        return { success: false, error };
    }
}

 */

// Solve_Section
/*
import { db } from "../firebase";
import { doc, getDoc } from 'firebase/firestore'
import { Database } from '../Utilities.ts'

export const _Fetch_Question = async (id) => {

    try {

        const docRef = doc(db, Database.question, id)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            // return success with the data
            // const response = JSON.stringify(docSnap.data(), null, 2).data
            // console.log("Data:", response);
            return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
        } else {
            // if no document found
            return { success: false, error: "No such document found" };
        }




    } catch (error) {
        console.log(`Error FOund while Fetching from database ${error}`)
        return { success: false, error: error }
    }
}



// File: RunCodeAPI.js

export const runCode = async (sourceCode) => {
    try {
        const response = await fetch("https://emkc.org/api/v2/piston/execute", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                language: "cpp",
                version: "10.2.0", // GCC 10.2
                files: [
                    {
                        name: "main.cpp",
                        content: sourceCode
                    }
                ]
            })
        });

        const result = await response.json();

        // success response
        return {
            success: true,
            output: result.run.stdout,
            error: result.run.stderr,
        };
    } catch (error) {
        console.error("Error while running code:", error);
        return { success: false, error: error.message };
    }
};


 */














