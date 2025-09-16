// Firestore connection from firebase
import { Database } from "../Database";
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


