import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { IdProvider } from "./IdProvider.jsx";


// import CreateStudent from "./pages/CreateStudent";


// Import all pages Created within Pages folder
import Login from "./pages/Login";
import Signup from "./pages/Signup.jsx";
import Profile from "./pages/Profile.jsx";
import Event_Create from "./pages/Event_Create.jsx";
import Question_Create from "./pages/Question_Create.jsx";
import Solving_Section from "./pages/Solving_Section.jsx";
import Event_Show from "./pages/Event_Show.jsx"
import Question_List from "./pages/Question_List.jsx";

/*
  import CreateStudent from "./pages/CreateStudent";
  import ReadStudents from "./pages/ReadStudent";
  import UpdateStudent from "./pages/UpdateStudent";
  import DeleteStudent from "./pages/DeleteStudent";
  import SingleStudent from "./pages/SingleStudent";
*/



// Define route Path
ReactDOM.createRoot(document.getElementById("root")).render(
  <IdProvider>
    <BrowserRouter>
      <Routes>
        
        
        
        {/* Opening Path */}
        {/* <Route path="/" element={<Signup />} /> */}
        {/* <Route path="/" element={<Login />} /> */}
        {/* <Route path="/" element={<Question_Create />} /> */}
        {/* <Route path="/" element={<Login />} /> */}
        {/* <Route path="/" element={<Solving_Section />} /> */}
        {/* <Route path="/" element={<Profile />} /> */}
        <Route path="/" element={<Solving_Section />} />
        
        

        


        {/* 
            <Route path="/" element={<Profile />} />
            <Route path="/event_create" element={<Event_Create />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} /> 
            <Route path="/question_create" element={<Question_Create />} />
            <Route path="/solve" element={<Solving_Section />} />
            <Route path="/event_show" element={<Event_Show />} />
            <Route path="/question_list" element={<Question_List />} />
        */}








        {/*    Example USEG
          <Route path="/create" element={<CreateStudent />} />
          <Route path="/single" element={<SingleStudent />} />
          <Route path="/read" element={<ReadStudents />} />
          <Route path="/update/:id" element={<UpdateStudent />} />
          <Route path="/delete/:id" element={<DeleteStudent />} /> 
          
        */}
        





      </Routes>
    </BrowserRouter>
  </IdProvider>

);
