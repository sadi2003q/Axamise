// path: src/controller/solving_section.controller.js

import { SolveService } from "../../services/Questions/_solving_section.service.ts";
import { QuestionService } from "../../services/Questions/_factory.question.service.js";
import {EVENT_STATE, NOTIFICATION_TYPES, SERVICE} from "../../Utilities.ts";
import { Solve_Model} from "../../models/Solve_Model.js";
import { evaluateQuestion } from "../../Gemini/ai.js";

export class SolvingSectionController {
    constructor(setQuestion, setRunResult, setIsSuccess, editorRef,
                setIsRunning, setIsCalculatingScore, setCurrentCode, libraryPart, mainPart,
                solver, setSolver, navigate, submitCount) {
        // this.service = new SolveService();
        this.service = QuestionService.createService(SERVICE.SOLVE);


        this.navigate = navigate;
        this.setQuestion = setQuestion;
        this.setRunResult = setRunResult;
        this.setIsSuccess = setIsSuccess;
        this.setIsRunning = setIsRunning;
        this.setIsCalculatingScore = setIsCalculatingScore;
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
    handleRunCode = async ({
                               id = '',
                               dryRun = false,
                               forEvent = false,
                               eventID = '',
                               allQuestions = [],
                               name = 'Not Defined',
                               timeSpent = '32s',
                               processCurrentCode = false
                           }) => {

        console.log('Clicked: handleRunCode started');

        if (!this.editorRef?.current) {
            console.warn('Editor not ready yet!');
            return;
        }

        // Get code safely
        const code = this.editorRef.current.getValue() || "";
        const fullCode = `
${this.libraryPart || ''}
${code}
${this.mainPart || ''}
`;

        // -------------------------------
        // CASE 1: Only process event score
        // -------------------------------
        if (processCurrentCode) {
            console.log('Processing event score only...');
            this.setIsCalculatingScore(true);

            try {

                // Evaluation Of the Code Using Gemni
                const data = await evaluateQuestion({
                    questions: allQuestions,
                    answers: code,
                    submissionTime: this.submitCount,
                    timeSpent
                });

                // Update Score on Event Repository
                await this.handleUpdateScore({
                    userId: id,
                    eventId: eventID,
                    score: data.score,
                    submitCount: this.submitCount,
                    eventState: EVENT_STATE.leftOut
                });

                // Set Event Information on the User's Repository
                await this.service._SetEventScore({
                    userID: id,
                    name,
                    eventID,
                    score: data.score,
                    state: data.state,
                    timeComplexity: data.overallTimeComplexity,
                });


                // Setting up score notification on the user...
                await this.service._SentNotification({
                    userID: id,
                    questionID: '',
                    title: 'Score..',
                    body: `Your Score for the is this : ${data.score}`,
                    eventID: eventID,
                    status: NOTIFICATION_TYPES.event_score
                })







            } catch (err) {
                console.error('Error in processCurrentCode:', err);
            } finally {
                this.setIsCalculatingScore(false);
            }

            return; // stop here, normal runCode not executed
        }

        // -------------------------------
        // CASE 2: Normal code run
        // -------------------------------
        this.setIsRunning(true);

        try {
            const result = await this.service.runCode(fullCode);

            if (result?.error?.trim()) {
                console.error('Code execution error:', result.error);
                this.setRunResult(result.error);
                this.setIsSuccess(false);
            } else {
                console.log('Code executed successfully');
                this.setRunResult(result.output || "");
                this.setIsSuccess(true);

                // Setting up score notification on the user...
                await this.service._SentNotification({
                    userID: id,
                    questionID: '',
                    title: 'Congratulation',
                    body: `You have solved the `,
                    eventID: '',
                    status: NOTIFICATION_TYPES.event_score
                })



                // Update solver model
                const updatedSolver = new Solve_Model({
                    ...this.solver,
                    solve_code: fullCode
                });
                this.setSolver(updatedSolver);






                if (!id) {
                    console.warn('User ID not provided, solution cannot be uploaded');
                } else {

                    // Setting up score notification on the user...
                    await this.service._SentNotification({
                        userID: id,
                        questionID: '',
                        title: 'Well done',
                        body: `You have solved Another Important problem, Keep Going`,
                        eventID: eventID,
                        status: NOTIFICATION_TYPES.question_solved
                    })

                    // If forEvent, calculate score
                    if (forEvent) {
                        this.setIsCalculatingScore(true);

                        try {
                            const data = await evaluateQuestion({
                                questions: allQuestions,
                                answers: code,
                                submissionTime: this.submitCount,
                                timeSpent
                            });

                            console.log('Event evaluation data:', data);

                            await this.handleUpdateScore({
                                userId: id,
                                eventId: eventID,
                                score: data.score,
                                submitCount: this.submitCount,
                                eventState: EVENT_STATE.solved
                            });

                            await this.service._SetEventScore({
                                userID: id,
                                name,
                                eventID,
                                score: data.score,
                                state: data.state,
                                timeComplexity: data.overallTimeComplexity
                            });

                            this.setRunResult(prev => {
                                return prev + `\n\n *** SCORE :: ${data.score} ***\n`;
                            });


                            // Setting up score notification on the user...
                            await this.service._SentNotification({
                                userID: id,
                                questionID: '',
                                title: 'Score..',
                                body: `Your Score for the is this : ${data.score}`,
                                eventID: eventID,
                                status: NOTIFICATION_TYPES.event_score
                            })

                        } catch (err) {
                            console.error('Error during event scoring:', err);
                        } finally {
                            this.setIsCalculatingScore(false);
                        }
                    }

                    // Only save solution if dryRun is false
                    if (!dryRun) {
                        try {
                            await this.service.solve_approve(id, updatedSolver);
                            console.log('Solution approved successfully');
                        } catch (err) {
                            console.error('Error saving solution:', err);
                        }
                    }
                }
            }

        } catch (err) {
            console.error('Runtime error during code execution:', err);
            this.setRunResult(`Runtime error: ${err.message}`);
            this.setIsSuccess(false);
        } finally {
            this.setIsRunning(false);
        }

        console.log('handleRunCode finished');
    };














    /**
     * Check if the **Problem** has already been solved or not
     */
    handleIfSolvedPreviously = async ({userID, questionID}) => {

        return this.service._CheckIfSolved({user_id: userID, question_id: questionID}).then();

    }


    handleUpdateScore = async ({userId, eventId, score, submitCount, eventState = EVENT_STATE.solved}) => {
        const response = await this.service._ModifyScoreAfterRun({
            userID: userId,
            eventId: eventId,
            score: score,
            submitCount: submitCount,
            eventState: eventState
        })
        console.log(response.message)
    }


    addToSolverList = async ({userID, questionID}) => {
        await this.service._AddToSolverList({
            userID: userID,
            questionID: questionID,
        })
    }


    addToProblemEncountered = async ({userID, questionID}) => {
        await this.service._EncounterProblem({
            userID: userID,
            questionID: questionID,
        })
    }

}
