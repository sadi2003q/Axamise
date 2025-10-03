

import { useState, useContext } from "react";
import { IdContext } from "../../IdContext.jsx";
import { useNavigate } from "react-router-dom";

// UI
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import GoogleIcon from "@mui/icons-material/Google";

// Components
import _LogoForm, { _SIGNUP_styles } from "../../Components/__SignUp.jsx";
import { CommonProps } from "../../Components/__Common.jsx";
import bg_video from "../../asset/background_video.mp4";

// MVC
import Student from "../../models/Student_Model.js";
import SignUpController from "../../controller/Authentication/signup.controller.js";

export default function Signup() {

    // Variables
    const { setId } = useContext(IdContext); // UID of the user from global Context
    const navigate = useNavigate();    // Navigation hook from react-router-dom
    const [fieldError, setFieldError] = useState({ field: null, message: null }); // Error state for form fields

    
    // Student State
    const [student, setStudent] = useState(
        new Student({
            firstName: "",
            lastName: "",
            id: "",
            email: "",
            password: "",
            dob: "",
            gender: "",
        })
    );

    
    // Controller
    const controller = new SignUpController(student, setId, navigate, setFieldError);

    
    const handleChange = (e) => {
        const updated = new Student({ ...student, [e.target.name]: e.target.value });
        setStudent(updated);
    };

    
    const { text: strengthText, color: strengthColor } = student.getPasswordStrength();
    
    
    
    
    return (
        // outer div
        <div id="outerContainer" className={_SIGNUP_styles.outer}>
            

            {/* Background Video */}
            <video src={bg_video} autoPlay loop muted className={_SIGNUP_styles.video} />  



            {/* Inner Container */}
            <div id="innerContainer" className={_SIGNUP_styles.container}>

                {/* Logo Form */}
                {_LogoForm("Empowering Student Assessments", "Examine is your secure, smart platform...")}
                
                
                {/* Sign Up Form */}
                <div className={_SIGNUP_styles.formContainer}>

                    {/* Title */}
                    <h2 className={_SIGNUP_styles.formTitle}>Sign Up</h2>
                    
                    {/* All Form Fields */}
                    <div className={_SIGNUP_styles.formStyles}>


                        {/* First Name */}
                        <TextField {...CommonProps} label="First Name" name="firstName" value={student.firstName} onChange={handleChange} required />
                        
                        {/* Last Name */}
                        <TextField {...CommonProps} label="Last Name" name="lastName" value={student.lastName} onChange={handleChange} required />
                        
                        {/* ID */}
                        <TextField {...CommonProps} label="ID" name="id" value={student.id} onChange={handleChange} required />
                        
                        
                        {/* Email */}
                        <TextField {...CommonProps} label="Email" name="email" value={student.email} onChange={handleChange} required />
                        
                        
                        {/* Password */}
                        <TextField {...CommonProps} label={"Password " + strengthText} type="password" name="password" value={student.password} onChange={handleChange} required />

                        {/* Password Strength Bar */}
                        <div className="h-2 rounded-xl mt-1" style={{ width: `${Math.min(student.password.length * 10, 100)}%`, backgroundColor: strengthColor }} />
                        <span className="text-gray-300 text-sm text-right">{strengthText}</span>

                        
                        {/* Date of Birth */}
                        <TextField {...CommonProps} label="Date of Birth" type="date" name="dob" value={student.dob} onChange={handleChange} InputLabelProps={{ shrink: true }} required />


                        {/* Gender */}
                        <TextField {...CommonProps} select label="Gender" name="gender" value={student.gender} onChange={handleChange} required>
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="female">Female</MenuItem>
                            <MenuItem value="western">Western</MenuItem>
                        </TextField>



                        {/* Error Message */}
                        {fieldError.field && (
                            <p className="text-red-500 text-sm">
                                {fieldError.message}
                            </p>
                        )}


                        {/* Buttons */}
                        <Button 
                            onClick={() => controller.handleEmailSignUp()} 
                            variant="contained" 
                            endIcon={<SendIcon />}
                            disabled={!student.isValid()}
                        >
                            Sign Up
                        </Button>

                        <Button onClick={() => controller.handleGoogleSignUp()} variant="outlined" startIcon={<GoogleIcon />}>
                            Sign in with Google
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
