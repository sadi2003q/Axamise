// Authentication method for Login
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

// Data Retrieval from Firestore
import { doc, getDoc } from "firebase/firestore";

// Firebase connection for Firestore
import { db } from "../firebase";


// User Authentication with Email and Password
export const LoginWithEmailAndPassword = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return { success: true, user: userCredential.user, id: userCredential.user.uid };
    } catch (error) {
        console.error("Error signing in with email and password:", error);
        return { success: false, error };
    }
};


// Retrieve User Information from Firestore
export const GetUserInfo = async (uid) => {
    try {
        const userDoc = await getDoc(doc(db, "Students", uid));
        if (userDoc.exists()) {
            return { success: true, data: userDoc.data() };
        } else {
            return { success: false, error: "User not found" };
        }
    } catch (error) {
        console.error("Error retrieving user information:", error);
        return { success: false, error };
    }
};

