
import { FirebaseEventRepository } from './_repositories/_IEventRepository'



export class EventStartService {

    private repository: FirebaseEventRepository;

    constructor() {
        this.repository = new FirebaseEventRepository();
    }

}





