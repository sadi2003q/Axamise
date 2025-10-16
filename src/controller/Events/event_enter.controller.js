
import { routes } from '../../Utilities.ts'
import { EventService } from "../../services/Events/_repositories/_factory.event.service.js";
import { SERVICE } from '../../Utilities.js'


export class EventEnterController  {

    constructor(){
        this.service = EventService.createService(SERVICE.EVENT_ENTER)
    }







}

