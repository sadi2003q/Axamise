// src/Pages/Profile/Profile.jsx
import { useEffect, useState } from "react";
import { useGlobal } from "../../GlobalContext.jsx";
import { Background_Particles } from "../../Components/__Admin_Login.jsx";
import Profile_Background from "../../Components/__Profile.jsx";
import {
    ProfileImage,
    ProfileInfoJSON,
    GraphSection,
    CustomCard,
    SolvedRatio
} from "../../Components/__Profile2.jsx";
import { ProfileController } from "../../controller/users/profile.controller.js";

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




    const controller = new ProfileController(setUser, setTotalQuestionCount, setSolvedQuestionCount)



    useEffect(() => {
        controller.getProfileInformation({id: user_uid}).then(() => {})
        controller.getSolvedRatio({id: user_uid}).then(() => {})
    }, []);








    return (
        <div className="relative w-screen h-screen overflow-auto flex items-center justify-center">
            <Background_Particles />

            <div className="flex items-center justify-center gap-8 w-full h-full px-10">
                {/* Left Info Card */}
                <div className="bg-white/5 overflow-auto backdrop-blur-sm border border-white/20 rounded-3xl shadow-lg w-[28vw] h-[85vh] flex flex-col p-6 overflow-hidden">
                    <div style={{ flex: 1, overflowY: "auto" }}>
                        <ProfileInfoJSON user={user} />

                        <SolvedRatio solved={solvedQuestionCount} total={totalQuestionCount} />

                    </div>
                </div>

                {/* Right Dashboard */}
                <div className="bg-white/5 overflow-auto backdrop-blur-sm border border-white/20 rounded-3xl shadow-lg w-[55vw] h-[85vh] p-6 flex flex-col overflow-y-auto">
                    <h2 className="text-2xl font-bold text-white border-b border-white/20 pb-2 mb-4">
                        Dashboard
                    </h2>

                    <div className="text-white/70 mb-4">
                        <p>✨ Skills</p>
                        <p>📚 Education</p>
                        <p>💼 Experience</p>
                    </div>

                    <GraphSection title="Problems Solved per Day" data={data} />

                    <CustomCard
                        title="My Project"
                        description="This is a short description of the project."
                        onDelete={() => console.log("Delete clicked")}
                        onEdit={() => console.log("Edit clicked")}
                        onAdd={() => console.log("Add clicked")}
                    />
                </div>
            </div>
        </div>
    );
}