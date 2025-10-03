// path: src/services/_login.services.js
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase.js";
import User from '../../models/User_Model.js'
import { Firebase_Response } from "../../Utilities";
import { Database } from "../../Utilities";
import { _Base_Login} from "./_base/_base.login.service";


export default class LoginService extends _Base_Login{

    constructor(user: User) {
        super(user)
    }

    // Login with email and password
    async login() : Promise<Firebase_Response> {
        console.log('loginWithEmailPassword() --- services/Authentication/_login.services.ts');
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                this.user.email,
                this.user.password
            );
            console.log('Login Success')
            return { success: true, user: userCredential.user, id: userCredential.user.uid };
        } catch (error) {
            return { success: false, error };
        }
    }


    // Fetch user info from Firestore
    async getUserInfo(uid: string) : Promise<Firebase_Response> {
        try {
            console.log('getUserInfo() --- services/Authentication/_login.services.ts');
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
