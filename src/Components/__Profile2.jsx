// src/Pages/Profile/Profile_Components.jsx
import React from "react";
import { LineChart, Line, Tooltip, ResponsiveContainer } from "recharts";
import { useMemo } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Flag, Users } from "lucide-react";
import { Calendar, Star, Award, Activity, Bookmark, Clock } from "lucide-react";
import {EVENT_STATE} from "../Utilities.js";



// Tooltip for graph
export const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-gray-800 px-3 py-2 rounded-lg text-white text-sm">
                <p>{label}</p>
                <p>Problems Solved: {payload[0].value}</p>
            </div>
        );
    }
    return null;
};

// Graph Section
export const GraphSection = ({ title, data }) => (
    <div className="h-[250px] w-full p-2 mx-auto">
        <h3 className="text-white text-lg mb-2 text-center">{title}</h3>
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="problemsSolved" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
        </ResponsiveContainer>
    </div>
);

// Custom card component CustomCard
export const CustomCard = ({
                               problemEncounter,
                               problemCount,
                               eventParticipated,
                           }) => {
    const items = [
        { label: "Problem Encountered", value: problemEncounter, colorFrom: "from-red-400", colorTo: "to-red-600" },
        { label: "Problem Count", value: problemCount, colorFrom: "from-blue-400", colorTo: "to-blue-600" },
        { label: "Event Participated", value: eventParticipated, colorFrom: "from-green-400", colorTo: "to-green-600" },
    ];

    return (
        <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 w-full mt-12 flex flex-col items-center gap-12">

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 w-full place-items-center">

                {items.map((item, i) => (
                    <div key={i} className="flex flex-col items-center justify-center relative">

                        {/* Spinning Outer Ring */}
                        <div className="relative w-40 h-40 flex items-center justify-center">
                            <div
                                className={`absolute inset-0 rounded-full border-8 border-t-[12px] border-b-[12px] border-t-transparent border-b-transparent border-l-[12px] border-l-white border-r-[12px] border-r-white ${item.colorFrom} ${item.colorTo}`}
                                style={{ animation: "spin 2s linear infinite" }}
                            ></div>

                            {/* Inner static content */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-4xl font-extrabold text-white">{item.value}</span>
                                <span className="text-xs text-white/70 text-center mt-1 px-2">{item.label}</span>
                            </div>
                        </div>

                    </div>
                ))}

            </div>

            {/* Inline Tailwind animation keyframes */}
            <style>
                {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
            </style>

        </div>
    );
};






// Profile image
export const ProfileImage = ({ name }) => (
    <div className="flex flex-col items-center w-full h-[40%] mt-8 gap-4">
        <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-purple-400 to-pink-500 shadow-[0_0_20px_rgba(255,255,255,0.4)] border-4 border-white/30"></div>
        <p className="text-2xl font-semibold italic text-white text-center font-['Roboto_Mono'] drop-shadow-lg">
            {name}
        </p>
    </div>
);

// Profile info (JSON-style)
export const ProfileInfoJSON = ({ user }) => {
    if (!user) {
        return (
            <div className="w-full h-[60%] flex flex-col p-4 gap-6 mt-6 font-['Roboto_Mono'] text-white">
                <h2 className="text-2xl font-bold text-white border-b border-white/20 pb-2 tracking-wide">
                    Profile Information
                </h2>
                <p className="text-white/50">Loading user data...</p>
            </div>
        );
    }

    const formattedUser = {
        ...user,
        dob:
            user.dob && user.dob.toDate
                ? user.dob.toDate().toLocaleDateString()
                : user.dob,
    };

    return (
        <div className="w-full h-auto flex flex-col p-4 gap-6 mt-6 font-['Roboto_Mono'] text-white">
            <h2 className="text-2xl font-bold text-white border-b border-white/20 pb-2 tracking-wide ">
                {user.firstName + " " + user.lastName}
            </h2>

            <div
                style={{
                    overflowX: "auto",
                    whiteSpace: "pre",
                    fontFamily: "'Roboto Mono', monospace",
                    color: "rgba(255,255,255,0.8)",
                }}
            >
                {`{\n${Object.entries(formattedUser)
                    .map(([key, value]) => `  "${key}": "${value}"`)
                    .join(",\n")}\n}`}
            </div>



        </div>
    );
};




export function SolvedRatio({ total, solved }) {
    const percentage = useMemo(() => {
        if (!total || total === 0) return 0;
        return Math.round((solved / total) * 100);
    }, [solved, total]);

    return (
        <div className="bg-gray-900 text-white p-6 rounded-2xl flex items-center gap-6 w-full max-w-sm shadow-lg">
            <div className="w-28 h-28">
                <CircularProgressbar
                    value={percentage}
                    text={`${solved}/${total}`}
                    styles={buildStyles({
                        textColor: '#fff',
                        pathColor: '#3fd9e7',
                        trailColor: '#4A4A4A',
                    })}
                />
            </div>
            <div className="flex flex-col">
                <span className="text-xl font-semibold">{solved} Solved</span>
                <span className="text-gray-400 text-sm">{total - solved} Remaining</span>
            </div>
        </div>
    );
}



export function EventTable2({ data }) {
    return (
        <div className="w-full mt-6">
            {/* Table Heading */}
            <h2 className="text-white text-xl font-bold mb-4 pl-2">
                My Events
            </h2>
            <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
                <table className="w-full border-collapse">

                    {/* Header */}
                    <thead className="sticky top-0 z-20 bg-[#333333] text-white">
                    <tr>
                        <th className="px-4 py-2 text-left font-semibold rounded-tl-xl rounded-tr-xl">
                            Event Name
                        </th>

                        <th className="px-4 py-2 text-center font-semibold">
                            <div className="flex items-center gap-2 justify-center">
                                <Users size={16} />
                                Participants
                            </div>
                        </th>

                        <th className="px-4 py-2 text-right font-semibold">
                            <div className="flex items-center gap-2 justify-end">
                                <Clock size={16} />
                                State
                            </div>
                        </th>

                        <th className="px-4 py-2 text-right font-semibold">
                            <div className="flex items-center gap-2 justify-end">
                                <Calendar size={16} />
                                Date
                            </div>
                        </th>
                    </tr>
                    </thead>

                    {/* Body */}
                    <tbody>
                    {data.map((row, index) => {
                        // Determine color based on state
                        let colorClass = "";
                        if (row.state === EVENT_STATE.running) colorClass = "bg-green-500";
                        else if (row.state === EVENT_STATE.ended) colorClass = "bg-red-500";
                        else colorClass = "bg-yellow-400";

                        return (
                            <tr
                                key={index}
                                className="text-white/90 hover:bg-white/10 transition-all duration-200 cursor-pointer"
                            >
                                <td className="px-4 py-2">{row.name}</td>
                                <td className="px-4 py-2 text-center">{row.value}</td>
                                <td className="px-4 py-2 text-right flex items-center justify-end gap-2">
                                        <span
                                            className={`h-3 w-3 rounded-full ${colorClass}`}
                                        ></span>
                                    {row.state}
                                </td>
                                <td className="px-4 py-2 text-right">{row.date}</td>
                            </tr>
                        );
                    })}
                    </tbody>

                </table>
            </div>
        </div>
    );
}



export function SolvedQuestion({data}) {
    return (
        <div className="w-full mt-6">
        <h2 className="text-white text-xl font-bold mb-4 pl-2">
                All Solved Questions
            </h2>
            <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
                <table className="w-full border-collapse">

                    {/* Header */}
                    <thead className="sticky top-0 z-20 bg-[#333333]  text-white">
                    <tr>
                        <th className="px-4 py-2 text-left font-semibold rounded-tl-xl rounded-tr-xl">
                            <div className="flex items-center gap-2">
                                <Bookmark size={16}/>
                                Solved Question Name's
                            </div>
                        </th>

                        <th className="px-4 py-2 text-right font-semibold">
                            <div className="flex justify-end items-center gap-2">
                                <Calendar size={16}/>
                                Date
                            </div>
                        </th>
                    </tr>
                    </thead>

                    {/* Body */}
                    <tbody>
                    {data.map((item, index) => (
                        <tr
                            key={index}
                            className="text-white/90 hover:bg-white/10 transition-all duration-200 cursor-pointer"
                        >
                            <td className="px-4 py-2 text-left">
                                {item.title}
                            </td>

                            <td className="px-4 py-2 text-right">
                                {item.date}
                            </td>
                        </tr>
                    ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
}


export function ParticipatedEvent({data}) {

    // Small helper to return color class based on status
    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case "running":
                return "bg-yellow-400";
            case "completed":
                return "bg-green-400";
            case "incomplete":
                return "bg-red-400";
            default:
                return "bg-blue-400";
        }
    };

    return (
        <div className="w-full mt-6">
            <h2 className="text-white text-xl font-bold mb-4 pl-2">
                All Participated Events
            </h2>
            <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
                <table className="w-full border-collapse">

                    {/* Header */}
                    <thead className="sticky top-0 z-20 bg-[#333333] text-white">
                    <tr>
                        <th className="px-4 py-2 text-left font-semibold rounded-tl-xl rounded-tr-xl">
                            <div className="flex items-center gap-2">
                                <Flag size={16}/>
                                Event Title
                            </div>
                        </th>

                        <th className="px-4 py-2 text-left font-semibold">
                            <div className="flex items-center gap-2">
                                <Calendar size={16}/>
                                Date
                            </div>
                        </th>

                        <th className="px-4 py-2 text-left font-semibold">
                            <div className="flex items-center gap-2">
                                <Activity size={16}/>
                                Status
                            </div>
                        </th>

                        <th className="px-4 py-2 text-right font-semibold">
                            <div className="flex items-center gap-2 justify-end">
                                <Star size={16}/>
                                Score
                            </div>
                        </th>

                        <th className="px-4 py-2 text-right font-semibold">
                            <div className="flex items-center gap-2 justify-end">
                                <Award size={16}/>
                                Rank
                            </div>
                        </th>
                    </tr>
                    </thead>

                    {/* Body */}
                    <tbody>
                    {data.map((row, index) => (
                        <tr
                            key={index}
                            className="text-white/90 hover:bg-white/10 transition-all duration-200 cursor-pointer"
                        >
                            <td className="px-4 py-2">{row.title}</td>

                            <td className="px-4 py-2">{row.time_of_participation}</td>

                            {/* STATUS WITH COLORED DOT */}
                            <td className="px-4 py-2 capitalize">
                                <div className="flex items-center gap-2">
                                    <span
                                        className={`w-3 h-3 rounded-full ${getStatusColor(row.eventState)}`}
                                    ></span>
                                    {row.eventState}
                                </div>
                            </td>

                            <td className="px-4 py-2 text-right">{row.score}</td>

                            <td className="px-4 py-2 text-right">{row.rank}</td>
                        </tr>
                    ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
}


export function CreatedQuestionTable({data}) {




    return (
        <div className="w-full mt-6">
            {/* Table Heading */}
            <h2 className="text-white text-xl font-bold mb-4 pl-2">
                My Questions
            </h2>
            <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
                <table className="w-full border-collapse">

                    {/* Header */}
                    <thead className="sticky top-0 z-20 bg-[#333333] text-white">
                    <tr>
                        <th className="px-4 py-2 text-left font-semibold rounded-tl-xl rounded-tr-xl">
                            <div className="flex items-center gap-2">
                                <Bookmark size={16} />
                                Question Title
                            </div>
                        </th>

                        <th className="px-4 py-2 text-center font-semibold">
                            <div className="flex items-center gap-2 justify-center">
                                <Users size={16} />
                                Participants
                            </div>
                        </th>

                        <th className="px-4 py-2 text-right font-semibold">
                            <div className="flex items-center gap-2 justify-end">
                                <Calendar size={16} />
                                Created At
                            </div>
                        </th>
                    </tr>
                    </thead>

                    {/* Body */}
                    <tbody>
                    {data.map((row, index) => (
                        <tr
                            key={index}
                            className="text-white/90 hover:bg-white/10 transition-all duration-200 cursor-pointer"
                        >
                            <td className="px-4 py-2">
                                {row.title}
                            </td>

                            <td className="px-4 py-2 text-center">
                                {row.participationCount}
                            </td>

                            <td className="px-4 py-2 text-right">
                                {row.createdAt}
                            </td>
                        </tr>
                    ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
}









