import Profile_Background from "../../Components/__Profile.jsx";
// import {CustomCard} from "../Components/__Profile.jsx"
import { _Fetch_Information } from "../../ViewModel/Profile_ViewModel.js";
import { useEffect, useState } from "react";

// Global State Management

import { useGlobal } from "../../GlobalContext.jsx";
// Chart library
import { LineChart, Line, Tooltip, ResponsiveContainer } from 'recharts';

// Example demo data
const data = Array.from({ length: 100 }, (_, i) => ({
    day: `Day ${i + 1}`,
    problemsSolved: Math.floor(Math.random() * 11), // 0 to 10 problems
}));

import { X, Edit, Plus } from "lucide-react"; // icons from lucide-react

const CustomCard = ({ title, description, onDelete, onEdit, onAdd }) => {
    return (
        <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg p-6 w-full mt-12 flex flex-col gap-4">
            {/* Delete button - top right */}
            <button
                onClick={onDelete}
                className="absolute top-3 right-3 p-2 rounded-full bg-red-500/80 hover:bg-red-600 transition text-white"
                aria-label="Delete"
            >
                <X size={18} />
            </button>

            {/* Title */}
            <h2 className="text-xl font-bold text-white">{title}</h2>

            {/* Description */}
            <p className="text-white/70 text-sm flex-1">{description}</p>

            {/* Action buttons (Edit / Add) */}
            <div className="flex gap-3 mt-2">
                <button
                    onClick={onEdit}
                    className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition"
                >
                    <Edit size={16} /> Edit
                </button>
                <button
                    onClick={onAdd}
                    className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl transition"
                >
                    <Plus size={16} /> Add
                </button>
            </div>
        </div>
    );
};



// Tooltip for the graph
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div
                style={{
                    backgroundColor: "#1f2937",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    color: "#fff",
                }}
            >
                <p>{label}</p>
                <p>Problems Solved: {payload[0].value}</p>
            </div>
        );
    }
    return null;
};

// Tailwind styles for layout
const Profile_style = {
    container:
        "relative w-screen h-screen overflow-auto flex items-center justify-center",
    glass_card:
        "bg-white/5 overflow-auto backdrop-blur-sm border border-white/20 rounded-3xl shadow-lg transition-transform duration-300 hover:scale-[1.02]",
    info: "w-[28vw] h-[85vh] flex flex-col p-6 overflow-hidden",
    dashboard: "w-[55vw] h-[85vh] p-6 flex flex-col overflow-y-auto", // scroll enabled
    profile_image_container: "flex flex-col items-center w-full h-[40%] mt-8 gap-4",
    profile_circle:
        "w-32 h-32 rounded-full bg-gradient-to-tr from-purple-400 to-pink-500 shadow-[0_0_20px_rgba(255,255,255,0.4)] border-4 border-white/30",
    profile_name:
        "text-2xl font-semibold italic text-white text-center font-['Roboto_Mono'] drop-shadow-lg",
    profile_info_container:
        "w-full h-[60%] flex flex-col p-4 gap-6 mt-6 font-['Roboto_Mono'] text-white",
    profile_info_title:
        "text-2xl font-bold text-white border-b border-white/20 pb-2 font-['Roboto_Mono'] tracking-wide",
};

// Profile Image Section
const Profile_Image = () => {
    return (
        <div className={Profile_style.profile_image_container}>
            <div className={Profile_style.profile_circle}></div>
            <p className={Profile_style.profile_name}>MD. Adnan Abdullah Sadi</p>
        </div>
    );
};

// Profile Info Section (shows JSON-style user info)
const Profile_Info_JSON = ({ user }) => {
    if (!user) {
        return (
            <div className={Profile_style.profile_info_container}>
                <h2 className={Profile_style.profile_info_title}>Profile Information</h2>
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
        <div className={`${Profile_style.profile_info_container}  h-full`}>
            <h2 className={Profile_style.profile_info_title}>Profile Information</h2>
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

// Reusable Graph Component with fixed height (important for scrolling)
const GraphSection = ({ title }) => (
    <div style={{ height: '250px', width: '100%', padding: '10px', margin: '0 auto' }}>
        <h3 className="text-white text-lg mb-2 text-center">{title}</h3>
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="problemsSolved" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
        </ResponsiveContainer>
    </div>
);

// Main Profile Component
export default function Profile() {


    // const { id } = useContext(IdContext);
    const { user_uid } = useGlobal()


    const [user, setUser] = useState();

    // Fetch user info on mount
    useEffect(() => {
        const fetchUserInformation = async (user_uid) => {
            const result = await _Fetch_Information(user_uid);
            setUser(result.data);

            if (result.success) {
                console.log("User information fetched successfully:", result.data);
            } else {
                console.error("Error fetching user information:", result.error);
            }
        };

        if (user_uid) {
            fetchUserInformation(user_uid);
        }
    }, [user_uid]);

    return (
        <div className={Profile_style.container}>
            {/* Background */}
            <Profile_Background />

            {/* Content Area */}
            <div className="flex items-center justify-center gap-8 w-full h-full px-10">

                {/* Left Info Card */}
                <div className={`${Profile_style.glass_card} ${Profile_style.info}`}>
                    <Profile_Image />
                    <div
                        style={{
                            flex: 1,
                            overflowY: "auto",
                            scrollbarWidth: "none", // Firefox
                            msOverflowStyle: "none", // IE 10+
                        }}
                    >
                        <Profile_Info_JSON user={user} />

                        {/* WebKit scrollbar hack */}
                        <style>{`
                            div::-webkit-scrollbar {
                              display: none;
                            }
                        `}</style>
                    </div>
                </div>

                {/* Right Dashboard with Graphs */}
                <div className={`${Profile_style.glass_card} ${Profile_style.dashboard}`}>
                    <h2 className="text-2xl font-bold text-white border-b border-white/20 pb-2 mb-4">
                        Dashboard
                    </h2>

                    {/* Example categories */}
                    <div className="text-white/70">
                        <p>✨ Skills</p>
                        <p>📚 Education</p>
                        <p>💼 Experience</p>
                    </div>

                    {/* Graphs */}
                    <GraphSection title="Problems Solved per Day" />


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