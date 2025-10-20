import { Background_Particles } from "../../Components/__Admin_Login";
import {Question_list2, Question_Description, Question_Description2} from "../../Components/__Question_List.jsx";
import { Button, Typography, Box } from "@mui/material";
import { AccessTime, CalendarMonth, Schedule } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { EventEnterController } from "../../controller/Events/event_enter.controller.js";
import { useGlobal } from "../../GlobalContext.jsx";

export default function EventStart() {
    const { currentName, user_uid } = useGlobal();
    const [event, setEvent] = useState({
        title: "AI Challenge 2025",
        description: "Compete to solve real-world AI problems using your coding skills!",
        createdBy: "Adnan Abdullah",
        totalMark: 100,
        date: "2025-11-10",
        startTime: "10:00 AM",
        duration: { hours: 2, minutes: 30 },
    });

    const navigate = useNavigate();
    const location = useLocation();
    const controller = new EventEnterController(navigate);

    const handleUserManagement = () => {
        controller._handleUserInformationForEvent({
            eventID: location.state?.item.id,
            userID: user_uid,
            name: currentName,
        });
        console.log("\n\nFrom UI class");
        console.log("Event : ", location.state?.item.id ?? "its not a part of Event");
        console.log("User ID: ", user_uid);
    };

    useEffect(() => {
        if (location.state?.item) setEvent(location.state.item);
        else console.log("No eventID found in state");
    }, [location.state]);

    return (
        <div className="w-screen min-h-screen bg-black relative overflow-hidden flex flex-col">
            <Background_Particles />

            {/* Responsive container */}
            <div className="w-full h-full flex flex-col lg:flex-row items-center justify-center gap-6 p-4 sm:p-6 md:p-10">

                {/* -------- Event Description Section -------- */}
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

                        <Typography variant="subtitle1" sx={{ color: "#ffb3b3", mb: 0.5 }}>
                            Created by: {event.createdBy}
                        </Typography>

                        <Typography variant="subtitle1" sx={{ color: "#ffb3b3" }}>
                            Total Marks: {event.totalMark}
                        </Typography>
                    </Box>
                </Question_list2>

                {/* -------- Event Schedule & Start Button Section -------- */}
                <Question_Description2 className="flex-1 w-full min-h-[300px] ">
                    <Box
                        sx={{
                            width: "100%",
                            height: "100%",
                            flex: 1,
                            background: "transparent",


                            // background: 'white',
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
                        {/* Decorative Glow */}
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

                        {/* Schedule Content */}
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
                                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                                    <CalendarMonth sx={{ color: "#ff1744" }} />
                                    <Box sx={{ textAlign: "left" }}>
                                        <Typography sx={{ fontSize: "0.9rem", opacity: 0.7 }}>
                                            Date
                                        </Typography>
                                        <Typography sx={{ fontWeight: 600 }}>{event.date}</Typography>
                                    </Box>
                                </Box>

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

                        {/* Start Button */}
                        <Box sx={{ zIndex: 1, mt: { xs: 3, md: 0 } }}>
                            <Button
                                onClick={() => {
                                    handleUserManagement();
                                    controller._handleNavigation_EventSolve(event);
                                }}
                                variant="contained"
                                color="error"
                                size="large"
                                startIcon={<AccessTime />}
                                sx={{
                                    borderRadius: "30px",
                                    fontSize: { xs: "1rem", sm: "1.1rem" },
                                    textTransform: "none",
                                    px: { xs: 3, md: 4 },
                                    py: { xs: 1, md: 1.2 },
                                    boxShadow: "0 0 15px rgba(255, 0, 0, 0.4)",
                                    transition: "0.3s",
                                    "&:hover": {
                                        boxShadow: "0 0 30px rgba(255, 0, 0, 0.6)",
                                        transform: "scale(1.05)",
                                    },
                                }}
                            >
                                Start Event
                            </Button>
                        </Box>
                    </Box>
                </Question_Description2>
            </div>
        </div>
    );
}
