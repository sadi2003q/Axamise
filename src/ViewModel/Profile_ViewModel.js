// Firestore connection from firebase
import { db } from "../firebase";

// Data Setting on firestore
import { doc, getDoc } from "firebase/firestore";



// Fetch User Information from Firestore
export const _Fetch_Information = async (userId) => {

    try{
        const docRef = doc(db, "Students", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { success: true, data: docSnap.data() };
        } else {
            return { success: false, error: "No such document!" };
        }

    }catch(error){
        console.error("Error fetching user information:", error);
        return { success: false, error: "Error fetching user information" };
    }

}

