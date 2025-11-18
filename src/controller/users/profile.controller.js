
import { _profileService } from '../../services/users/_profile.service.ts';




export class ProfileController {

    constructor(setUser,
                setTotalQuestionCount,
                setSolvedQuestionCount,

                setMyEventParticipant,
                setMyParticipatedEvent,
                setMySolvedQuestions,
                setMyCreatedQuestions
    ) {
        this.service = new _profileService();

        this.setUser = setUser;
        this.setTotalQuestionCount = setTotalQuestionCount;
        this.setSolvedQuestionCount = setSolvedQuestionCount;

        this.setMyEventParticipant = setMyEventParticipant;
        this.setMyParticipatedEvent = setMyParticipatedEvent;
        this.setMySolvedQuestions = setMySolvedQuestions;
        this.setMyCreatedQuestions = setMyCreatedQuestions;
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


    async getMyParticipatedEventInformation({userID}) {
        const response = await this.service.Fetch_My_Participated_Event_Information({userID: userID})
        this.setMyParticipatedEvent(response.data)
    }

    async getMyEventParticipant({userID}) {
        const response = await this.service.Fetch_Created_Event_by_Id({id: userID})

        const finalData = [];


        response.data.map(async (item) => {
            const participantCount = await this.service.Fetch_Event_Participation_Count({eventID: item.id})
            finalData.push({
                title: item.title,
                count: participantCount.data,
            })

        })
        this.setMyEventParticipant(finalData)

    }

    async getMySolvedQuestionList({userID}) {
        const response = this.service.Fetch_Solved_Questions_list({id: userID})
        this.setMySolvedQuestions(response.data)
    }

    async getMyQuestionParticipatedInformation({userID}) {
        const response = await this.service.Fetch_Question_Created_ByUser({id: userID})
        const finalData = [];


        response.data.map(async (item) => {
            const participantCount = await this.service.Fetch_Question_Participant_Count({questionId:item.id})
            finalData.push({
                title: item.title,
                count: participantCount.data,
            })
            this.setMyCreatedQuestions(finalData)
        })

    }









}