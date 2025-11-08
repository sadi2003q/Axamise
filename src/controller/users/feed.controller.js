
import { FeedService } from "../../services/users/_Feed.service.js";

export class FeedController {
    constructor(setRandomEvent, setRandomQuestion) {
        // Server class
        this.service = new FeedService();

        // Attribute
        this.setRandomEvent = setRandomEvent;
        this.setRandomQuestion = setRandomQuestion;
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








}


