// path: src/services/_admin.setUser.service.js
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDocs, deleteDoc, collection } from "firebase/firestore";
import { auth, db } from "../../firebase.js";
import { Database } from "../../Utilities";

import { Firebase_Response} from "../../Utilities";
import { Admin_Info } from '../../models/AdminInfo_Model.js'
import { _Base_SignUp} from "./_base/_base_signup.service";

export default class AdminSetUserService extends _Base_SignUp<Admin_Info> {

    constructor(adminInfo: Admin_Info) {
        super(adminInfo)
    }

    async signup() : Promise<Firebase_Response> {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, this.user.email, this.user.password);
            const uid = userCredential.user.uid;
            await this.storeUserInfo(uid);
            return { success: true, user: userCredential.user, id: uid };
        } catch (error) {
            return { success: false, error };
        }
    }


    async storeUserInfo(uid: string): Promise<Firebase_Response> {
        try {
            await setDoc(doc(db, Database.admins, uid), {
                name: this.user.name,
                email: this.user.email,
                phoneNumber: this.user.phoneNumber,
                address: this.user.address,
                profilePicture: this.user.profilePicture,
                lastLogin: this.user.lastLogin,
                status: this.user.status,
                createdAt: this.user.createdAt,
                updatedAt: this.user.updatedAt
            });
            return { success: true };
        } catch (error) {
            return { success: false, error };
        }

    }


    async getAllAdmins() : Promise<Firebase_Response> {
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


    async updateUser(id: string, adminInfo: Admin_Info): Promise<Firebase_Response> {
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
            console.log('successfully updated')
            return { success: true };
        } catch (error) {
            return { success: false, error };
        }
    }


    async deleteUser(id: string) : Promise<Firebase_Response> {
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


