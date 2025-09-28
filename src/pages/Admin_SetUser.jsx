/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Background_Particles } from "../Components/__Admin_Login";
import { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import { Admin_Info } from "../models/AdminInfo_Model";
import { GetCommonProps2 } from "../Components/__Common.jsx";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import { Admin_InfoController } from "../controller/admin.setUser.controller.js";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from '@mui/material/IconButton';
import AdminPanelSettingsTwoToneIcon from '@mui/icons-material/AdminPanelSettingsTwoTone';
import DeleteIcon from '@mui/icons-material/Delete';

/**
 * LEFT: CHANGE EMAIL AND PASSWORD
 * @returns {JSX.Element}
 * @constructor
 */

export default function Admin_SetUsr() {

    const [admins, setAdmins] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");


    const [buttonText, setButtonText] = useState("Add");
    const [headingText, setHeadingText] = useState("Add New Admin");

    const [adminID, setAdminID] = useState("");


    const filteredNames = admins.filter(admin =>
        admin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const [adminInfo, setAdminInfo] = useState(
        new Admin_Info({
            name: "Admin Name",
            email: "admin@gmail.com",
            password: "",
            role: "Approval Department",
            phoneNumber: "01xxxx",
            address: "Dhaka Bangladesh",
            profilePicture: "",
            lastLogin: "Active Now",
            status: "Active",
            createdAt: new Date(),
            updatedAt: new Date()
        })
    );


    const controller = new Admin_InfoController(adminInfo, setAdmins, adminID);

    const handleChange = (e) => {
        setAdminInfo(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleAddNewAdmin = () => {
        setAdminInfo(new Admin_Info({
            name: "",
            email: "",
            password: "",
            role: "Approval Department",
            phoneNumber: "",
            address: "",
            profilePicture: "",
            lastLogin: "",
        }))
        setButtonText("Add");
        setHeadingText("Add New Admin");
    }

    const handleListItemClick = (admin) => {
        setAdminInfo(new Admin_Info({
            name: admin.name || "",
            email: admin.email || "",
            password: admin.password || "",
            role: admin.role || "Approval Department",
            phoneNumber: admin.phoneNumber || "",
            address: admin.address || "",
            profilePicture: admin.profilePicture || "",
            lastLogin: admin.lastLogin || "",
            status: admin.status || "",
            createdAt: admin.createdAt || new Date(),
            updatedAt: admin.updatedAt || new Date(),
        }));
        setButtonText("Update");
        setHeadingText("Update Admin");
        setAdminID(admin.id);
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAdminInfo(prev => ({
                    ...prev,
                    profilePicture: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };
    const handleDelete = (id) => {
        controller.deleteAdmin(id).then(() => {
            console.log("Admin Deleted Successfully from UI file");
            setAdmins(prevAdmins => prevAdmins.filter(admin => admin.id !== id));
        }).catch((error) => {
            console.log("Error deleting admin:", error);
        });
    }


    /**
     * Handle form submission
     * @param e
     * @returns {Promise<void>}
     * @description This function handles the form submission based on the button text.
     * If the button text is "Add", it calls the handleEmailSignUp method from the controller.
     * If the button text is "Update", it calls the updateAdmin method from the controller.
     * It also logs the result of the operation.
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        switch (buttonText) {
            case "Add":
                controller.handleEmailSignUp().then(() => {
                    console.log("Admin Added Successfully");
                }).catch((error) => {
                    console.log("Error adding admin:", error);
                });

                // Append it to the existing admins array
                setAdmins(prevAdmins => [...prevAdmins, adminInfo]);

                break;
            case "Update":
                controller.updateAdmin().then(() => {
                    console.log("Admin Updated Successfully");
                    // Update local state without fetching again
                    setAdmins(prevAdmins =>
                        prevAdmins.map(admin =>
                            admin.id === adminID ? { ...admin, ...adminInfo } : admin
                        )
                    );
                }).catch((error) => {
                    console.log("Error updating admin:", error);
                });
                break;
        }

    };

    useEffect(() => {
        controller.getAllAdmins()
    }, []);






    return (
        <>
            <Background_Particles />

            <div className="w-screen h-screen flex justify-center items-center z-20">
                <div
                    className="w-[40vw] h-[84vh] bg-gray-400 m-4 rounded-2xl flex flex-col justify-between p-8 gap-6 overflow-auto"
                    style={{
                        scrollbarWidth: "none", // For Firefox
                    }}
                >
                    {/* Hide scrollbar for Webkit browsers (Chrome, Edge, Safari) */}
                    <style>
                        {`
      div::-webkit-scrollbar {
        display: none;
      }
    `}
                    </style>

                    {/*  Heading */}
                    <div className="w-full h-auto m-2 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <h1 className="text-2xl font-roboto font-bold text-gray-300">
                                {headingText}
                            </h1>
                        </div>
                        <IconButton aria-label="Add new Amdin" color="inherit" className="text-white"
                        onClick={handleAddNewAdmin}>
                            <AdminPanelSettingsTwoToneIcon />
                        </IconButton>
                    </div>


                    {/*  Profile Image and Name*/}
                    <div className="w-full flex justify-between">
                        <div className="m-1 flex flex-col gap-4">
                            {/* Name */}
                            <TextField
                                {...GetCommonProps2({ labelColor: "4a5568", focusColor: "#bcedb4", textColor: "white", borderColor: "black" })}
                                label="Name"
                                name="name"
                                value={adminInfo.name}
                                onChange={handleChange}
                                required
                            />

                            {/* Email */}
                            <TextField
                                {...GetCommonProps2({ labelColor: "4a5568", focusColor: "#bcedb4", textColor: "white", borderColor: "black" })}
                                label="Email"
                                name="email"
                                value={adminInfo.email}
                                onChange={handleChange}
                                required
                                slotProps={{
                                    input: {
                                        readOnly: buttonText === "Update"
                                    }
                                }}
                            />
                        </div>

                        {/* Profile Picture */}
                        <div className="m-1 z-2000">
                            <label className="cursor-pointer">
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                                <div className="w-[180px] h-[128%] bg-gray-700 rounded-lg border border-black flex items-center justify-center overflow-hidden">
                                    {adminInfo.profilePicture ? (
                                        <img
                                            src={adminInfo.profilePicture}
                                            alt="Profile Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-white text-sm">Click to Upload</span>
                                    )}
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Role */}
                    <TextField
                        {...GetCommonProps2({ labelColor: "4a5568", focusColor: "#bcedb4", textColor: "white", borderColor: "black" })}
                        select
                        label="Role"
                        name="role"
                        value={adminInfo.role}
                        onChange={handleChange}
                        required
                    >
                        <MenuItem value="Approval Department">Approval Department</MenuItem>
                        <MenuItem value="User Management Department">User Management Department</MenuItem>
                    </TextField>

                    {/* Password */}
                    <TextField
                        {...GetCommonProps2({ labelColor: "4a5568", focusColor: "#bcedb4", textColor: "white", borderColor: "black" })}
                        label="Password"
                        name="password"
                        value={adminInfo.password}
                        onChange={handleChange}
                        required
                        slotProps={{
                            input: {
                                readOnly: buttonText === "Update"
                            }
                        }}
                    />

                    {/* Phone Number */}
                    <TextField
                        {...GetCommonProps2({ labelColor: "4a5568", focusColor: "#bcedb4", textColor: "white", borderColor: "black" })}
                        label="Phone Number"
                        name="phoneNumber"
                        value={adminInfo.phoneNumber}
                        onChange={handleChange}
                        required
                    />

                    {/* Address */}
                    <TextField
                        {...GetCommonProps2({ labelColor: "4a5568", focusColor: "#bcedb4", textColor: "white", borderColor: "black" })}
                        label="Address"
                        name="address"
                        value={adminInfo.address}
                        onChange={handleChange}
                        required
                    />


                    <Button variant="contained"
                        sx={{
                            backgroundColor: '#4A5568',
                            '&:hover': {
                                backgroundColor: '#2D3748',
                            },
                            marginTop: '16px',
                            alignSelf: 'flex-end',
                            textTransform: 'none',
                            fontSize: '16px',
                            padding: '8px 24px',
                        }}
                        onClick={handleSubmit}
                    >
                        {buttonText}
                    </Button>
                </div>

                <div className="w-[30vw] h-[84vh] bg-gray-400 m-4 rounded-2xl p-8 flex flex-col justify-between z-500">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800" style={{ fontFamily: 'Times New Roman' }}>All Admins</h2>


                    {/* Search bar */}
                    <div className="flex items-center mb-4 border-b border-gray-600">
                        <SearchIcon className="text-gray-600 mr-2" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-transparent focus:outline-none text-gray-800 py-1"
                        />
                    </div>

                    {/* Scrollable list */}
                    <div className="flex-1 overflow-auto">
                        {admins.length > 0 ? (
                            filteredNames.map((admin, index) => (
                                <div
                                    key={index}
                                    className="py-2 px-2 mb-1 rounded hover:bg-gray-300 cursor-pointer text-gray-800 flex justify-between"
                                    onClick={() => handleListItemClick(admin)}
                                >
                                    {admin.name}
                                    <div>
                                        <IconButton
                                            onClick={() => handleDelete(admin.id)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-gray-500">No results found</div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
