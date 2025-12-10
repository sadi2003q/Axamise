

import {Database, Firebase_Response} from "../../Utilities";
import {collection,writeBatch, addDoc, getCountFromServer,  query, where, getDocs, doc, getDoc, deleteDoc, QueryDocumentSnapshot, orderBy,
    limit} from "firebase/firestore";
import { db } from "../../firebase.js";
import { Notification } from '../../models/Notification_Model'



interface IUsersRepository {
    _MakeNotification(notificationData: Notification): Promise<Firebase_Response>;
    _GetNotificationById(id: string): Promise<Firebase_Response>;
    _DeleteAllNotification(id: string): Promise<Firebase_Response>;
    _DeleteNotification(notificationID: string): Promise<Firebase_Response>;
    _ReadNotifications(id: string): Promise<Firebase_Response>;




}

export class UsersRepository implements IUsersRepository{

    // Notifications Service

    /**
     * This function will create notification on the database
     * @param notificationData
     * @constructor
     */
    async _MakeNotification(notificationData: Notification): Promise<Firebase_Response> {
        try {
            const docRef = await addDoc(collection(db, Database.notifications), notificationData);
            console.log("Notification created with ID:", docRef.id);
            return { success: true, id: docRef.id, message: 'Notification is being sent' };
        } catch (error) {
            console.error("Error creating notification:", error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Get All Notification from the database
     * @param id : user's ID
     * @returns Firebase_Response
     */
    async _GetNotificationById(id: string): Promise<Firebase_Response> {
        try {


            const q = query(
                collection(db, Database.notification),
                where('recipientID', '==', id) // Replace 'recipientId' with your actual field name
            );

            const querySnapshot = await getDocs(q);

            // Notification is found and not empty
            if (!querySnapshot.empty) {

                const notifications = querySnapshot.docs.map((doc: QueryDocumentSnapshot) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                console.log('Here are the notifications \n\n\n',  notifications);

                // Found notification
                return { success: true, data: notifications };
            }


            // If Fetching Notification create any problem
            return {
                success: false,
                data: []
            };

        } catch (e) {
            console.error(e);
        }
    }

    /**
     * Delete all Notification of the user
     * @param id
     */
    async _DeleteAllNotification(id: string): Promise<Firebase_Response> {
        try {


            // Query for documents where recipientId equals the provided id
            const q = query(
                collection(db, Database.notification),
                where('recipientId', '==', id) // Replace 'recipientId' with your actual field name if different
            );

            const querySnapshot = await getDocs(q);
            const deletePromises = querySnapshot.docs.map((docSnapshot) =>
                deleteDoc(doc(db, Database.notification, docSnapshot.id))
            );

            // Wait for all deletions to complete
            await Promise.all(deletePromises);

            return {
                success: true,
                data: { deletedCount: querySnapshot.size } // Optional: include count of deleted docs
            };

        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Delete Specific Notification
     * @param notificationID
     */
    async _DeleteNotification(notificationID: string): Promise<Firebase_Response> {
        try {

            console.log('Notification ID : ', notificationID);

            // Reference to the specific notification document
            const notificationRef = doc(db, Database.notification, notificationID);
            const notificationSnap = await getDoc(notificationRef);

            if (!notificationSnap.exists()) {
                return {
                    success: false,
                    data: { error: 'Notification not found' }
                };
            }


            // Delete the document
            await deleteDoc(notificationRef);

            return {
                success: true,
                data: { deletedId: notificationID },
                message: 'Notification deleted successfully'
            };
        } catch (e) {
            console.error(e);

        }
    }

    /**
     * This function will change the state of all notification to Read
     * @param id
     */
    async _ReadNotifications(id: string): Promise<Firebase_Response> {
        try {
            const q = query(
                collection(db, Database.notification),
                where('recipientID', '==', id)
            );

            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                return {
                    success: false,
                    message: `No notifications found for recipientId: ${id}`
                };
            }

            const batch = writeBatch(db);

            querySnapshot.forEach((docSnap) => {
                const notifRef = doc(db, Database.notification, docSnap.id);
                batch.update(notifRef, { isRead: true });
            });

            await batch.commit();

            console.log('All Function calling is done')

            return {
                success: true,
                message: 'All notifications marked as read successfully.'
            };
        } catch (error) {
            console.error('Error marking notifications as read:', error);
            return {
                success: false,
                message: 'Failed to mark notifications as read.'
            };
        }
    }




    // Feed Queries

    /**
     * Fetch Latest Random Event From database
     */
    async _fetchRandomEvent() : Promise<Firebase_Response> {
        try {
            // This will fetch all event
            // const eventRef = collection(db, Database.event);


            // this will fetch top 5 most recent event
            const eventRef = query(
                collection(db, Database.event),
                // Replace 'date' with the actual timestamp field in your Firestore documents (e.g. 'createdAt')
                // If you store Firestore Timestamp, this works fine.
                orderBy('date', 'desc'),
            );


            const snapshot = await getDocs(eventRef);

            if (snapshot.empty) {
                console.log('Event Database is empty')
                return {
                    success: true,
                    message: 'No event found',
                    data: []
                }
            }


            const data = snapshot.docs.map((doc: QueryDocumentSnapshot) => ({
                id: doc.id,
                ...doc.data()
            }))


            return {
                success: true,
                data: data,
                message: 'Message Return successful'
            }
        } catch (error) {
            console.error(error);
            return {
                success: false,
                message: 'Failed to fetch random event',
                error: error
            }
        }
    }

    /**
     * Random Question will be fetched via this function
     */
    async _fetchRandomQuestion(): Promise<Firebase_Response> {
        try {

            const questionRef = query(
                collection(db, Database.approvedQuestions),
                orderBy('approvedAt', 'desc'),
            )

            const snapshot = await getDocs(questionRef);

            if (snapshot.empty) {
                console.log('Question Database is empty')
                return {
                    success: true,
                    data: [],
                    message: 'No Question Found on the database'
                }
            }

            const data = snapshot.docs.map((doc: QueryDocumentSnapshot) => ({
                id: doc.id,
                ...doc.data()
            }))


            return {
                success: true,
                data: data,
                message: 'Question is being returned from database'
            }


        }  catch(e) {
            console.error(e);
        }
    }

    /**
     * Fetch Total Question Count from server
     */
    async _fetchTotalNumberOfQuestion(): Promise<Firebase_Response> {
        try {

            const snapshot = collection(db, Database.approvedQuestions);
            const response = await getCountFromServer(snapshot);
            const count = response.data().count ?? 0

            return {
                success: true,
                data: count
            }

        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Fetch Total Question Count Based on Difficulty
     * @param difficulty is the difficulty category of the question
     * @returns Firebase_Response
     */
    async _fetchDifficultyCount({difficulty}): Promise<Firebase_Response> {
        try {

            const snapshot = query(
                collection(db, Database.approvedQuestions),
                where('difficulty', '==', difficulty)
            )
            const response = await getCountFromServer(snapshot);
            const count = response.data().count ?? 0


            return {
                success: true,
                data: count,
                message: `Count from Server for ${difficulty} Count: ${count ?? 0}`
            }

        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Fetching Solved Question Count from the database
     * @param id  (userID)
     * @param difficulty
     */
    async _solvedQuestionCount({id}: {id: string}): Promise<Firebase_Response> {
        try {

            const snapshot = collection(db, Database.student, id, Database.solvedProblems)
            const response = await getCountFromServer(snapshot);
            const count = response.data().count ?? 0
             return {
                success: true,
                data: count,
                message: `Number of solved Question : ${count}`
            }

        } catch (error) {

        }
    }

    /**
     * Fetch Question from each type
     * @param category
     */
    async _fetchQuestionCount_byCategory({category}: {category: string}): Promise<Firebase_Response> {
        try {

            const documentSnapshot = query(
                collection(db, Database.approvedQuestions),
                where('type', '==', category)
            )

            const response = await getCountFromServer(documentSnapshot)
            const count = response.data().count ?? 0

            return {
                success: true,
                data: count,
                message: `Number of questions for ${category} Category : ${count}`
            }
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Fetch User Information from Database
     * @param id
     */
    async _fetch_userInformation({ id }: { id: string }): Promise<Firebase_Response> {
        try {
            // Reference the specific document
            const docRef = doc(collection(db, Database.student), id);

            // Get the document snapshot
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {

                return {
                    success: true,
                    message: "User Information Found",
                    data: docSnap.data(), // you can include document data here
                };
            } else {
                return {
                    success: false,
                    message: "User not found",
                };
            }
        } catch (error) {
            console.error(error);
            return {
                success: false,
                message: "Error fetching user information",
            };
        }
    }







    // Profile Page Functions

    /**
     * fetch User Created Event from Server
     * @param id
     */
    async _fetch_Event_Created_by_user({id} : {id: string}): Promise<Firebase_Response> {
        try {

            const eventSnapShot = query(
                collection(db, Database.event),
                where('createdBy_uid' , '==', id),
                where('status', '==', 'approved')
            )

            const response = await getDocs(eventSnapShot)
            const data = response.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));


            console.log("The data that is assigned:", data);

            return {
                success: true,
                data: data,
                message: `Response from Server : ${data}`
            }
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * fetch Questions Created by Server from Database
     * @param id
     */
    async _fetch_Question_created_by_user({id}: {id: string}): Promise<Firebase_Response> {
        try {

            const questionSnapshot = query(
                collection(db, Database.approvedQuestions),
                where('createdBy_uid' , '==', id)
            )

            const response = await getDocs(questionSnapshot);
            const data = response.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))


            return {
                success: true,
                data: data,
                message: `Response from Server : ${data}`
            }
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Fetch Solved Questions By server
     * @param id (user ID)
     */
    async _fetch_solved_Questions_list({id}: {id: string}): Promise<Firebase_Response> {
        try {
            const eventParticipateSnapshot = collection(db, Database.student, id, Database.solvedProblems);

            const response = await getDocs(eventParticipateSnapshot);
            const data = response.docs.map((doc) => {
                const raw = doc.data();
                const converted = {};

                for (const key in raw) {
                    const value = raw[key];

                    // Firestore Timestamp check
                    if (value?.seconds !== undefined && value?.nanoseconds !== undefined) {
                        converted[key] = value.toDate().toISOString(); // Convert to string
                    } else {
                        converted[key] = value;
                    }
                }

                return {
                    id: doc.id,
                    ...converted,
                };
            });


            return {
                success: true,
                data: data,
                message: "Participating User Information",
            }

        } catch (error) {
            console.error(error);
        }
    }




    /**
     * Fetch All those Event that was Participated
     * @param id
     */
    async _fetch_participated_Event_Information({id}: {id: string}): Promise<Firebase_Response> {
        try {

            const participatedEventRef = collection(db, Database.student, id, Database.participatedEvent);
            const response = await getDocs(participatedEventRef)

            const data = response.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))

            return {
                success: true,
                data: data,
                message: `Participating Event List : ${data}`,
            }

        } catch (error) {
            console.error(error);
        }
    }







    /**
     * Fetch the number of user solved the problem
     * @param questionID
     */
    async _Fetch_Question_Participation_Count({questionID}: {questionID: string}): Promise<Firebase_Response> {
        try {

            const ref = collection(db, Database.approvedQuestions, questionID, Database.SolvedQuestionList);

            const countSnapshot = await getCountFromServer(ref);

            const count = countSnapshot.data().count ?? 0;

            return {
                success: true,
                data: count,
                message: 'The Data receive from question is this : '
            }
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Fetch Event Participant count for each event
     * @param eventID
     * @constructor
     */
    async _Fetch_Event_Participant_Count({eventID}: {eventID: string}): Promise<Firebase_Response> {
        try {

            const eventRef = collection(db, Database.event, eventID, Database.event_participants);
            const countSnapshot = await getCountFromServer(eventRef);
            const count = countSnapshot.data().count ?? 0;

            console.log(`event id : ${eventID} count: ${count}`);


            return {
                success: true,
                data: count,
                message: 'The Data receive from question is this : '+count
            }

        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Return Question item from Approve Question database
     * @param questionID
     */
    async _Fetch_Solved_Question_name({questionID}: {questionID: string}): Promise<Firebase_Response> {
        try {
            const ref = doc(db, Database.approvedQuestions, questionID);
            const snapshot = await getDoc(ref);


            const data = snapshot.data();

            return {
                success: true,
                data: data,  // contains the question data
                message: "Name found"
            };

        } catch (error) {
            console.error(error);
            return {
                success: false,
                data: null,
                message: "Error fetching question"
            };
        }
    }

    /**
     * Fetch Count of relevant Events, Questions
     * @param userID
     * @param type
     */
    async _Fetch_Problem_EventCount({userID, type}: {userID: string, type: string}): Promise<Firebase_Response> {
        try {

            let database: string;

            switch (type.toLowerCase()) {
                case "encountered":
                    database = Database.problemEncounteredList; break;
                case "solved":
                    database = Database.SolvedQuestionList; break;
                case "participated":
                    database = Database.participatedEvent; break;
                default:
                    database = Database.SolvedQuestionList;

            }


            const questionRef = collection(db, Database.student, userID, database);

            const response = await getCountFromServer(questionRef)

            const count = response.data().count ?? 0

            return {
                success: true,
                data: count,
                message: "Encountered Question Count"
            }

        } catch (error) {
            console.error(error);
        }
    }


    async _Fetching_Question_Participation_Count({questionID}: {questionID: string}): Promise<Firebase_Response> {
        try {

            const ref = collection(db, Database.approvedQuestions, questionID, Database.SolvedQuestionList);
            const response = await getCountFromServer(ref);
            const count = response.data().count ?? 0

            return {
                success: true,
                data: count,
                message: "Encountered Question Count : " + count
            }


        } catch (error) {
            console.error(error);
        }
    }


}












