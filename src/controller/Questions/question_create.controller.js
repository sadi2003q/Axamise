// controllers/QuestionController.js
import QuestionCreateService from "../../services/Questions/_question_create.service.ts";
import { routes } from "../../Utilities.ts"

import { QuestionService } from "../../services/Questions/_factory.question.service.js";
import { SERVICE} from "../../Utilities.ts";


export default class QuestionController {
    constructor(question, setQuestion, setError, navigate) {
        this.question = question;
        // this.service = new QuestionCreateService();
        this.service = QuestionService.createService(SERVICE.QUESTION_CREATE)


        this.setQuestion = setQuestion;
        this.setError = setError;
        this.navigate = navigate;
    }

    async handleUpload() {

        // More robust validation
        if (!this.question.isValid()) {
            this.setError("Please fill all fields.");
            return;
        }
        const result = await this.service._Question_Upload(this.question);
        this.processResult(result);
    }

    async handleUpdate(id) {
        if (!this.question.isValid()) {
            this.setError("Invalid form.");
            return;
        }
        const result = await this.service._Question_Update(id, this.question);
        this.processResult(result);
    }

    async handleFetch(id) {
        const result = await this.service._Fetch_Question(id);
        if (result.success)  this.setQuestion(result.data);
        else this.setError(result.error);
    }

    async GetAllEvents (id) {
        return this.service.GetAllEvents(id)
    }


    processResult(result) {
        if (result.success) {
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
