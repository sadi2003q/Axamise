
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

        console.log('\n\nParameter check from controller class')
        console.log('userID: ' + userID);
        console.log('eventID: ' + eventID)

        /**
         * eventID: string,
         *         participatorName: string,
         *         participatorID: string
         */


        this.service.UserInfoManagement({
            eventID: eventID,
            participatorName: name,
            participatorID: userID, // ✅ match the service parameter
        }).then((response) => {
            console.log('response : ', response)
        });

    }

}

