// controllers/SignUpController.js
import SignUpService from "../services/_signup.service";

export default class SignUpController {
    constructor(student, setId, navigate, setFieldError) {
        this.student = student;
        this.service = new SignUpService(student);
        this.setId = setId;
        this.navigate = navigate;
        this.setFieldError = setFieldError;
    }

    async handleEmailSignUp() {
        const result = await this.service.signUpWithEmailPassword();
        this.processResult(result);
    }

    async handleGoogleSignUp() {
        const result = await this.service.signUpWithGoogle();
        this.processResult(result);
    }

    processResult(result) {
        if (result.success) {
            this.setId(result.id);
            this.navigate("/login");
        } else {
            this.setFieldError({
                field: "email",
                message: result.error.message || "Signup failed",
            });
        }
    }
}
