// Path : src/pages/Event_Show.jsx


// React Hooks
import { useEffect, useState } from "react";

// Custom Components & UI
import Profile_Background from "../../Components/__Profile.jsx";
import {
  Event_Show_header,
  Event_Show_Style,
  EventList
} from "../../Components/__Event_Show.jsx";

// Global Context
import { useGlobal } from "../../GlobalContext.jsx";

// Material Components


// Router
import { useNavigate } from "react-router-dom";

// Controller
import { EventShowController } from "../../controller/Events/event_show.controller.js";


// =======================
// Main Page Component
// =======================
export default function Event_Show() {
  // variables
  const { user_uid } = useGlobal();

  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // ✅ Create controller
  const controller = new EventShowController(
    events,
    setEvents,
    "", // searchQuery (not needed here, UI manages it)
    setLoading,
    setError,
    navigate
  );

  // ✅ Fetch events through controller
  useEffect(() => {
    controller.fetchEvents(user_uid);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_uid]);


  // Future Purpose
  const handleAccordionClick = () => {
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
        controller={controller}
        onAccordionClick={handleAccordionClick}
      />
    </div>
  );
}
