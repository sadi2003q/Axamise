
import Profile_Background from "../Components/__Profile.jsx";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
// import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import AddIcon from "@mui/icons-material/Add";
import HelpTwoToneIcon from '@mui/icons-material/HelpTwoTone';


export const Event_Show_Style = {
    outerBox: "min-h-screen max-h-screen flex flex-col items-center pt-16 pb-16 px-4",
    listBox: "w-full max-w-5xl p-4 rounded-lg overflow-auto"
}

export const Event_Show_header = ({ Text }) => {
    return (
        <div className="flex justify-center w-full mb-12">
            <h1
                className="text-4xl font-bold text-white rounded-lg px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-center"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
                {Text}
            </h1>
        </div>
    );
}

/**
 * Component for Edit/Delete/Add buttons in the Accordion
 */
export const AccordionActionsButtons = ({
    onAction,
    deleteAction,
    addAction,
    allQuestion = (() => console.log('All Question Button'))
}) => {
    return (

        // Frame Work
        <AccordionActions sx={{ gap: 1, pr: 2, pb: 1 }}>

            {/* Edit Button */}
            <IconButton
                onClick={onAction}
                sx={{
                    backgroundColor: "rgba(59, 130, 246, 0.2)", // blue tint
                    color: "#3b82f6",
                    "&:hover": {
                        backgroundColor: "rgba(59, 130, 246, 0.4)",
                    },
                }}
            >
                <EditIcon />
            </IconButton>

            {/* Delete Button */}
            <IconButton
                onClick={deleteAction}
                sx={{
                    backgroundColor: "rgba(239, 68, 68, 0.2)", // red tint
                    color: "#ef4444",
                    "&:hover": {
                        backgroundColor: "rgba(239, 68, 68, 0.4)",
                    },
                }}
            >
                <DeleteIcon />
            </IconButton>

            {/* Add Button */}
            <IconButton
                onClick={addAction}
                sx={{
                    backgroundColor: "rgba(16, 185, 129, 0.2)", // green tint
                    color: "#10b981",
                    "&:hover": {
                        backgroundColor: "rgba(16, 185, 129, 0.4)",
                    },
                }}
            >
                <AddIcon />
            </IconButton>

            
            {/* All Question Button */}
            <IconButton
                onClick={allQuestion}
                sx={{
                    backgroundColor: "rgba(59, 130, 246, 0.2)", // blue tint
                    color: "#3b82f6", // normal icon color
                    "&:hover": {
                        backgroundColor: "rgba(59, 130, 246, 0.4)", // darker blue on hover
                    },
                }}
            >
                <HelpTwoToneIcon />
            </IconButton>

        </AccordionActions>
    );
};



export const formatDuration = (hours, minutes) => {
    const h = hours ? `${hours}h` : "";
    const m = minutes !== undefined ? `${minutes.toString().padStart(2, "0")}m` : "";
    return h && m ? `${h} ${m}` : h || m || "0m";
};

/**
 * Component representing a single Accordion item
 */

// Utility function to format date like "5th January 2023"
export const formatDate = (dateString) => {

    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();

    // Add "st", "nd", "rd", "th" suffix
    const getDaySuffix = (d) => {
        if (d > 3 && d < 21) return "th";
        switch (d % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    };

    return `${day}${getDaySuffix(day)} ${month},  ${year}`;
};

export const EventAccordion = ({ item, onClick, onAction, deleteAction, addAction,

allQuestion = (() => { console.log('All Question Button Clicked')})

}) => {
    return (
        <Accordion
            onClick={() => onClick(item)}
            sx={{
                mb: 2,
                borderRadius: 3,
                backgroundColor: "rgba(255, 255, 255, 0.07)", // semi-transparent glass
                backdropFilter: "blur(12px)", // blur effect
                border: "1px solid rgba(255, 255, 255, 0.2)", // subtle frosted border
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
            }}
        >
            {/* Accordion Title */}
            <AccordionSummary
                expandIcon={item.icon}
                aria-controls={`${item.id}-content`}
                id={`${item.id}-header`}
            >
                <Typography
                    component="span"
                    sx={{
                        color: "#f9fafb",
                        fontFamily: "'Montserrat', sans-serif", // clean bold heading font
                        fontWeight: 600,
                        fontSize: "1.1rem",
                        letterSpacing: "0.5px",
                    }}
                >
                    {item.title}
                </Typography>
            </AccordionSummary>

            {/* Accordion Content */}
            <AccordionDetails>
                {/* Description */}
                <Typography
                    sx={{
                        color: "#d1d5db",
                        fontFamily: "'Open Sans', sans-serif", // softer body font
                        fontSize: "0.95rem",
                        lineHeight: 1.6,
                        mb: 2,
                    }}
                >
                    {item.content}
                </Typography>

                {/* Date / Time / Duration */}
                <div className="flex flex-col gap-2 mt-2">
                    <div className="flex items-center gap-2 text-gray-200">
                        <CalendarTodayIcon fontSize="small" sx={{ color: "#60a5fa" }} />
                        <span className="font-medium">
                            {formatDate(item.date)}
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-200">
                        <AccessTimeIcon fontSize="small" sx={{ color: "#34d399" }} />
                        <span className="font-medium">{item.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-200">
                        <HourglassBottomIcon fontSize="small" sx={{ color: "#fbbf24" }} />
                        <span className="font-medium">{item.duration}</span>
                    </div>
                </div>
            </AccordionDetails>

            {/* Actions (Edit / Delete / Add) */}
            <AccordionActionsButtons item={item} onAction={onAction} deleteAction={deleteAction} addAction={addAction} allQuestion={allQuestion} />
        </Accordion>
    );
};