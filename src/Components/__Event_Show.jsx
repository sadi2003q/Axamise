// MAterial Icons and Components
import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import AddIcon from "@mui/icons-material/Add";
import HelpTwoToneIcon from "@mui/icons-material/HelpTwoTone";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Button } from "@mui/material";
import {CodeIcon} from "lucide-react";








// Styles for the Event Show component
export const Event_Show_Style = {
    outerBox: "h-auto flex flex-col items-center pt-16 pb-16 px-4",
    listBox: "w-full max-w-5xl p-4 rounded-lg",
};

// Header component for Event Show
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
};

// Component for Edit/Delete/Add buttons in the Accordion
// export const AccordionActionsButtons = ({
//     EnterEvent = false,
//     onAction,
//     deleteAction,
//     addAction,
//     allQuestion = () => console.log("All Question Button"),
// }) => {
//     return (
//         <AccordionActions sx={{ gap: 1, pr: 2, pb: 1 }}>
//             {/* Edit Button */}
//             <IconButton
//                 onClick={onAction}
//                 sx={{
//                     backgroundColor: "rgba(59, 130, 246, 0.2)", // blue tint
//                     color: "#3b82f6",
//                     "&:hover": {
//                         backgroundColor: "rgba(59, 130, 246, 0.4)",
//                     },
//                 }}
//             >
//                 <EditIcon />
//             </IconButton>
//
//             {/* Delete Button */}
//             <IconButton
//                 onClick={deleteAction}
//                 sx={{
//                     backgroundColor: "rgba(239, 68, 68, 0.2)", // red tint
//                     color: "#ef4444",
//                     "&:hover": {
//                         backgroundColor: "rgba(239, 68, 68, 0.4)",
//                     },
//                 }}
//             >
//                 <DeleteIcon />
//             </IconButton>
//
//             {/* Add Button */}
//             <IconButton
//                 onClick={addAction}
//                 sx={{
//                     backgroundColor: "rgba(16, 185, 129, 0.2)", // green tint
//                     color: "#10b981",
//                     "&:hover": {
//                         backgroundColor: "rgba(16, 185, 129, 0.4)",
//                     },
//                 }}
//             >
//                 <AddIcon />
//             </IconButton>
//
//             {/* All Question Button */}
//             <IconButton
//                 onClick={allQuestion}
//                 sx={{
//                     backgroundColor: "rgba(59, 130, 246, 0.2)", // blue tint
//                     color: "#3b82f6",
//                     "&:hover": {
//                         backgroundColor: "rgba(59, 130, 246, 0.4)",
//                     },
//                 }}
//             >
//                 <HelpTwoToneIcon />
//             </IconButton>
//         </AccordionActions>
//     );
// };



export const AccordionActionsButtons = ({
    EnterEvent = false,
    onAction,
    deleteAction,
    addAction,
    allQuestion = () => console.log("All Question Button"),
    onCodeAction = () => console.log("Code Button Clicked"),

}) => {
    return (
        <AccordionActions sx={{ gap: 1, pr: 2, pb: 1 }}>
            {EnterEvent ? (
                // ✅ Only show this when EnterEvent = true
                <IconButton
                    onClick={onCodeAction}
                    sx={{
                        backgroundColor: "rgba(234, 179, 8, 0.2)", // yellow tint
                        color: "#eab308",
                        "&:hover": {
                            backgroundColor: "rgba(234, 179, 8, 0.4)",
                        },
                    }}
                >
                    <CodeIcon />
                </IconButton>
            ) : (
                // ✅ Normal buttons (when EnterEvent = false)
                <>
                    {/* Edit Button */}
                    <IconButton
                        onClick={onAction}
                        sx={{
                            backgroundColor: "rgba(59, 130, 246, 0.2)",
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
                            backgroundColor: "rgba(239, 68, 68, 0.2)",
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
                            backgroundColor: "rgba(16, 185, 129, 0.2)",
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
                            backgroundColor: "rgba(59, 130, 246, 0.2)",
                            color: "#3b82f6",
                            "&:hover": {
                                backgroundColor: "rgba(59, 130, 246, 0.4)",
                            },
                        }}
                    >
                        <HelpTwoToneIcon />
                    </IconButton>
                </>
            )}
        </AccordionActions>
    );
};

// Utility function to format duration
export const formatDuration = (hours, minutes) => {
    const h = hours ? `${hours}h` : "";
    const m = minutes !== undefined ? `${minutes.toString().padStart(2, "0")}m` : "";
    return h && m ? `${h} ${m}` : h || m || "0m";
};

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
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "th";
        }
    };

    return `${day}${getDaySuffix(day)} ${month}, ${year}`;
};

