import React from "react";
import ReactDOM from "react-dom/client";
import Landing from "./Landing.jsx";
import Login from "./pages/Authentication/Login.jsx";

<Route path="/" element={<Login />} />


// ✅ Import spline viewer so it's recognized as a web component
import "@splinetool/viewer";




const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Landing />
  </React.StrictMode>
);
