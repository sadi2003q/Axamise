
import { FirebaseEventRepository } from './_repositories/_IEventRepository'
import { Participant } from '../../models/Participants_Model'


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

}





