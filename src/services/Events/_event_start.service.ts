
import { FirebaseEventRepository } from './_repositories/_IEventRepository'
import { Participant } from '../../models/Participants_Model'
import {Firebase_Response} from "../../Utilities";


export class EventStartService {

    private repository: FirebaseEventRepository;

    constructor() {
        this.repository = new FirebaseEventRepository();
    }


    /**
     * Check for Previous User or new User for the event
     * (Can be used to prevent multiple entry)
     * @param eventID
     * @param participatorName
     * @param participatorID
     * @constructor
     */
    UserInfoManagement = async ({eventID, participatorName, participatorID}: {
        eventID: string,
        participatorName: string,
        participatorID: string
    }) => {

        this.repository._CheckEntryForEvent(eventID, participatorID).then((response) => {

            if(!response.data) {
                const model = new Participant({

                    uid: participatorID,
                    name: participatorName,
                    date: new Date().toISOString(),
                    submitCount: 0,
                    points : 0

                })

                this.repository._MakeNewEntryForEvent(eventID, model).then(() => {}).catch((error) => {
                    console.error(error)
                })
            }



        }).catch((error) => {
            console.error(error);
        })
    }


    /**
     * This function will check if the user as already entered for this event or not
     * @param eventID
     * @param userID
     * @constructor
     */
    EntryRegulator = async ({
        eventID,
        userID,
    }: {
        eventID: string;
        userID: string;
    }): Promise<Firebase_Response> => {
        try {
            const response = await this.repository._CheckEntryForEvent(eventID, userID);

            console.log('response from service file: ', response.data)

            return {
                success: true,
                data : response.data
            }
        } catch (error) {
            console.error(error);
            return {
                success: false,
                data: null,
                message: error instanceof Error ? error.message : 'Unknown error occurred',
            };
        }
    };


    FetchScoreCard= async ({eventId}: {eventId: string}): Promise<Firebase_Response> => {
        try {

            const response = await this.repository._FetchScoreCard(eventId)

            return {
                success: true,
                data: response.data
            }
        } catch (error) {
            console.error(error);
        }

    }

    AddToParticipationList = async ({id, eventId, title}: {id: string, eventId: string, title: string}): Promise<Firebase_Response> => {
        try {

            await this.repository._AddParticipation({id: id, eventID: eventId, title: title});

            return {
                success: true,
                message: 'Participation is being Added'
            }

        } catch (error) {
            console.error(error);
        }
    }


    FetchAllParticipationList = async ({eventID}: {eventID: string}): Promise<Firebase_Response> => {

        return await this.repository._FetchAllParticipants(eventID);
    }

}





