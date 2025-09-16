



export const Question_style = {
    question_description:
        // Full width on mobile, half width on desktop
        // Increased min-h for bigger text area
        "m-2 w-full h-[96vh] md:w-[50vw] min-h-[500px] md:h-[86vh] flex flex-col gap-6 p-6",

    question_spects:
        // Full width + centered on mobile, fixed width on desktop
        "m-2 w-full md:w-[35vw] md:h-[86vh] rounded-4xl bg-white/5 border-2 border-amber-200/5 shadow-[0_0_30px_rgba(255,165,0,0.3)] backdrop-blur-md flex flex-col items-center justify-around gap-8 p-6 self-center",

    Outer_Container:
        // Allow page scroll
        "relative w-full min-h-screen flex items-center justify-center gap-6 p-4 overflow-y-auto",

    Inner_container:
        // Column on mobile, row on desktop
        "relative z-10 flex flex-col md:flex-row items-start md:items-stretch justify-center gap-6 w-full max-w-[1200px]",

    description:
        // Bigger height for text input area
        "peer w-full h-[300px] text-[0.8rem] md:h-full text-white text-2xl bg-transparent resize-none p-3 outline-none overflow-auto rounded",

    Description_label:
        "absolute left-3 text-gray-400 text-2xl transition-all duration-200 peer-empty:top-3 peer-empty:text-2xl peer-empty:text-gray-400 peer-focus:-top-8 peer-focus:text-lg peer-focus:text-cyan-500 -top-4 text-lg text-cyan-500",

    description_container:
        "relative w-full h-[80vh] mt-8 font-mono",

    slider:
        "block mb-2 text-white font-mono",
};



// Event Description
export const Question_Description = ({ children }) => {
    return (
        <div className={Question_style.question_description}>
            {children}
        </div>
    );
};


// Event Scheduling
export const Question_Specification = ({ children }) => {
    return (
        <div className={Question_style.question_spects}>
            {children}
        </div>
    );
};


