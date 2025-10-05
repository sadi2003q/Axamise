// Path : src/pages/Solving_Section.jsx

/* eslint-disable no-unused-vars */
import {  useState, useRef, useEffect } from "react";

// Components
import Profile_Background from "../../Components/__Profile.jsx";
import {
    Solve_style,
    Solve_Description,
    Code_Editor,
    Question_Showing_Description,
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

export default function Solving_Section() {
    // Variables
    const location = useLocation();
    const { questionID } = location.state || {};

    // const { id } = useContext(IdContext);
    const { user_uid } = useGlobal()

    const navigate = useNavigate();


    const defaultCode = `#include <iostream>
using namespace std;

int main() {
    cout << "Hello World" << endl;
    return 0;
}`;


    // ✅ Question State
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

    // ✅ UseRef for editor instance
    const editorRef = useRef(null);
    const [isRunning, setIsRunning] = useState(false);


    // ✅ State to hold run result
    const [runResult, setRunResult] = useState("");
    const [isSuccess, setIsSuccess] = useState(null);
    const [currentCode, setCurrentCode] = useState("");
    const [libraryPart, setLibraryPart] = useState("");
    const [editablePart, setEditablePart] = useState("");
    const [mainPart, setMainPart] = useState("");

    const overView = `
/*
#include <iostream>

this part is not changeable
make your code from below
add required library as necessary
*/
    
`

    const [solver, setSolver] = useState(new Solve_Model({
        solver_id: user_uid,
        question_id: questionID || '0eY0SFWEwdFssbpzWQxb',
        date: new Date(),
        solve_code: "int main() { return 0; }",
        event_id: ""
    }))


    // ✅ Controller instance
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

    // Drag-resize state
    const [editorWidth, setEditorWidth] = useState(0.6);
    const [code, setCode] = useState("");
    const containerRef = useRef(null);



    // console.log(solver.solve_code);

    const splitCppCode = (codeString) => {
        // Match all #include lines
        const includeRegex = /#include\s+[<"][^>"]+[>"]/g;
        const mainRegex = /int\s+main\s*\(/;

        // Find last #include to separate part1
        const includes = [...codeString.matchAll(includeRegex)];
        const lastInclude = includes.length ? includes[includes.length - 1] : null;

        const mainMatch = codeString.match(mainRegex);
        if (!mainMatch) {
            throw new Error("Could not find main() in provided code.");
        }

        const part1End = lastInclude ? lastInclude.index + lastInclude[0].length : 0;
        const part1 = codeString.slice(0, part1End).trim(); // Only #include lines

        const part2 = codeString.slice(part1End, mainMatch.index).trim(); // Function(s) + namespace
        const part3 = codeString.slice(mainMatch.index).trim(); // Main function

        return { part1, part2, part3 };
    };





    // Immediate Load
    useEffect(() => {
        if (questionID) controller.fetchQuestion(questionID);
        else controller.fetchQuestion('0eY0SFWEwdFssbpzWQxb')
        console.log(question)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [questionID]);

    useEffect(() => {
        if (editorRef.current && question.mainFunctionCode) {

            // / Split using 'int main()' as the divider
            // const [part1, part2WithMain] = question.mainFunctionCode.split(/(?=int main\s*\()/);
            const { part1, part2, part3 } = splitCppCode(question.mainFunctionCode);


            setLibraryPart(part1)
            setEditablePart(part2)
            setMainPart(part3)

            // editorRef.current.setValue(question.mainFunctionCode);
            editorRef.current.setValue(overView + part2);


            setCode(question.mainFunctionCode);
        }
    }, [question.mainFunctionCode]);






    // Drag functions
    const startDrag = (e) => {
        e.preventDefault();
        document.addEventListener("mousemove", onDrag);
        document.addEventListener("mouseup", stopDrag);
    };

    const onDrag = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        let newEditorWidth = (rect.right - e.clientX) / rect.width;
        if (newEditorWidth < 0.3) newEditorWidth = 0.3;
        if (newEditorWidth > 0.8) newEditorWidth = 0.8;
        setEditorWidth(newEditorWidth);
    };

    const stopDrag = () => {
        document.removeEventListener("mousemove", onDrag);
        document.removeEventListener("mouseup", stopDrag);
    };

    return (
        <div className={Solve_style.Outer_Container}>
            {/* Background */}
            <Profile_Background />

            {/* Centered Event Boxes */}
            <div
                ref={containerRef}
                className={Solve_style.Inner_container}
                style={{ display: "flex", width: "100%" }}
            >
                {/* Problem Description */}
                <div style={{ flex: 1 - editorWidth, minWidth: "200px" }}>
                    <Solve_Description>
                        <div className="flex flex-col space-y-3 mx-1.5">
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

                            {/* ✅ Output/Error Box */}
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

                        <Question_Showing_Description question={question} />
                    </Solve_Description>
                </div>

                {/* Drag Handle */}
                <div
                    style={{
                        width: "8px",
                        cursor: "col-resize",
                        background: "rgba(255,255,255,0.2)",
                    }}
                    onMouseDown={startDrag}
                />

                {/* Code Editor */}
                <div style={{ flex: editorWidth, minWidth: "300px" }}>
                    <Code_Editor>
                        <Editor
                            height="100%"
                            defaultLanguage="cpp"
                            defaultValue={currentCode.length === 0 ? defaultCode : question.mainFunctionCode}
                            theme="vs-dark"
                            options={{
                                fontSize: 16,
                                minimap: { enabled: false },
                                scrollBeyondLastLine: false,
                                automaticLayout: true,
                            }}
                            onMount={(editor, monaco) => {
                                editorRef.current = editor;
                                console.log("✅ Editor is ready");
                                setCode(editor.getValue());
                            }}
                            onChange={(value) => setCode(value)}
                        />
                    </Code_Editor>
                </div>
            </div>
        </div>
    );
}
