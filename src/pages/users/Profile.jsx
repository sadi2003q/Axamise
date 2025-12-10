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
    const [myEventParticipant, setMyEventParticipant] = useState([{}]);


    // All those Event's that I have Participated
    const [myParticipatedEvent, setMyParticipatedEvent] = useState([]);


    // My solved Question
    const [mySolvedQuestions, setMySolvedQuestions] = useState([]);


    // My created Question
    const [myCreatedQuestion, setMyCreatedQuestions] = useState([]);


    // Counts
    const [encounteredQuestionsCount, setEncounteredQuestionsCount] = useState(15);





    const controller = new ProfileController(

        setUser,
        setTotalQuestionCount,
        setSolvedQuestionCount,

        setMyEventParticipant,
        setMyParticipatedEvent,
        setMySolvedQuestions,
        setMyCreatedQuestions,
        setEncounteredQuestionsCount

    );





    useEffect(() => {
        controller.getProfileInformation({ id: user_uid }).then();
        controller.getSolvedRatio({ id: user_uid }).then();



        // Fetch My Created Events
        controller.getMyEventParticipant({userID: user_uid}).then();


        // Fetch All Solved Problem List
        controller.getMySolvedQuestionList({userID: user_uid}).then();

        // Fetch Problem encountered Count
        controller.getEncounteredQuestionsCount({userID: user_uid}).then();

        // Fetch event Information That I Have Participated
        controller.getMyParticipatedEventInformation({userID: user_uid}).then();

        // Fetch My Question Information Count
        controller.getMyQuestionParticipatedInformation({userID: user_uid}).then();




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
                        <div className="grid grid-cols-2 gap-4 text-white/80">
                            {/* Original items */}
                            <p className="flex items-center gap-2">✨ Run</p>
                            <p className="flex items-center gap-2">📚 Education</p>
                            <p className="flex items-center gap-2">💼 Experience</p>

                            {/* New items */}
                            <p className="text-green-400 flex items-center gap-2">💻 Coding</p>
                            <p className="text-pink-400 flex items-center gap-2">🎨 Design & Creativity</p>
                            <p className="text-blue-400 flex items-center gap-2">📚 Continuous Learning</p>
                            <p className="text-yellow-400 flex items-center gap-2">🚀 Projects & Achievements</p>
                            <p className="text-purple-400 flex items-center gap-2">🤝 Collaboration & Teamwork</p>
                            <p className="text-orange-400 flex items-center gap-2">🧩 Problem Solving</p>
                            <p className="text-teal-400 flex items-center gap-2">🌐 Networking & Community</p>
                        </div>



                        <GraphSection title="Problems Solved per Day" data={data} />

                        <CustomCard
                            problemEncounter={encounteredQuestionsCount}
                            problemCount={mySolvedQuestions.length}
                            eventParticipated={myParticipatedEvent.length}
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