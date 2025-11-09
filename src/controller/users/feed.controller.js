
import { FeedService } from "../../services/users/_Feed.service.js";
import {routes, DIFFICULTY} from "../../Utilities.js";

export class FeedController {
    constructor(setRandomEvent,
                setRandomQuestion,
                navigate,

                setEasyQuestionCount,
                setMediumQuestionCount,
                setHardQuestionCount,

                setSolvedQuestionCount,
                setTotalNumberOfQuestions
        ) {
        // Server class
        this.service = new FeedService();

        // Attribute
        this.setRandomEvent = setRandomEvent;
        this.setRandomQuestion = setRandomQuestion;
        this.navigate = navigate;

        this.setEasyQuestionCount = setEasyQuestionCount;
        this.setMediumQuestionCount = setMediumQuestionCount;
        this.setHardQuestionCount = setHardQuestionCount;

        this.setSolvedQuestionCount = setSolvedQuestionCount;
        this.setTotalNumberOfQuestions = setTotalNumberOfQuestions
    }

    async fetchQuestionHandler () {
        const response = await this.service._Fetch_Questions()

        console.log('\n\n\ndata(Question)', response.data)
        this.setRandomQuestion(response.data)
    }

    async fetchEventHandler () {
        const response = await this.service._Fetch_Events()

        console.log('\n\n\ndata(Event)', response.data)
        this.setRandomEvent(response.data)
    }


    handleNavigation_EventEnter = (item) => {
        this.navigate(routes.event_enter, { state: {item: item} });
    }

    handleNavigation_MoreEvent = () => {
        this.navigate(routes.event_show)
    }


    async fetchQuestionCount_byDifficulty ({ difficulty }) {
        const response = await this.service._Fetch_DifficultyCount({ difficulty });
        switch (difficulty){
            case DIFFICULTY.easy:
                this.setEasyQuestionCount(response.data)
                break;
            case DIFFICULTY.medium:
                this.setMediumQuestionCount(response.data)
                break;
            case DIFFICULTY.hard:
                this.setHardQuestionCount(response.data)
                break;
            default:
                this.setHardQuestionCount(response.data)
        }
    }

    async fetchTotalNumberOfQuestions () {
        const response = await this.service._Fetch_QuestionCount()
        this.setTotalNumberOfQuestions(response.data)
    }

    async fetchSolvedQuestions_count ({id}) {
        const response = await this.service._Fetch_QuestionCount({ id });
        this.setSolvedQuestionCount(response.data)
    }









}


