

// File Path: services/_question_list.services.js

// Firestore connection from firebase
import { db } from "../firebase.js";
import { Database } from "../Database.js";

// Firestore methods
import { doc, collection, getDocs, deleteDoc } from "firebase/firestore";


export class QuestionListService {

    
    _Fetch_All_Question = async () => {
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


    _Delete_Specific_Function = async (id) => {
        try {

            // Reference to the specific document
            const docRef = doc(db, Database.question, id);

            // Delete the document
            await deleteDoc(docRef);

            return { success: true, message: `Question with ID ${id} deleted successfully` };
        } catch (error) {
            console.log(`Error while Deleting Question : ${error}`)
            return { success: false, error: error }
        }
    }
}