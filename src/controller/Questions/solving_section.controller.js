// path: src/controller/solving_section.controller.js

import { SolveService } from "../../services/Questions/_solving_section.service.ts";
import { QuestionService } from "../../services/Questions/_factory.question.service.js";
import { SERVICE} from "../../Utilities.ts";
import { Solve_Model} from "../../models/Solve_Model.js";

export class SolvingSectionController {
    constructor(setQuestion, setRunResult, setIsSuccess, editorRef,
                setIsRunning, setCurrentCode, libraryPart, mainPart,
                solver, setSolver, navigate) {
        // this.service = new SolveService();
        this.service = QuestionService.createService(SERVICE.SOLVE);


        this.navigate = navigate;
        this.setQuestion = setQuestion;
        this.setRunResult = setRunResult;
        this.setIsSuccess = setIsSuccess;
        this.setIsRunning = setIsRunning;
        this.setCurrentCode = setCurrentCode;
        this.libraryPart = libraryPart;
        this.mainPart = mainPart;
        this.editorRef = editorRef;
        this.solver = solver;
        this.setSolver = setSolver;
    }

    // ✅ Fetch a question by ID
    fetchQuestion = async (questionID) => {
        try {
            const result = await this.service._Fetch_Question(questionID);
            if (result.success) {
                this.setQuestion(result.data);
                this.setCurrentCode(result.data.mainFunctionCode);

            } else {
                console.log(`❌ Failed to fetch question`);
            }
        } catch (error) {
            console.log(`⚠️ Error fetching: ${error}`);
        }
    };

    // ✅ Run the code from editor
    handleRunCode = async ( { id = '', dryRun = false}) => {
        if (this.editorRef.current) {
                const code = this.editorRef.current.getValue();

                // From Start to main function
                const fullCode = `
${this.libraryPart}
${code}
            
${this.mainPart}`

                // console.log(fullCode)

                this.setIsRunning(true);

                try {
                    const result = await this.service.runCode(fullCode);



                    if (result.error && result.error.trim() !== "") {
                        // Syntax/Compilation error
                        this.setRunResult(result.error);
                        this.setIsSuccess(false);
                    } else {
                        // Successful execution
                        this.setRunResult(result.output || "");
                        console.log('Approved')
                        this.setIsSuccess(true);
                        const updatedSolver = new Solve_Model({
                            ...this.solver,
                            solve_code: fullCode
                        });

                        this.setSolver(updatedSolver);
                        if(id.length===0) {
                            console.log('ID is not sent, Solution cannot be uploaded')
                        } else {

                            /**
                             * if the problem has already been solved then it will just run the code and return the result
                             * it won't update the database
                             */
                            if( !dryRun )  await this.service.solve_approve(id, updatedSolver);
                        }




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


    /**
     * Check if the **Problem** has already been solved or not
     */
    handleIfSolvedPreviously = async ({userID, questionID}) => {

        return this.service._CheckIfSolved({user_id: userID, question_id: questionID}).then();

    }


}
