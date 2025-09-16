import { db, storage } from "../firebase";
import {
    collection, addDoc, getDocs, getDoc, updateDoc, deleteDoc, doc, query, where
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const userCollection = collection(db, "users");

// CREATE
export const AddStudent_Database = async (user, imageFile) => {
    let imageUrl = "";
    if (imageFile) {
        const imageRef = ref(storage, `users/${Date.now()}_${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(imageRef);
    }
    await addDoc(userCollection, { ...user, image: imageUrl });
};