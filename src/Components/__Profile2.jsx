// src/Pages/Profile/Profile_Components.jsx
import { LineChart, Line, Tooltip, ResponsiveContainer } from "recharts";
import { X, Edit, Plus } from "lucide-react";

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

// Custom card component
export const CustomCard = ({ title, description, onDelete, onEdit, onAdd }) => (
    <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg p-6 w-full mt-12 flex flex-col gap-4">
        <button
            onClick={onDelete}
            className="absolute top-3 right-3 p-2 rounded-full bg-red-500/80 hover:bg-red-600 transition text-white"
            aria-label="Delete"
        >
            <X size={18} />
        </button>

        <h2 className="text-xl font-bold text-white">{title}</h2>
        <p className="text-white/70 text-sm flex-1">{description}</p>

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
        <div className="w-full h-[100%] flex flex-col p-4 gap-6 mt-6 font-['Roboto_Mono'] text-white">
            <h2 className="text-2xl font-bold text-white border-b border-white/20 pb-2 tracking-wide ">
                Profile Information
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