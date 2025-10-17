// Path : src/pages/Solving_Section.jsx
/* eslint-disable no-unused-vars */

/**
 * Solving Section Page
 *
 * This component provides an interactive coding environment where users can:
 * - View coding problems and their descriptions
 * - Write and edit C++ code in a Monaco editor
 * - Run code and see execution results
 * - Submit solutions for evaluation
 *
 * The component supports both single question solving and event-based multiple questions
 * with proper code segmentation for library includes, editable functions, and main test harness.
 *
 * @component
 * @example
 * return <Solving_Section />
 */

import { useState, useRef, useEffect } from "react";

// Components
import {Heading} from "../../Components/__Event_Question.jsx";
import {
    Solve_style,
    Solve_Description,
    Code_Editor,
    Question_Showing_Description,
    Event_Question
} from "../../Components/__Solving_Section.jsx";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

// View Model
import { useGlobal } from "../../GlobalContext.jsx";

// Editor
import Editor from "@monaco-editor/react";

// Models
import Question from "../../models/Question_Model.js";
import { Solve_Model } from "../../models/Solve_Model";

// Router Decoder
import { useLocation, useNavigate } from "react-router-dom";

// Controller
import { SolvingSectionController } from "../../controller/Questions/solving_section.controller.js";
import { Background_Particles } from "../../Components/__Admin_Login.jsx";

