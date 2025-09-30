// src/services/_login.services.js
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

import { Database } from "../Utilities.js";

export default class LoginService {

    constructor(user) {
        this.user = user;
    }

    // Login with email and password
    async loginWithEmailPassword() {
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                this.user.email,
                this.user.password
            );
            return { success: true, user: userCredential.user, id: userCredential.user.uid };
        } catch (error) {
            return { success: false, error };
        }
    }



    // Fetch user info from Firestore
    async getUserInfo(uid) {
        try {
            const userDoc = await getDoc(doc(db, Database.student, uid));
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
