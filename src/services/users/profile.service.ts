
import { UsersRepository} from "./repository";

export class ProfileService {
    private repository: UsersRepository;

    constructor() {
        this.repository = new UsersRepository();
    }

    /**
     * User Information Finder
     * @param id (User Id)
     */
    async fetch_users_Information({id}: {id: string}) {
        return await this.repository._fetch_userInformation({id: id})
    }



    async fetch_Solved_Ratio({id}: {id: string}) {
        const totalQuestions = await this.repository._fetchTotalNumberOfQuestion()
        const solvedQuestions = await this.repository._solvedQuestionCount({id})

        return {
            totalQuestions: totalQuestions.data,
            solvedQuestions: solvedQuestions.data
        }
    }





}