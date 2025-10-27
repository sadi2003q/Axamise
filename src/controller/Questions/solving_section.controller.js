// path: src/controller/solving_section.controller.js

import { SolveService } from "../../services/Questions/_solving_section.service.ts";
import { QuestionService } from "../../services/Questions/_factory.question.service.js";
import { SERVICE} from "../../Utilities.ts";
import { Solve_Model} from "../../models/Solve_Model.js";
import { evaluateQuestion } from "../../Gemini/ai.js";

export class SolvingSectionController {
    constructor(setQuestion, setRunResult, setIsSuccess, editorRef,
                setIsRunning, setCurrentCode, libraryPart, mainPart,
                solver, setSolver, navigate, submitCount) {
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
        this.submitCount = submitCount;
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

    // ✅ Run the code from Editor
    handleRunCode = async ( { id = '',
                                dryRun = false,
                                forEvent = false,
                                eventID = '',
        allQuestions = [],
        name = 'Not Defined',
        timeSpent = '32s',
    }) => {
        if (this.editorRef.current) {
                const code = this.editorRef.current.getValue();


                const fullCode = `
${this.libraryPart}
${code}
            
${this.mainPart}` // From Start to main function
                this.setIsRunning(true); // Show Loading Screen

                try {

                    /**
                     * Run the Code on Server
                     * @type {Firebase_Response}
                     */
                    const result = await this.service.runCode(fullCode);

                    if (result.error && result.error.trim() !== "") {

                        /**
                         * IF any Syntax Error Found
                         */
                        this.setRunResult(result.error);
                        this.setIsSuccess(false);
                    } else {





                        /**
                         * Successful execution
                         */
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
                             * For Competition
                             */
                            if(forEvent) {
                                console.log('For Event: ', forEvent);
                                const data = await evaluateQuestion({
                                    questions: allQuestions,
                                    answers: `${code}`,
                                    submissionTime: this.submitCount,
                                    timeSpent: timeSpent
                                })

                                console.log('submit count ', this.submitCount)
                                console.log('time spent ',timeSpent)


                                // This will store the event score on the server
                                await this.service._SetEventScore({
                                    userID: id,
                                    name: name,
                                    eventID: eventID,
                                    score: data.score,
                                    state: data.state,
                                    timeComplexity: data.overallTimeComplexity,
                                }).then(() => {
                                    console.log('Successfully Approved on the scorecard')
                                }).catch((err) => {
                                    console.log('something is wrong : ', err)
                                })

                            }

                            /**
                             * If the Problem is not solved Earlier
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