export default function Solving_Section() {
    // =========================================================================
    // ROUTER & GLOBAL STATE
    // =========================================================================

    /**
     * Router location hook to access passed state (questionID, event data)
     */
    const location = useLocation();

    /**
     * Question ID passed via navigation state
     * @type {string}
     */
    const { questionID } = location.state || {};

    /**
     * Event data when navigating from event context
     * @type {[Object, Function]}
     */
    const [enteredEvent, setEnteredEvent] = useState(null);

    /**
     * Global user context for current user ID
     */
    const { user_uid } = useGlobal();

    /**
     * Router navigation hook for programmatic navigation
     */
    const navigate = useNavigate();



    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);

    // =========================================================================
    // CODE EDITOR & EXECUTION STATE
    // =========================================================================


    /**
     * Reference to Monaco editor instance for direct editor access
     */
    const editorRef = useRef(null);

    /**
     * Code execution state - true when code is running
     * @type {[boolean, Function]}
     */
    const [isRunning, setIsRunning] = useState(false);

    /**
     * Result output from code execution (stdout/stderr)
     * @type {[string, Function]}
     */
    const [runResult, setRunResult] = useState("");

    /**
     * Execution success status - true for success, false for error, null for no execution
     * @type {[boolean|null, Function]}
     */
    const [isSuccess, setIsSuccess] = useState(null);

    /**
     * Current code content in the editor
     * @type {[string, Function]}
     */
    const [currentCode, setCurrentCode] = useState("");

    // =========================================================================
    // CODE SEGMENTATION STATE
    // =========================================================================

    /**
     * Library/include section of the code (non-editable)
     * @type {[string, Function]}
     */
    const [libraryPart, setLibraryPart] = useState("");

    /**
     * Editable function section where user writes solution
     * @type {[string, Function]}
     */
    const [_, setEditablePart] = useState("");

    /**
     * Main function and test harness section (non-editable)
     * @type {[string, Function]}
     */
    const [mainPart, setMainPart] = useState("");

    /**
     * Overview comment shown above editable section
     * @constant
     */
    const overView = `
/*
#include <iostream>

this part is not changeable
make your code from below
add required library as necessary
*/
`;

    // =========================================================================
    // QUESTION & SOLVER STATE
    // =========================================================================

    /**
     * Current question being solved
     * @type {[Question, Function]}
     */
    const [question, setQuestion] = useState(
        new Question({
            title: "Demo",
            description: "Demo",
            mark: 100,
            difficulty: "",
            type: "Medium",
            event_uid: "sdfjh",
            createdBy: "currentName",
            createdBy_uid: "id",
        })
    );

    /**
     * Solver model tracking user's solution attempt
     * @type {[Solve_Model, Function]}
     */
    const [solver, setSolver] = useState(new Solve_Model({
        solver_id: user_uid,
        question_id: questionID || '0eY0SFWEwdFssbpzWQxb',
        date: new Date(),
        solve_code: "int main() { return 0; }",
        event_id: ""
    }));

    // =========================================================================
    // UI STATE & REFS
    // =========================================================================

    /**
     * Resizable editor width (0-1 representing percentage)
     * @type {[number, Function]}
     */
    const [editorWidth, setEditorWidth] = useState(0.6);

    /**
     * Complete code string including all segments
     * @type {[string, Function]}
     */
    const [code, setCode] = useState("");

    /**
     * Reference to main container for drag resizing
     */
    const containerRef = useRef(null);

    // =========================================================================
    // CONTROLLER INITIALIZATION
    // =========================================================================

    /**
     * Controller instance handling business logic for:
     * - Question fetching
     * - Code execution
     * - Solution submission
     * - Navigation
     */
    const controller = new SolvingSectionController(
        setQuestion,
        setRunResult,
        setIsSuccess,
        editorRef,
        setIsRunning,
        setCurrentCode,
        libraryPart,
        mainPart,
        solver,
        setSolver,
        navigate
    );

    // =========================================================================
    // CODE PROCESSING UTILITIES
    // =========================================================================

    /**
     * Splits code into three parts based on PART01/PART02 markers
     * Used for questions with predefined code structure
     *
     * @param {string} code - The complete code string to split
     * @returns {Object} Object containing part01, part02, part03
     * @throws {Error} When markers are not found in the code
     */
    const splitCode = (code) => {
        const part1Marker = "//---PART01---";
        const part2Marker = "//---PART02---";

        const part1Start = code.indexOf(part1Marker);
        const part2Start = code.indexOf(part2Marker);

        if (part1Start === -1 || part2Start === -1) {
            throw new Error("Markers not found in code!");
        }

        // Calculate the end of each section
        const part01End = part1Start;
        const part02End = part2Start;

        const part01 = code.substring(0, part01End).trim();
        const part02 = code.substring(part1Start + part1Marker.length, part02End).trim();
        const part03 = code.substring(part2Start + part2Marker.length).trim();


        return { part01, part02, part03 };
    };

    const countDownTimer = () => {
        setMinute((prevMinute) => {
            if (prevMinute > 0) {
                return prevMinute - 1;
            } else {
                // If minute hits 0 but we still have hours left
                setHour((prevHour) => {
                    if (prevHour > 0) {
                        setMinute(59);
                        return prevHour - 1;
                    } else {
                        // When both hour and minute reach 0, stop countdown
                        return 0;
                    }
                });
                return 0;
            }
        });
    };

    // =========================================================================
    // LIFECYCLE & SIDE EFFECTS
    // =========================================================================

    /**
     * Effect to set event data when navigating from event context
     * Logs event data for debugging purposes
     */
    useEffect(() => {
        if (location.state?.event) {
            setEnteredEvent(location.state.event);
            setHour(location.state.event.hours)
            setMinute(location.state.event.minutes)
        }
    }, []);

    /**
     * Effect to fetch question data on component mount
     * Uses questionID from route state or falls back to default ID
     * Skips if event data is already present
     */
    useEffect(() => {
        if (enteredEvent != null) return;

        if (questionID) {
            controller.fetchQuestion(questionID).then(r => {});
        } else {
            controller.fetchQuestion('0eY0SFWEwdFssbpzWQxb').then(r => {});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [questionID]);

    /**
     * Effect to process and split code when question or event data changes
     * Sets up the editor with proper code segmentation
     * Handles both single questions and event-based questions
     */
    useEffect(() => {
        if (!editorRef.current) return;

        const processCode = () => {
            let codeToProcess;

            if (enteredEvent === null) {
                codeToProcess = question.mainFunctionCode;
            } else {
                codeToProcess = enteredEvent.mainFunctionCode;
            }

            if (!codeToProcess) return;

            try {
                // Use splitCode since your code has PART01/PART02 markers
                const { part01, part02, part03 } = splitCode(codeToProcess);

                setLibraryPart(part01);
                setEditablePart(part02);
                setMainPart(part03);

                // Set editor value with the editable part
                const editorValue = overView + part02;
                editorRef.current.setValue(editorValue);
                setCode(codeToProcess);

            } catch (error) {
                console.error("Error splitting code:", error);
                // Fallback: use the entire code as editable part
                const editorValue = overView + codeToProcess;
                editorRef.current.setValue(editorValue);
                setCode(codeToProcess);
            }
        };

        processCode();
    }, [question.mainFunctionCode, enteredEvent?.mainFunctionCode]);

    // Countdown timer effect
    useEffect(() => {
        if (!enteredEvent) return;

        // Initialize timer from event data
        setHour(enteredEvent.hours || 0);
        setMinute(enteredEvent.minutes || 0);
        setSecond(0); // Start seconds from 0

        const timer = setInterval(() => {
            setSecond((prevSecond) => {
                if (prevSecond > 0) {
                    return prevSecond - 1;
                } else {
                    // Seconds reached 0, check minutes
                    setMinute((prevMinute) => {
                        if (prevMinute > 0) {
                            // Reset seconds to 59 and decrement minute
                            setSecond(59);
                            return prevMinute - 1;
                        } else {
                            // Minutes reached 0, check hours
                            setHour((prevHour) => {
                                if (prevHour > 0) {
                                    // Reset minutes and seconds, decrement hour
                                    setMinute(59);
                                    setSecond(59);
                                    return prevHour - 1;
                                } else {
                                    // Time's up!
                                    clearInterval(timer);
                                    return 0;
                                }
                            });
                            return 0;
                        }
                    });
                    return 0;
                }
            });
        }, 1000);

        // Cleanup function
        return () => clearInterval(timer);
    }, [enteredEvent]);

    // =========================================================================
    // DRAG RESIZE HANDLERS
    // =========================================================================

    /**
     * Initiates drag resize operation
     * @param {MouseEvent} e - Mouse down event
     */
    const startDrag = (e) => {
        e.preventDefault();
        document.addEventListener("mousemove", onDrag);
        document.addEventListener("mouseup", stopDrag);
    };

    /**
     * Handles drag movement to resize editor width
     * @param {MouseEvent} e - Mouse move event
     */
    const onDrag = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        let newEditorWidth = (rect.right - e.clientX) / rect.width;

        // Constrain width between 30% and 80% of container
        if (newEditorWidth < 0.3) newEditorWidth = 0.3;
        if (newEditorWidth > 0.8) newEditorWidth = 0.8;

        setEditorWidth(newEditorWidth);
    };

    /**
     * Cleans up drag event listeners
     */
    const stopDrag = () => {
        document.removeEventListener("mousemove", onDrag);
        document.removeEventListener("mouseup", stopDrag);
    };

    // =========================================================================
    // RENDER COMPONENT
    // =========================================================================

    return (
        <div className={Solve_style.Outer_Container}>
            {/* Animated background particles */}
            <Background_Particles />

            {/* Main content container with resizable panels */}
            <div
                ref={containerRef}
                className={Solve_style.Inner_container}
                style={{ display: "flex", flexDirection: "column",  width: "100%" }}
            >

                {
                    enteredEvent != null ? (
                        <div className="w-full flex flex-col items-center justify-center gap-2 text-yellow-400">

                            <Heading
                                title={enteredEvent.title}
                                subtitle={'Time Remaining'}
                            />


                            <div className="flex gap-4 text-6xl font-mono font-bold tracking-widest">
                                <div className="bg-gray-800 px-6 py-4 rounded-2xl shadow-[0_0_15px_#4A4A4A]">
                                    {hour.toString().padStart(2, '0')}
                                </div>
                                <span className="text-5xl">:</span>
                                <div className="bg-gray-800 px-6 py-4 rounded-2xl shadow-[0_0_15px_#4A4A4A]">
                                    {minute.toString().padStart(2, '0')}
                                </div>
                                <span className="text-5xl">:</span>
                                <div className="bg-gray-800 px-6 py-4 rounded-2xl shadow-[0_0_15px_#4A4A4A]">
                                    {second.toString().padStart(2, '0')}
                                </div>
                            </div>


                        </div>
                    ) : (
                        <div></div>
                    )
                }


                <div style={{display: "flex", width: "100%"}}>
                    {/* =================================================================
                        LEFT PANEL - PROBLEM DESCRIPTION & CONTROLS
                        ================================================================= */}
                    <div style={{flex: 1 - editorWidth, minWidth: "200px"}}>
                        <Solve_Description>
                            {/* Code Execution Controls */}
                            <div className="flex flex-col space-y-3 mx-1.">
                                <Button
                                    onClick={controller.handleRunCode}
                                    variant="contained"
                                    disabled={!code.trim() || isRunning}
                                    sx={{
                                        backgroundColor: !code.trim() || isRunning ? "gray" : "primary.main",
                                        color: "white",
                                        "&:hover": {
                                            backgroundColor: !code.trim() || isRunning ? "gray" : "primary.dark",
                                        },
                                    }}
                                >
                                    {isRunning ? (
                                        <div className="flex items-center gap-2 text-white">
                                            <CircularProgress
                                                size={20}
                                                sx={{ color: "white" }}
                                            />
                                            Running...
                                        </div>
                                    ) : (
                                        "Run the code"
                                    )}
                                </Button>

                                {/* Code Execution Output Display */}
                                {runResult && (
                                    <div
                                        style={{
                                            backgroundColor: "rgba(0,0,0,0.7)",
                                            color: isSuccess ? "#4ade80" : "#f87171",
                                            padding: "10px",
                                            borderRadius: "6px",
                                            fontFamily: "monospace",
                                            whiteSpace: "pre-wrap",
                                            maxHeight: "200px",
                                            overflowY: "scroll",
                                            scrollbarWidth: "none", // Firefox
                                            msOverflowStyle: "none", // IE 10+
                                        }}
                                    >
                                        {runResult}
                                        <style>
                                            {`
                    div::-webkit-scrollbar {
                        display: none; /* Chrome, Safari, Opera */
                    }
                `}
                                        </style>
                                    </div>
                                )}
                            </div>

                            {/* Conditional Question Display */}
                            {enteredEvent === null ? (
                                // Single question view - shows detailed question description
                                <Question_Showing_Description question={question} />
                            ) : (
                                // Event-based multiple questions view - shows question list
                                <Event_Question questions={enteredEvent?.allQuestions || []} />
                            )}
                        </Solve_Description>
                    </div>

                    {/* =================================================================
                        DRAG HANDLE - RESIZABLE SEPARATOR
                        ================================================================= */}
                    <div
                        style={{
                            width: "8px",
                            cursor: "col-resize",
                            background: "rgba(255,255,255,0.2)",
                        }}
                        onMouseDown={startDrag}
                    />

                    {/* =================================================================
                        RIGHT PANEL - CODE EDITOR
                        ================================================================= */}
                    <div style={{ flex: editorWidth, minWidth: "300px" }}>
                        <Code_Editor>
                            <Editor
                                height="100%"
                                defaultLanguage="cpp"
                                defaultValue={
                                    enteredEvent == null ? (
                                        question.mainFunctionCode
                                    ) : (
                                        enteredEvent.mainFunctionCode
                                    )
                                }
                                theme="vs-dark"
                                options={{
                                    fontSize: 16,
                                    minimap: { enabled: false },
                                    scrollBeyondLastLine: false,
                                    automaticLayout: true,
                                }}
                                onMount={(editor, monaco) => {
                                    editorRef.current = editor;
                                    setCode(editor.getValue());
                                }}
                                onChange={(value) => setCode(value)}
                            />
                        </Code_Editor>
                    </div>
                </div>
            </div>
        </div>
    );
}