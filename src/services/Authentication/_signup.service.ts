// path: services/_signup.service.js
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import {deleteDoc, doc, setDoc} from "firebase/firestore";
import { auth, googleProvider, db } from "../../firebase.js";
import { Database } from "../../Utilities";
import { Firebase_Response} from "../../Utilities";
import Student from '../../models/Student_Model.js'
import { _Base_SignUp} from "./_base/_base_signup.service";


export default class SignUpService extends _Base_SignUp<Student>{

    constructor(student: Student) {
        super(student)
    }

    async signup(): Promise<Firebase_Response> {
        try {

            console.log('signUpWithEmailPassword()  ---   services/Authentication/_signUp.services.ts');

            const userCredential = await createUserWithEmailAndPassword(auth, this.user.email, this.user.password);
            const uid = userCredential.user.uid;
            await this.storeUserInfo(uid);
            return { success: true, user: userCredential.user, id: uid };
        } catch (error) {
            return { success: false, error };
        }
    }

    async signUpWithGoogle() : Promise<Firebase_Response> {
        try {
            console.log('signUpWithGoogle()  ---   services/Authentication/_signUp.services.ts');
            const userCredential = await signInWithPopup(auth, googleProvider);
            const uid = userCredential.user.uid;
            await this.storeUserInfo(uid);
            return { success: true, user: userCredential.user, id: uid };
        } catch (error) {
            return { success: false, error };
        }
    }

    async storeUserInfo(uid: string) {
        try {
            console.log('storeUserInfo()  ---   services/Authentication/_signUp.services.ts');

            await setDoc(doc(db, Database.student, uid), {
                firstName: this.user.firstName,
                lastName: this.user.lastName,
                email: this.user.email,
                gender: this.user.gender,
                id: this.user.id,
                image: this.user.image,
                dob: this.user.dob ? new Date(this.user.dob) : null,
            });
            return { success: true };
        } catch (error) {
            return { success: false, error };
        }
    }

    async updateUser(id: string, student: Student): Promise<Firebase_Response> {
        try {
            const docRef = doc(db, Database.student, id);
            // await setDoc(docRef, {
            //     name: student.name,
            //     email: student.email,
            //     role: student.role,
            //     phoneNumber: student.phoneNumber,
            //     address: student.address,
            //     profilePicture: adminInfo.profilePicture,
            //     updatedAt: new Date().toISOString() // good practice to track updates
            // }, { merge: true });
            console.log('successfully updated')
            return { success: true };
        } catch (error) {
            return { success: false, error };
        }
    }

    async deleteUser(id: string) : Promise<Firebase_Response> {
        try {
            console.log('ID ', id);
            const docRef = doc(db, Database.student, id);
            await deleteDoc(docRef);
            console.log('Student deleted successfully from services file');
            return { success: true };
        } catch (error) {
            return { success: false, error };
        }
    }


}
