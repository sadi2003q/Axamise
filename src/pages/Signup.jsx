import { useState, useContext } from "react";

// Context
import { IdContext } from "../IdContext.jsx";


// UI, Components and Styles
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import GoogleIcon from "@mui/icons-material/Google";
import _LogoForm from "../Components/__SignUp.jsx";
import { _SIGNUP_styles } from "../Components/__SignUp.jsx";
import { MarqueeScroll, CommonProps } from "../Components/__Common.jsx";

// Assets
import bg_video from "../asset/background_video.mp4";

// Models
import Student_Model from "../models/Student_Model";

// Routing
import { useNavigate } from "react-router-dom";

// Firebase
import {
    _SignUp_EmailPassword,
    _SignUp_Google,
    _StoreUserInfo,
} from "../ViewModel/SignUp_ViewModel.js";

export default function Signup() {
    // Variables
    const { setId } = useContext(IdContext);
    const navigate = useNavigate();
    const [student, setStudent] = useState({
        ...Student_Model,
        firstName: "Md. Adnan Abdullah",
        lastName: "Sadi",
        id: "2221345642",
        email: "adnan.sadi@northsouth.edu",
        password: "sadisadi112",
        dob: "2003-08-23",
        gender: "male",
    });
    const [fieldError, setFieldError] = useState({ field: null, message: null });
    const isFormIncomplete =
        !student.firstName ||
        !student.lastName ||
        !student.id ||
        !student.dob ||
        !student.gender;

    // UI/Authentication Functions
    const handleAuthResult = (result) => {
        if (result.success) {
            console.log("User signed in:", result.user);
            console.log("User ID:", result.id);
            setInfo(result.id); // ✅ Pass ID directly
            setId(result.id); // Set ID in Context
            navigate("/login");
        } else {
            switch (result.error.code) {
                case "auth/email-already-in-use":
                    setFieldError({
                        field: "email",
                        message: "This email is already in use.",
                    });
                    break;
                case "auth/invalid-email":
                    setFieldError({
                        field: "email",
                        message: "Please enter a valid email address.",
                    });
                    break;
                case "auth/weak-password":
                    setFieldError({
                        field: "password",
                        message: "Password is too weak. Use at least 6 characters.",
                    });
                    break;
                default:
                    setFieldError({ field: null, message: result.error.message });
            }
        }
    };

    const handleChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
        if (fieldError.field === e.target.name) {
            setFieldError({ field: null, message: null });
        }
    };

    const SignUp_EmailPassword = async () => {
        const result = await _SignUp_EmailPassword(student);
        handleAuthResult(result);
    };

    const SignUp_Google = async () => {
        const result = await _SignUp_Google();
        handleAuthResult(result);
    };

    // Store User Info in Firestore ✅ FIXED
    const setInfo = async (id) => {
        const result = await _StoreUserInfo(student, id);
        console.log("within setInfo function : " + id);
        if (result.success) {
            console.log("User info stored successfully");
        } else {
            console.log("Error storing user info:", result.error);
        }
    };

    // 🔥 Password strength colors (hex values)
    const getPasswordColorHex = () => {
        if (student.password.length >= 10) return "#22c55e"; // green-500
        if (student.password.length >= 6) return "#facc15"; // yellow-400
        if (student.password.length >= 3) return "#f97316"; // orange-500
        return "#ef4444"; // red-500
    };

    const withOpacity = (hex, alpha = 1) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    const getPasswordStrength = () => {
        if (student.password.length >= 10) return "(Very Strong)";
        if (student.password.length >= 6) return "(Strong)";
        if (student.password.length >= 3) return "(Weak)";
        return "";
    };

    // Text Field Common Property
    // const commonProps = {
    //     variant: "standard",
    //     fullWidth: true,
    //     InputProps: {
    //         sx: {
    //             color: "white",
    //             fontFamily: "Roboto Mono, monospace",
    //             "&:before": { borderBottom: "1px solid gray" },
    //             "&:hover:not(.Mui-disabled):before": { borderBottom: "1px solid white" },
    //             "&:after": { borderBottom: "2px solid #ff9800" },
    //         },
    //     },
    //     InputLabelProps: {
    //         sx: {
    //             color: "white",
    //             fontFamily: "Roboto Mono, monospace",
    //             "&.Mui-focused": { color: "#ff9800" },
    //         },
    //     },
    // };

    return (
        <div id="outerContainer" className={_SIGNUP_styles.outer}>
            {/* Background Video*/}
            <video
                src={bg_video}
                autoPlay
                loop
                muted
                className={_SIGNUP_styles.video}
            />

            {/*  Inner Container  */}
            <div id="innerContainer" className={_SIGNUP_styles.container}>
                {/*  Logo  */}
                {_LogoForm(
                    "Empowering Student Assessments",
                    "Examine is your secure, smart platform for streamlined student registration and assessment tracking. Fast, easy, and reliable."
                )}

                {/*  Form  */}
                <div className={_SIGNUP_styles.formContainer}>
                    <h2 className={_SIGNUP_styles.formTitle}>Sign Up</h2>
                    <div className={_SIGNUP_styles.formStyles}>
                        {/* First Name */}
                        <TextField
                            {...CommonProps}
                            label="First Name"
                            name="firstName"
                            value={student.firstName}
                            onChange={handleChange}
                            required
                        />

                        {/* Last Name */}
                        <TextField
                            {...CommonProps}
                            label="Last Name"
                            name="lastName"
                            value={student.lastName}
                            onChange={handleChange}
                            required
                        />

                        {/* ID */}
                        <TextField
                            {...CommonProps}
                            label="ID"
                            name="id"
                            value={student.id}
                            onChange={handleChange}
                            error={fieldError.field === "id"}
                            helperText={fieldError.field === "id" ? fieldError.message : ""}
                            required
                        />

                        {/* Email */}
                        <TextField
                            {...CommonProps}
                            label="Email"
                            type="email"
                            name="email"
                            value={student.email}
                            onChange={handleChange}
                            error={fieldError.field === "email"}
                            helperText={fieldError.field === "email" ? fieldError.message : ""}
                            required
                        />

                        {/* Password */}
                        <TextField
                            {...CommonProps}
                            label={"Password(6 Characters) " + getPasswordStrength()}
                            type="password"
                            name="password"
                            value={student.password}
                            onChange={handleChange}
                            required
                        />

                        {/* Password Bar */}
                        <div
                            className={`w-full ${_SIGNUP_styles.passwordBar}`}
                            style={{
                                width: `${Math.min(
                                    (student.password.length * 100) / 6,
                                    100
                                )}%`,
                                backgroundColor: getPasswordColorHex(),
                            }}
                        />
                        <span className={_SIGNUP_styles.passwordText}>
                            {getPasswordStrength()}
                        </span>

                        {/* DOB */}
                        <TextField
                            {...CommonProps}
                            label="Date of Birth"
                            type="date"
                            name="dob"
                            value={student.dob}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                            required
                        />

                        {/* Gender */}
                        <TextField
                            {...CommonProps}
                            select
                            label="Gender"
                            name="gender"
                            value={student.gender}
                            onChange={handleChange}
                            required
                        >
                            <MenuItem value="">Select Gender</MenuItem>
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="female">Female</MenuItem>
                            <MenuItem value="Western">Western</MenuItem>
                        </TextField>

                        {/* Sign Up Button */}
                        <Button
                            onClick={SignUp_EmailPassword}
                            variant="contained"
                            endIcon={<SendIcon />}
                            type="submit"
                            sx={{
                                backgroundColor: getPasswordColorHex(),
                                borderRadius: 2,
                                fontFamily: "Roboto Mono, monospace",
                                "&:hover": {
                                    backgroundColor: withOpacity(getPasswordColorHex(), 0.75),
                                },
                            }}
                        >
                            Sign Up
                        </Button>

                        {/* Google Sign In */}
                        <Button
                            variant="outlined"
                            startIcon={<GoogleIcon />}
                            onClick={SignUp_Google}
                            fullWidth
                            sx={{
                                textTransform: "none",
                                fontFamily: "Roboto Mono, monospace",
                                cursor: isFormIncomplete ? "not-allowed" : "pointer",
                                "&:hover": {
                                    backgroundColor: "#E8F0FE",
                                    borderColor: "#4285F4",
                                },
                            }}
                        >
                            Sign in with Google
                        </Button>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}
