import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { IdProvider } from "./IdProvider.jsx";


import { GlobalProvider } from "./GlobalContext";


// import CreateStudent from "./pages/CreateStudent";


// Import all pages Created within Pages folder
import Login from "./pages/Authentication/Login.jsx";
import Signup from "./pages/Authentication/Signup.jsx";
import Profile from "./pages/users/Profile.jsx";
import Event_Create from "./pages/Events/Event_Create.jsx";
import Question_Create from "./pages/Questions/Question_Create.jsx";
import Solving_Section from "./pages/Questions/Solving_Section.jsx";
import Event_Show from "./pages/Events/Event_Show.jsx"
import Question_List from "./pages/Questions/Question_List.jsx";
import Feed from "./pages/users/Feed.jsx";
import Admin_login from "./pages/Authentication/Admin_login.jsx";
import Admin_SetUsr from "./pages/Authentication/Admin_SetUser.jsx";
import Admin_Approval from "./pages/Admin/Admin_Approval.jsx";
import Admin_ApprovalEvent from "./pages/Admin/Admin_ApprovalEvent.jsx";
import Dashboard from "./pages/test.jsx";

/*
  import CreateStudent from "./pages/CreateStudent";
  import ReadStudents from "./pages/ReadStudent";
  import UpdateStudent from "./pages/UpdateStudent";
  import DeleteStudent from "./pages/DeleteStudent";
  import SingleStudent from "./pages/SingleStudent";
*/



// Define route Path
ReactDOM.createRoot(document.getElementById("root")).render(
  <GlobalProvider>
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

        <Route path="/" element={<Admin_login />} />
        <Route path="/event_create" element={<Event_Create />} />
        <Route path="/solve" element={<Solving_Section />} />
        <Route path="/question_create" element={<Question_Create />} />
        <Route path="/question_list" element={<Question_List />} />
        {/*<Route path="/admin_approvalQuestion" element={<Admin_Approval />} />*/}

        


        {/* 
            <Route path="/" element={<Profile />} />
            <Route path="/event_create" element={<Event_Create />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} /> 
            <Route path="/question_create" element={<Question_Create />} />
            <Route path="/solve" element={<Solving_Section />} />
            <Route path="/event_show" element={<Event_Show />} />
            <Route path="/question_list" element={<Question_List />} />
            <Route path="/feed" element={<Feed />} />
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
  </GlobalProvider>

);
