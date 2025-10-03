// services/QuestionService.js
import { db } from "../../firebase.js";
import {collection, addDoc, doc, getDoc, setDoc, query, where, getDocs} from "firebase/firestore";
import { Database } from "../../Utilities.ts";

export default class QuestionService {
    async _Question_Upload(question) {
        try {
            await addDoc(collection(db, Database.question), { ...question });
            return { success: true, data: question };
        } catch (error) {
            return { success: false, error };
        }
    }

    async _Question_Update(id, question) {
        try {
            const docRef = doc(db, Database.question, id);
            await setDoc(docRef, { ...question, updatedAt: new Date().toISOString() });
            return { success: true, data: { id, ...question } };
        } catch (error) {
            return { success: false, error };
        }
    }

    async _Fetch_Question(id) {
        try {
            const docRef = doc(db, Database.question, id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) return { success: true, data: { uid: docSnap.id, ...docSnap.data() } };
            return { success: false, error: "Not found" };
        } catch (error) {
            return { success: false, error };
        }
    }


    GetAllEvents = async (uid) => {
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
}
