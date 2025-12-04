// File: src/pages/Question_Create.jsx

/**
 * Question Creation/Editing Page
 *
 * This component provides an interface for creating new questions or editing existing ones.
 * It handles both standalone question creation and question creation within specific events.
 *
 * Features:
 * - Create new coding questions with title, description, and specifications
 * - Edit existing questions (when questionID is provided)
 * - Assign questions to specific events
 * - Set question difficulty, type, and marks
 * - Form validation and error handling
 *
 * @component
 * @example
 * // For creating a new question
 * return <Question_Create />
 *
 * @example
 * // For editing an existing question
 * return <Question_Create /> // with questionID passed via route state
 */

import { useEffect, useState } from "react";
import { Stack, Box } from "@mui/material";
import { useLocation } from "react-router-dom";

// Components
import Profile_Background from "../../Components/__Profile.jsx"; // Common Background
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
} from "../../Components/__Question_Create.jsx";

// Model & Controller
import Question from "../../models/Question_Model.js";
import QuestionController from "../../controller/Questions/question_create.controller.js";

// Global Context
import { useGlobal } from "../../GlobalContext.jsx";

// Routes
import { useNavigate } from "react-router-dom";
import {routes} from "../../Utilities.js";

// =========================================================================
// MAIN COMPONENT
// =========================================================================

