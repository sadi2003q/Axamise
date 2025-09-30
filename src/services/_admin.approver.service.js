/* eslint-disable no-unused-vars */


// File Path: services/_question_list.services.js

// Firestore connection from firebase
import { db } from "../firebase.js";
import { Database } from "../Utilities.js";
import { QuestionListService } from "./_question_list.service.js";

// Firestore methods
import { doc, collection, getDocs, deleteDoc, setDoc, serverTimestamp  } from "firebase/firestore";


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


    async approveQuestion(id, question) {
        try {

            // console.log(`Approving question with ID: ${id}`);
            


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
            console.log('Document successfully written!');
            
            this._Delete_Specific_Function(id);

            

        } catch (error) {
            console.log(`Error Found in admin approve service - approveQuestion(): ${error.message}`);
            return { success: false, error: error.message };

        }
    }



    






}
