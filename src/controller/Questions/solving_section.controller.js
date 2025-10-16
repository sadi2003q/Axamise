// path: src/controller/solving_section.controller.js

import { SolveService } from "../../services/Questions/_solving_section.service.ts";
import { routes } from "../../Utilities.ts";
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
    handleRunCode = async () => {
        if (this.editorRef.current) {
                const code = this.editorRef.current.getValue();

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
                        this.setIsSuccess(true);
                        const updatedSolver = new Solve_Model({
                            ...this.solver,
                            solve_code: fullCode
                        });

                        this.setSolver(updatedSolver);
                        await this.service.upload_solver(updatedSolver);
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


    handleEventCodeRun = (code) => {
        console.log(code)
    }


    // ✅ Optional: navigation to another route
    goBackToEvents = () => {
        this.navigate(routes.event_show);
    };



    splitCppCode = (code) => {
        // Pattern to find the function declarations section
        const functionDeclarationsPattern = /\/\/ ======= Function Declarations \(User will define these\) =======[\s\S]*?\/\/ ======= Generic Test Helpers =======/;

        const part1End = code.indexOf('// ======= Function Declarations (User will define these) =======');
        let part1, part2, part3;

        if (part1End !== -1) {
            part1 = code.substring(0, part1End);

            const match = code.match(functionDeclarationsPattern);
            if (match) {
                part2 = match[0];
                part3 = code.substring(part1End + part2.length);
            } else {
                // Fallback if pattern doesn't match
                const part2End = code.indexOf('// ======= Generic Test Helpers =======');
                part2 = code.substring(part1End, part2End);
                part3 = code.substring(part2End);
            }
        } else {
            // Fallback: split by approximate markers
            part1 = code;
            part2 = '';
            part3 = '';
        }

        return { part1, part2, part3 };
    }
}
