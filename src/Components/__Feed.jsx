import React, { useState, useRef, useEffect } from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import InfoIcon from "@mui/icons-material/Info";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { FaCalendarAlt, FaClock, FaUser, FaRegClock } from 'react-icons/fa';


const difficultyColor = {
    Easy: "rgba(16,185,129,0.3)",    // green tint
    Medium: "rgba(245,158,11,0.3)",  // yellow tint
    Hard: "rgba(239,68,68,0.3)",     // red tint
};


const getExpandedColor = (difficulty) => {
    if (!difficulty) return "rgba(255,0,0,0.3)"; // fallback
    const key = difficulty.trim().charAt(0).toUpperCase() + difficulty.trim().slice(1).toLowerCase();
    return difficultyColor[key] || "rgba(255,0,0,0.3)";
};

// =======================
// Timeline Component
// =======================
export const ContentTimeline = ({ items }) => {
    return (
        <Timeline position="right" sx={{ cursor: "pointer" }}>
            {items.map((item, index) => (
                <TimelineItem
                    key={index}
                    onClick={() => console.log(`Item number: ${index + 1}`)}
                    sx={{
                        transition: "transform 0.3s ease, font-weight 0.3s ease",
                        fontWeight: 600,
                        "&:hover": {
                            transform: "scale(1.06)",
                        },
                    }}
                >
                    <TimelineSeparator>
                        <TimelineDot
                            sx={{
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    backgroundColor: "primary.main",
                                    boxShadow: "0 0 10px rgba(0,0,0,0.3)",
                                },
                            }}
                        />
                        {index < items.length - 1 && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>{item}</TimelineContent>
                </TimelineItem>
            ))}
        </Timeline>
    );
};

// =======================
// Expandable List Component
// =======================
export const ExpandableList = ({
    items = [
        {
            title: "Two Sum Problem",
            description:
                "Given an array of integers, find two numbers such that they add up to a specific target number.",
            mark: 10,
            difficulty: "Easy",
            type: "Algorithm",
            event_uid: "event-001",
            createdBy: "Demo User",
            createdBy_uid: "demo-uid-001",
        },
        {
            title: "Reverse Linked List",
            description: "Reverse a singly linked list and return the reversed list.",
            mark: 15,
            difficulty: "Medium",
            type: "Data Structure",
            event_uid: "event-002",
            createdBy: "Demo User",
            createdBy_uid: "demo-uid-001",
        },
        {
            title: "Valid Parentheses",
            description:
                "Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
            mark: 12,
            difficulty: "Easy",
            type: "Algorithm",
            event_uid: "event-003",
            createdBy: "Demo User",
            createdBy_uid: "demo-uid-001",
        },
        {
            title: "Merge Intervals",
            description:
                "Given a collection of intervals, merge all overlapping intervals.",
            mark: 20,
            difficulty: "Medium",
            type: "Algorithm",
            event_uid: "event-004",
            createdBy: "Demo User",
            createdBy_uid: "demo-uid-001",
        },
        {
            title: "LRU Cache",
            description:
                "Design and implement a data structure for Least Recently Used (LRU) cache.",
            mark: 25,
            difficulty: "Hard",
            type: "System Design",
            event_uid: "event-005",
            createdBy: "Demo User",
            createdBy_uid: "demo-uid-001",
        },
    ],
    expandedColor = "rgba(255,0,0,0.2)",
}) => {
    const [expanded, setExpanded] = useState(false);
    const containerRef = useRef(null);

    // Collapse on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setExpanded(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div ref={containerRef} className="w-full max-w-3xl mx-auto space-y-2">
            {items.map((item, index) => {
                const isOpen = expanded === index;

                return (
                    <Accordion
                        key={index}
                        expanded={isOpen}
                        onChange={handleChange(index)}
                        sx={{
                            mb: 1,
                            borderRadius: 2,
                            backgroundColor: isOpen
                                ? getExpandedColor(item.difficulty) // dynamic based on difficulty
                                : "rgba(255,255,255,0.07)",
                            backdropFilter: "blur(10px)",
                            borderBottom: "1px solid rgba(255,255,255,0.2)",
                            borderLeft: "none",
                            borderRight: "none",
                            borderTop: "none",
                            transition: "background-color 0.3s ease",
                        }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
                            aria-controls={`panel${index}-content`}
                            id={`panel${index}-header`}
                        >
                            <Typography sx={{ color: "#fff", fontWeight: 600 }}>
                                {item.title}
                            </Typography>
                        </AccordionSummary>

                        <AccordionDetails>
                            <Typography sx={{ color: "#d1d5db", mb: 1 }}>
                                {item.description}
                            </Typography>
                            <Typography sx={{ color: "#9ca3af", fontSize: "0.9rem", mb: 0.5 }}>
                                <strong>Mark:</strong> {item.mark} | <strong>Difficulty:</strong>{" "}
                                {item.difficulty} | <strong>Type:</strong> {item.type}
                            </Typography>
                            <Typography sx={{ color: "#6b7280", fontSize: "0.8rem" }}>
                                Created By: {item.createdBy}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                );
            })}
        </div>
    );
};











