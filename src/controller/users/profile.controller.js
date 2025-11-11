
import { ProfileService } from '../../services/users/profile.service.js';




export class ProfileController {

    constructor(setUser,  setTotalQuestionCount, setSolvedQuestionCount) {
        this.service = new ProfileService();

        this.setUser = setUser;
        this.setTotalQuestionCount = setTotalQuestionCount;
        this.setSolvedQuestionCount = setSolvedQuestionCount;
    }


    async getProfileInformation({id}) {
        const response = await this.service.fetch_users_Information({id})
        console.log(response.data)
        this.setUser(response.data)
    }


    async getSolvedRatio({id}) {
        const response = await this.service.fetch_Solved_Ratio({id: id})
        this.setTotalQuestionCount(response.totalQuestions)
        this.setSolvedQuestionCount(response.solvedQuestions)
    }









}