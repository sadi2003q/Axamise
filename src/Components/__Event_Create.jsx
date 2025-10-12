
import TextField from '@mui/material/TextField';
import { GetCommonProps } from "../Components/__Common.jsx";


// AllStyling
export const Event_style = {
    event_description:
        // Full width on mobile, half width on desktop
        // Increased min-h for bigger text area
        "m-2 w-full md:w-[50vw] min-h-[500px] md:h-[86vh] flex flex-col gap-6 p-6 rounded-lg",

    event_scheduling:
        // Full width + centered on mobile, fixed width on desktop
        "m-2 w-full md:w-[35vw] md:h-[86vh] rounded-4xl bg-white/5 border-2 border-amber-200/5 shadow-[0_0_30px_rgba(0,255,255,0.5)] backdrop-blur-md flex flex-col items-center justify-around gap-8 p-6 self-center",

    Outer_Container:
        // Allow page scroll
        "relative w-full min-h-screen flex flex-col items-center justify-center gap-6 p-4 overflow-y-auto",

    Inner_container:
        "relative z-500 flex sm:flex-col md:flex-row lg:flex-row xl:flex-row items-start md:items-stretch justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 w-full max-w-[90%] sm:max-w-[1000px] md:max-w-[1200px] lg:max-w-[1400px] xl:max-w-[1600px] px-4 sm:px-6 md:px-8 lg:px-10",

    description:
        // Bigger height for text input area
        "peer w-full h-[300px] md:h-full text-white text-2xl bg-transparent resize-none p-3 outline-none overflow-auto rounded text-[1rem]",

    Description_label:
        "absolute left-3 text-gray-400 text-2xl transition-all duration-200 peer-empty:top-3 peer-empty:text-2xl peer-empty:text-gray-400 peer-focus:-top-4 peer-focus:text-lg peer-focus:text-cyan-500 -top-4 text-lg text-cyan-500",

    description_container:
        "relative w-full h-[86vh] mt-8 font-mono ",

    slider:
        "block mb-2 text-white font-mono",
};



// Event Description
export const Event_Description = ({ children }) => {
    return (
        <div className={Event_style.event_description}>
            {children}
        </div>
    );
};


// Event Scheduling
export const Event_Scheduling = ({ children }) => {
    return (
        <div className={Event_style.event_scheduling}>
            {children}
        </div>
    );
};


// Text Fields
export const CustomTextField = ({
    label,
    name,
    type = "text",
    value,
    onChange,
    placeholder = "",
    required = true,
    fullWidth = true,
    size = "1rem",
    ...rest
}) => {
    return (
        <TextField
            {...GetCommonProps("gray", "white", "cyan", size)}
            label={label}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            fullWidth={fullWidth}
            required={required}
            {...rest}
        />
    );
};


// Duration Field
export const DurationTextField = ({
    label,
    name,
    value,
    onChange,
    placeholder,
    min = 0,
    max,
}) => {
    return (
        <TextField
            {...GetCommonProps("gray", "white", "white", "1.5rem")}
            label={label}
            name={name}
            type="number"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            fullWidth
            required
            InputLabelProps={{
                shrink: true,
                style: { color: "white", fontFamily: "monospace" },
            }}
            inputProps={{
                min,
                ...(max !== undefined && { max }),
                style: { fontFamily: "monospace" },
            }}
            variant="outlined"
            sx={{
                "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "gray" },
                    "&:hover fieldset": { borderColor: "cyan" },
                    "&.Mui-focused fieldset": { borderColor: "cyan" },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                    color: "white",
                },
            }}
        />
    );
};


// Description field
export const DescriptionField = ({ value, onChange, size = "2.5rem", name = "description", label = "Description" }) => {
    return (
        <div className={Event_style.description_container}>
            <textarea
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                required
                placeholder=" "
                className={`${Event_style.description} text-[${size}]`} // optional inline size
            />
            <label
                htmlFor={name}
                className={Event_style.Description_label}
            >
                {label}
            </label>
        </div>
    );
};
