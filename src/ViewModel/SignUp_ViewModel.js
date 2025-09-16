
// Firebase Authentication methods
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

// Authentication connection from firebase
import { auth, googleProvider } from "../firebase";

// Firestore connection from firebase
import { db } from "../firebase";

// Data Setting on firestore
import { doc, setDoc } from "firebase/firestore";

/**
 * Handles signing up a new user with Firebase
 * @param {Object} student - student data { email, password, ... }
 * @returns {Promise<Object>} - returns { success, user, error }
 */


// User Authentication with Email and Password
export async function _SignUp_EmailPassword(student) {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            student.email,
            student.password
        );
        return { success: true, user: userCredential.user, id: userCredential.user.uid };
    } catch (error) {
        return { success: false, error };
    }
}


// User Authentication with Google
export async function _SignUp_Google() {
    try {
        const userCredential = await signInWithPopup(auth, googleProvider);
        return { success: true, user: userCredential.user, id: userCredential.user.uid };
    } catch (error) {
        return { success: false, error };
    }
}



// User Information Storage in Firestore
export async function _StoreUserInfo(student, uid) {
    console.log('within _StoreUserInfo function : '+uid);
    try {
        await setDoc(doc(db, "Students", uid), {
            firstName: student.firstName ,
            lastName: student.lastName ,
            email: student.email ,
            gender: student.gender ,
            id: student.id,
            image: student.image ?? "" ,
            dob: student.dob ? new Date(student.dob) : null,  // ✅ store as Timestamp
        });
        return { success: true };
    } catch (error) {
        return { success: false, error };
    }
}
