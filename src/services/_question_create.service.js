// services/QuestionService.js
import { db } from "../firebase";
import { collection, addDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { Database } from "../Utilities.js";

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
}
