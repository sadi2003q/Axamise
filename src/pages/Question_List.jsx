

// React Hooks
import { useEffect, useState } from "react";


// Components
import Profile_Background from "../Components/__Profile.jsx";
import { 
    Edit_Delete_Button, 
    QuestionHeader, 
    Question_list, 
    Question_Description, 
    Question_style, 
    NestedList ,
    Question_Showing_Description
} from "../Components/__Question_List.jsx";


// View Model Functions
import { 
    _Fetch_All_Question, 
    _Delete_Specific_Function 
} from "../ViewModel/Question_List_ViewModel.js";


// Router
import { useNavigate } from "react-router-dom";









export default function Question_List() {

    // Variable
    const [allQuestion, setAllQuestion] = useState([])
    const [selectedQuestion, setSelectedQuestion] = useState("");
    const navigate = useNavigate();


    // Immidately Added Functions
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



    // All Functions
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

            {/* Background Screen */}
            <Profile_Background />



            {/* Questino List */}
            <Question_list>
                <QuestionHeader text="Question List" />
                <NestedList items={allQuestion} onSelect={setSelectedQuestion} />
            </Question_list>


            {/* Question Description with Button */}
            <Question_Description>
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