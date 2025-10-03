// path: src/controller/solving_section.controller.js

import { SolveService } from "../../services/Questions/_solving_section.service.js";
import { routes } from "../../Utilities.ts";

export class SolvingSectionController {
    constructor(setQuestion, setRunResult, setIsSuccess, editorRef, setIsRunning, navigate) {
        this.service = new SolveService();
        this.navigate = navigate;
        this.setQuestion = setQuestion;
        this.setRunResult = setRunResult;
        this.setIsSuccess = setIsSuccess;
        this.setIsRunning = setIsRunning;
        this.editorRef = editorRef;
    }

    // ✅ Fetch a question by ID
    fetchQuestion = async (questionID) => {
        try {
            const result = await this.service._Fetch_Question(questionID);
            if (result.success) {
                this.setQuestion(result.data);
            } else {
                console.log(`❌ Failed to fetch question`);
            }
        } catch (error) {
            console.log(`⚠️ Error fetching: ${error}`);
        }
    };

    // ✅ Run the code from editor
    handleRunCode = async () => {
        if (this.editorRef.current) {
            const code = this.editorRef.current.getValue();


            this.setIsRunning(true);  

            try {
                const result = await this.service.runCode(code);

                if (result.error && result.error.trim() !== "") {
                    // Syntax/Compilation error
                    this.setRunResult(result.error);
                    this.setIsSuccess(false);
                } else {
                    // Successful execution
                    this.setRunResult(result.output || "");
                    this.setIsSuccess(true);
                }
            } catch (error) {
                this.setRunResult(`Runtime error: ${error.message}`);
                this.setIsSuccess(false);
            } finally {
                this.setIsRunning(false);  
            }
        } else {
            console.log("⚠️ Editor is not ready yet!");
        }
    };


    // ✅ Optional: navigation to another route
    goBackToEvents = () => {
        this.navigate(routes.event_show);
    };
}
