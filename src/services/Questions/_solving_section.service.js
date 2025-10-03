
// services/_solving_section.service.js

import { db } from "../../firebase.js";
import { doc, getDoc } from 'firebase/firestore'
import { Database } from '../../Utilities.ts'


export class SolveService {


    _Fetch_Question = async (id) => {

        try {

            const docRef = doc(db, Database.question, id)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
            else return { success: false, error: "No such document found" };




        } catch (error) {
            console.log(`Error FOund while Fetching from database ${error}`)
            return { success: false, error: error }
        }
    }



    // File: RunCodeAPI.js
    runCode = async (sourceCode) => {
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

}

