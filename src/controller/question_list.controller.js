
import { QuestionListService } from "../services/_question_list.services.js";
// eslint-disable-next-line no-unused-vars
import { routes } from "../Utilities"


export class QuestionListController {

    constructor(questions, setAllQuestion, setError, navigate) {
        this.questions = questions;
        this.service = new QuestionListService();
        this.setAllQuestion = setAllQuestion;
        this.setError = setError;
        this.navigate = navigate;
    }

    async handleFetchAll() {
        const result = await this.service._Fetch_All_Questions();
        if (result.success) this.setAllQuestion(result.data);
        else this.setError(result.error);
    }


    



}

