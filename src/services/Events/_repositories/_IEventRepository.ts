
import { Events_Model } from '../../../models/Event_Model'
import { Firebase_Response} from "../../../Utilities";
import { db } from "../../../firebase";
import { collection, doc, setDoc, addDoc, getDoc, query, where, getDocs, deleteDoc} from "firebase/firestore";
import { Database } from '../../../Utilities'
import { EVENT_APPROVAL_STATUS } from '../../../Utilities'
import { Participant } from '../../../models/Participants_Model'



interface IEventRepository {
    _Create_Event(event: Events_Model) : Promise<Firebase_Response>
    _UpdateEvent(id: string, event: Events_Model) : Promise<Firebase_Response>
    _Fetch_Event(eventID: string): Promise<Firebase_Response>
    _GetAllEventById(id: string) : Promise<Firebase_Response>
    _Delete_Event(eventID: string): Promise<Firebase_Response>
}



export class FirebaseEventRepository implements IEventRepository {

    async _Create_Event(event: Events_Model) : Promise<Firebase_Response> {
        try {
            const docRef = await addDoc(collection(db, Database.event), {
                title: event.title,
                startTime: event.startTime,
                status: 'pending',
                description: event.description,
                hours: event.duration?.hours ?? 0,
                minutes: event.duration?.minutes ?? 0,
                date: event.date,
                createdBy: event.createdBy,
                createdBy_uid: event.createdBy_uid,
                allQuestions: event.allQuestions
            });

            return {
                success: true,
                data: { ...event, id: docRef.id },

            };
        } catch (error) {
            console.error("❌ Error creating event:", error);
            return { success: false, error: error.message || error };
        }
    }

    async _UpdateEvent(id: string, event: Events_Model): Promise<Firebase_Response> {
        try {
            const docRef = doc(db, "Events", id);
            await setDoc(
                docRef,
                {
                    title: event.title,
                    startTime: event.startTime,
                    description: event.description,
                    hours: event.duration?.hours ?? 0,
                    minutes: event.duration?.minutes ?? 0,
                    date: event.date,
                    createdBy: event.createdBy,
                    createdBy_uid: event.createdBy_uid,
                },
                { merge: true }
            );

            return {
                success: true,
                data: { ...event, id: id },

            };
        } catch (error) {
            console.error("❌ Error updating event:", error);
            return { success: false, error: error.message || error };
        }
    }

    async _Fetch_Event(eventID: string) : Promise<Firebase_Response> {
        try {
            const eventRef = doc(db, "Events", eventID); // Reference to the specific document
            const eventSnap = await getDoc(eventRef); // Fetch the document

            if (eventSnap.exists()) {
                return { success: true, data: { id: eventSnap.id, ...eventSnap.data() } }; // Document found
            } else {
                return { success: false, error: "Event not found" }; // Document not found
            }
        } catch (error) {
            console.error(`❌ Error fetching the event: ${error}`);
            return { success: false, error: error.message || error };
        }
    }

    async _GetAllEventById(id: string) : Promise<Firebase_Response> {
        try {
            console.log(`id : ${id}`)
            // Reference to "Events" collection
            const eventsRef = collection(db, Database.event);

            // Query for events where createdBy_uid == uid
            const q = query(
                eventsRef,
                where("createdBy_uid", "==", id),
                where("status", "==", EVENT_APPROVAL_STATUS.approved)
            );

            // Execute query
            const querySnapshot = await getDocs(q);

            // Map documents into array
            const events = querySnapshot.docs.map((doc) => ({
                id: doc.id,       // include doc id
                ...doc.data(),    // spread event fields
            }));

            return { success: true, data: events };
        } catch (error) {
            console.error("Error retrieving events:", error);
            return { success: false, error };
        }
    }

    async _FetchAllEvent(): Promise<Firebase_Response> {
        try {
            // Reference to the "Events" collection
            const eventsRef = collection(db, Database.event);

            // Query only approved events
            const q = query(eventsRef, where("status", "==", EVENT_APPROVAL_STATUS.approved));

            // Execute query
            const querySnapshot = await getDocs(q);

            // Map each document to a structured object
            const events = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            return {
                success: true,
                data: events,
            };
        } catch (error) {
            console.error("❌ Error fetching approved events:", error);
            return {
                success: false,
                error: error.message || error,
            };
        }
    }

    async _Delete_Event(eventID: string): Promise<Firebase_Response> {
        try {
            if (!eventID) return { success: false, error: "No eventID provided" };

            // Reference to the specific document
            const eventRef = doc(db, "Events", eventID);

            // Delete the document
            await deleteDoc(eventRef);

            return { success: true, message: "Event deleted successfully" };
        } catch (error) {
            console.error(`Error deleting the event: ${error}`);
            return { success: false, error: error.message || error };
        }
    }


    /**
     * Make New Participant Into the Event
     * @param eventID
     * @param model - Data Collection, which will be set for the participator
     * @return Boolean
     */
    async _MakeNewEntryForEvent(eventID: string, model: Participant) : Promise<Firebase_Response> {
        try {

            const userSolvedRef = doc(
                collection(db, Database.event, eventID, Database.event_participants),
                model.uid // set document ID = question_id
            );

            await setDoc(userSolvedRef, {
                participator_name: model.name,
                date_of_participate: model.date,
                submitCount: 0,
                points: 0
            })
            console.log('User data is recorded')
            return {
                success: true,
                data: 'Data is Created'
            }

        } catch (error) {
            console.error('Error starting event data listening : ' + error.message || error);
        }
    }

    /**
     * Check if the User has already entered the Event or not
     * @param eventID
     * @param userID
     * @return Boolean
     */
    async _CheckEntryForEvent(eventID: string, userID: string) : Promise<Firebase_Response> {
        try {
            console.log('\n\nParameter check from repository class(_CheckEntryForEvent)')
            console.log('userID: ' + userID);
            console.log('eventID: ' + eventID)

            const docRef = doc(db, Database.event, eventID, Database.event_participants, userID);
            const docSnap = await getDoc(docRef);




            console.log('Response within repository class\n\n')
            if(docSnap.exists()) console.log('User Already exists for this event')
            else console.log('User is going for the First time')


            return {
                success: true,
                data: docSnap.exists()
            }

        } catch (error) {
            // console.error(error)
        }
    }



}










