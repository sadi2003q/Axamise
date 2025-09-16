/* eslint-disable no-unused-vars */

import { useContext, useEffect, useState } from "react";

// Material UI
import TextField from '@mui/material/TextField';
import { Stack, Box } from "@mui/material";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

// Model
import { Events_Model } from "../models/Event_Model.js";

// Components
import { GetCommonProps } from "../Components/__Common.jsx";
import Profile_Background from "../Components/__Profile";
import { Event_style, Event_Description, Event_Scheduling, CustomTextField, DurationTextField, DescriptionField } from "../Components/__Event_Create.jsx";

// View Model
import { _Upload_Event, Fetch_Event } from "../ViewModel/Event_Created_ViewModel.js";

// Global Context
import { IdContext } from "../IdContext.jsx";


// Routing
import { useLocation } from "react-router-dom";



export default function Event_Create() {

    //  Variables
    const { id, currentName } = useContext(IdContext);
    const [event, setEvent] = useState({
        ...Events_Model,
        title: "",
        description: "",
        date: "2023-10-01",
        startTime: "10:00",
        duration: {
            hours: 0,
            minutes: 0,
        },
        question: [],
        createdBy: currentName,
        createdBy_uid: id
    });
    const [fieldError, setFieldError] = useState({ field: null, message: null });
    const location = useLocation();   // ✅ Hook at top level
    const { itemID } = location.state || {};



    // Immidiately Run Function
    useEffect(() => {


        // If Item Id is Found on the Url thel it will automatically download all the information from the database and then add in the respected Field
        if (itemID) {
            const fetchEvent = async () => {
                try {
                    console.log(itemID);
                    const result = await Fetch_Event(itemID);
                    if (result.success) {
                        setEvent({
                            ...Events_Model,
                            ...result.data,
                            duration: {
                                hours: result.data?.hours ?? 0,
                                minutes: result.data?.minutes ?? 0,
                            },
                        });
                    }
                } catch (err) {
                    console.error(err);
                }
            };
            fetchEvent();
        } else {
            console.log(`You Are creating new Events`)
        }
    }, [itemID]);


    // UI changes
    const handleChange = (e) => {
        setEvent({ ...event, [e.target.name]: e.target.value });
        if (fieldError.field === e.target.name) {
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
    const isFormValid = () => {
        return (
            event.title.trim() !== "" &&
            event.description.trim() !== "" &&
            event.date.trim() !== "" &&
            event.startTime.trim() !== "" &&
            event.duration.hours > 0 &&
            event.duration.minutes >= 0 &&
            event.duration.minutes <= 59
        );
    };

    // Functions
    const handleClick = async () => {
        console.log(event);

        // Only pass itemID if it exists
        const result = itemID
            ? await _Upload_Event(event, itemID)
            : await _Upload_Event(event);

        if (result.success) {
            console.log("✅ Data is being caught:", result);
        } else {
            console.log("❌ Failed, data is not uploaded");
        }
    };


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
                    {/* <div className={Event_style.description_container}>
                        <textarea
                            id="description"
                            name="description"
                            value={event.description}
                            onChange={handleChange}
                            required
                            placeholder=" "
                            className={Event_style.description}
                        />
                        <label
                            htmlFor="description"
                            className={Event_style.Description_label}
                        >
                            Description
                        </label>
                    </div> */}

                    <DescriptionField
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





                        {/* Mark Slider & Buttons */}
                        <Box className="w-full">
                            <div className="flex w-full h-10 mt-4 items-center justify-between">
                                <div></div>
                                <div className="flex gap-4">




                                    {/* Add Mode button */}
                                    <Button
                                        onClick={handleClick}
                                        variant="contained"
                                        endIcon={<AddShoppingCartIcon />}
                                        disabled={!isFormValid()}
                                        sx={{
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
                                        Publish
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