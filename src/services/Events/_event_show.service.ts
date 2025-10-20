

import { FirebaseEventRepository } from './_repositories/_IEventRepository'

export class EventShowService {

    private repository : FirebaseEventRepository;
    constructor() {
        this.repository  = new FirebaseEventRepository();
    }


    /**
     * Fetch All Event from Database of a User
     * @param uid
     * @constructor
     * @return all event object
     */
    GetAllEvents = async (uid: string = '') => {
        if (uid.length==0) return this.repository._GetAllEventById(uid)
        else return this.repository._FetchAllEvent();
    };


    /**
     * Delete Event From Database
     * @param eventID
     * @constructor
     */
    Delete_Event = async (eventID: string) => {
        return this.repository._Delete_Event(eventID)
    };
}


