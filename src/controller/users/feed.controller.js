
import { FeedService } from "../../services/users/_Feed.service.js";
import {routes} from "../../Utilities.js";

export class FeedController {
    constructor(setRandomEvent, setRandomQuestion, navigate) {
        // Server class
        this.service = new FeedService();

        // Attribute
        this.setRandomEvent = setRandomEvent;
        this.setRandomQuestion = setRandomQuestion;
        this.navigate = navigate;
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






}


