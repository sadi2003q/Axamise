
// File Path: src/services/_event_create.service.js


import { FirebaseEventRepository } from './_repositories/_IEventRepository'
import {Events_Model} from "../../models/Event_Model.js";



export class EventCreateService {

    private repository: FirebaseEventRepository;
    private readonly event: Events_Model;

    constructor(event: Events_Model) {
        this.event = event;
        this.repository = new FirebaseEventRepository();
    }


    /**
     * Upload an event to the Database
     */
    _Upload_Event = async () => {
        console.log('_Upload Event()  ---  event_create_service')
        return this.repository._Create_Event(this.event)
    };


    /**
     * 🔹 Update an existing event by UID
     * @param {string} uid - Event ID
     */
    _Update_Event = async (uid : string) => {
        console.log('_Update Event()  ---  event_create_service')
        return this.repository._UpdateEvent(uid, this.event)
    };



    /**
     * Fetch a single event by its ID
     * @param {string} eventID - UID of the event
     */
    _Fetch_Event = async (eventID: string) => {
        console.log('_Fetch event()  ---  event_create_service')
        return this.repository._Fetch_Event(eventID);
    };


}














