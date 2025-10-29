import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, Outlet, useLocation, Navigate } from "react-router-dom";

// 🧠 Context Providers
import { GlobalProvider } from "./GlobalContext";
import { EventProvider } from "./EventContext.jsx";

// 📄 Pages
import Login from "./pages/Authentication/Login.jsx";
import Signup from "./pages/Authentication/Signup.jsx";
import Profile from "./pages/users/Profile.jsx";
import Event_Create from "./pages/Events/Event_Create.jsx";
import Question_Create from "./pages/Questions/Question_Create.jsx";
import Solving_Section from "./pages/Questions/Solving_Section.jsx";
import Event_Show from "./pages/Events/Event_Show.jsx";
import Question_List from "./pages/Questions/Question_List.jsx";
import Feed from "./pages/users/Feed.jsx";
import Admin_login from "./pages/Authentication/Admin_login.jsx";
import Admin_SetUsr from "./pages/Authentication/Admin_SetUser.jsx";
import Admin_Approval from "./pages/Admin/Admin_Approval.jsx";
import Admin_ApprovalEvent from "./pages/Admin/Admin_ApprovalEvent.jsx";
import EventStart from "./pages/Events/Event_Start.jsx";
import Landing from "./Landing.jsx";


// ============================================================
// 🧭 Navbar Component
// ============================================================
function Navbar() {
  const location = useLocation();

  const links = [
    { to: "/FEED", label: "Feed" },
    { to: "/EVENT_SHOW", label: "Event" },
    { to: "/QUESTION_LIST", label: "Problem" },
    { to: "/PROFILE", label: "Profile" },
    { to: "/NOTIFICATION", label: "Notification" },
    { to: "/LOGOUT", label: "Logout" },
  ];

  return (
    <nav className="w-full bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#2a2a2a] shadow-md shadow-[#4A4A4A]/40 sticky top-0 z-5000">
      <div className="flex justify-center space-x-8 py-4 px-6 text-white">
        {links.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={`text-sm font-['Roboto_Mono'] tracking-wide transition-all duration-200 ${
              location.pathname === to
                ? "text-[#F7E733] border-b-2 border-[#F7E733] pb-1"
                : "text-gray-300 hover:text-[#F7E733]"
            }`}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

// ============================================================
// 🧩 Layout Wrapper for Logged-in Pages
// ============================================================
function AppLayout() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}

// ============================================================
// 🚀 Main App Entry (Single Root)
// ============================================================
ReactDOM.createRoot(document.getElementById("root")).render(
  <GlobalProvider>
    <EventProvider>
      <BrowserRouter>
        <Routes>

          {/* 🌟 Landing page first */}
          <Route path="/" element={<Landing />} />

          {/* 🔹 Auth Routes */}
          <Route path="/LOGIN" element={<Login />} />
          <Route path="/SIGNUP" element={<Signup />} />

          {/* 🔹 Logged-in pages (with navbar) */}
          <Route element={<AppLayout />}>
            <Route path="/FEED" element={<Feed />} />
            <Route path="/EVENT_CREATE" element={<Event_Create />} />
            <Route path="/EVENT_SHOW" element={<Event_Show />} />
            <Route path="/SOLVE" element={<Solving_Section />} />
            <Route path="/QUESTION_CREATE" element={<Question_Create />} />
            <Route path="/QUESTION_LIST" element={<Question_List />} />
            <Route path="/PROFILE" element={<Profile />} />
            <Route path="/EVENT_START" element={<EventStart />} />
          </Route>

          {/* 🔹 Admin area (no navbar) */}
          <Route path="/ADMIN_LOGIN" element={<Admin_login />} />
          <Route path="/ADMIN_SETUSER" element={<Admin_SetUsr />} />
          <Route path="/ADMIN_APPROVAL" element={<Admin_Approval />} />
          <Route path="/ADMIN_APPROVALEVENT" element={<Admin_ApprovalEvent />} />

          {/* 🔁 Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </BrowserRouter>
    </EventProvider>
  </GlobalProvider>
);
