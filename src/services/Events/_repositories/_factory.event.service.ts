
import { EventCreateService } from '../_event_create.service'
import { EventShowService } from '../_event_show.service'
import { EventStartService } from '../_event_start.service';

import {Events_Model} from "../../../models/Event_Model.js";


import { SERVICE } from "../../../Utilities";

export class EventService {
    static createService(type: string = SERVICE.EVENT_SHOW, event: Events_Model = new Events_Model()) : any {
        switch (type) {
            case SERVICE.EVENT_CREATE:
                return new EventCreateService(event)
            case SERVICE.EVENT_SHOW:
                return new EventShowService()
            case SERVICE.EVENT_ENTER:
                return new EventStartService()
            default:
                throw new Error('type didnt match to any service class')
        }
    }
}





