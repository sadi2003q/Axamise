// src/views/Login.jsx

// React Hooks
import { useState   } from "react";
import { useNavigate } from "react-router-dom";

// MUI Components
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import TextField from "@mui/material/TextField";

// Custom Components & Styles & assets
import { _LOGIN_styles, LogoForm, LoginName } from "../../Components/__LogIn.jsx";
import { CommonProps } from "../../Components/__Common.jsx";
import bg_video from "../../asset/background_video.mp4";


// Global Context

import { useGlobal } from "../../GlobalContext.jsx";

// Controller
import LoginController from "../../controller/Authentication/login.controller.js";

// Model
import User from "../../models/User_Model.js";

export default function Login() {

    /*
        Left: Login With Google Button

        adminEmail,
        setAdminEmail,

        currentUser,
        setCurrentUser,

        user_uid,
        setUser_uid,

        currentName,
        setCurrentName,
    */

    // Context and Variables
    const { setUser_uid, setCurrentName } = useGlobal()

    const navigate = useNavigate();
    const [user, setUser] = useState(new User());
    const [loginError, setLoginError] = useState(null);

    const isFormValid = user.email !== "" && user.password !== "";


    // Input handler
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        if (loginError) setLoginError(null);
    };


    // Form submission handler
    const handleLogin = async (e) => {
        e.preventDefault();
        const controller = new LoginController(
            user,
            setUser_uid,
            setCurrentName,
            navigate,
            setLoginError
        );
        await controller.handleEmailLogin();
    };

    return (

        // Outer Container
        <div className={_LOGIN_styles.outer}>


            {/* Background Video */}
            <video src={bg_video} autoPlay loop muted className={_LOGIN_styles.video} />


            {/* Inner Container */}
            <div className={_LOGIN_styles.container}>


                {/* Form Elements */}
                <div className={_LOGIN_styles.formContainer}>
                    <LoginName />

                    {/* Form */}
                    <div className="flex flex-col gap-4 text-white">


                        {/* Email Field */}
                        <TextField
                        {...CommonProps}
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            label="Email"
                            variant="standard"
                            required
                        />


                        {/* Password Field */}
                        <TextField
                        {...CommonProps}
                            name="password"
                            type="password"
                            value={user.password}
                            onChange={handleChange}
                            label="Password"
                            variant="standard"
                            required
                        />
                        {loginError && <p className="text-red-500 text-sm">{loginError.message || loginError}</p>}


                        {/* Login Button */}
                        <Button
                            variant="contained"
                            onClick={handleLogin}
                            endIcon={<LoginIcon />}
                            type="submit"
                            disabled={!isFormValid} // Disable button if form is not valid
                        >
                            Login
                        </Button>
                    </div>
                </div>



                {/* Logo */}
                <LogoForm />
            </div>
        </div>
    );
}
