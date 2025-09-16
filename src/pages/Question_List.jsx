import * as React from "react";
import { useEffect, useState } from "react";
import Profile_Background from "../Components/__Profile.jsx";
import { Edit_Delete_Button, QuestionHeader, Question_list, Question_Description, Question_style, NestedList } from "../Components/__Question_List.jsx";
import { _Fetch_All_Question, _Delete_Specific_Function } from "../ViewModel/Question_List_ViewModel.js";
import { FaUser, FaQuestionCircle, FaClock, FaLayerGroup, FaStar } from "react-icons/fa";

import { useNavigate, useLocation } from "react-router-dom";








const Question_Showing_Description = ({
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








export default function Question_List() {

    const [allQuestion, setAllQuestion] = useState([])
    const [selectedQuestion, setSelectedQuestion] = useState("");
    const navigate = useNavigate();

    const defaultQuestions = [
        "What is React?",
        "Explain virtual DOM",
        "What are React hooks?",
        "Difference between state and props",
        "Explain useEffect with an example",
        "What is JSX?",
        "What are controlled components?",
        "Difference between functional and class components",
        "What is context API?",
        "Explain React lifecycle methods",
    ];
    useEffect(() => {

        const fetchQuestion = async () => {
            try {
                const result = await _Fetch_All_Question()
                if (result.success) {
                    console.log('Fetched all Question from Database');
                    console.log(result.data)
                    setAllQuestion(result.data)
                }
                else console.log('Failed to Fetch')
            } catch (error) {
                console.log(`Error FOund : ${error}`)
            }
        }
        fetchQuestion()

    }, [])




    const handleEditButton = (uid) => {

        // navigate("/event_create", { state: { itemID: item.id } });
        navigate('/question_create', { state: {questionID: uid} })

        console.log(`Question ID : ${uid}`)
    }





    const handleDeleteButton = async (uid) => {
        console.log(`Question ID : ${uid}`)
        const result = await _Delete_Specific_Function(uid);
        if(result.success) {
            console.log('Data Deleted Successfully')

            // 🔥 remove the deleted question from local state
            setAllQuestion((prev) => prev.filter((q) => q.id !== uid));

            // 🔥 also clear selection if the deleted item was selected
            setSelectedQuestion((prev) => (prev?.id === uid ? "" : prev));
        }
        else {
            console.log(`Error while Deleting.  : ${result.error}`)
        }
    }



    const handleSolveButton = (uid) => {
        navigate('/solve', {state : {questionID : uid}})
    }



    return (
        <div className={Question_style.Outer_Container}>
            <Profile_Background />

            <Question_list>
                <QuestionHeader text="Question List" />
                <NestedList items={allQuestion} onSelect={setSelectedQuestion} />
            </Question_list>

            <Question_Description>
                {/* {selectedQuestion ? <p>{selectedQuestion.description}</p> : <p>Select a question</p>} */}
                <div>
                    {selectedQuestion ? <Question_Showing_Description question={selectedQuestion}
                        handleEditButton={handleEditButton}
                        handleDeleteButton={handleDeleteButton} 
                        handleSolveButton={handleSolveButton} /> 
                        : <p>Select a question</p>}

                </div>

            </Question_Description  >
        </div>
    );
}