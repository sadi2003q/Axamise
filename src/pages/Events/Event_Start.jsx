/**
 * EventStart.jsx
 * ------------------------------------------
 * This component renders the event start page.
 * It displays:
 *  - Event information (title, description, marks, etc.)
 *  - Event schedule (date, time, duration)
 *  - A button to start or enter the event
 *
 * Functionalities:
 *  - Fetches event data from the location state
 *  - Checks if the user can enter the event
 *  - Registers user info in the event entry collection
 *  - Navigates to the solving section if allowed
 */

import { Background_Particles } from "../../Components/__Admin_Login";
import {
    Question_list2,
    Question_Description,
    Question_Description2,
} from "../../Components/__Question_List.jsx";
import { Button, Typography, Box } from "@mui/material";
import { AccessTime, CalendarMonth, Schedule } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { EventEnterController } from "../../controller/Events/event_enter.controller.js";
import { useGlobal } from "../../GlobalContext.jsx";

export default function EventStart() {
    // -------------------- Global Context --------------------
    // Fetch the current user's name and UID from global context
    const { currentName, user_uid } = useGlobal();

    // -------------------- State Management --------------------
    // Local state to store event details (default values shown before loading actual event)
    const [event, setEvent] = useState({
        title: "AI Challenge 2025",
        description: "Compete to solve real-world AI problems using your coding skills!",
        createdBy: "Adnan Abdullah",
        totalMark: 100,
        date: "2025-11-10",
        startTime: "10:00 AM",
        duration: { hours: 2, minutes: 30 },
    });

    // Determines if the user is restricted from entering again
    const [entryRestricted, setEntryRestricted] = useState(false);

    // Determine total mark
    const [totalMark, setTotalMark] = useState(0);

    // -------------------- Hooks & Controllers --------------------
    const navigate = useNavigate();
    const location = useLocation();
    const [currentScoreState, setCurrentScoreState] = useState([])
    const controller = new EventEnterController(navigate, setCurrentScoreState);

    // for showing all participants score





    // -------------------- User Info Setup --------------------
    /**
     * Saves or updates user information when they try to enter an event.
     * This ensures the user is registered in the event's participant data.
     */
    const handleUserManagement = () => {
        controller._handleUserInformationForEvent({
            eventID: location.state?.item.id,
            userID: user_uid,
            name: currentName,
        });
    };

    // -------------------- Load Event Data --------------------
    useEffect(() => {
        // Load event data passed through react-router state
        if (location.state?.item) {
            setEvent(location.state.item);

            const eventName = location.state?.item
            eventName.allQuestions.forEach((question) => {
                console.log('mark : ', question.point)
                setTotalMark(prev => Number(prev) + Number(question.point))
            })
        }
        else console.log("No eventID found in state");
    }, [location.state]);

    // -------------------- Entry Permission Check --------------------
    useEffect(() => {
        // If event data exists, check whether user can still enter the event
        if (location.state?.item) {
            const eventUID = location.state?.item?.id;
            controller._handleEventEntry({ eventID: eventUID, userID: user_uid }).then((response) => {
                setEntryRestricted(response.data);
            });
        }
    }, []);


    // -------------------- Fetch Score Card --------------------
    useEffect(() => {
        if (location.state?.item) {
            const id = location.state?.item?.id;
            controller._handleFetchScoreCard({ eventID: id }).then(() => {});
        }
    }, [])


    // -------------------- JSX Return --------------------
    return (
        <div className="w-screen min-h-screen bg-black relative overflow-hidden flex flex-col">
            {/* Background particle animation */}
            <Background_Particles />

            {/* Main layout wrapper */}
            <div className="w-full h-full flex flex-col lg:flex-row items-center justify-center gap-6 p-4 sm:p-6 md:p-10">

                {/* ----------- Left Section: Event Description ----------- */}
                <Question_list2 className="flex flex-col flex-1 w-full min-h-[300px] items-start justify-start">
                    <Box
                        sx={{
                            width: "100%",
                            height: "100%",
                            flex: 1,
                            background: "linear-gradient(145deg, #b71c1c 0%, #000 80%)",
                            color: "white",
                            borderRadius: "20px",
                            p: { xs: "1.5rem", md: "2rem" },
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            boxShadow: "0 0 25px rgba(255,0,0,0.3)",
                            textAlign: { xs: "start", lg: "left" },
                        }}
                    >
                        {/* Event Title */}
                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: "bold",
                                mb: 2,
                                fontSize: { xs: "1.8rem", sm: "2rem", md: "2.5rem" },
                            }}
                        >
                            {event.title}
                        </Typography>

                        {/* Event Description */}
                        <Typography
                            variant="body1"
                            sx={{
                                opacity: 0.9,
                                mb: 3,
                                fontSize: { xs: "0.9rem", md: "1rem" },
                            }}
                        >
                            {event.description}
                        </Typography>

                        {/* Creator Info */}
                        <Typography variant="subtitle1" sx={{ color: "#ffb3b3", mb: 0.5 }}>
                            Created by: {event.createdBy}
                        </Typography>

                        {/* Total Marks Info */}
                        <Typography variant="subtitle1" sx={{ color: "#ffb3b3" }}>
                            Total Marks: {totalMark}
                        </Typography>
                    </Box>
                </Question_list2>

                {/* ----------- Right Section: Event Schedule + Start Button ----------- */}
                <Question_Description2 className="flex-1 w-full min-h-[300px] ">
                    <Box
                        sx={{
                            width: "100%",
                            height: "100%",
                            flex: 1,
                            background: "transparent",
                            color: "white",
                            borderRadius: "20px",
                            p: { xs: "2rem 1.5rem", md: "3rem 2rem" },
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            alignItems: "center",
                            boxShadow: "0 0 30px rgba(255,255,255,0.1)",
                            position: "relative",
                            overflow: "hidden",
                        }}
                    >

                        {/* Decorative glowing background shapes */}
                        <Box
                            sx={{
                                position: "absolute",
                                top: "-20%",
                                left: "-10%",
                                width: "200px",
                                height: "200px",
                                background:
                                    "radial-gradient(circle, rgba(255,0,0,0.3) 0%, transparent 70%)",
                                filter: "blur(60px)",
                                zIndex: 0,
                            }}
                        />
                        <Box
                            sx={{
                                position: "absolute",
                                bottom: "-20%",
                                right: "-10%",
                                width: "250px",
                                height: "250px",
                                background:
                                    "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
                                filter: "blur(80px)",
                                zIndex: 0,
                            }}
                        />

                        {/* ----------- Schedule Details ----------- */}
                        <Box
                            sx={{
                                zIndex: 1,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 3,
                                textAlign: "center",
                                width: "100%",
                            }}
                        >
                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: "bold",
                                    mb: 1,
                                    fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2rem" },
                                }}
                            >
                                Event Schedule
                            </Typography>

                            {/* Schedule Card */}
                            <Box
                                sx={{
                                    background: "rgba(255, 255, 255, 0.05)",
                                    borderRadius: "15px",
                                    p: { xs: "1rem", sm: "1.5rem 2rem" },
                                    width: "100%",
                                    maxWidth: "350px",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 2,
                                    boxShadow: "0 0 15px rgba(255,255,255,0.05)",
                                }}
                            >
                                {/* Event Date */}
                                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                                    <CalendarMonth sx={{ color: "#ff1744" }} />
                                    <Box sx={{ textAlign: "left" }}>
                                        <Typography sx={{ fontSize: "0.9rem", opacity: 0.7 }}>
                                            Date
                                        </Typography>
                                        <Typography sx={{ fontWeight: 600 }}>{event.date}</Typography>
                                    </Box>
                                </Box>

                                {/* Start Time */}
                                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                                    <AccessTime sx={{ color: "#ff1744" }} />
                                    <Box sx={{ textAlign: "left" }}>
                                        <Typography sx={{ fontSize: "0.9rem", opacity: 0.7 }}>
                                            Start Time
                                        </Typography>
                                        <Typography sx={{ fontWeight: 600 }}>
                                            {event.startTime}
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* Duration */}
                                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                                    <Schedule sx={{ color: "#ff1744" }} />
                                    <Box>
                                        <Typography sx={{ fontSize: "0.9rem", opacity: 0.7 }}>
                                            Duration
                                        </Typography>
                                        <Typography sx={{ fontWeight: 600 }}>
                                            {event.hours}h {event.minutes}m
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>

                        {/* ----------- Start Event Button ----------- */}
                        <Box sx={{ zIndex: 1, mt: { xs: 3, md: 0 } }}>
                            {/* This button registers the user and navigates to the solving page */}
                            <Button
                                onClick={() => {
                                    handleUserManagement();
                                    controller._handleNavigation_EventSolve(event);
                                }}
                                disabled={entryRestricted}
                                variant="contained"
                                color={entryRestricted ? "secondary" : "error"}
                                size="large"
                                startIcon={<AccessTime />}
                                sx={{
                                    borderRadius: "30px",
                                    fontSize: { xs: "1rem", sm: "1.1rem" },
                                    textTransform: "none",
                                    px: { xs: 3, md: 4 },
                                    py: { xs: 1, md: 1.2 },
                                    boxShadow: entryRestricted
                                        ? "0 0 15px rgba(255,255,255,0.4)"
                                        : "0 0 15px rgba(255, 0, 0, 0.4)",
                                    backgroundColor: entryRestricted ? "gray !important" : undefined,
                                    color: entryRestricted ? "white !important" : "inherit",
                                    opacity: 1, // Override MUI's default opacity when disabled
                                    transition: "0.3s",
                                }}
                            >
                                {entryRestricted ? "Can't Enter More" : "Start Event"}
                            </Button>
                        </Box>
                    </Box>
                </Question_Description2>
            </div>


            {/* -------------------- Score Card -------------------- */}
            <div className="w-full h-[86vh] m-2 rounded-lg bg-transparent text-white flex flex-col items-center overflow-y-auto">
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: "bold",
                        mt: 3,
                        mb: 2,
                        textAlign: "center",
                        color: "#ff1744",
                    }}
                >
                    Event Score Card
                </Typography>

                {currentScoreState.length === 0 ? (
                    // Fallback view when no participants
                    <Box
                        sx={{
                            width: "90%",
                            maxWidth: "600px",
                            mt: 10,
                            p: 4,
                            textAlign: "center",
                            background: "rgba(255,255,255,0.05)",
                            borderRadius: "15px",
                            border: "1px solid rgba(255,255,255,0.1)",
                            boxShadow: "0 0 15px rgba(255,255,255,0.1)",
                        }}
                    >
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                            No participants yet
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.7 }}>
                            Nobody has participated in this event so far.
                        </Typography>
                    </Box>
                ) : (
                    // Map through participants
                    currentScoreState.map((user, index) => (
                        <Box
                            key={user.userID}
                            sx={{
                                width: "90%",
                                maxWidth: "900px",
                                background: "rgba(255, 255, 255, 0.05)",
                                borderRadius: "15px",
                                p: 2,
                                mb: 2,
                                display: "flex",
                                flexDirection: { xs: "column", md: "row" },
                                alignItems: "center",
                                justifyContent: "space-between",
                                boxShadow: "0 0 15px rgba(255,255,255,0.1)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                transition: "0.3s",
                                "&:hover": {
                                    background: "rgba(255, 0, 0, 0.1)",
                                    boxShadow: "0 0 20px rgba(255, 0, 0, 0.3)",
                                },
                            }}
                        >
                            {/* Left: User Info */}
                            <Box sx={{ flex: 1, textAlign: { xs: "center", md: "left" } }}>
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    {index + 1}. {user.name}
                                </Typography>
                                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                                    ID: {user.userID}
                                </Typography>
                            </Box>

                            {/* Middle: Score & Status */}
                            <Box
                                sx={{
                                    flex: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <Typography variant="h6" sx={{ color: "#ffb3b3", fontWeight: 600 }}>
                                    Score: {user.score}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color:
                                            user.state === "Best"
                                                ? "#4caf50"
                                                : user.state === "Good"
                                                    ? "#ffeb3b"
                                                    : "#ff7043",
                                    }}
                                >
                                    {user.state}
                                </Typography>
                            </Box>

                            {/* Right: Time & Complexity */}
                            <Box
                                sx={{
                                    flex: 1,
                                    textAlign: { xs: "center", md: "right" },
                                }}
                            >
                                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                    Complexity: {user.timeComplexity}
                                </Typography>
                                <Typography variant="body2" sx={{ opacity: 0.6 }}>
                                    {new Date(user.createdAt).toLocaleString()}
                                </Typography>
                            </Box>
                        </Box>
                    ))
                )}
            </div>


        </div>
    );
}
