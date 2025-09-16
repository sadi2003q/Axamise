/* eslint-disable no-unused-vars */
import { useContext, useState, useRef, useEffect } from "react";


// Components
import Profile_Background from "../Components/__Profile";
import { Solve_style, Solve_Description, Code_Editor, Question_Showing_Description } from "../Components/__Solving_Section.jsx";

// View Model
import { IdContext } from "../IdContext.jsx";
import { _Fetch_Question } from "../ViewModel/Solve_Section.js";

// Editor
import Editor from "@monaco-editor/react";

// Models
import { Question_Model } from "../models/Question_Model.js";

// Router Decoder
import { useLocation } from "react-router-dom";






export default function Solving_Section() {

    // Variables 
    const location = useLocation()
    const { questionID } = location.state || {}
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
        createdBy: 'currentName',
        createdBy_uid: 'id',
    });

    // Drag-resize state
    const [editorWidth, setEditorWidth] = useState(0.6); // default 60% for code editor
    const containerRef = useRef(null);



    // Immidiate Load
    useEffect(() => {
        console.log(questionID)
        const fetchQuestion = async () => {
            try {
                const result = await _Fetch_Question(questionID)

                if (result.success) {
                    console.log(result.data);
                    setQuestion(result.data)

                    console.log(`set up : ${question}`)
                } else {
                    console.log(`Failed to Download Data from Firestore`)
                }
            } catch (error) {
                console.log(`Error Fetching : ${error}`)
            }

        }

        fetchQuestion()

    }, [])



    // Submit Button Function
    const handleClick = async () => {
        console.log(event);
    };

    // Drag functions
    const startDrag = (e) => {
        e.preventDefault();
        document.addEventListener('mousemove', onDrag);
        document.addEventListener('mouseup', stopDrag);
    };

    const onDrag = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        let newEditorWidth = (rect.right - e.clientX) / rect.width;
        if (newEditorWidth < 0.3) newEditorWidth = 0.3; // min 30%
        if (newEditorWidth > 0.8) newEditorWidth = 0.8; // max 80%
        setEditorWidth(newEditorWidth);
    };

    const stopDrag = () => {
        document.removeEventListener('mousemove', onDrag);
        document.removeEventListener('mouseup', stopDrag);
    };

    return (
        <div className={Solve_style.Outer_Container}>

            {/* Background */}
            <Profile_Background />

            {/* Centered Event Boxes */}
            <div
                ref={containerRef}
                className={Solve_style.Inner_container}
                style={{ display: 'flex', width: '100%' }}
            >



                {/* Problem Description */}
                <div style={{ flex: 1 - editorWidth, minWidth: '200px' }}>
                    <Solve_Description>

                        {/* LEFT
                        
                            Loading screen
                            if Loading Failed
                        */}
                        <Question_Showing_Description question={question} />

                    </Solve_Description>
                </div>



                {/* Drag Handle */}
                <div
                    style={{ width: '8px', cursor: 'col-resize', background: 'rgba(255,255,255,0.2)' }}
                    onMouseDown={startDrag}
                />




                {/* Code Editor */}
                <div style={{ flex: editorWidth, minWidth: '300px' }}>
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

                        />
                    </Code_Editor>
                </div>






            </div>
        </div>
    );
}