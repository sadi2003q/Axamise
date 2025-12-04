/* eslint-disable no-unused-vars */


// File Path: services/_question_list.services.js

// Firestore connection from firebase
import { db } from "../../firebase.js";
import {Database, NOTIFICATION_TYPES} from "../../Utilities";
import { QuestionListService } from "../Questions/_question_list.service.js";

// Firestore methods
import {doc, collection, getDocs, deleteDoc, setDoc, serverTimestamp, addDoc} from "firebase/firestore";
import { BaseApprovalService } from './_base/_base.approval.service'
import { Firebase_Response} from "../../Utilities";
import Question from '../../models/Question_Model.js'


export class Admin_ApproveService extends QuestionListService {
    constructor() {
        super();
    }


    /**
     * Approves a question by its ID.
     * @param {*} id - The ID of the question to approve.
     * @param {*} question - The question data to approve.
     * @returns 
     */


    async ApproveQuestion(id: string, question: any) {
        try {




            await setDoc(doc(db, Database.approvedQuestions, id), {
                approvedAt: serverTimestamp(),
                approvedBy: question.approvedBy,
                approvedBy_uid: question.approvedBy_uid,
                createdBy: question.question.createdBy,
                createdBy_uid: question.question.createdBy_uid,
                description: question.question.description,
                difficulty: question.question.difficulty,
                event_uid: question.question.event_uid,
                functionName: question.functionName,
                mark: question.question.mark,
                returnType: question.returnType,
                status: question.status,
                title: question.question.title,
                type: question.question.type,
                mainFunctionCode: question.mainFunctionCode
            });
            await this._Delete_Specific_Function(id);


            await this.SendNotification({
                userID: question.question.createdBy_uid,
                questionID: question.question.id,
                title: `Question Approved!`,
                body: `Your Question :: ${question.question.title} is Successfully Approved`,
                eventID: '',
                status: NOTIFICATION_TYPES.approve_question
            })


            

        } catch (error) {
            console.log(`Error Found in admin approve service - approveQuestion(): ${error.message}`);
            return { success: false, error: error.message };

        }
    }


    SendNotification = async ({userID, questionID, title, body, eventID = '', status}: {
        userID: string,
        questionID: string,
        title: string,
        body: string,
        eventID: string,
        status: string
    }): Promise<Firebase_Response> => {
        try {
            console.log('function called')
            const notificationRef = collection(db, Database.notification);

            await addDoc(notificationRef, {
                recipientID: userID,
                questionID: questionID,
                date: new Date().toISOString(),
                eventID: eventID,
                title: title,
                body: body,
                status: status
            })

            return {
                success: true,
                message: `Sent notification encountered successfully!`,
            }

        } catch (error) {
            console.error("Error deleting the event encounter Problem:\n", error);
        }
    }
    






}
