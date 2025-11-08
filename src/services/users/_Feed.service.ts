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

}

