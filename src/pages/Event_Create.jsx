/* eslint-disable no-unused-vars */

import { useContext, useEffect, useState } from "react";


// Material UI
import TextField from '@mui/material/TextField';
import { Slider, Stack, Box } from "@mui/material";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

// Model
import { Events_Model } from "../models/Event_Model.js";


// Components
import { GetCommonProps } from "../Components/__Common.jsx";
import Profile_Background from "../Components/__Profile";
import { Event_style, Event_Description, Event_Scheduling } from "../Components/__Event_Create.jsx";


// View Model
import { _Upload_Event, Fetch_Event } from "../ViewModel/Event_Created_ViewModel.js";
import { IdContext } from "../IdContext.jsx";


// import { IdContext } from "../IdContext.jsx";
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
    const [mark, setMark] = useState(100);
    const location = useLocation();   // ✅ Hook at top level

    // const params = new URLSearchParams(location.search);
    // const itemID = params.get("itemID");
    const { itemID } = location.state || {};

    useEffect(() => {
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
            console.log(`id not found`)
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
                    <TextField
                        {...GetCommonProps("gray", "white", "cyan", "2rem")}
                        label="Title"
                        name="title"
                        value={event.title}
                        onChange={handleChange}
                        fullWidth
                        required
                    />

                    {/* Description */}
                    <div className={Event_style.description_container}>
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
                    </div>

                    {/*  Event Scheduling  */}
                </Event_Description>

                {/* Event Scheduling */}
                <Event_Scheduling>
                    <Stack spacing={6} className="w-full">


                        {/* Date Picker */}
                        <TextField
                            {...GetCommonProps("gray", "white", "cyan", "1.5rem")}
                            label="Date (DD/MM/YYYY)"
                            name="date"
                            type="date"
                            value={event.date}
                            onChange={handleChange}
                            fullWidth
                            // InputLabelProps={{ shrink: true }}
                            required
                        />
                        






                        {/* Start Time */}
                        <TextField
                            {...GetCommonProps("gray", "white", "cyan", "1.5rem")}
                            label="Start Time"
                            name="startTime"
                            type="time"
                            value={event.startTime}
                            onChange={handleChange}
                            fullWidth
                            // InputLabelProps={{ shrink: true }}
                            required
                        />

                        <Stack direction="row" spacing={4} className="w-full mt-4">
                            {/* Hours Field */}
                            <TextField
                                {...GetCommonProps("gray", "white", "white", "1.5rem")}
                                label="Hours"
                                name="hour"
                                type="number"
                                placeholder="01"
                                value={event.duration.hours}
                                onChange={handleDurationChange}
                                fullWidth
                                required
                                InputLabelProps={{
                                    shrink: true,
                                    style: { color: "white", fontFamily: "monospace" },
                                }}
                                inputProps={{ min: 0, style: { fontFamily: "monospace" } }}
                                variant="outlined"
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": { borderColor: "gray" },
                                        "&:hover fieldset": { borderColor: "cyan" },
                                        "&.Mui-focused fieldset": { borderColor: "cyan" },
                                    },
                                    "& .MuiInputLabel-root.Mui-focused": {
                                        color: "white",
                                    },
                                }}
                            />

                            {/* Minutes Field */}
                            <TextField
                                {...GetCommonProps("gray", "white", "white", "1.5rem")}
                                label="Minutes"
                                name="durationMinutes"
                                type="number"
                                placeholder="30"
                                value={event.duration.minutes}
                                onChange={handleDurationChange}
                                fullWidth
                                required
                                InputLabelProps={{
                                    shrink: true,
                                    style: { color: "white", fontFamily: "monospace" },
                                }}
                                inputProps={{ min: 0, max: 59, style: { fontFamily: "monospace" } }}
                                variant="outlined"
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": { borderColor: "gray" },
                                        "&:hover fieldset": { borderColor: "cyan" },
                                        "&.Mui-focused fieldset": { borderColor: "cyan" },
                                    },
                                    "& .MuiInputLabel-root.Mui-focused": {
                                        color: "white",
                                    },
                                }}
                            />
                        </Stack>




                        {/* Mark Slider */}
                        <Box className="w-full">



                            {/*  Button Group */}
                            <div className={" flex w-full h-10 mt-4 items-center justify-between "}>

                                <div></div>
                                <div className="flex gap-4">

                                    {/*  Add Mode button  */}
                                    <Button
                                        onClick={handleClick}
                                        variant="contained"
                                        endIcon={<AddShoppingCartIcon />}
                                        disabled={!isFormValid()}   // Disable until valid
                                        sx={{
                                            backgroundColor: "purple",
                                            "&.Mui-disabled": {
                                                backgroundColor: "gray",
                                                color: "white",
                                                pointerEvents: "auto",   // 👈 allow pointer events
                                                cursor: "not-allowed",   // 👈 now cursor shows
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
                                        disabled={!isFormValid()}   // Disable until valid
                                        sx={{

                                            "&.Mui-disabled": {
                                                backgroundColor: "gray",
                                                color: "white",
                                                pointerEvents: "auto",   // 👈 allow pointer events
                                                cursor: "not-allowed",   // 👈 now cursor shows
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
