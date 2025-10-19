
import { routes } from '../../Utilities.ts'
import { EventService } from "../../services/Events/_repositories/_factory.event.service.js";
import { SERVICE } from '../../Utilities.js'
import { Participant } from "../../models/Participants_Model.js";

export class EventEnterController  {

    constructor(navigate){
        this.service = EventService.createService(SERVICE.EVENT_ENTER)
        this.navigate = navigate;
    }


    _handleNavigation_EventSolve(item){
        this.navigate(routes.solving_page, { state: {event: item} } );
    }

    _handleUserInformationForEvent({eventID, userID, name}) {

        const participant = new Participant({
            id: userID,
            name: name,
            date: Date.now(),
            points: 0
        })

        this.service.UserInfoManagement({eventID: `${eventID}`, participator: participant}).then(() => {

        }).catch((err) => {
            console.log(err)
        })
    }

}

