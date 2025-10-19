
// services/_solving_section.service.js

import { db } from "../../firebase.js";
import {doc, getDoc, setDoc, addDoc, collection} from 'firebase/firestore'
import { Database, Firebase_Response } from "../../Utilities";
import Question from '../../models/Question_Model'
import { Solve_Model} from "../../models/Solve_Model";


export class SolveService {

    /**
     * Fetch the Problem from database
     * @param question_id - ID of the specific question
     * @returns Firebase_Response
     *  returns the question
     */
    _Fetch_Question = async (question_id: string): Promise<Firebase_Response> => {

        try {
            const docRef = doc(db, Database.approvedQuestions, question_id)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
            else return { success: false, error: "No such document found" };
        } catch (error) {
            console.log(`Error FOund while Fetching from database ${error}`)
            return { success: false, error: error }
        }
    }

    /**
     * Run the code
     * @param sourceCode - Code that user write
     * @return Firebase_Response
     *   - Returns no error if all test cases are Correct
     *   - Returns error if any syntax or any kind of error or tase case didn't match
     */
    runCode = async (sourceCode: string): Promise<Firebase_Response> => {
        try {
            const response = await fetch("https://emkc.org/api/v2/piston/execute", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    language: "cpp",
                    version: "10.2.0", // GCC 10.2
                    files: [
                        {
                            name: "main.cpp",
                            content: sourceCode
                        }
                    ]
                })
            });

            const result = await response.json();

            // success response
            return {
                success: true,
                output: result.run.stdout,
                error: result.run.stderr,
            };
        } catch (error) {
            console.error("Error while running code:", error);
            return { success: false, error: error.message };
        }
    };

    /**
     * Approve a solved problem and store it in the user's subcollection
     * @param id - User ID
     * @param solver - Solve_Model instance
     * @returns Firebase_Response
     */
    solve_approve = async (id: string, solver: Solve_Model): Promise<Firebase_Response> => {
        try {

            // Reference to specific user's solvedProblems subcollection
            const userSolvedRef = doc(
                collection(db, Database.student, id, Database.solvedProblems),
                solver.question_id // set document ID = question_id
            );

            // Set document data (creates or updates)
            await setDoc(userSolvedRef, {
                solver_id: solver.solver_id,
                question_id: solver.question_id,
                date: solver.date,
                solve_code: solver.solve_code,
                event_id: solver.event_id || "not assigned",
            });

            console.log("Solve Accepted");

            return {
                success: true,
                message: `Problem ${solver.question_id} successfully stored for user ${id}`,
            };
        } catch (error) {
            console.error("Error Found while uploading Solver:\n", error);
            return {
                success: false,
                message: "Error uploading solve data.",
            };
        }
    };


    /**
     * Check if the **Problem** has already been solved or not
     * @param user_id - The collection where the subcollection exist
     * @param question_id - the QuestionID I am looking at
     * @returns Firebase_Response
     *  return true if the collection is found within the database
     */
    _CheckIfSolved = async ({
         user_id,
         question_id,
     }: {
        user_id: string;
        question_id: string;
    }): Promise<Firebase_Response> => {
        try {
            const docRef = doc(db, Database.student, user_id, Database.solvedProblems, question_id);
            const docSnap = await getDoc(docRef);
            return {
                success: true,
                data: docSnap.exists()
            }
        } catch (error) {

        }
    }


    _EventApprovement = async ({userID, eventID}: {
        userID: string;
        eventID: string;
    }) : Promise<Firebase_Response> => {
        try {

            const userSolvedRef = doc(
                collection(db, Database.event, eventID, Database.event_participants),
                userID // set document ID = question_id
            );


            return {
                success: true,
                data: 'new Id is created',
            }



        } catch (error) {
            console.error("Error while attempting to approve problem:\n", error);
        }
    }








}

