// Question_Create.jsx
import { useContext, useEffect, useState } from "react";
import { Stack, Box } from "@mui/material";
import { useLocation } from "react-router-dom";


// Components
import Profile_Background from "../Components/__Profile"; // Common Background
import {
    Question_style,
    Question_Description,
    Question_Specification,
    InputField,
    Drawer_Input,
    Select_Difficulty,
    Drower_Open_Button,
    FinalButton,
    Mark_Slider,
    DescriptionField,
} from "../Components/__Question_Create.jsx";


// Model & Controller
import Question from "../models/Question_Model.js";
import QuestionController from "../controller/question_create.controller";



// ViewModels (Events fetcher)
import { GetAllEvents } from "../ViewModel/Event_Show_ViewModel.js";


// Global Context
import { IdContext } from "../IdContext.jsx";


// Routes
import { useNavigate } from "react-router-dom";




//  -------------------- Main Function -------------------- //
export default function Question_Create() {



    // -------------------------Variables------------------------- //
    const location = useLocation(); // Router

    /*
    LEFT : 
       - change the name of the global variable file 'itemID' to eventId
    */
    const { itemID, questionID } = location.state || {}; // Get eventID & questionID from Router state
    const { id } = useContext(IdContext); // Global Variables
    const navigate = useNavigate(); // Router Navigate

    // Question State
    const [question, setQuestion] = useState(
        new Question({
            title: "demo title",
            description: "Description",
            mark: 0,
            difficulty: "",
            type: "Linked List",
            event_uid: itemID || "No even id FOund",
            createdBy: "Adnan",
            createdBy_uid: id,
        })
    );


    // Other States
    const [event, setEvent] = useState([]);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [error, setError] = useState(null);

    const isValid =

        question.title &&
        question.description &&
        question.mark > 0 &&
        question.difficulty &&
        question.type &&
        question.event_uid &&
        question.createdBy &&
        question.createdBy_uid



    // Controller
    const controller = new QuestionController(question, setQuestion, setError, navigate);

    // Handlers
    const handleChange = (e) => {
        const updated = new Question({ ...question, [e.target.name]: e.target.value });
        setQuestion(updated);
    };

    const handleMarkChange = (event, newValue) => {
        const updated = new Question({ ...question, mark: newValue });
        setQuestion(updated);
    };

    const handleSave = async () => {

        if (questionID) await controller.handleUpdate(questionID);
        else await controller.handleUpload();
    };

    // Load data (question + events)
    useEffect(() => {

        /*
        LEFT : 
            - put fetchEvent in the controller class of this question create unite
        */

        const fetchEvents = async () => {
            const result = await GetAllEvents(id);
            if (result.success) setEvent(result.data);
            else console.error("Error fetching events:", result.error);
        };
        
        fetchEvents();
        
        if (questionID) controller.handleFetch(questionID);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);




    // -------------------- Render -------------------- //
    return (

        // ------------Outer Container------------ //
        <div className={Question_style.Outer_Container}>
            <Profile_Background />



            {/* Main Content */}
            <div className={Question_style.Inner_container}>




                {/* Left side: Title && Description */}
                <Question_Description>


                    {/* Title */}
                    <InputField
                        label="Title"
                        name="title"
                        value={question.title}
                        handleChange={handleChange}
                    />


                    {/* Description */}
                    <DescriptionField
                        id="description"
                        name="description"
                        value={question.description}
                        handleChange={handleChange}
                        label="Description"
                    />

                    {error && <p className="text-red-500 text-sm">{error}</p>}


                </Question_Description>




                {/* Right side: Specs */}
                <Question_Specification>


                    <Stack spacing={6} className="w-full">


                        {/* Type */}
                        <InputField
                            label="Type"
                            name="type"
                            value={question.type}
                            handleChange={handleChange}
                        />



                        {/* Difficulty */}
                        <Select_Difficulty
                            value={question.difficulty}
                            onChange={handleChange}
                        />



                        {/* Event Drawer Selector */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                marginTop: "1rem",
                            }}
                        >


                            <InputField
                                label="Event"
                                name="event_title"
                                value={
                                    question.event_uid
                                        ? event.find((e) => e.id === question.event_uid)?.title || ""
                                        : ""
                                }
                                handleChange={() => { }}
                                font_size="1rem"
                            />
                            <Drower_Open_Button handleClick={() => setDrawerOpen(true)} />
                        </div>



                        {/* Slider + Final Button */}
                        <Box>

                            <Mark_Slider
                                value={question.mark}
                                handleChange={handleMarkChange}
                            />

                            {/* Upload Button */}
                            {isValid && (
                                <FinalButton
                                    passQuestion={question}
                                    handleChange={handleSave}
                                />
                            )}

                        </Box>
                    </Stack>
                </Question_Specification>
            </div>

            {/* Drawer */}
            <Drawer_Input
                drawerOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                item={event}
                iconColor="cyan"
                onItemClick={(item) => {
                    console.log("Clicked item:", item);
                    const updated = new Question({ ...question, event_uid: item.id });
                    setQuestion(updated);
                    setDrawerOpen(false);
                }}
            />
        </div>
    );
}