// Component representing a single Accordion item
export const EventAccordion = ({
    item,
    onClick,
    onAction,
    deleteAction,
    addAction,
    allQuestion = () => {
        console.log("All Question Button Clicked");
    },


    EnterEvent = false,
    EnterFunction = () => { console.log('This is a code') }
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
                        fontFamily: "'Montserrat', sans-serif",
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
                        fontFamily: "'Open Sans', sans-serif",
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
                        <span className="font-medium">{formatDate(item.date)}</span>
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
            <AccordionActionsButtons
                item={item}
                onAction={onAction}
                deleteAction={deleteAction}
                addAction={addAction}
                allQuestion={allQuestion}


                EnterEvent={EnterEvent}
                onCodeAction={EnterFunction}
            />
        </Accordion>
    );
};

// Loader Component
export function EventListLoading() {
    return (
        <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
            <div
                className="loader"
                style={{
                    border: "6px solid #f3f3f3",
                    borderTop: "6px solid cyan",
                    borderRadius: "50%",
                    width: "50px",
                    height: "50px",
                    animation: "spin 1s linear infinite",
                }}
            />
            <style>
                {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
            </style>
        </div>
    );
}

// Error Component
export function EventListError({ message }) {
    return (
        <div style={{ textAlign: "center", color: "red", marginTop: "1rem" }}>
            {message}
        </div>
    );
}

// Utility: Format time with AM/PM
export const formatTimeWithMeridiem = (time) => {
    if (!time) return "";

    const [hourStr, minuteStr] = time.split(":");
    let hour = parseInt(hourStr, 10);
    const minute = minuteStr.padStart(2, "0");

    // AM if between 8:00 and 11:59
    const meridiem = hour >= 8 && hour <= 11 ? "AM" : "PM";

    // Convert to 12-hour format
    let displayHour = hour;
    if (hour === 0) displayHour = 12;
    else if (hour > 12) displayHour = hour - 12;

    return `${displayHour}:${minute} ${meridiem}`;
};

// Component: Search Bar
export function EventSearchBar({ searchQuery, setSearchQuery, onAddEvent }) {
    return (
        <div
            style={{
                marginBottom: "1rem",
                display: "flex",
                justifyContent: "center",
                gap: "10px",
            }}
        >
            {/* Search Input field with icon */}
            <div style={{ position: "relative", flex: 1 }}>
                <SearchIcon
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "12px",
                        transform: "translateY(-50%)",
                        color: "#888",
                        pointerEvents: "none",
                    }}
                />
                <input
                    type="text"
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                        padding: "10px 10px 10px 36px",
                        width: "100%",
                        borderRadius: "10px",
                        border: "1px solid #ccc",
                    }}
                />
            </div>

            {/* Add Event Button */}
            <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={onAddEvent}
                sx={{
                    "&:hover": { backgroundColor: "#00bcd4" },
                }}
            >
                Add Event
            </Button>
        </div>
    );
}




// =======================
// =======================
// Component: Event List
// =======================
export const EventList = ({
      loading,
      error,
      events,
      controller,
      onAccordionClick,

    EnterEvent = false,

}) => {
  const [searchQuery, setSearchQuery] = useState("");

  // 🟢 Loading/Error States
  if (loading) return <EventListLoading />;
  if (error) return <EventListError message={error} />;
  if (events.length === 0) return <EventListError message="No events found" />;

  // 🔎 Filter events by title
  const filteredEvents = events.filter((item) => {
    const query = searchQuery.toLowerCase().trim();
    const title = item.title?.toLowerCase().trim() ?? "";
    return title.includes(query);
  });

  return (
    <div className={Event_Show_Style.listBox}>
      {/* Search Bar */}
        <div className="sticky top-15 z-50 bg-black">
            <EventSearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onAddEvent={() => controller.handleEdit({ id: null })}
            />
        </div>

      {/* Render Event Accordions */}
      {filteredEvents.length > 0 ? (
        filteredEvents.map((item) => (
          <EventAccordion
            key={item.id}
            item={{
              ...item,
              content: item.description,
              date: item.date,
              time: formatTimeWithMeridiem(item.startTime),
              duration: formatDuration(item.hours, item.minutes),
              icon: <ArrowDownwardIcon sx={{ color: "#ffffff" }} />,
            }}
            onClick={onAccordionClick}
            onAction={() => controller.handleEdit(item)}
            deleteAction={() => controller.handleDelete(item)}
            addAction={() => controller.handleAddQuestion(item)}
            allQuestion={() => controller.handleAllQuestions(item)}



            EnterEvent={EnterEvent}
            EnterFunction = { () => controller.handleNavigation_EventEnter(item)}

          />
        ))
      ) : (
        <EventListError message="No matching events found" />
      )}
    </div>
  );
}