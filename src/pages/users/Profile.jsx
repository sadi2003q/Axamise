// src/Pages/Profile/Profile.jsx
import { useEffect, useState } from "react";
import { useGlobal } from "../../GlobalContext.jsx";
import { Background_Particles } from "../../Components/__Admin_Login.jsx";
import {
    ProfileInfoJSON,
    GraphSection,
    CustomCard,
    SolvedRatio,
    CreatedQuestionTable,
    EventTable2,
    ParticipatedEvent,
    SolvedQuestion,
} from "../../Components/__Profile2.jsx";
import { ProfileController } from "../../controller/users/profile.controller.js";
import {useNavigate} from "react-router-dom";
import {routes} from "../../Utilities.js";

export default function Profile() {
    const { user_uid } = useGlobal();
    const [user, setUser] = useState(null);

    const [totalQuestionCount, setTotalQuestionCount] = useState(0);
    const [solvedQuestionCount, setSolvedQuestionCount] = useState(0);

    // Example chart data
    const data = Array.from({ length: 100 }, (_, i) => ({
        day: `Day ${i + 1}`,
        problemsSolved: Math.floor(Math.random() * 11),
    }));

    const navigate = useNavigate();

    useEffect(() => {
        if(!user_uid) {
            navigate(routes.login)
        }
    }, []);




    // My created event
    const [myEventParticipant, setMyEventParticipant] = useState({
        event01: 22,
        event02: 23,
        event03: 24,
        event04: 25,
        event05: 26,
    });


    // Event I am Participated
    const [myParticipatedEvent, setMyParticipatedEvent] = useState([
        {
            title: "Binary Battle Championship",
            time_of_participation: "12/11/2024",
            eventState: "running",
            score: 4.3,
            rank: "Not Fixed",
        },
        {
            title: "Algorithm Masters Cup",
            time_of_participation: "03/02/2024",
            eventState: "completed",
            score: 8.7,
            rank: 12,
        },
        {
            title: "Hackathon 360",
            time_of_participation: "18/07/2024",
            eventState: "completed",
            score: 6.5,
            rank: 27,
        },
        {
            title: "Data Structure Duel",
            time_of_participation: "25/08/2024",
            eventState: "running",
            score: 3.9,
            rank: "Not Fixed",
        },
        {
            title: "CodeSprint Global",
            time_of_participation: "30/09/2024",
            eventState: "completed",
            score: 9.1,
            rank: 3,
        },
    ]);


    // My solved Question
    const [mySolvedQuestions, setMySolvedQuestions] = useState([
        { title: "Two sum", date: "18/07/2024" },
        { title: "Three sum", date: "18/07/2024" },
        { title: "Four sum", date: "18/07/2024" },
        { title: "Four sum", date: "18/07/2024" },
        { title: "Four sum", date: "18/07/2024" },
    ]);


    // My created Question
    const [myCreatedQuestion, setMyCreatedQuestions] = useState([
        { title: "question01", participationCount: 21, createdAt: "12/12/2025" },
        { title: "question02", participationCount: 22, createdAt: "13/12/2025" },
        { title: "question03", participationCount: 23, createdAt: "14/12/2025" },
        { title: "question04", participationCount: 24, createdAt: "15/12/2025" },
        { title: "question05", participationCount: 25, createdAt: "16/12/2025" },
    ]);


    const controller = new ProfileController(

        setUser,
        setTotalQuestionCount,
        setSolvedQuestionCount,

        setMyEventParticipant,
        setMyParticipatedEvent,
        setMySolvedQuestions,
        setMyCreatedQuestions

    );





    useEffect(() => {
        controller.getProfileInformation({ id: user_uid }).then();
        controller.getSolvedRatio({ id: user_uid }).then();


        // Fetch All Solved Problem List
        controller.getMySolvedQuestionList({userID: user_uid}).then();

    }, []);





    return (
        <div className="relative w-screen flex items-center justify-center">
            <Background_Particles />

            <div className="flex flex-col md:flex-row items-start md:items-center justify-center gap-6 w-full h-full px-4 sm:px-6 md:px-10 py-6">

                {/* Left Info Card */}
                <div
                    className="
                    bg-white/5 backdrop-blur-sm border border-white/20
                    rounded-3xl shadow-lg
                    w-full md:w-[32vw]
                    h-auto md:h-[85vh]
                    flex flex-col p-6
                    overflow-hidden
                    "
                >
                    <div className="flex-1 overflow-y-auto">
                        <ProfileInfoJSON user={user} />
                        <SolvedRatio
                            solved={solvedQuestionCount}
                            total={totalQuestionCount}
                        />
                    </div>
                </div>

                {/* Right Dashboard */}
                <div
                    className="
                    bg-white/5 backdrop-blur-sm border border-white/20
                    rounded-3xl shadow-lg
                    w-full md:w-[55vw]
                    h-auto md:h-[85vh]
                    p-6 flex flex-col overflow-hidden
                    "
                >
                    <h2 className="text-2xl font-bold text-white border-b border-white/20 pb-2 mb-4">
                        Dashboard
                    </h2>

                    <div className="flex-1 overflow-y-auto space-y-6">
                        <div className="text-white/70">
                            <p>✨ Skills</p>
                            <p>📚 Education</p>
                            <p>💼 Experience</p>
                        </div>

                        <GraphSection title="Problems Solved per Day" data={data} />

                        <CustomCard
                            problemEncounter={12}
                            problemCount={45}
                            eventParticipated={8}
                        />

                        {/* My Created Event with Participant */}
                        <EventTable2 data={myEventParticipant} />


                        {/* event I am Participated */}
                        <ParticipatedEvent data={myParticipatedEvent} />

                        {/*  My solved Questions */}
                        <SolvedQuestion data={mySolvedQuestions} />


                        {/*  Created questions with participant */}
                        <CreatedQuestionTable data={myCreatedQuestion} />
                    </div>
                </div>
            </div>
        </div>
    );
}