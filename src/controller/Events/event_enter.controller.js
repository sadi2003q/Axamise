
import { routes } from '../../Utilities.ts'
import { EventService } from "../../services/Events/_repositories/_factory.event.service.js";
import { SERVICE } from '../../Utilities.js'
import { Participant } from "../../models/Participants_Model.js";

export class EventEnterController  {

    constructor(navigate, setCurrentScoreState){
        this.service = EventService.createService(SERVICE.EVENT_ENTER)
        this.navigate = navigate;
        this.setCurrentScoreState = setCurrentScoreState

    }

    /**
     * This will help them to navigate into another page
     * @param item
     * @private
     */
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

    async _handleFetchScoreCard({eventID}) {
        try {
            const response = await this.service.FetchScoreCard({eventId: eventID})
            console.log('response : ', response.data)
            this.setCurrentScoreState(response.data);

        } catch (error) {
            console.error(error);
        }
    }

    addEventToParticipation = async ({
         eventID = '',
         id = '',
         title = ''
     }) => {
            try {

                console.log('\n\nParameter check from controller class')
                console.log('eventID: ' + eventID);

                await this.service.AddToParticipationList({
                    id: id,
                    title: title,
                    eventId: eventID
                })

            } catch(error) {
                console.error(error)
            }
    }



    sortParticipants = async ({eventID}) => {
        const res = await this.service.FetchAllParticipationList({eventID: eventID});
        if(res.data.length > 0){
            console.log('Here are all Participants ', res.data);
        } else {
            console.log('No participation found this Event');
        }
    }





}










