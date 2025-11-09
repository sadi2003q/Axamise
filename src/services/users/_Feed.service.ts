// Path: src/service/users/Feed.service.ts

import { UsersRepository} from "./repository";
import { Firebase_Response} from "../../Utilities";


export class FeedService {

    private repository: UsersRepository;

    constructor() {
        this.repository = new UsersRepository();
    }

    async _Fetch_Events(): Promise<Firebase_Response> {
        return await this.repository._fetchRandomEvent()
    }

    async _Fetch_Questions(): Promise<Firebase_Response> {
        return await this.repository._fetchRandomQuestion()
    }

    async _Fetch_QuestionCount() {
        return await this.repository._fetchTotalNumberOfQuestion()
    }

    async _Fetch_DifficultyCount({difficulty}: {difficulty: string}): Promise<Firebase_Response> {
        return await this.repository._fetchDifficultyCount({difficulty: difficulty})
    }

    async _Fetch_SolvedCount({id}: {id: string}): Promise<Firebase_Response> {
        return await this.repository._solvedQuestionCount_byDifficulty({id: id})
    }

    async _Fetch_QuestionByCategory({category}: {category: string}): Promise<Firebase_Response> {
        return await this.repository._fetchQuestionCount_byCategory({category})
    }

}

