/* eslint-disable no-unused-vars */
import { useContext, useState, useRef, useEffect } from "react";

// Components
import Profile_Background from "../Components/__Profile";
import {
    Solve_style,
    Solve_Description,
    Code_Editor,
    Question_Showing_Description,
} from "../Components/__Solving_Section.jsx";
import Button from "@mui/material/Button";

// View Model
import { IdContext } from "../IdContext.jsx";
import { _Fetch_Question, runCode } from "../ViewModel/Solve_Section.js";

// Editor
import Editor from "@monaco-editor/react";

// Models
import { Question_Model } from "../models/Question_Model.js";

// Router Decoder
import { useLocation } from "react-router-dom";

export default function Solving_Section() {
    // Variables
    const location = useLocation();
    const { questionID } = location.state || {};
    const { id } = useContext(IdContext);




    const [question, setQuestion] = useState({
        ...Question_Model,
        title: "Demo",
        description: "Demo",
        mark: 100,
        difficulty: "",
        type: "Medium",
        result: "",
        event_uid: "sdfjh",
        createdBy: "currentName",
        createdBy_uid: "id",
    });

    // ✅ UseRef for editor instance
    const editorRef = useRef(null);

    // ✅ State to hold run result
    const [runResult, setRunResult] = useState("");
    const [isSuccess, setIsSuccess] = useState(null);

    // Drag-resize state
    const [editorWidth, setEditorWidth] = useState(0.6);
    const [code, setCode] = useState("");
    const containerRef = useRef(null);

    // Immediate Load
    useEffect(() => {
        console.log(questionID);
        const fetchQuestion = async () => {
            try {
                const result = await _Fetch_Question(questionID);
                if (result.success) {
                    setQuestion(result.data);
                } else {
                    console.log(`Failed to Download Data from Firestore`);
                }
            } catch (error) {
                console.log(`Error Fetching : ${error}`);
            }
        };
        fetchQuestion();
    }, []);

    // Submit Button Function
    const handleClick = async () => {
        if (editorRef.current) {
            const code = editorRef.current.getValue();

            const result = await runCode(code);
            if (result.success) {
                setRunResult(result.output || "");
                setIsSuccess(true);
            } else {
                setRunResult(result.error || "Unknown error");
                setIsSuccess(false);
            }
        } else {
            console.log("⚠️ Editor is not ready yet!");
        }
    };

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
                                onClick={handleClick}
                                variant="contained"
                                disabled={!code.trim()} // disable if empty
                                sx={{
                                    backgroundColor: !code.trim() ? "gray" : "primary.main",
                                    color: "white",
                                    "&:hover": {
                                        backgroundColor: !code.trim() ? "gray" : "primary.dark",
                                    },
                                }}
                            >
                                Run the code
                            </Button>

                            {/* ✅ Output/Error Box */}
                            {runResult && (
                                <div
                                    style={{
                                        backgroundColor: "rgba(0,0,0,0.7)",
                                        color: isSuccess ? "#4ade80" : "#f87171", // green-400 for success, red-400 for error
                                        padding: "10px",
                                        borderRadius: "6px",
                                        fontFamily: "monospace",
                                        whiteSpace: "pre-wrap",
                                        maxHeight: "200px",
                                        overflowY: "auto",
                                    }}
                                >
                                    {runResult}
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
                            defaultValue="// Start coding here..."
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