export default function Question_Create() {
    // =========================================================================
    // ROUTER & GLOBAL STATE
    // =========================================================================

    /**
     * Router location hook to access passed state parameters
     */
    const location = useLocation();

    /**
     * Event ID and Question ID passed via navigation state
     * - itemID: The event ID when creating question within an event context
     * - questionID: The question ID when editing an existing question
     * @type {Object}
     */
    const { itemID, questionID } = location.state || {};

    /**
     * Global user context for current user ID
     */
    const { user_uid } = useGlobal();

    /**
     * Router navigation hook for programmatic navigation
     */
    const navigate = useNavigate();

    // =========================================================================
    // STATE MANAGEMENT
    // =========================================================================

    /**
     * Main question state holding all question properties
     * Initialized with default values for new question creation
     * @type {[Question, Function]}
     */
    const [question, setQuestion] = useState(
        new Question({
            title: "demo title",
            description: "Description",
            mark: 0,
            difficulty: "",
            type: "Linked List",
            event_uid: itemID || "No event id Found",
            createdBy: "Adnan",
            createdBy_uid: user_uid,
        })
    );

    /**
     * List of available events for question assignment
     * @type {[Array, Function]}
     */
    const [event, setEvent] = useState([]);

    /**
     * Controls the visibility of the events selection drawer
     * @type {[boolean, Function]}
     */
    const [drawerOpen, setDrawerOpen] = useState(false);

    /**
     * Error message state for form validation and API errors
     * @type {[string|null, Function]}
     */
    const [error, setError] = useState(null);

    // =========================================================================
    // FORM VALIDATION
    // =========================================================================

    /**
     * Validation flag checking if all required fields are properly filled
     * Required fields: title, description, mark > 0, difficulty, type, event_uid, createdBy, createdBy_uid
     * @type {boolean}
     */
    const isValid =
        question.title &&
        question.description &&
        question.mark > 0 &&
        question.difficulty &&
        question.type &&
        question.event_uid &&
        question.createdBy &&
        question.createdBy_uid;

    // =========================================================================
    // CONTROLLER INITIALIZATION
    // =========================================================================

    /**
     * Controller instance handling business logic for:
     * - Question creation and updates
     * - Data fetching
     * - Error handling
     * - Navigation
     */
    const controller = new QuestionController(question, setQuestion, setError, navigate);

    // =========================================================================
    // EVENT HANDLERS
    // =========================================================================

    /**
     * Handles changes to text input fields (title, description, type)
     * Updates the question state with new values while preserving other properties
     *
     * @param {React.ChangeEvent} e - Change event from input field
     */
    const handleChange = (e) => {
        const updated = new Question({
            ...question,
            [e.target.name]: e.target.value
        });
        setQuestion(updated);
    };

    /**
     * Handles changes to the mark slider value
     * Updates the question's mark property with the new slider value
     *
     * @param {Event} event - The change event (unused)
     * @param {number} newValue - The new mark value from the slider
     */
    const handleMarkChange = (event, newValue) => {
        const updated = new Question({
            ...question,
            mark: newValue
        });
        setQuestion(updated);
    };

    /**
     * Handles saving the question (both create and update scenarios)
     * - If questionID exists: updates existing question
     * - If no questionID: creates new question
     */
    const handleSave = async () => {
        if (questionID) {
            await controller.handleUpdate(questionID);
        } else {
            await controller.handleUpload();
        }
    };

    // =========================================================================
    // LIFECYCLE & SIDE EFFECTS
    // =========================================================================



    useEffect(() => {
        if(!user_uid) {
            navigate(routes.login)
        }
    }, []);



    /**
     * Effect to load initial data on component mount:
     * - Fetches available events for the current user
     * - If editing (questionID provided), fetches the existing question data
     */
    useEffect(() => {
        /**
         * Fetches all events available to the current user
         * Populates the events drawer with user's events
         */
        console.log('id : ', user_uid);
        const fetchEvents = async () => {
            const result = await controller.GetAllEvents(user_uid);
            if (result.success) {
                setEvent(result.data);
            } else {
                console.error("Error fetching events:", result.error);
            }
        };

        fetchEvents();

        // If editing existing question, fetch its data
        if (questionID) {
            controller.handleFetch(questionID);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // =========================================================================
    // RENDER COMPONENT
    // =========================================================================

    return (
        // Main container with background
        <div className={Question_style.Outer_Container}>
            {/* Background component for consistent styling */}
            <Profile_Background />

            {/* Main content area */}
            <div className={Question_style.Inner_container}>

                {/* =================================================================
                    LEFT PANEL - QUESTION CONTENT
                    ================================================================= */}
                <Question_Description>

                    {/* Question Title Input */}
                    <InputField
                        label="Title"
                        name="title"
                        value={question.title}
                        handleChange={handleChange}
                    />

                    {/* Question Description Textarea */}
                    <DescriptionField
                        id="description"
                        name="description"
                        value={question.description}
                        handleChange={handleChange}
                        label="Description"
                    />

                    {/* Error Display */}
                    {error && (
                        <p className="text-red-500 text-sm">
                            {error}
                        </p>
                    )}

                </Question_Description>

                {/* =================================================================
                    RIGHT PANEL - QUESTION SPECIFICATIONS
                    ================================================================= */}
                <Question_Specification>

                    <Stack spacing={6} className="w-full">

                        {/* Question Type Input */}
                        <InputField
                            label="Type"
                            name="type"
                            value={question.type}
                            handleChange={handleChange}
                        />

                        {/* Difficulty Level Selector */}
                        <Select_Difficulty
                            value={question.difficulty}
                            onChange={handleChange}
                        />

                        {/* Event Selection Area */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                marginTop: "1rem",
                            }}
                        >
                            {/* Event Display Field (read-only) */}
                            <InputField
                                label="Event"
                                name="event_title"
                                value={
                                    question.event_uid
                                        ? event.find((e) => e.user_uid === question.event_uid)?.title || ""
                                        : ""
                                }
                                handleChange={() => { }} // Read-only field
                                font_size="1rem"
                            />

                            {/* Button to Open Events Drawer */}
                            <Drower_Open_Button
                                handleClick={() => setDrawerOpen(true)}
                            />
                        </div>

                        {/* Marks and Action Section */}
                        <Box>
                            {/* Marks Slider */}
                            <Mark_Slider
                                value={question.mark}
                                handleChange={handleMarkChange}
                            />

                            {/* Save/Update Button (conditionally rendered) */}
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

            {/* =================================================================
                EVENTS SELECTION DRAWER
                ================================================================= */}
            <Drawer_Input
                drawerOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                item={event}
                iconColor="cyan"
                onItemClick={(item) => {
                    console.log("Clicked item:", item);
                    // Update question with selected event
                    const updated = new Question({
                        ...question,
                        event_uid: item.id
                    });
                    setQuestion(updated);
                    setDrawerOpen(false);
                }}
            />
        </div>
    );
}