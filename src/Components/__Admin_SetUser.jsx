/* eslint-disable react-refresh/only-export-components */


import { Background_Particles } from "./__Admin_Login.jsx";

import MenuItem from "@mui/material/MenuItem";
import { Admin_Info } from "../models/AdminInfo_Model.js";
import { GetCommonProps2 } from "./__Common.jsx";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import { Admin_InfoController } from "../controller/Authentication/admin.setUser.controller.js";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from '@mui/material/IconButton';
import AdminPanelSettingsTwoToneIcon from '@mui/icons-material/AdminPanelSettingsTwoTone';
import DeleteIcon from '@mui/icons-material/Delete';


 // Styles object
export const style = {
    outerDiv: "w-screen h-screen flex justify-center items-center z-20",
    formContainer: "w-[40vw] h-[84vh] bg-gray-400 m-4 rounded-2xl flex flex-col justify-between p-8 gap-6 overflow-auto",
    hideScrollbar: {
        scrollbarWidth: "none"
    },
    innerFlex: "w-full flex justify-between",
    leftFields: "m-1 flex flex-col gap-4",
    adminListContainer: "w-[30vw] h-[84vh] bg-gray-400 m-4 rounded-2xl p-8 flex flex-col justify-between z-500",
    listHeading: "text-2xl font-semibold mb-4 text-gray-800",
};

export const Heading = ({headingText, handleAddNewAdmin}) => {
    return(
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
    );
}

export const NameField = ({adminInfo, handleChange}) => {
    return(
        <TextField
            {...GetCommonProps2({ labelColor: "4a5568", focusColor: "#bcedb4", textColor: "white", borderColor: "black" })}
            label="Name"
            name="name"
            value={adminInfo.name}
            onChange={handleChange}
            required
        />
    );
}

export const EmailField = ({adminInfo, handleChange, buttonText}) => {
    return (
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
    );
}

export const ProfilePictureField = ({adminInfo, handleImageChange}) => {
    return(
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
    );
}

export const RoleField = ({adminInfo, handleChange}) => {
    return(
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
    );
}

export const PasswordField = ({adminInfo, handleChange, buttonText}) => {
    return(

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


    );
}


export const PhoneNumberField = ({adminInfo, handleChange}) => {
    return(

    <TextField
        {...GetCommonProps2({ labelColor: "4a5568", focusColor: "#bcedb4", textColor: "white", borderColor: "black" })}
        label="Phone Number"
        name="phoneNumber"
        value={adminInfo.phoneNumber}
        onChange={handleChange}
        required
    />

    );
}



export const AddressField = ({adminInfo, handleChange}) => {
    return (

        <TextField
            {...GetCommonProps2({ labelColor: "4a5568", focusColor: "#bcedb4", textColor: "white", borderColor: "black" })}
            label="Address"
            name="address"
            value={adminInfo.address}
            onChange={handleChange}
            required
        />
    );
}

export const SubmitButton = ({handleSubmit, buttonText}) => {
    return (
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
    );
}


export const SearchItems = ({searchTerm, searchAdmins}) => {
    return (
        <div className="flex items-center mb-4 border-b border-gray-600">
            <SearchIcon className="text-gray-600 mr-2" />
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={searchAdmins}
                className="w-full bg-transparent focus:outline-none text-gray-800 py-1"
            />
        </div>
    );
}


export const AdminList = ({admins, filteredNames, handleListItemClick, handleDelete }) => {
    return (
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
    );
}
