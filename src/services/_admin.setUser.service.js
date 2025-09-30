// services/SignUpService.js
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDocs, deleteDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase";
import { Database } from "../Utilities.js";

export default class AdminSetUserService {
    constructor(adminInfo) {
        this.adminInfo = adminInfo;
    }

    async signUpWithEmailPassword() {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, this.adminInfo.email, this.adminInfo.password);
            const uid = userCredential.user.uid;
            await this.storeUserInfo(uid);
            return { success: true, user: userCredential.user, id: uid };
        } catch (error) {
            return { success: false, error };
        }
    }


    async storeUserInfo(uid) {
        try {
            await setDoc(doc(db, Database.admins, uid), {
                name: this.adminInfo.name,
                email: this.adminInfo.email,
                role: this.adminInfo.role,
                phoneNumber: this.adminInfo.phoneNumber,
                address: this.adminInfo.address,
                profilePicture: this.adminInfo.profilePicture,
                lastLogin: this.adminInfo.lastLogin,
                status: this.adminInfo.status,
                createdAt: this.adminInfo.createdAt,
                updatedAt: this.adminInfo.updatedAt
            });
            return { success: true };
        } catch (error) {
            return { success: false, error };
        }

    }


    async getAllAdmins() {
        try {
            const querySnapshot = await getDocs(collection(db, Database.admins));
            const admins = [];
            querySnapshot.forEach((doc) => {
                admins.push({ id: doc.id, ...doc.data() });
            });
            return { success: true, data: admins };
        } catch (error) {
            return { success: false, error };
        }
    }


    async updateAdmin(id, adminInfo) {
        try {
            const docRef = doc(db, Database.admins, id);
            await setDoc(docRef, {
                name: adminInfo.name,
                email: adminInfo.email,
                role: adminInfo.role,
                phoneNumber: adminInfo.phoneNumber,
                address: adminInfo.address,
                profilePicture: adminInfo.profilePicture,
                updatedAt: new Date().toISOString() // good practice to track updates
            }, { merge: true });

            return { success: true };
        } catch (error) {
            return { success: false, error };
        }
    }


    async deleteAdmin(id) {
        try {
            console.log('ID ', id);
            const docRef = doc(db, Database.admins, id);
            await deleteDoc(docRef);
            console.log('Admin deleted successfully from services file');
            return { success: true };
        } catch (error) {
            return { success: false, error };
        }
    }


}


