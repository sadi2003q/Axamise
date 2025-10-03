

import { FirebaseEventRepository } from './_repositories/_IEventRepository'

export class EventShowService {

    private repository : FirebaseEventRepository;
    constructor() {
        this.repository  = new FirebaseEventRepository();
    }


    // Retrieve all Events created by a specific user
    GetAllEvents = async (uid: string) => {
        return this.repository._GetAllEventById(uid)
    };

    Delete_Event = async (eventID: string) => {
        return this.repository._Delete_Event(eventID)
    };
}


