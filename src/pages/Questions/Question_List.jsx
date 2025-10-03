/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

// File Path: pages/Question_list.jsx


// React Hooks
import { useEffect, useState } from "react";

// Components
import Profile_Background from "../../Components/__Profile.jsx";
import {
    Edit_Delete_Button,
    QuestionHeader,
    Question_list,
    Question_Description,
    Question_style,
    NestedList,
    Question_Showing_Description
} from "../../Components/__Question_List.jsx";

// Controller
import { QuestionListController } from "../../controller/Questions/question_list.controller.js";

// Router
import { useNavigate } from "react-router-dom";

export default function Question_List() {

    // State
    const [allQuestion, setAllQuestion] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Controller instance
    const controller = new QuestionListController(
        allQuestion,
        setAllQuestion,
        setSelectedQuestion,
        setError,
        navigate
    );

    // Fetch all questions on mount
    useEffect(() => {
        controller.handleFetchAll();
    }, []);

    return (
        <div className={Question_style.Outer_Container}>

            {/* Background Screen */}
            <Profile_Background />

            {/* Question List */}
            <Question_list>
                <QuestionHeader text="Question List" />
                <NestedList items={allQuestion} onSelect={setSelectedQuestion} />
            </Question_list>

            {/* Question Description with Button */}
            <Question_Description>
                <div>
                    {selectedQuestion ? (
                        <Question_Showing_Description
                            question={selectedQuestion}
                            handleEditButton={controller.handleEditButton}
                            handleDeleteButton={controller.handleDeleteQuestion}
                            handleSolveButton={controller.handleSolveButton}
                        />
                    ) : (
                        /*
                        LEFT
                            - Loading screen
                            - Error Visual
                        */
                        <p>Select a question</p>
                    )}
                </div>
            </Question_Description>
        </div>
    );
}