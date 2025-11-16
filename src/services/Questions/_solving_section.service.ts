
// services/_solving_section.service.js

import { db } from "../../firebase.js";
import {doc, getDoc, setDoc, updateDoc, collection} from 'firebase/firestore'
import {Database, EVENT_STATE, Firebase_Response} from "../../Utilities";
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
            console.log(`Error Found while Fetching from database ${error}`)
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


    _SetEventScore = async ({
        userID,
        name,
        eventID,
        score,
        state,
        timeComplexity,
    }: {
        userID: string,
        name: string,
        eventID: string,
        score: string,
        state: string,
        timeComplexity: string,
    }): Promise<Firebase_Response> => {
        try {
            // Reference the ScoreCard subcollection
            const scoreCardRef = collection(db, Database.event, eventID, Database.eventScoreCard);

            // Create a new document with auto-generated ID
            const newScoreRef = doc(scoreCardRef, userID);
            await setDoc(newScoreRef, {
                userID,
                name,
                score,
                state,
                timeComplexity,
                createdAt: new Date().toISOString(),
            });

            return {
                success: true,
                message: "Score added successfully!",
            };
        } catch (error) {
            console.error("Error while setting event score:\n", error);
            return {
                success: false,
                message: `Error setting event score: ${(error as Error).message}`,
            };
        }
    };


    /**
     * This will update the score in the event and student database for the particular event
     * @param userID
     * @param eventId
     * @param score
     * @param submitCount
     */
    _ModifyScoreAfterRun = async ({userID, eventId, score, submitCount}: {userID: string, eventId: string, score: number, submitCount: number}) : Promise<Firebase_Response> =>{
        try {

            const studentRef = doc(db, Database.student, userID, Database.participatedEvent, eventId);
            const eventRef = doc(db, Database.event, eventId, Database.event_participants, userID);


            await updateDoc(studentRef, {
                score: score,
                eventState: EVENT_STATE.solved,
                submitCount: submitCount

            });
            await updateDoc(eventRef, { points: score });


            return {
                success: true,
                message: `successfully Modified score to ${score}`,
            }
        } catch (error) {
            console.error(`Error deleting the event: ${error}`);
        }
    }


    _AddToSolverList = async ({userID, questionID}: {userID: string, questionID: string}): Promise<Firebase_Response> => {
        try {

            const questionRef = doc(db, Database.question, questionID, Database.eventSolverList, userID);

            await setDoc(questionRef, {
                userID: userID,
                questionID: questionID,
                date: new Date().toISOString(),
            })




            return {
                success: true,
                message: `User: ${userID} successfully added to SolverList`,
            }

        } catch (error) {
            console.error("Error adding the event addToSolverList:\n", error);
        }

    }



}

