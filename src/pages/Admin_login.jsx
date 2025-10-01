/* eslint-disable no-unused-vars */

// File : src/Page/Admin_login.jsx

import { useState } from "react";
import { Background_Particles } from "../Components/__Admin_Login.jsx";

// Global Context
import { useGlobal } from "../GlobalContext";


// MUI Components
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import LoginIcon from "@mui/icons-material/Login";

// Common props (same as in Login.jsx)
import { GetCommonProps } from "../Components/__Common.jsx";
import { LoginHeader } from '../Components/__Admin_Login.jsx'

// model
import User from '../models/User_Model.js'

// Controller
import { Admin_LoginController } from '../controller/admin.login.controller.js'

// React Routing
import { useNavigate } from "react-router-dom";

export default function Admin_login() {

    // Global Context
    const { adminEmail, setAdminEmail } = useGlobal();


    // State
    const [user, setUser] = useState(new User("admin.adnan@gmail.com"
, "sadisadi112"))
    const [error, setError] = useState(null);
    const [loginError, setLoginError] = useState(null);

    const isFormValid = user.email !== "" && user.password !== "";
    const navigate = useNavigate();


    // Handle button click
    const handleLogin = async (e) => {
        e.preventDefault()
        if (!isFormValid) {
            setError("Both fields are required!");
            return;
        }


        setError(null);

        console.log(`Email : ${user.email} Password : ${user.password}`)


        const controller = new Admin_LoginController(user, navigate, setLoginError);
        await controller.handleEmailLogin()


        setAdminEmail(user.email)


        // navigate('/admin_approvalQuestion');
    };

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        if (loginError) setLoginError(null);
    };

    return (
        <>
            <Background_Particles />

            <div className="z-40 h-screen w-screen flex items-center justify-center">

                <div className="w-[500px] h-[450px] p-6 rounded-2xl shadow-lg flex flex-col gap-4 bg-white justify-center">

                    <LoginHeader header="Admin Login" />

                    {/* Email Field */}
                    <TextField
                        {...GetCommonProps}
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        label="Admin ID"
                        variant="standard"
                        sx={{
                            margin: '20px'
                        }}
                        required
                    />

                    {/* Password Field */}
                    <TextField
                        {...GetCommonProps}
                        name="password"
                        type="password"
                        value={user.password}
                        onChange={handleChange}
                        label="Password"
                        variant="standard"
                        sx={{
                            margin: '20px'
                        }}
                        required
                    />

                    {/* Error Field */}
                    <div className="w-[100%] flex items-center justify-center">
                        {error && <p className="text-red-500 text-sm ">{error}</p>}
                        {loginError && <p className="text-red-500 text-sm font-bold align-middle">{loginError}</p>}
                    </div>


                    {/* Login Button */}
                    <Button
                        variant="contained"
                        onClick={handleLogin}
                        endIcon={<LoginIcon />}
                        type="submit"
                        // disabled={!isFormValid}
                        sx={{
                            margin: '20px'
                        }}
                    >
                        Login
                    </Button>
                </div>

            </div>
        </>
    );
}






