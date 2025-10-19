
import { FirebaseEventRepository } from './_repositories/_IEventRepository'
import { Participant } from '../../models/Participants_Model'


export class EventStartService {

    private repository: FirebaseEventRepository;

    constructor() {
        this.repository = new FirebaseEventRepository();
    }


    // Enter Data into the Database for Participator
    UserInfoManagement = async ({
                                    eventID,
                                    participator,
                                }: {
        eventID: string;
        participator: Participant;
    }): Promise<void> => {
        try {

            console.log('funciton is called')
            const response = await this.repository._CheckEntryForEvent(eventID, participator.uid);

            if (!response.success) {
                console.error("Failed to check participant entry:", response.error);
                return;
            }

            // If user already exists, skip creating a new entry
            if (response.data === true) {
                console.log("Already participated in this event");
                return;
            }

            // Otherwise, create a new participant entry
            const creation = await this.repository._MakeNewEntryForEvent(eventID, participator);

            if (creation?.success) {
                console.log("✅ Successfully added new participant entry");
            } else {
                console.error("❌ Failed to create participant entry:", creation?.error);
            }

        } catch (error) {

        }
    };


}





