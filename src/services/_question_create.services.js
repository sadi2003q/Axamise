// services/QuestionService.js
import { db } from "../firebase";
import { collection, addDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { Database } from "../Database";

export default class QuestionService {
    async upload(question) {
        try {
            await addDoc(collection(db, "questions"), { ...question });
            return { success: true, data: question };
        } catch (error) {
            return { success: false, error };
        }
    }

    async update(id, question) {
        try {
            const docRef = doc(db, Database.question, id);
            await setDoc(docRef, { ...question, updatedAt: new Date().toISOString() });
            return { success: true, data: { id, ...question } };
        } catch (error) {
            return { success: false, error };
        }
    }

    async fetch(id) {
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
