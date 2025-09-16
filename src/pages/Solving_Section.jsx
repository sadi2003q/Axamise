/* eslint-disable no-unused-vars */
import { useContext, useState, useRef, useEffect } from "react";


// Components
import Profile_Background from "../Components/__Profile";
import { Solve_style, Solve_Description, Code_Editor } from "../Components/__Solving_Section.jsx";

// View Model
import { IdContext } from "../IdContext.jsx";
import { _Fetch_Question } from "../ViewModel/Solve_Section.js";

// import { MonacoEditor } from "@monaco-editor/react"; // or use default import
import Editor from "@monaco-editor/react";

import { Question_Model } from "../models/Question_Model.js";
import { useLocation } from "react-router-dom";

import { FaUser, FaQuestionCircle, FaClock, FaLayerGroup, FaStar } from "react-icons/fa";






const Question_Showing_Description = ({ question }) => {

    // Map difficulty to color
    const difficultyColor = {
        Easy: "bg-green-500 text-green-100",
        Medium: "bg-yellow-500 text-white",
        Hard: "bg-red-500 text-red-100",
    };

    // Normalize difficulty string for lookup
    const difficultyKey = question.difficulty
        ? question.difficulty.trim().charAt(0).toUpperCase() + question.difficulty.trim().slice(1).toLowerCase()
        : "";

    const difficultyClasses = difficultyColor[difficultyKey] || "bg-gray-700 text-white";

    return (
        <div className="flex flex-col justify-start w-full h-full p-2 space-y-4 font-mono bg-transparent text-white rounded-lg shadow-lg">

            {/* Title */}
            <div className="flex flex-col space-y-2">
                {/* <div className="flex items-center space-x-2 text-2xl font-bold">
                    
                    <span> <FaQuestionCircle className="text-blue-400" /> {question.title}</span>
                </div> */}

                <div className="text-2xl font-bold">
                    <FaQuestionCircle className="inline text-blue-400 mr-2 align-middle" />
                    {question.title}
                </div>
                {/* Horizontal line */}
                <div className="w-[80%] border-b border-white"></div>
            </div>

            {/* Description with automatic line breaks before Input/Output */}
            <div className="flex items-start space-x-2">
                <div className="flex flex-col space-y-2 font-mono">
                    {(() => {
                        const parts = [];
                        const regex = /(Input:|Output:)/g;
                        let lastIndex = 0;
                        let match;

                        while ((match = regex.exec(question.description)) !== null) {
                            const text = question.description.slice(lastIndex, match.index).trim();
                            if (text) parts.push({ type: "text", content: text });

                            parts.push({ type: "label", content: match[0] });

                            lastIndex = match.index + match[0].length;
                        }

                        const remaining = question.description.slice(lastIndex).trim();
                        if (remaining) parts.push({ type: "text", content: remaining });

                        return parts.map((part, index) => {
                            if (part.type === "label") {
                                return (
                                    <p key={index} className="mt-2 font-semibold underline">
                                        {part.content}
                                    </p>
                                );
                            }
                            return (
                                <p key={index}>
                                    {part.content}
                                </p>
                            );
                        });
                    })()}
                </div>
            </div>

            {/* Difficulty */}
            <div className={`flex items-center space-x-2 px-2 py-1 rounded ${difficultyClasses}`}>
                <FaClock className={`text-white`} />
                <span>{difficultyKey}</span>
            </div>

            <div className="flex items-center space-x-2">
                <FaStar className="text-yellow-400" />
                <span>Mark: {question.mark}</span>
            </div>

            {/* Type */}
            <div className="flex items-center space-x-2">
                <FaLayerGroup className="text-teal-400" />
                <span>Type: {question.type}</span>
            </div>

            {/* Created by
            <div className="flex items-center space-x-2 pb-[20px]">
                <FaUser className="text-pink-400" />
                <span>{question.createdBy}</span>
            </div> */}

        </div>
    );
};




























export default function Solving_Section() {

    // const {questionID} = 

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


    const [fieldError, setFieldError] = useState({ field: null, message: null });

    // Drag-resize state
    const [editorWidth, setEditorWidth] = useState(0.6); // default 60% for code editor
    const containerRef = useRef(null);


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







    const handleChange = (e) => {
        if (fieldError.field === e.target.name) {
            setFieldError({ field: null, message: null });
        }
    };

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

                        {/* <div className={`${Solve_style.description_container} overflow-y-auto`} style={{ fontFamily: "monospace" }}>
                            <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Event Title Example</h2>
                            <p style={{ fontSize: "1rem", lineHeight: "1.6" }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus luctus urna sed urna ultricies ac tempor dui sagittis.
                                In condimentum facilisis porta. Sed nec diam eu diam mattis viverra. Nulla fringilla, orci ac euismod semper, magna
                                diam porttitor mauris, quis sollicitudin sapien justo in libero.
                            </p>
                            <p style={{ fontSize: "1rem", lineHeight: "1.6" }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus luctus urna sed urna ultricies ac tempor dui sagittis.
                                In condimentum facilisis porta. Sed nec diam eu diam mattis viverra. Nulla fringilla, orci ac euismod semper, magna
                                diam porttitor mauris, quis sollicitudin sapien justo in libero.
                            </p>
                            <p style={{ fontSize: "1rem", lineHeight: "1.6", marginTop: "1rem" }}>
                                Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus.
                                Nam nulla quam, gravida non, commodo a, sodales sit amet, nisi.
                            </p>
                        </div> */}


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