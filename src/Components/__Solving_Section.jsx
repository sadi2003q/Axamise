import { FaQuestionCircle, FaClock, FaLayerGroup, FaStar } from "react-icons/fa";


export const Solve_style = {
    event_description:
        // smaller section (takes 1 part)
        "flex-1 m-2 h-auto max-h-[500px] md:h-[86vh] flex flex-col gap-6 p-2 overflow-auto",

    event_scheduling:
        // bigger section (takes 2 parts)
        "flex-2 m-2 md:h-[86vh] rounded-2xl bg-[#1E1E1E] border-2 border-amber-200/5 shadow-[0_0_30px_rgba(255,165,0,0.3)] backdrop-blur-md flex flex-col items-center justify-around gap-8 p-6",

    Outer_Container:
        // allow page scroll
        "relative w-full min-h-screen flex items-center justify-center gap-6 p-4 overflow-y-auto",

    Inner_container:
        // row on desktop, column on mobile
        "relative z-10 flex flex-col md:flex-row items-start md:items-stretch justify-center gap-6 w-full max-w-[1200px]",

    description:
        // bigger height for text input area
        "peer w-full h-[300px] md:h-full text-white text-2xl bg-transparent resize-none p-3 outline-none overflow-auto rounded",

    Description_label:
        "absolute left-3 text-gray-400 text-2xl transition-all duration-200 peer-empty:top-3 peer-empty:text-2xl peer-empty:text-gray-400 peer-focus:-top-4 peer-focus:text-lg peer-focus:text-cyan-500 -top-4 text-lg text-cyan-500",

    description_container:
        "relative w-full mt-8 font-mono",

    slider:
        "block mb-2 text-white font-mono",
};



// Event Description
export const Solve_Description = ({ children }) => {
    return (
        <div className={Solve_style.event_description}>
            {children}
        </div>
    );
};


// Event Scheduling
export const Code_Editor = ({ children }) => {
    return (
        <div className={Solve_style.event_scheduling}>
            {children}
        </div>
    );
};


// Question Description Section
export const Question_Showing_Description = ({ question }) => {

    // Map difficulty to color
    const difficultyColor = {
        Easy: "bg-green-500 text-green-100",
        Medium: "bg-yellow-500 text-white",
        Hard: "bg-red-500 text-red-100",
    };

    // Normalize difficulty string for lookup
    const difficultyKey = question.difficulty
        ? question.difficulty.trim().charAt(0).toUpperCase() + question.difficulty.trim().slice(1).toLowerCase()
        : "";

    const difficultyClasses = difficultyColor[difficultyKey] || "bg-gray-700 text-white";

    return (
        <div className="flex flex-col justify-start w-full h-full p-2 space-y-4 font-mono bg-transparent text-white rounded-lg shadow-lg">

            {/* Title */}
            <div className="flex flex-col space-y-2">

                <div className="text-2xl font-bold">
                    <FaQuestionCircle className="inline text-blue-400 mr-2 align-middle" />
                    {question.title}
                </div>
                {/* Horizontal line */}
                <div className="w-[80%] border-b border-white"></div>
            </div>

            {/* Description with automatic line breaks before Input/Output */}
            <div className="flex items-start space-x-2">
                <div className="flex flex-col space-y-2 font-mono">
                    {(() => {
                        const parts = [];
                        const regex = /(Input:|Output:)/g;
                        let lastIndex = 0;
                        let match;

                        while ((match = regex.exec(question.description)) !== null) {
                            const text = question.description.slice(lastIndex, match.index).trim();
                            if (text) parts.push({ type: "text", content: text });

                            parts.push({ type: "label", content: match[0] });

                            lastIndex = match.index + match[0].length;
                        }

                        const remaining = question.description.slice(lastIndex).trim();
                        if (remaining) parts.push({ type: "text", content: remaining });

                        return parts.map((part, index) => {
                            if (part.type === "label") {
                                return (
                                    <p key={index} className="mt-2 font-semibold underline">
                                        {part.content}
                                    </p>
                                );
                            }
                            return (
                                <p key={index}>
                                    {part.content}
                                </p>
                            );
                        });
                    })()}
                </div>
            </div>

            {/* Difficulty */}
            <div className={`flex items-center space-x-2 px-2 py-1 rounded ${difficultyClasses}`}>
                <FaClock className={`text-white`} />
                <span>{difficultyKey}</span>
            </div>

            <div className="flex items-center space-x-2">
                <FaStar className="text-yellow-400" />
                <span> Mark: {question.points}</span>
            </div>

            {/* Type */}
            <div className="flex items-center space-x-2">
                <FaLayerGroup className="text-teal-400" />
                <span>Type: {question.type}</span>
            </div>

        </div>
    );
};


