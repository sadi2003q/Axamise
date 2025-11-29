
import { UsersRepository} from "./repository";
import {Firebase_Response} from "../../Utilities";

export class _profileService {
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






    async Fetch_Created_Event_by_Id({id}: {id: string}) {
        return await this.repository._fetch_Event_Created_by_user({id: id})
    }


    async Fetch_Question_Created_ByUser({id}: {id: string}) {
        return await this.repository._fetch_Question_created_by_user({id: id})
    }

    async Fetch_Solved_Questions_list({id}: {id: string}) {
        return await this.repository._fetch_solved_Questions_list({id: id})
    }

    async Fetch_Question_Participant_Count({questionId}: {questionId: string}) {
        return await this.repository._Fetch_Question_Participation_Count({questionID: questionId})
    }

    async Fetch_Event_Participation_Count({eventID}: {eventID: string}) {
        return await this.repository._Fetch_Event_Participant_Count({eventID: eventID})
    }

    async Fetch_My_Participated_Event_Information({userID}: {userID: string}) {
        return this.repository._fetch_participated_Event_Information({id: userID})
    }

    async Fetch_Question_Name({questionId}: {questionId: string}) {
        return this.repository._Fetch_Solved_Question_name({questionID: questionId})
    }


    async Fetch_Relevant_Counts({userID, type}: {userID: string, type: string}) {
        return this.repository._Fetch_Problem_EventCount({userID: userID, type: type})
    }



    async Fetch_Question_Participation_Count({questionId}: {questionId: string}) {
        return this.repository._Fetch_Question_Participation_Count({questionID: questionId})
    }





}