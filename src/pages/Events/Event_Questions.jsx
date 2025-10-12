
// Components
import { Background_Particles } from "../../Components/__Admin_Login";
import { Heading, QuestionForm, AddQuestionButton } from "../../Components/__Event_Question.jsx";

// React Hooks
import { useState } from "react";

// Models
import { Event_Question_Model } from "../../models/Event_Model.js";





// Heading Component

export default function Event_Questions() {
    // 🔹 Use an array to manage multiple questions
    const [questions, setQuestions] = useState([
        {
            ...Event_Question_Model,
            title: "AI Coding Challenge",
            description: "Answer algorithm-based coding problems within 30 minutes.",
            difficulty: "Hard",
            point: 100,
            type: "Programming",
        },
    ]);

    // 🔹 Add a new question form
    const handleAddQuestion = () => {
        const newQuestion = {
            ...Event_Question_Model,
            title: "",
            description: "",
            difficulty: "Medium",
            point: 0,
            type: "",
        };
        setQuestions([...questions, newQuestion]);
    };

    // 🔹 Handle input change for each question
    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const updated = [...questions];
        updated[index][name] = value;
        setQuestions(updated);
    };

    const handleDelete = (index) => {
        const updated = [...questions];
        updated.splice(index, 1);
        setQuestions(updated);
    };

    return (
        <div className="w-screen h-screen relative">

            {/* Background Particles */}
            <Background_Particles />

            <div className="w-screen h-screen flex items-center justify-center z-500">
                <div
                    className="w-[84vw] h-[90vh] rounded-xl flex flex-col gap-4 overflow-y-auto z-500"
                    style={{
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                    }}
                >
                    {/* Heading */}
                    <Heading
                        title="Event Questions"
                        subtitle="Explore frequently asked questions about upcoming events"
                    />

                    {/* Add Question Button */}
                    <AddQuestionButton handleAddQuestion={handleAddQuestion} />

                    {/* Dynamic Question Forms */}
                    {questions.map((question, index) => (
                        <QuestionForm
                            key={index}
                            question={question}
                            index={index}
                            handleChange={handleChange}
                            handleDelete={handleDelete}
                        />
                    ))}
                </div>


            </div>
        </div>
    );
}