// Questions For Events
// Event Questions Section
export const Event_Question = ({
       questions = [], // default empty array
       backgroundColor = "rgba(20, 20, 20, 0.7)", // default background if none provided
   }) => {

    if (!questions.length) {
        return (
            <div
                className="flex items-center justify-center w-full h-full rounded-lg shadow-lg text-white font-mono"
                style={{ backgroundColor }}
            >
                <p className="text-lg opacity-80">No questions available</p>
            </div>
        );
    }

    return (
        <div
            className="flex flex-col w-full h-full overflow-y-auto space-y-4 rounded-lg shadow-lg"
            style={{ backgroundColor }}
        >
            {questions.map((question, idx) => {
                // Map difficulty to color
                const difficultyColor = {
                    Easy: "bg-green-500 text-green-100",
                    Medium: "bg-yellow-500 text-white",
                    Hard: "bg-red-500 text-red-100",
                };

                const difficultyKey = question.difficulty
                    ? question.difficulty.trim().charAt(0).toUpperCase() +
                    question.difficulty.trim().slice(1).toLowerCase()
                    : "";

                const difficultyClasses = difficultyColor[difficultyKey] || "bg-gray-700 text-white";

                return (
                    <div
                        key={idx}
                        className="flex flex-col w-full p-2 space-y-4 font-mono bg-transparent text-white rounded-lg border border-gray-600 shadow-md"
                    >
                        {/* Title */}
                        <div className="flex flex-col space-y-2">
                            <div className="text-2xl font-bold">
                                <FaQuestionCircle className="inline text-blue-400 mr-2 align-middle" />
                                {question.title}
                            </div>
                            <div className="w-[80%] border-b border-white"></div>
                        </div>

                        {/* Description */}
                        <div className="flex flex-col space-y-2">
                            {(() => {
                                const parts = [];
                                const regex = /(Input:|Output:)/g;
                                let lastIndex = 0;
                                let match;

                                while ((match = regex.exec(question.description)) !== null) {
                                    const text = question.description.slice(lastIndex, match.index).trim();
                                    if (text) parts.push({ type: "text", content: text });

                                    parts.push({ type: "label", content: match[0] });

                                    lastIndex = match.index + match[0].length;
                                }

                                const remaining = question.description.slice(lastIndex).trim();
                                if (remaining) parts.push({ type: "text", content: remaining });

                                return parts.map((part, i) =>
                                    part.type === "label" ? (
                                        <p key={i} className="mt-2 font-semibold underline">
                                            {part.content}
                                        </p>
                                    ) : (
                                        // 👇 ADD this style or class here
                                        <p key={i} className="whitespace-pre-wrap">
                                            {part.content}
                                        </p>
                                    )
                                );
                            })()}
                        </div>


                        {/* Difficulty, Mark, Type */}
                        <div className="flex flex-wrap items-center space-x-4">
                            <div className={`flex items-center space-x-2 px-2 py-1 rounded ${difficultyClasses}`}>
                                <FaClock className="text-white" />
                                <span>{difficultyKey}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <FaStar className="text-yellow-400" />
                                <span>Mark: {question.point}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <FaLayerGroup className="text-teal-400" />
                                <span>Type: {question.type}</span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};



