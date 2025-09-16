import {useState, useContext} from "react";

// Global State Management
import { IdContext } from "../IdContext.jsx";


// UI, Components && Styles
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import TextField from '@mui/material/TextField';
import {_LOGIN_styles, LogoForm, LoginName} from "../Components/__LogIn.jsx";


// Assets
import bg_video from "../asset/background_video.mp4";


// Models
import User_Model from "../models/User_Model";


// Routing
import { useNavigate } from "react-router-dom";


// Firebase
import {  LoginWithEmailAndPassword, GetUserInfo } from "../ViewModel/Login_ViewModel.js";



export default function Login() {

    // Variables and Routes
    const { id, setId, currentName, setCurrentName } = useContext(IdContext);
    const navigate = useNavigate();
    const [user, setUser] =  useState({
        ...User_Model,
        email: "adnan.sadi@northsouth.edu",
        password: "sadisadi112"
    });
    const [loginError, setLoginError] = useState(null);



    // UI Rendering Functions and Authentication
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });

        // Clear error as user types
        if (loginError) setLoginError(null);
    };

    const handleAuthResult = (result) => {
        console.log('within varification');
        if (result.success) {
            console.log('Successfully Logged In')
            console.log("User signed in:", result.user);
            console.log("User ID:", result.id);
            showInfo(result.id);
            setId(result.id); // Set ID in Context
            

            navigate("/event_create");
        } else {
            console.log("Login failed:", result.error);
            switch (result.error.code) {
                case "auth/email-already-in-use":
                    setLoginError({ field: "email", message: "This email is already in use." });
                    break;
                case "auth/invalid-email":
                    setLoginError({ field: "email", message: "Please enter a valid email address." });
                    break;
                case "auth/weak-password":
                    setLoginError({
                        field: "password",
                        message: "Password is too weak. Use at least 6 characters.",
                    });
                    break;
                default:
                    setLoginError({ field: null, message: result.error.message });
            }
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const result = await LoginWithEmailAndPassword(user.email, user.password);
        console.log('result varification')
        handleAuthResult(result);
        // navigate('/event_show')
        // navigate('/question_create')
    };


    const showInfo = async (id) => {
        const result = await GetUserInfo(id);
        if (result.success) {
            console.log("User data ->:", result.data);
            console.log(`ID : ${id}`)
            console.log(`Name : ${result.data?.firstName} ${result.data?.lastName}`)
            setCurrentName(`${result.data?.firstName} ${result.data?.lastName}`)
            
            

        } else {
            console.log("Error fetching user data:", result.error);
        }
    }




    // UI Rendering
    return (
        <div className={_LOGIN_styles.outer}>
            {/* Background Video */}
            <video src={bg_video} autoPlay loop muted className={_LOGIN_styles.video} />

            {/* Inner Container */}
            <div className={_LOGIN_styles.container}>

                {/*  Login Form  */}
                <div className={_LOGIN_styles.formContainer}>

                    {/*  Login Name  */}
                    <LoginName/>

                    {/*  Input Fields  */}
                    <div className="flex flex-col gap-4">

                        <TextField
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            label="Email"
                            variant="standard"
                            required={true}
                            slotProps={{
                                inputLabel: {
                                    sx: {
                                        color: "white",
                                        fontFamily: "Roboto Mono, monospace",
                                        "&.Mui-focused": {
                                            color: "#ff9800", // label color on focus
                                        },
                                    },
                                },
                                input: {
                                    sx: {
                                        fontFamily: "Roboto Mono, monospace",
                                        color: "white",
                                        "&:before": {
                                            borderBottom: "1px solid gray", // default underline
                                        },
                                        "&:hover:not(.Mui-disabled):before": {
                                            borderBottom: "1px solid white", // hover underline
                                        },
                                        "&:after": {
                                            borderBottom: "2px solid #ff9800", // focused underline
                                        },
                                    },
                                },
                            }}
                        />

                        <TextField
                            name="password"
                            type="password"
                            value={user.password}
                            onChange={handleChange}
                            label="Password"
                            variant="standard"
                            required={true}
                            slotProps={{
                                inputLabel: {
                                    sx: {
                                        color: "white",
                                        fontFamily: "Roboto Mono, monospace",
                                        "&.Mui-focused": {
                                            color: "#ff9800", // label color on focus
                                        },
                                    },
                                },
                                input: {
                                    sx: {
                                        fontFamily: "Roboto Mono, monospace",
                                        color: "white",
                                        "&:before": {
                                            borderBottom: "1px solid gray", // default underline
                                        },
                                        "&:hover:not(.Mui-disabled):before": {
                                            borderBottom: "1px solid white", // hover underline
                                        },
                                        "&:after": {
                                            borderBottom: "2px solid #ff9800", // focused underline
                                        },
                                    },
                                },
                            }}
                        />




                        {loginError && (
                            <p className="text-red-500 text-sm text-right">{loginError}</p>
                        )}

                        <Button
                            variant="contained"
                            onClick={handleLogin}
                            endIcon={<LoginIcon />}
                            type="submit"
                            sx={{
                                borderTopLeftRadius: 10,
                                borderTopRightRadius: 10,
                                borderBottomLeftRadius: 10,
                                fontFamily: "Roboto Mono, monospace",
                            }}
                        >
                            Login
                        </Button>
                        <button onClick={() => 
                            console.log("Current ID from Context: " + id)
                        }> click here </button>
                    </div>


                </div>


                {/*  Logo  */}
                <LogoForm />

            </div>
        </div>
    );
}
