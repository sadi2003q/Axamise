/* eslint-disable react-hooks/exhaustive-deps */
// File Path: src/pages/Event_Create.jsx

import {useEffect, useState} from "react";

// Material UI
import {Box, Stack} from "@mui/material";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

// Model
import {Events_Model} from "../../models/Event_Model.js";
import { Event_Question_Model } from "../../models/Event_Model.js";

// Components
import Profile_Background from "../../Components/__Profile.jsx";
import { Background_Particles } from "../../Components/__Admin_Login";
import {
    CustomTextField,
    DescriptionField,
    DurationTextField,
    Event_Description,
    Event_Scheduling,
    Event_style,
} from "../../Components/__Event_Create.jsx";
import { Heading, QuestionForm, AddQuestionButton, ConfirmButton } from "../../Components/__Event_Question.jsx";

// Controller
import {EventCreateServiceController} from "../../controller/Events/event_create.controller.js";

// Global Context
import {useGlobal} from "../../GlobalContext.jsx";
// Routing
import {useLocation, useNavigate} from "react-router-dom";

export default function Event_Create() {
    // Context
    // const { id } = useContext(IdContext);
    const { user_uid } = useGlobal()


    // State
    const [event, setEvent] = useState(
        new Events_Model({
            title: "Simple Title",
            description: "Simple Description",
            date: "2023-10-01",
            startTime: "10:00",
            duration: { hours: 2, minutes: 30 },
            createdBy: "current name is undefined",
            createdBy_uid: user_uid,
            createdAt: Date.now(),
            allQuestions: []
        })
    );
    const [fieldError, setFieldError] = useState({
        field: null,
        message: null,
    });

    const location = useLocation();
    const navigate = useNavigate();
    const { itemID } = location.state || {};



    // Event Questions
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
    const handleQuestionChange = (index, e) => {
        const { name, value } = e.target;
        const updated = [...questions];
        updated[index][name] = value;
        setQuestions(updated);
    };

    const handleQuestionDelete = (index) => {
        const updated = [...questions];
        updated.splice(index, 1);
        setQuestions(updated);
    };

    // Controller instance (re-created when event changes)
    const controller = new EventCreateServiceController({
        event: event,
        setEvent: setEvent,
        setFieldError: setFieldError,
        navigate: navigate
    });

    const AddQuestionHandler = () => {
        const updatedEvent = {
            ...event,
            allQuestions: [...questions],
        };

        setEvent(updatedEvent);
    }

    // Fetch if editing existing event
    useEffect(() => {
        console.log(`user id : ${user_uid}`)
        if (itemID) controller.handleFetchEvent(itemID);
        else console.log("🆕 Creating new event");
        setEvent(prev => ({
            ...prev,
            // prev.user: "My Awesome Event",  // your default or generated title
        }));
        
    }, []);

    useEffect(() => {
        AddQuestionHandler()
    }, [questions])

    // Handlers
    const handleChange = (e) => {
        const { name, value } = e.target;

        setEvent((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (fieldError.field === name) {
            setFieldError({ field: null, message: null });
        }
    };

    const handleDurationChange = (e) => {
        const { name, value } = e.target;
        setEvent((prev) => ({
            ...prev,
            duration: {
                ...prev.duration,
                hours: name === "hour" ? Number(value) : prev.duration.hours,
                minutes: name === "durationMinutes" ? Number(value) : prev.duration.minutes,
            },
        }));
    };

    const isValid = () => {
        return event.title && event.description && event.date && event.startTime;
    }

    const isFormValid = () => {
        return isValid() &&
            (event.duration.hours > 0 ||
                (event.duration.minutes >= 0 && event.duration.minutes <= 59));
    };

    // Event Upload Handler
    const handleClick = async () => {

        AddQuestionHandler()
        if (itemID) await controller.handleUpdateEvent(itemID);
        else await controller.handleUploadEvent();
        console.log(event)

    };



    // UI
    return (
        <div className={Event_style.Outer_Container}>
            {/* Background */}
            <Background_Particles />

            {/* Centered Event Boxes */}
            <div className={Event_style.Inner_container}>


                <div className={'w-full flex flex-col'}>
                    <div>
                        <Heading
                            title="New Event"
                            subtitle="Create New & Exciting Event to Filter world Class Talent"
                        />

                    </div>
                    <div className={'flex'}>
                        {/* Event Description */}
                        <Event_Description>
                            {/* Title */}
                            <CustomTextField
                                label="Title"
                                name="title"
                                value={event.title}
                                onChange={handleChange}
                                size="1.2rem"
                            />

                            {/* Description */}
                            <DescriptionField
                                name="description"
                                value={event.description}
                                onChange={handleChange}
                                size="1rem"
                            />
                        </Event_Description>

                        {/* Event Scheduling */}
                        <Event_Scheduling>
                            <Stack spacing={6} className="w-full">
                                {/* Date Picker */}
                                <CustomTextField
                                    label="Date (DD/MM/YYYY)"
                                    name="date"
                                    type="date"
                                    value={event.date}
                                    onChange={handleChange}
                                />

                                {/* Start Time */}
                                <CustomTextField
                                    label="Start Time"
                                    name="startTime"
                                    type="time"
                                    value={event.startTime}
                                    onChange={handleChange}
                                />

                                <Stack direction="row" spacing={4} className="w-full mt-4">
                                    {/* Hours */}
                                    <DurationTextField
                                        label="Hours"
                                        name="hour"
                                        placeholder="01"
                                        value={event.duration.hours}
                                        onChange={handleDurationChange}
                                        min={0}
                                    />

                                    {/* Minutes */}
                                    <DurationTextField
                                        label="Minutes"
                                        name="durationMinutes"
                                        placeholder="30"
                                        value={event.duration.minutes}
                                        onChange={handleDurationChange}
                                        min={0}
                                        max={59}
                                    />
                                </Stack>

                                {/* Buttons */}
                                <Box className="w-full">
                                    <div className="flex w-full h-10 mt-4 items-center justify-between">
                                        <div></div>
                                        <div className="flex gap-4">
                                            {/* Add More Button */}
                                            <Button
                                                onClick={handleClick}
                                                variant="contained"
                                                endIcon={<AddShoppingCartIcon />}
                                                disabled={!isFormValid()}
                                                sx={{
                                                    display: itemID ? "none" : "inline-flex",
                                                    backgroundColor: "purple",
                                                    "&.Mui-disabled": {
                                                        backgroundColor: "gray",
                                                        color: "white",
                                                        pointerEvents: "auto",
                                                        cursor: "not-allowed",
                                                    },
                                                }}
                                            >
                                                More
                                            </Button>

                                            {/* Publish Button */}
                                            <Button
                                                onClick={handleClick}
                                                variant="contained"
                                                endIcon={<SendIcon />}
                                                disabled={!isFormValid()}
                                                sx={{
                                                    "&.Mui-disabled": {
                                                        backgroundColor: "gray",
                                                        color: "white",
                                                        pointerEvents: "auto",
                                                        cursor: "not-allowed",
                                                    },
                                                }}
                                            >
                                                { itemID ?  "Update" : "Create" }
                                            </Button>


                                        </div>
                                    </div>
                                </Box>
                            </Stack>
                        </Event_Scheduling>
                    </div>
                </div>



            </div>

            <div className={Event_style.Inner_container}>

                <div
                    className="w-[84vw] h-[90vh] rounded-xl flex flex-col gap-4 z-500"
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
                    <AddQuestionButton handleAddQuestion={handleAddQuestion}/>

                    {/* Dynamic Question Forms */}
                    {questions.map((question, index) => (
                        <QuestionForm
                            key={index}
                            question={question}
                            index={index}
                            handleChange={handleQuestionChange}
                            handleDelete={handleQuestionDelete}
                        />
                    ))}
                </div>


            </div>


        </div>
    );
}
