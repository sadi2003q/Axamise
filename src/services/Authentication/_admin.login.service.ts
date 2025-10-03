// path: src/services/_login.services.js
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.js";
import { Firebase_Response} from "../../Utilities";
import User from '../../models/User_Model.js'
import { _Base_Login} from "./__base/_base.login.service";


export class Admin_LoginService extends _Base_Login{



    constructor(user: User) {
        super(user)
    }

    // Login with email and password
    async login() : Promise<Firebase_Response> {
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
