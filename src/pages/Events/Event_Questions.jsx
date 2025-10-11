import { Background_Particles } from "../../Components/__Admin_Login";

import TextField from "@mui/material/TextField";
import {CommonProps, GetCommonProps} from "../../Components/__Common.jsx";
import MenuItem from "@mui/material/MenuItem";

import { Event_Question_Model } from "../../models/Event_Model.js";
import {useState} from "react";
import Student from "../../models/Student_Model.js";

const Heading = ({ title, subtitle }) => {
    return (
        <div className="w-full py-10 px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2">
                {title}
            </h2>
            {subtitle && (
                <p className="text-gray-400 text-lg md:text-xl font-light">
                    {subtitle}
                </p>
            )}
            <div className="mt-4 mx-auto w-24 h-[3px] bg-indigo-500 rounded-full"></div>
        </div>
    );
};

export default function Event_Questions() {


    const [event_question, setEvent_question] = useState({
        ...Event_Question_Model,
        title: "AI Coding Challenge",
        description: "Answer algorithm-based coding problems within 30 minutes.",
        difficulty: "Hard",
        point: 100,
        type: "Programming"
    });


    const handleChange = (e) => {
        setEvent_question({
            ...event_question,
            [e.target.name]: e.target.value,
        });
    };




    return (
        <div className="w-screen h-screen relative">
            <Background_Particles />

            <div className="w-screen h-screen flex items-center justify-center z-500">

                <div className="w-[84vw] h-[90vh] rounded-xl flex flex-col gap-4 overflow-y-auto  z-500">


                    {/*  Heading Components */}
                    <Heading
                        title="Event Questions"
                        subtitle="Explore frequently asked questions about upcoming events"
                    />




                    <div className="w-86vw h-auto py-3 my-3 rounded-2xl flex flex-col gap-4 p-6">


                    {/* First Name */}
                        <TextField {...CommonProps} label="Question title" name="title" value={event_question.title} onChange={handleChange} required />


                    {/*    Description  */}

                        <TextField
                            {...CommonProps}
                            label="Description"
                            name="description"
                            multiline
                            rows={8}
                            value={event_question.description}
                            onChange={handleChange}
                            className="flex-1 min-w-[200px]"
                        />


                    {/* Row: Type, Point, Difficulty */}
                        <div className="flex flex-wrap gap-6 mt-6">
                            <TextField
                                {...CommonProps}
                                label="Type"
                                name="type"
                                value={event_question.type}
                                onChange={handleChange}
                                className="flex-1 min-w-[200px]"
                            />

                            <TextField
                                {...CommonProps}
                                label="Point"
                                name="point"
                                type="number"
                                value={event_question.point}
                                onChange={handleChange}
                                className="flex-1 min-w-[150px]"
                            />

                            <TextField
                                {...CommonProps}
                                select
                                label="Difficulty"
                                name="difficulty"
                                value={event_question.difficulty}
                                onChange={handleChange}
                                className="flex-1 min-w-[200px]"

                            >
                                <MenuItem value="Easy">Easy</MenuItem>
                                <MenuItem value="Medium">Medium</MenuItem>
                                <MenuItem value="Hard">Hard</MenuItem>
                            </TextField>
                        </div>

                    </div>







                </div>


            </div>
        </div>
    );


}






