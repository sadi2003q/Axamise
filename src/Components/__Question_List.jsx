/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import InfoIcon from "@mui/icons-material/Info"; // Example icon
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AddTaskIcon from '@mui/icons-material/AddTask';

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { FaUser, FaQuestionCircle, FaClock, FaLayerGroup, FaStar } from "react-icons/fa";



import DeleteIcon from "@mui/icons-material/Delete";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { TbTargetArrow } from "react-icons/tb";

export const Question_style = {
    event_description:
        // Full width on mobile, half width on desktop
        "m-2 w-full md:w-[50vw] bg-red-500 overflow-auto min-h-[500px] md:h-[86vh] flex flex-col gap-6 p-6 rounded-lg",

    event_scheduling:
        // Full width on mobile, fixed width on desktop
        "m-2 w-full md:w-[35vw] md:h-[86vh] rounded-4xl bg-white/5 border-2 border-amber-200/5 shadow-[0_0_30px_rgba(255,165,0,0.3)] backdrop-blur-md flex flex-col items-center justify-around gap-8 p-6 self-center overflow-auto",

    Outer_Container:
        // Column on mobile, row on desktop
        "relative w-full min-h-screen flex flex-col md:flex-row items-center justify-center gap-6 p-4 overflow-y-auto",

    Inner_container:
        "relative z-10 flex flex-col md:flex-row items-start md:items-stretch justify-center gap-6 w-full max-w-[1200px]",

    description:
        "peer w-full h-[300px] md:h-full text-white text-2xl bg-transparent resize-none p-3 outline-none overflow-auto rounded",

    Description_label:
        "absolute left-3 text-gray-400 text-2xl transition-all duration-200 peer-empty:top-3 peer-empty:text-2xl peer-empty:text-gray-400 peer-focus:-top-4 peer-focus:text-lg peer-focus:text-cyan-500 -top-4 text-lg text-cyan-500",

    description_container:
        "relative w-full h-[86vh] mt-8 font-mono",

    slider:
        "block mb-2 text-white font-mono",
};



// Event Description
export const Question_list = ({ children }) => {
    return (
        <div className={Question_style.event_description}>
            {children}
        </div>
    );
};


// Event Scheduling
export const Question_Description = ({ children }) => {
    return (
        <div className={Question_style.event_scheduling}>
            {children}
        </div>
    );
};



