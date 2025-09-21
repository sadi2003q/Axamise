// File Path: src/pages/Event_Create.jsx

import { useContext, useEffect, useState } from "react";

// Material UI
import { Stack, Box } from "@mui/material";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

// Model
import { Events_Model } from "../models/Event_Model.js";

// Components
import Profile_Background from "../Components/__Profile";
import {
    Event_style,
    Event_Description,
    Event_Scheduling,
    CustomTextField,
    DurationTextField,
    DescriptionField,
} from "../Components/__Event_Create.jsx";

// Controller
import { EventCreateServiceController } from "../controller/event_create.controller.js";

// Global Context
import { IdContext } from "../IdContext.jsx";

// Routing
import { useLocation, useNavigate } from "react-router-dom";

export default function Event_Create() {
    // Context
    const { id } = useContext(IdContext);

    // State
    const [event, setEvent] = useState(
        new Events_Model(
            "",
            "",
            "2023-10-01",
            "10:00",
            { hours: 0, minutes: 0 },
            "current name is undefined",
            id
        )
    );
    const [fieldError, setFieldError] = useState({
        field: null,
        message: null,
    });

    const location = useLocation();
    const navigate = useNavigate();
    const { itemID } = location.state || {};

    // Controller instance (re-created when event changes)
    const controller = new EventCreateServiceController(
        event,
        setEvent,
        setFieldError,
        navigate
    );

    // Fetch if editing existing event
    useEffect(() => {
        if (itemID) controller.handleFetchEvent(itemID);
        else console.log("🆕 Creating new event");
        
    }, []);

    // Handlers
    const handleChange = (e) => {
        setEvent((prev) => {
            const updated = new Events_Model(
                e.target.name === "title" ? e.target.value : prev.title,
                e.target.name === "description" ? e.target.value : prev.description,
                e.target.name === "date" ? e.target.value : prev.date,
                e.target.name === "startTime" ? e.target.value : prev.startTime,
                prev.duration,
                prev.createdBy,
                prev.createdBy_uid,
                prev.createdAt
            );
            return updated;
        });

        if (fieldError.field === e.target.name) {
            setFieldError({ field: null, message: null });
        }
    };

    const handleDurationChange = (e) => {
        const { name, value } = e.target;
        setEvent((prev) => {
            const newDuration = {
                ...prev.duration,
                hours: name === "hour" ? Number(value) : prev.duration.hours,
                minutes:
                    name === "durationMinutes"
                        ? Number(value)
                        : prev.duration.minutes,
            };
            return new Events_Model(
                prev.title,
                prev.description,
                prev.date,
                prev.startTime,
                newDuration,
                prev.createdBy,
                prev.createdBy_uid,
                prev.createdAt
            );
        });
    };

    const isFormValid = () => {
        return event.isValid() &&
            (event.duration.hours > 0 ||
                (event.duration.minutes >= 0 && event.duration.minutes <= 59));
    };

    // Save handler
    const handleClick = async () => {
        if (itemID) await controller.handleUpdateEvent(itemID);
        else await controller.handleUploadEvent();
        
    };

    // UI
    return (
        <div className={Event_style.Outer_Container}>
            {/* Background */}
            <Profile_Background />

            {/* Centered Event Boxes */}
            <div className={Event_style.Inner_container}>
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
    );
}
