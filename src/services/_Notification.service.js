
import { Database } from "../Utilities.js";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase.js";


export class NotificationService {



    async createNotification(notificationData) {
        try {
            const docRef = await addDoc(collection(db, Database.notifications), notificationData);
            console.log("Notification created with ID:", docRef.id);
            return { success: true, id: docRef.id };
        } catch (error) {
            console.error("Error creating notification:", error);
            return { success: false, error: error.message };
        }
    }



    async fetchNotificationsByUser(userId) {
        try {
            const notificationsRef = collection(db, Database.notifications);
            const q = query(notificationsRef, where("recipientID", "==", userId));
            const querySnapshot = await getDocs(q);
            const notifications = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return { success: true, data: notifications };
        } catch (error) {
            console.error("Error fetching notifications:", error);
            return { success: false, error: error.message };
        }
    }
}
