
import { FirebaseEventRepository } from './_repositories/_IEventRepository'
import { Participant } from '../../models/Participants_Model'


export class EventStartService {

    private repository: FirebaseEventRepository;

    constructor() {
        this.repository = new FirebaseEventRepository();
    }


    // Enter Data into the Database for Participator
    UserInfoManagement = async ({eventID, participatorName, participatorID}: {
        eventID: string,
        participatorName: string,
        participatorID: string
    }) => {

        console.log('\n\nParameter check from Server class')
        console.log('userID: ' + participatorID);
        console.log('eventID: ' + eventID)


        this.repository._CheckEntryForEvent(eventID, participatorID).then((response) => {
            console.log('response from server class : ', response.data);

            if(!response.data) {
                const model = new Participant({

                    uid: participatorID,
                    name: participatorName,
                    date: new Date().toISOString(),
                    submitCount: 0,
                    points : 0

                })

                this.repository._MakeNewEntryForEvent(eventID, model).then(() => {
                    console.log(response.data)
                })



            }



        }).catch((error) => {
            console.error(error);
        })
    }



}





