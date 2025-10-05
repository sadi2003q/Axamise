
import QuestionCreateService from './_question_create.service'
import {QuestionListService} from './_question_list.service'
import {SolveService} from './_solving_section.service'

import { SERVICE } from '../../Utilities'

export class QuestionService {
    static createService(type: string) : any {
        switch (type) {
            case SERVICE.QUESTION_CREATE:
                return new QuestionCreateService();
            case SERVICE.QUESTION_LIST:
                return new QuestionListService();
            case SERVICE.SOLVE:
                return new SolveService();
            default:
                throw new Error('Unknown Service type for questions: ' + type);

        }
    }

}






