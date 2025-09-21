// controllers/QuestionController.js
import QuestionService from "../services/_question_create.services.js";
import { routes } from "../Utilities"

export default class QuestionController {
    constructor(question, setQuestion, setID, setError, navigate) {
        this.question = question;
        this.service = new QuestionService();
        this.setQuestion = setQuestion;
        this.setId = setID;
        this.setError = setError;
        this.navigate = navigate;
    }

    async handleUpload() {
        if (!this.question.isValid()) {
            this.setError("Please fill all fields.");
            return;
        }
        const result = await this.service.upload(this.question);
        this.processResult(result);
    }

    async handleUpdate(id) {
        if (!this.question.isValid()) {
            this.setError("Invalid form.");
            return;
        }
        const result = await this.service.update(id, this.question);
        this.processResult(result);
    }

    async handleFetch(id) {
        const result = await this.service.fetch(id);
        if (result.success) {
            this.setQuestion(result.data);
        } else {
            this.setError(result.error);
        }
    }

    processResult(result) {
        if (result.success) {
            this.setId(result.id);
            console.log('Navigtion to question list');
            this.navigate(routes.question_list);
        } else {
            this.setFieldError({
                field: "email",
                message: result.error.message || "Signup failed",
            });
        }
    }

}
