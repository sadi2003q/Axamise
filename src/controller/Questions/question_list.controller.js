
// File Path: controller/question_list.controller.js

import { QuestionListService } from "../../services/Questions/_question_list.service.ts";
import { routes } from "../../Utilities.ts"
import { LocalCache } from "../../localCache.js";
import { QuestionService } from "../../services/Questions/_factory.question.service.js";
import { SERVICE} from "../../Utilities.ts";


export class QuestionListController {

    constructor(questions, setAllQuestion, setSelectedQuestion, setError, navigate, setSolvedProblem) {
        // this.service = new QuestionListService();
        this.service = QuestionService.createService(SERVICE.QUESTION_LIST)

        this.questions = questions;
        this.setAllQuestion = setAllQuestion;
        this.setSelectedQuestion = setSelectedQuestion
        this.setError = setError;
        this.navigate = navigate;
        this.setSolvedProblem = setSolvedProblem

        // initialize cache
        this.cache = new LocalCache("allQuestionsCache");
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

        // 1. Load cache instantly if exists
        const cached = this.cache.load();
        if (cached) this.setAllQuestion(cached);

        // 2. Fetch from Firebase
        const result = await this.service._Fetch_All_Question();

        if (!result.success) {
            this.setError(result.error);
            return;
        }

        const fresh = result.data;

        // 3. Compare using LocalCache method
        if (!this.cache.isSame(fresh)) {
            console.log("Cache updated with fresh data");
            this.cache.save(fresh);
            this.setAllQuestion(fresh);
        } else {
            console.log("Cache is identical. No update needed.");
        }
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


    handleSolvedProblemList = async (uid) => {

        console.log('uid : ',uid);
        const result = await this.service._FetchSolvedProblemList({id : uid})
        if (result.success) this.setSolvedProblem(result.data);

    }




}