export const QuestionHeader = ({ text }) => {
    return (
        <header
            style={{
                background: "#f5f7fa",
                padding: "1rem 1rem",
                borderRadius: "12px",
                marginBottom: "2rem",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
        >
            <h1
                style={{
                    margin: 0,
                    fontSize: "2rem",
                    fontWeight: 700,
                    color: "#222",
                }}
            >
                {text}
            </h1>
        </header>
    );
};


export const Edit_Delete_Button = ({
    handleEdit = (() => console.log('Edit Button')),
    handleDelete = (() => { console.log('Delete Button') }),
    handleSolve = (() => { console.log('Solve Button') }),
    handleRevertBack = (() => { console.log('Revert Back Button') }),
    handleDirectApprove = (() => { console.log('Direct Approve Button') }),



    require_Edit_Button = false,
    require_Delete_Button = false,
    require_Solve_Button = false,
    require_Revert_Back_Button = false,
    require_direct_approve_Button = false
}) => {
    return (
        <div className="flex items-center justify-center pb-[20px]">


            {require_direct_approve_Button && (
                <div className="mx-2">

                    <IconButton
                        onClick={handleDirectApprove}
                        className={`!text-white !bg-green-500 hover:!bg-green-700 rounded-full`}
                    >
                        <AddTaskIcon />
                    </IconButton>
                </div>
            )}

            {require_Edit_Button && (
                <div className="mx-2">

                    {/* Edit Button */}
                    <IconButton
                        onClick={handleEdit}
                        className="!text-white !bg-blue-500 hover:!bg-blue-700 rounded-full"
                    >
                        <EditIcon />
                    </IconButton>

                </div>
            )}

            {require_Revert_Back_Button && (
                <div className="mx-2">

                    <IconButton
                        onClick={handleRevertBack}
                        className={`!text-white !bg-yellow-500 hover:!bg-yellow-700 rounded-full`}
                    >
                        <NotificationsActiveIcon />
                    </IconButton>
                </div>
            )}



            {require_Delete_Button && (
                <div className="mx-2">
                    {/* Delete Button */}
                    <IconButton
                        onClick={handleDelete}
                        className="!text-white !bg-red-500 hover:!bg-red-700 rounded-full"
                    >
                        <DeleteIcon />
                    </IconButton>
                </div>
            )}


            {require_Solve_Button && (
                <div className="mx-2">

                    <IconButton
                        onClick={handleSolve}
                        className={`!text-white !bg-purple-500 hover:!bg-purple-700 rounded-full`}
                    >
                        <TbTargetArrow />
                    </IconButton>
                </div>
            )}




            



        </div>
    );
};




export const NestedList = ({ items, onSelect }) => {
    const [searchQuery, setSearchQuery] = useState("");

    // Filter items based on search query
    const filteredItems = items.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="w-full">


            {/* Search Bar */}
            <div className="relative w-full mb-2">
                <div className="absolute left-0 top-0 h-full flex items-center pl-2 pointer-events-none text-white">
                    <FaSearch />
                </div>

                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full bg-transparent border-b border-white text-white font-mono pl-8 py-1 focus:outline-none focus:border-green-400"
                />
            </div>

            {/* Nested List */}
            <List
                sx={{
                    width: "100%",
                    bgcolor: "transparent",
                }}
            >
                {filteredItems.length > 0 ? (
                    filteredItems.map((item, index) => (



                        <ListItemButton
                            key={index}
                            onClick={() => onSelect(item)}
                            sx={{
                                width: "100%",
                                bgcolor: "transparent",
                                "&:hover": { bgcolor: "rgba(255, 255, 255, 0.1)" },
                                borderBottom: "1px solid rgba(255,255,255,0.2)",
                            }}
                        >



                            <ListItemIcon sx={{ color: "#fff", minWidth: "30px" }}>
                                <InfoIcon />
                            </ListItemIcon>



                            <ListItemText
                                primary={item.title}
                                primaryTypographyProps={{
                                    style: {
                                        color: "#fff",
                                        fontFamily: "monospace",
                                    },
                                }}
                            />




                        </ListItemButton>
                    ))
                ) : (
                    <ListItemText
                        primary="No matching items"
                        primaryTypographyProps={{
                            style: { color: "yellow", fontFamily: "monospace" },
                        }}
                    />
                )}
            </List>
        </div>
    );
};









export const Question_Showing_Description = ({
    question,
    handleEditButton = (() => { console.log('Handle Edit Button') }),
    handleDeleteButton = (() => { console.log('Handle Delete Button') }),
    handleSolveButton = (() => { console.log('Handle Solve Button') }),

                                                 require_Edit_Button = true,
                                                 require_Delete_Button =true,
                                                 require_Solve_Button =true
}) => {

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
                <div className="flex items-center space-x-2 text-2xl font-bold">
                    <FaQuestionCircle className="text-blue-400" />
                    <span>{question.title}</span>
                </div>
                {/* Horizontal line */}
                <div className="w-full border-b border-white"></div>
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

            {/* Created by */}
            <div className="flex items-center space-x-2 pb-[20px]">
                <FaUser className="text-pink-400" />
                <span>{question.createdBy}</span>
            </div>

            <Edit_Delete_Button
                handleEdit={() => handleEditButton(question.id)}
                handleDelete={() => handleDeleteButton(question.id)}
                handleSolve={() => handleSolveButton(question.id)}

                require_Edit_Button = {require_Delete_Button}
            require_Delete_Button ={require_Delete_Button}
            require_Solve_Button ={require_Solve_Button}


            />

        </div>
    );
};




export const Question_Showing_Description_admin = ({
    question,
    handleEditButton = (() => { console.log('Handle Edit Button') }),
    handleDeleteButton = (() => { console.log('Handle Delete Button') }),
    handleSolveButton = (() => { console.log('Handle Solve Button') }),
}) => {

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
                <div className="flex items-center space-x-2 text-2xl font-bold">
                    <FaQuestionCircle className="text-blue-400" />
                    <span>{question.title}</span>
                </div>
                {/* Horizontal line */}
                <div className="w-full border-b border-white"></div>
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

            {/* Created by */}
            <div className="flex items-center space-x-2 pb-[20px]">
                <FaUser className="text-pink-400" />
                <span>{question.createdBy}</span>
            </div>

            <Edit_Delete_Button
                handleEdit={() => handleEditButton(question.id)}
                handleDelete={() => handleDeleteButton(question.id)}
                handleSolve={() => handleSolveButton(question.id)}

            />

        </div>
    );
};



