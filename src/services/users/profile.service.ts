
import { UsersRepository} from "./repository";
import {Firebase_Response} from "../../Utilities";

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


    /**
     * Fetch number of problem solved and show the Ratio with total number
     * @param id
     */
    async fetch_Solved_Ratio({id}: {id: string}) {
        const totalQuestions = await this.repository._fetchTotalNumberOfQuestion()
        const solvedQuestions = await this.repository._solvedQuestionCount({id})

        return {
            totalQuestions: totalQuestions.data,
            solvedQuestions: solvedQuestions.data
        }
    }



    // async fetch_created_Probelm_list({id}: {id: string}): Promise<Firebase_Response> {
    //
    // }





}