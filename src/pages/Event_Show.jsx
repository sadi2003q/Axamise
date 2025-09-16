import { useContext, useEffect, useState } from "react";
import Profile_Background from "../Components/__Profile.jsx";
import {
  Event_Show_header,
  Event_Show_Style,
  EventAccordion,
  formatDuration
} from "../Components/__Event_Show.jsx";
import { GetAllEvents, Delete_Event } from "../ViewModel/Event_Show_ViewModel.js";
import { IdContext } from "../IdContext.jsx";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

// =======================
// Loader Component
// =======================
function EventListLoading() {
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
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}


// =======================
// Error Component
// =======================
function EventListError({ message }) {
  return (
    <div style={{ textAlign: "center", color: "red", marginTop: "1rem" }}>
      {message}
    </div>
  );
}

// =======================
// Event List Component
// =======================
function EventList({ loading, error, events, setEvents, onAccordionClick }) {
  const navigate = useNavigate();

  // 🔎 Search state
  const [searchQuery, setSearchQuery] = useState("");

  if (loading) return <EventListLoading />;
  if (error) return <EventListError message={error} />;
  if (events.length === 0) return <EventListError message="No events found" />;

  // 3 Important Buttons

  //  Edit Action
  const handleActionClick = (item) => {
    console.log(`name : ${item.id}`);
    navigate("/event_create", { state: { itemID: item.id } });
  };

  const formatTimeWithMeridiem = (time) => {
    if (!time) return "";

    const [hourStr, minuteStr] = time.split(":");
    let hour = parseInt(hourStr, 10);
    const minute = minuteStr.padStart(2, "0");

    // AM if between 8:00 and 11:59
    const meridiem = hour >= 8 && hour <= 11 ? "AM" : "PM";

    // Convert to 12-hour format for display
    let displayHour = hour;
    if (hour === 0) displayHour = 12;
    else if (hour > 12) displayHour = hour - 12;

    return `${displayHour}:${minute} ${meridiem}`;
  };

  // Delete Action
  const handleDeleteActionClick = async (item) => {
    try {
      const result = await Delete_Event(item.id);
      if (result.success) {
        console.log("Successfully Deleted");
        setEvents((prevEvents) => prevEvents.filter((e) => e.id !== item.id));
      } else {
        console.error("Delete failed:", result.error);
      }
    } catch (error) {
      console.log(`Failed to Delete: ${error}`);
    }
  };

  // Add Action
  const handleAddActionClick = (item) => {
    console.log("Add Action Clicked");
    navigate("/question_create", { state: { itemID: item.id } });
  };


  const handeQuestionClick = (item) => {
    // navigate("/question_list", { state: { itemID: item.id } });
    navigate("/question_list");
  }



  // 🔎 Filter events based on search query (matches name, description, or date)
  const filteredEvents = events.filter((item) => {
    const query = searchQuery.toLowerCase().trim();
    const title = item.title?.toLowerCase().trim() ?? "";
    return title.includes(query);
  });

  return (
    <div className={Event_Show_Style.listBox}>


      {/* 🔎 Search Bar */}
      <div style={{ marginBottom: "1rem", display: "flex", justifyContent: "center", gap: "10px" }}>

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
              padding: "10px 10px 10px 36px", // space for icon
              width: "100%",
              borderRadius: "10px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate("/event_create")}
          sx={{
            "&:hover": {
              backgroundColor: "#00bcd4", // your desired hover color
            },
          }}
        >
          Add Event
        </Button>
      </div>

      {/* Render filtered events */}
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
            onAction={() => handleActionClick(item)} // Edit Action
            deleteAction={() => handleDeleteActionClick(item)} // Delete Action
            addAction={() => handleAddActionClick(item)} // Add Action
            allQuestion={() => handeQuestionClick(item)}
          />
        ))
      ) : (
        <EventListError message="No matching events found" />
      )}
    </div>
  );
}

// =======================
// Main Page Component
// =======================
export default function Event_Show() {
  const { id } = useContext(IdContext);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // console.log("Page Mounted");

    const fetchEvents = async () => {
      try {
        const result = await GetAllEvents(id);
        // console.log(result.success);

        if (result.success) {
          if (result.data && result.data.length > 0) {
            setEvents(result.data);
          } else {
            setError("No events found");
          }
        } else {
          setError(result.error || "Failed to fetch events");
        }
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [id]);

  const handleAccordionClick = (item) => {
    // console.log("Accordion clicked:", item.id, item.title);
  };



  return (
    <div className={Event_Show_Style.outerBox}>
      <Profile_Background />
      <Event_Show_header Text="All Declared Events" />

      <EventList
        loading={loading}
        error={error}
        events={events}
        setEvents={setEvents}
        onAccordionClick={handleAccordionClick}
      />
    </div>
  );
}