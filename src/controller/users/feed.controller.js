
import { FeedService } from "../../services/users/_Feed.service.js";
import {routes, DIFFICULTY, QUESTION_CATEGORY, CACHE_STATE} from "../../Utilities.js";
import {LocalCache} from "../../localCache.js";

export class FeedController {
    constructor(setRandomEvent,
                setRandomQuestion,
                navigate,

                setEasyQuestionCount,
                setMediumQuestionCount,
                setHardQuestionCount,

                setSolvedQuestionCount,
                setTotalNumberOfQuestions,
                setQuestionCount_Category,
                setError
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
        this.setTotalNumberOfQuestions = setTotalNumberOfQuestions;
        this.setQuestionCount_Category = setQuestionCount_Category;


        this.cache = new LocalCache(CACHE_STATE.eventCache);
        this.questionCache = new LocalCache(CACHE_STATE.questionCache);

        this.setError = setError;

    }

    async fetchQuestionHandler () {

        const cache = this.questionCache.load();
        if(cache) {
            const shuffled = [...cache].sort(() => Math.random() - 0.5);

            // Pick first 5 elements
            const selected = shuffled.slice(0, Math.min(8, shuffled.length));
            this.setRandomQuestion(selected)
        }


        const response = await this.service._Fetch_Questions()
        const data = response.data;

        if(!this.questionCache.isSame(data)) this.questionCache.save(data);


        const shuffled = [...data].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, Math.min(8, shuffled.length));
        this.setRandomQuestion(selected)


        console.log(`question length : ${selected.length}`);
        console.log(`data length : ${data.length}`);



    }

    async fetchEventHandler () {

        const cache = this.cache.load();
        if(cache) {
            const shuffled = [...cache].sort(() => Math.random() - 0.5);

            // Pick first 5 elements
            const selected = shuffled.slice(0, Math.min(8, shuffled.length));
            this.setRandomEvent(selected)


        }



        const response = await this.service._Fetch_Events()

        if(response.success) {
            const data = response.data

            if(!this.cache.isSame(data)) this.cache.save(data);


            const shuffled = [...data].sort(() => Math.random() - 0.5);
            const selected = shuffled.slice(0, Math.min(8, shuffled.length));
            this.setRandomEvent(selected)
            console.log(`event length : ${selected.length}`);
            console.log(`data length : ${data.length}`);
        } else {
            this.setError(response.message)
        }



    }


    handleNavigation_EventEnter = (item) => {
        this.navigate(routes.event_enter, { state: {item: item} });
    }

    handleNavigation_MoreEvent = () => {
        this.navigate(routes.event_show)
    }

    handleNavigation_MoreQuestion = () => {
        this.navigate(routes.question_list)
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
        console.log(response.message)
        this.setTotalNumberOfQuestions(response.data)
    }

    async fetchSolvedQuestions_count ({id}) {
        const response = await this.service._Fetch_SolvedCount({ id });
        console.log(response.message)
        this.setSolvedQuestionCount(response.data)
    }

    async fetchQuestionCount_byCategory() {
        const categories = Object.values(QUESTION_CATEGORY)

        for (const category of categories) {
            const response = await this.service._Fetch_QuestionByCategory({ category });
            console.log(response.message)
            this.setQuestionCount_Category(prev => ({
                ...prev,
                [category]: response.data, // ✅ use bracket notation (not 'category')
            }));
        }
    }










}


