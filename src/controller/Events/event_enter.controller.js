
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

    async _handleEventEntry({eventID, userID}) {
        try {

            const response = await this.service.EntryRegulator({eventID: eventID, userID: userID});

            console.log('response from controller file : ', response.data);

            return {
                success: true,
                data : response.data
            }

        } catch (error) {
            console.error(error);
        }
    }


}

