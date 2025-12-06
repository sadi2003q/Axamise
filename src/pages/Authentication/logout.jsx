import {useEffect, useState} from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Background_Particles } from "../../Components/__Admin_Login.jsx";
import { useGlobal } from "../../GlobalContext.jsx";
import { LogoutController } from "../../controller/Authentication/logout.controller.js"
import { useNavigate } from "react-router-dom";
import {routes} from "../../Utilities.js";

export default function Logout() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const { user_uid } = useGlobal();

    const {
        setCurrentUser,
        setUser_uid,
        setCurrentName,
        setAdminEmail
    } = useGlobal();

    const controller = new LogoutController({
        setOpen,
        setCurrentUser,
        setUser_uid,
        setCurrentName,
        setAdminEmail,
        navigate
    });



    useEffect(() => {
        if(!user_uid) {
            navigate(routes.login)
        }
    }, []);


    return (
        <div className="relative w-screen h-screen flex items-center justify-center overflow-hidden">
            <Background_Particles />

            <div className="relative bg-white/10 border border-white/20 rounded-3xl p-8
                            shadow-xl w-[90%] max-w-md text-center
                            flex flex-col items-center justify-center">

                <h1 className="text-3xl font-semibold text-white mb-4">
                    Logout
                </h1>

                <p className="text-white/70 mb-6">
                    Are you sure you want to log out of your account?
                </p>

                <Button
                    variant="contained"
                    color="error"
                    onClick={controller.handleLogoutClick}
                    sx={{
                        paddingX: "30px",
                        paddingY: "10px",
                        borderRadius: "12px",
                        fontSize: "16px",
                        textTransform: "none"
                    }}
                >
                    Logout
                </Button>
            </div>

            <Dialog open={open} onClose={controller.handleCancel}>
                <DialogTitle>Confirm Logout</DialogTitle>

                <DialogContent className="text-gray-700">
                    Are you sure you want to logout?
                </DialogContent>

                <DialogActions>
                    <Button onClick={controller.handleCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={controller.handleConfirmLogout} color="error" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
