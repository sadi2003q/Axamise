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
import {Background_Particles} from "../../Components/__Admin_Login.jsx";
import {Heading} from "../../Components/__Event_Question.jsx";


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

      // console.log(`user id : ${user_uid}`)
      controller.fetchEvents('zVBnuDS61ebbM4XnpHBCHj7fcf82').then(() => {});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // Future Purpose
  const handleAccordionClick = () => {
    // Accordion click handler (currently unused)
  };

  return (
    <div className={Event_Show_Style.outerBox}>
      <Background_Particles />

        <Heading
            title="Events Hub"
            subtitle="Your Gateway to Exceptional Talent-Driven Gatherings"
        />

      <EventList
        loading={loading}
        error={error}
        events={events}
        controller={controller}
        onAccordionClick={handleAccordionClick}


        EnterEvent={true}

      />
    </div>
  );
}
