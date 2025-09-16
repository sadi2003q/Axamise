
import User_Model from "../models/User_Model.js";

import TextField from "@mui/material/TextField";
import logo from "../asset/logo.jpg";
import {useEffect, useState} from "react";

// Tailwind + font styles (reuse the same as signup)
// eslint-disable-next-line react-refresh/only-export-components
export const _LOGIN_styles = {
    outer: "relative w-full min-h-screen flex justify-center items-center overflow-hidden font-['Roboto_Mono']",
    video: "absolute top-0 left-0 w-full h-full object-cover",
    container: "relative z-10 backdrop-blur-xl bg-gray-900/40 p-10 rounded-3xl shadow-lg w-full max-w-4xl flex flex-col md:flex-row gap-16 justify-between border border-white/10",
    formContainer: "flex-1 flex flex-col justify-center",
    formTitle: "text-white text-4xl font-bold mb-6",
    input: "bg-gray-700 text-white font-['Roboto_Mono'] rounded-tl-lg rounded-tr-lg rounded-bl-lg px-4 py-2 placeholder-gray-300 cursor-pointer border border-2 border-transparent focus:border-indigo-500 focus:outline-none transition-colors duration-300 ease-in-out",
    logoContainer: "flex-1 flex justify-center items-center bg-gradient-to-br from-gray-700 to-gray-900/60 rounded-xl p-8",
    logoInnerContainer: "flex flex-col items-center text-center gap-4 animate-fade-in"

};

function LogoSpinner1() {
    return (
        <div className="mt-4 flex justify-center items-center">
            <svg
                className="animate-spin h-8 w-8 text-indigo-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
            >
                <circle
                    className="opacity-25"
                    cx="25"
                    cy="25"
                    r="20"
                    stroke="currentColor"
                    strokeWidth="5"
                    fill="none"
                />
                <circle
                    className="opacity-75"
                    cx="25"
                    cy="25"
                    r="20"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                    fill="none"
                    strokeDasharray="31.4 31.4"
                    strokeDashoffset="0"
                />
            </svg>
        </div>
    );
}

function LogoSpinner2() {
    return (
        <div className="mt-4 flex justify-center items-center">
            <svg
                className="animate-spin h-8 w-8 text-indigo-500"
                style={{ animation: "spin 1s linear infinite reverse" }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
            >
                <circle
                    className="opacity-25"
                    cx="25"
                    cy="25"
                    r="20"
                    stroke="currentColor"
                    strokeWidth="5"
                    fill="none"
                />
                <circle
                    className="opacity-75"
                    cx="25"
                    cy="25"
                    r="20"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                    fill="none"
                    strokeDasharray="31.4 31.4"
                    strokeDashoffset="0"
                />
            </svg>
        </div>

    );
}

function LoginSpinner() {
    return (
        <div className={"flex"}>
            <LogoSpinner1/>
            <LogoSpinner1/>
            <LogoSpinner2/>
            <LogoSpinner2/>
        </div>
    );
}

function LoginMessage() {
    return (
        <>
            <img src={logo} className="w-32 h-32 rounded-full shadow-xl" alt="logo" />
            <h1 className="text-white text-3xl font-bold">Examine</h1>
            <p className="text-gray-300 italic text-sm">"Unlocking Potential Through Smarter Assessments"</p>
            <p className="text-gray-400 text-sm max-w-xs">
                A cutting-edge platform crafted to simplify student management and enhance assessment accuracy — seamless, secure, and user-friendly.
            </p>
        </>
    );
}


// Reuse same logo component
export function LogoForm() {
    return (
        <div className={_LOGIN_styles.logoContainer}>
            <div className={_LOGIN_styles.logoInnerContainer}>

                <LoginMessage/>

                <LoginSpinner/>

            </div>
        </div>
    );
}

export function LoginName() {
    const [loginText, setLoginText] = useState("Login");

    useEffect(() => {
        const loginVariants = [
            "Login",
            "Login.",
            "Login..",
            "Login...",
            "Login....",
            "Login...",
            "Login..",
            "Login."
        ];

        let index = 0;

        const interval = setInterval(() => {
            setLoginText(loginVariants[index]);
            index = (index + 1) % loginVariants.length;
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return <h2 className="text-white text-4xl font-bold mb-6">{loginText}</h2>;
}