export const EventCard = ({ event }) => {
    return (
        <div className="bg-black text-white rounded-2xl shadow-lg w-[80%] p-5 relative mx-2">
            {/* Title */}
            <div className="flex items-center gap-2 mb-3">
                <InfoIcon className="text-blue-400" />
                <h2 className="text-xl font-semibold">{event.title || "Untitled Event"}</h2>
            </div>

            {/* Description */}
            <p className="text-gray-300 mb-4">
                {event.description || "No description available."}
            </p>

            {/* Date */}
            <div className="flex items-center gap-2 text-gray-300 mb-2">
                <CalendarTodayIcon className="text-green-400" />
                <span>{event.date || "No date"}</span>
            </div>

            {/* Time */}
            <div className="flex items-center gap-2 text-gray-300 mb-2">
                <AccessTimeIcon className="text-yellow-400" />
                <span>
                    {event.startTime || "00:00"} ({event.hours}h {event.minutes}m)
                </span>
            </div>

            {/* Created By */}
            <div className="flex items-center gap-2 text-gray-300 mb-10">
                <PersonIcon className="text-red-400" />
                <span>{event.createdBy || "Unknown"}</span>
            </div>

            {/* Bottom Right Button */}
            <button className="absolute bottom-4 right-4">
                <AddCircleIcon fontSize="large" className="text-blue-500 hover:text-blue-300 transition-colors" />
            </button>
        </div>
    );
}





export const Event_Showing_Description = ({ event }) => {
    if (!event) return null;

    return (
        <div className="flex flex-col justify-start w-full h-full p-6 space-y-6 font-mono bg-transparent text-white rounded-lg shadow-lg">

            {/* Title */}
            <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2 text-2xl font-bold">
                    <FaCalendarAlt className="text-blue-500" />
                    <span>{event.title}</span>
                </div>
                <div className="w-full border-b border-white"></div>
            </div>

            {/* Description */}
            <div className="flex flex-col space-y-2">
                {event.description ? (
                    event.description.split("\n").map((line, i) => (
                        <p key={i}>{line}</p>
                    ))
                ) : (
                    <p>No description provided.</p>
                )}
            </div>

            {/* Date, Time & Duration */}
            <div className="flex flex-col space-y-2 text-left">
                <div className="flex items-center space-x-2">
                    <FaRegClock className="text-green-400" />
                    <span>{event.startTime}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <FaCalendarAlt className="text-yellow-400" />
                    <span>{event.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <FaClock className="text-red-400" />
                    <span>{event.hours}h {event.minutes}m</span>
                </div>
            </div>

            {/* Created By */}
            <div className="flex items-center space-x-2">
                <FaUser className="text-pink-400" />
                <span>{event.createdBy}</span>
            </div>
        </div>
    );
};

