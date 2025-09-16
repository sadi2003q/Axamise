import { db } from "../firebase";
import { doc, getDoc } from 'firebase/firestore'
import {Database} from '../Database'

export const _Fetch_Question = async (id) => {

    try {

        const docRef = doc(db, Database.question, id)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            // return success with the data
            // const response = JSON.stringify(docSnap.data(), null, 2).data
            // console.log("Data:", response);
            return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
        } else {
            // if no document found
            return { success: false, error: "No such document found" };
        }




    } catch (error) {
        console.log(`Error FOund while Fetching from database ${error}`)
        return {success: false, error: error}
    }


} 

