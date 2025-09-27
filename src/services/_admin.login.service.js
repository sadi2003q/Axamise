// src/services/_login.services.js
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export class Admin_LoginService {

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


}
