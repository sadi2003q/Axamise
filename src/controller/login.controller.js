// src/controllers/LoginController.js
import LoginService from "../services/_login.services";
import { routes } from "../Utilities"

export default class LoginController {
    constructor(user, setId, setCurrentName, navigate, setFieldError) {
        this.user = user;
        this.service = new LoginService(user);
        this.setId = setId;
        this.setCurrentName = setCurrentName;
        this.navigate = navigate;
        this.setFieldError = setFieldError;
    }

    // Handle email and password login
    async handleEmailLogin() {
        const result = await this.service.loginWithEmailPassword();
        await this.processResult(result);
    }


    // Process login result
    async processResult(result) {
        if (result.success) {
            this.setId(result.id);

            // fetch additional user info
            const info = await this.service.getUserInfo(result.id);
            if (info.success) {
                this.setCurrentName(`${info.data?.firstName} ${info.data?.lastName}`);
            }

            this.navigate(routes.feed);
        } else {
            this.setFieldError({
                field: "email",
                message: result.error.message || "Login failed",
            });
        }
    }
}
