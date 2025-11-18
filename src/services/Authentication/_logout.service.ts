import { getAuth, signOut, Auth } from "firebase/auth";

export class LogoutService {
    private readonly auth: Auth;   // <-- Declare it here

    constructor() {
        this.auth = getAuth();
    }

    async logout() {
        try {
            await signOut(this.auth);

            return {
                success: true,
                message: "Successfully logged out",
            };
        } catch (error: any) {
            console.error("Logout Error:", error);

            return {
                success: false,
                message: error.message,
            };
        }
    }
}
