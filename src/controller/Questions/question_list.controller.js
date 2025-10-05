
// File Path: controller/question_list.controller.js

import { QuestionListService } from "../../services/Questions/_question_list.service.ts";
import { routes } from "../../Utilities.ts"

import { QuestionService } from "../../services/Questions/_factory.question.service.js";
import { SERVICE} from "../../Utilities.ts";


export class QuestionListController {

    constructor(questions, setAllQuestion, setSelectedQuestion, setError, navigate) {
        // this.service = new QuestionListService();
        this.service = QuestionService.createService(SERVICE.QUESTION_LIST)

        this.questions = questions;
        this.setAllQuestion = setAllQuestion;
        this.setSelectedQuestion = setSelectedQuestion
        this.setError = setError;
        this.navigate = navigate;
    }

    /*
    const controller = new QuestionListController(
        allQuestion,
        setAllQuestion,
        setSelectedQuestion,
        setError,
        navigate
    );
    */

    async handleFetchAll() {

        const result = await this.service._Fetch_All_Question();
        
        if (result.success) this.setAllQuestion(result.data);
        else this.setError(result.error);
    }


    handleEditButton = (uid) => {

        this.navigate(routes.question_create, { state: { questionID: uid } })
        console.log(`Question ID : ${uid}`)
    }
    handleSolveButton = (uid) => {
        this.navigate(routes.solving_page, { state: { questionID: uid } })
    }

    handleDeleteQuestion = async (uid) => {
        const result = await this.service._Delete_Specific_Function(uid);
        if (result.success) {
            this.setAllQuestion((prev) => prev.filter((q) => q.id !== uid));
            this.setSelectedQuestion((prev) => (prev?.id === uid ? "" : prev));
        }
    };




}







