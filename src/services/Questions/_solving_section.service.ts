
// services/_solving_section.service.js

import { db } from "../../firebase.js";
import {doc, getDoc, setDoc, addDoc, collection} from 'firebase/firestore'
import { Database, Firebase_Response } from "../../Utilities";
import Question from '../../models/Question_Model'
import { Solve_Model} from "../../models/Solve_Model";


export class SolveService {


    _Fetch_Question = async (id: string): Promise<Firebase_Response> => {

        try {

            const docRef = doc(db, Database.approvedQuestions, id)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
            else return { success: false, error: "No such document found" };




        } catch (error) {
            console.log(`Error FOund while Fetching from database ${error}`)
            return { success: false, error: error }
        }
    }

    // File: RunCodeAPI.js
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
            console.log('Function Called');

            // Reference to specific user's solvedProblems subcollection
            const userSolvedRef = doc(
                collection(db, Database.student, id, "solvedProblems"),
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

}

