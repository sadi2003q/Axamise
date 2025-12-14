import { db } from "../../firebase.js";
import { collection, addDoc, doc, setDoc, getDoc, getDocs, query, where } from "firebase/firestore";
import Question from "../../models/Question_Model.js";
import { Database, Firebase_Response } from "../../Utilities.js";

export class QuestionCreateService {

    /**
     * Upload a new question to Firestore
     * @param question Question object to upload
     * @returns Firebase_Response
     */
    async _Question_Upload(question) {
        try {
            const colRef = collection(db, Database.question);
            await addDoc(colRef, { ...question });
            return { success: true, data: question };
        } catch (error) {
            return { success: false, error };
        }
    }

    /**
     * Update an existing question in Firestore
     * @param id Question document ID
     * @param question Updated Question object
     * @returns Firebase_Response
     */
    async _Question_Update(id, question) {
        try {
            const docRef = doc(db, Database.question, id);
            await setDoc(docRef, { ...question, updatedAt: new Date().toISOString() });
            return { success: true, data: { id, ...question } };
        } catch (error) {
            return { success: false, error };
        }
    }

    /**
     * Fetch a question by ID
     * @param id Question document ID
     * @returns Firebase_Response
     */
    async _Fetch_Question(id) {
        try {
            const docRef = doc(db, Database.approvedQuestions, id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return { success: true, data: { uid: docSnap.id, ...docSnap.data() } };
            }
            return { success: false, error: "Not found" };
        } catch (error) {
            return { success: false, error };
        }
    }

    /**
     * Get all events for a user (for event selection)
     * @param uid User ID
     * @returns Firebase_Response
     */
    async GetAllEvents(uid) {
        try {
            const eventsRef = collection(db, "Events");
            const q = query(eventsRef, where("createdBy_uid", "==", uid));
            const querySnapshot = await getDocs(q);

            const events = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));

            return { success: true, data: events };
        } catch (error) {
            console.error("Error retrieving events:", error);
            return { success: false, error };
        }
    }
}
