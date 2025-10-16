
import { routes } from '../../Utilities.ts'
import { EventService } from "../../services/Events/_repositories/_factory.event.service.js";
import { SERVICE } from '../../Utilities.js'


export class EventEnterController  {

    constructor(navigate){
        this.service = EventService.createService(SERVICE.EVENT_ENTER)
        this.navigate = navigate;
    }


    _handleNavigation_EventSolve(item){
        this.navigate(routes.solving_page, { state: {event: item} } );
    }







}

