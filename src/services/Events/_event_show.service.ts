

import { FirebaseEventRepository } from './_repositories/_IEventRepository'

export class EventShowService {

    private repository : FirebaseEventRepository;
    constructor() {
        this.repository  = new FirebaseEventRepository();
    }


    // Retrieve all Events created by a specific user
    GetAllEvents = async (uid: string = '') => {
        if (uid.length==0) {
            return this.repository._GetAllEventById(uid)
        } else {
            return this.repository._FetchAllEvent();
        }

        // return this.repository._GetAllEventById("zVBnuDS61ebbM4XnpHBCHj7fcf82")

    };


    fetchAllEvents = async () => {

    }

    Delete_Event = async (eventID: string) => {
        return this.repository._Delete_Event(eventID)
    };
}


