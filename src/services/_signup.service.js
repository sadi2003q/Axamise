// services/SignUpService.js
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, googleProvider, db } from "../firebase";
import { Database } from "../Utilities.js";

export default class SignUpService {
    constructor(student) {
        this.student = student;
    }

    async signUpWithEmailPassword() {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, this.student.email, this.student.password);
            const uid = userCredential.user.uid;
            await this.storeUserInfo(uid);
            return { success: true, user: userCredential.user, id: uid };
        } catch (error) {
            return { success: false, error };
        }
    }

    async signUpWithGoogle() {
        try {
            const userCredential = await signInWithPopup(auth, googleProvider);
            const uid = userCredential.user.uid;
            await this.storeUserInfo(uid);
            return { success: true, user: userCredential.user, id: uid };
        } catch (error) {
            return { success: false, error };
        }
    }

    async storeUserInfo(uid) {
        try {
            await setDoc(doc(db, Database.student, uid), {
                firstName: this.student.firstName,
                lastName: this.student.lastName,
                email: this.student.email,
                gender: this.student.gender,
                id: this.student.id,
                image: this.student.image,
                dob: this.student.dob ? new Date(this.student.dob) : null,
            });
            return { success: true };
        } catch (error) {
            return { success: false, error };
        }
    }
}
