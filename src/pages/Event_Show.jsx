// React Hooks
import { useContext, useEffect, useState } from "react";

// Custom Components & UI
import Profile_Background from "../Components/__Profile.jsx";
import {
  Event_Show_header,
  Event_Show_Style,
  EventAccordion,
  formatDuration,
  EventListLoading,
  EventListError,
  formatTimeWithMeridiem,
  EventSearchBar
} from "../Components/__Event_Show.jsx";

// View Model
import { GetAllEvents, Delete_Event } from "../ViewModel/Event_Show_ViewModel.js";

// Global Context
import { IdContext } from "../IdContext.jsx";

// Material Components
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

// Router
import { useNavigate } from "react-router-dom";



// =======================
// Component: Event List
// =======================
function EventList({ loading, error, events, setEvents, onAccordionClick }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // 🟢 Loading/Error States
  if (loading) return <EventListLoading />;
  if (error) return <EventListError message={error} />;
  if (events.length === 0) return <EventListError message="No events found" />;

  // ✏️ Edit Action
  const handleEdit = (item) => {
    navigate("/event_create", { state: { itemID: item.id } });
  };

  // ❌ Delete Action
  const handleDelete = async (item) => {
    try {
      const result = await Delete_Event(item.id);
      if (result.success) {
        setEvents((prev) => prev.filter((e) => e.id !== item.id));
      } else {
        console.error("Delete failed:", result.error);
      }
    } catch (error) {
      console.log(`Failed to Delete: ${error}`);
    }
  };

  // ➕ Add Question Action
  const handleAddQuestion = (item) => {
    navigate("/question_create", { state: { itemID: item.id } });
  };

  // 📋 Show All Questions
  const handleAllQuestions = (item) => {
    navigate("/question_list");
  };

  // 🔎 Filter events by title
  const filteredEvents = events.filter((item) => {
    const query = searchQuery.toLowerCase().trim();
    const title = item.title?.toLowerCase().trim() ?? "";
    return title.includes(query);
  });

  return (
    <div className={Event_Show_Style.listBox}>


      {/* Search Bar */}
      <EventSearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onAddEvent={() => navigate("/event_create")}
      />


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
            onAction={() => handleEdit(item)}
            deleteAction={() => handleDelete(item)}
            addAction={() => handleAddQuestion(item)}
            allQuestion={() => handleAllQuestions(item)}
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

  // variables
  const { id } = useContext(IdContext);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  // Immiidiately Written FUnctions
  useEffect(() => {
    const fetchEvents = async () => {

      try {
        const result = await GetAllEvents(id);

        if (result.success) {
          
          if (result.data && result.data.length > 0) setEvents(result.data);
          else setError("No events found");
        
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
    // Accordion click handler (currently unused)
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