/* eslint-disable no-unused-vars */
import { useContext, useState, useRef } from "react";

// Material UI
import TextField from '@mui/material/TextField';
import { Slider, Stack, Box, withTheme } from "@mui/material";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

// Model
import { Events_Model } from "../models/Event_Model.js";

// Components
import Profile_Background from "../Components/__Profile";
import { Solve_style, Solve_Description, Code_Editor } from "../Components/__Solving_Section.jsx";

// View Model
import { _Upload_Event } from "../ViewModel/Event_Created_ViewModel.js";
import { IdContext } from "../IdContext.jsx";

// import { MonacoEditor } from "@monaco-editor/react"; // or use default import
import Editor from "@monaco-editor/react";

export default function Solving_Section() {
    const { id } = useContext(IdContext);
    const [fieldError, setFieldError] = useState({ field: null, message: null });

    // Drag-resize state
    const [editorWidth, setEditorWidth] = useState(0.6); // default 60% for code editor
    const containerRef = useRef(null);

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

                        <div className={`${Solve_style.description_container} overflow-y-auto`} style={{ fontFamily: "monospace" }}>
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
                        </div>

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