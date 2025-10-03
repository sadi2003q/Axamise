// path: src/controller/admin.login.controller.js


import { Admin_LoginService } from "../../services/Authentication/_admin.login.service.ts";

import { SERVICE } from "../../Utilities.ts";
import { AuthenticationService } from "../../services/Authentication/_Authentication.service.ts";

export class Admin_LoginController {
    // Global Context

    constructor(user, navigate, setFieldError) {
        
        this.user = user;
        // this.service = new Admin_LoginService(user);

        this.service = AuthenticationService.create( user, SERVICE.admin_login );

        this.navigate = navigate;
        this.setFieldError = setFieldError;
    }

    

    // Handle email and password login
    async handleEmailLogin() {
        console.log(`Email : ${this.user.email} Password : ${this.user.password}`)
        const result = await this.service.login();
        this.processResult(result);
    }

    // Process login result
    processResult(result) {
        if(result.success) {
            console.log('✅ Successfully Login into Admin');
            console.log(`UID : ${result.id}`)
            // You can navigate here if you want:
            // this.navigate("/admin/dashboard");
        } else {
            console.log(`❌ Error Found while Login : ${result.error.code}`);
            
            // Map Firebase error codes to friendly messages
            let message = "Something went wrong, please try again.";

            switch (result.error.code) {
                case "auth/invalid-email":
                    message = "Invalid email format.";
                    break;
                case "auth/user-not-found":
                    message = "No account found with this email.";
                    break;
                case "auth/wrong-password":
                    message = "Incorrect password.";
                    break;
                case "auth/invalid-credential":
                    message = "Invalid credentials. Please check your email and password.";
                    break;
                default:
                    message = result.error.message; // fallback
            }

            this.setFieldError(message);  // 👈 sends error back to UI
        }
    }
}