import { useState } from "react";
import { Background_Particles } from "../Components/__Admin_Login.jsx";

// MUI Components
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import LoginIcon from "@mui/icons-material/Login";

// Common props (same as in Login.jsx)
import { GetCommonProps } from "../Components/__Common.jsx";

export default function Admin_login() {
    // State
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const isFormValid = email !== "" && password !== "";

    // Handle button click
    const handleLogin = () => {
        if (!isFormValid) {
            setError("Both fields are required!");
            return;
        }
        setError(null);
        console.log("Email:", email);
        console.log("Password:", password);
    };

    return (
        <>
            <Background_Particles />

            <div className="z-40 h-screen w-screen flex items-center justify-center">

                <div className="w-[500px] h-[450px] p-6 rounded-2xl shadow-lg flex flex-col gap-4 bg-white">
                    {/* Email Field */}
                    <TextField
                        {...GetCommonProps}
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        label="Email"
                        variant="standard"
                        required
                    />

                    {/* Password Field */}
                    <TextField
                        {...GetCommonProps}
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        label="Password"
                        variant="standard"
                        required
                    />

                    {/* Error Field */}
                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    {/* Login Button */}
                    <Button
                        variant="contained"
                        onClick={handleLogin}
                        endIcon={<LoginIcon />}
                        type="submit"
                        disabled={!isFormValid}
                    >
                        Login
                    </Button>
                </div>

            </div>
        </>
    );
}






