import logo from "../asset/logo.jpg";


export const _SIGNUP_styles = {
    outer: "relative w-full min-h-screen flex justify-center items-center overflow-hidden font-['Roboto_Mono']",
    video: "absolute top-0 left-0 w-full h-full object-cover",
    container: "relative z-10 backdrop-blur-xl bg-gray-900/40 p-10 rounded-3xl shadow-lg w-full max-w-4xl flex flex-col md:flex-row gap-16 justify-between border border-white/10",
    formContainer: "flex-1",
    formTitle: "text-white text-4xl font-bold mb-6",
    passwordBar: "h-2 rounded-xl mt-1",
    passwordText: "text-gray-300 text-sm text-right",
    logoContainer: "flex-1 flex justify-center items-center bg-gradient-to-br from-gray-700 to-gray-900/60 rounded-xl p-8",
    formStyles : "flex flex-col gap-4"
};


export default function _LogoForm(headingText, bodyText) {
    return (
        <div className="flex-1 flex justify-center items-center bg-gradient-to-br from-gray-700 to-gray-900/60 rounded-xl p-8">
            <div className="flex flex-col items-center text-center gap-4 animate-fade-in">
                <img src={logo} className="w-32 h-32 rounded-full shadow-xl" alt="logo" />
                <h1 className="text-white text-3xl font-bold">Examine</h1>
                <p className="text-gray-300 italic text-sm">
                    {/*"Empowering Student Assessments"*/}
                    "{headingText}"
                </p>
                <p className="text-gray-400 text-sm max-w-xs">
                    {/*Examine is your secure, smart platform for streamlined student*/}
                    {/*registration and assessment tracking. Fast, easy, and reliable.*/}
                    {bodyText}
                </p>
                <div className="mt-4">
                    <svg
                        className="w-8 h-8 animate-spin text-indigo-500"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                    </svg>
                </div>
            </div>
        </div>
    );
}


