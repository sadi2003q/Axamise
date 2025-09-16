export const Solve_style = {
    event_description:
        // smaller section (takes 1 part)
        "flex-1 m-2 min-h-[500px] md:h-[86vh] flex flex-col gap-6 p-6",

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