

import {Database, Firebase_Response} from "../../Utilities";
import {collection,writeBatch, addDoc, getCountFromServer,  query, where, getDocs, doc, getDoc, deleteDoc, QueryDocumentSnapshot, orderBy,
    limit} from "firebase/firestore";
import { db } from "../../firebase.js";
import { Notification } from '../../models/Notification_Model'
import { DIFFICULTY } from "../../Utilities";


interface IUsersRepository {
    _MakeNotification(notificationData: Notification): Promise<Firebase_Response>;
    _GetNotificationById(id: string): Promise<Firebase_Response>;
    _DeleteAllNotification(id: string): Promise<Firebase_Response>;
    _DeleteNotification(notificationID: string): Promise<Firebase_Response>;
    _ReadNotifications(id: string): Promise<Firebase_Response>;




}

export class UsersRepository implements IUsersRepository{

    /**
     * Notifications Service
     */

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


    /**
     * Feed Service
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
                limit(5)
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
                limit(5)
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
     * Fetch the total number of question Available into the server
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
     * Fetch the count of question for each difficulty
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
                message: `Count from Server for Difficulty Count: ${count ?? 0}`
            }

        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Fetching solved question count from the database
     * @param id  (userID)
     * @param difficulty
     */
    async _solvedQuestionCount_byDifficulty({id}: {id: string}): Promise<Firebase_Response> {
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








}












