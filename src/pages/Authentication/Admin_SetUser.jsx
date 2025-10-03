/* eslint-disable react-hooks/exhaustive-deps */
import { Background_Particles } from "../../Components/__Admin_Login.jsx";
import { useState, useEffect } from "react";

import { Admin_Info } from "../../models/AdminInfo_Model.js";
import { Admin_InfoController } from "../../controller/Authentication/admin.setUser.controller.js";

import { Heading, NameField, EmailField, ProfilePictureField, RoleField, PasswordField, PhoneNumberField, AddressField, SubmitButton, SearchItems, AdminList, style } from "../../Components/__Admin_SetUser.jsx";


/**
 * 
 * LEFT
 * ERROR HANDLING WHEN  DUPLICATE ADMIN EXIST OR DUPLICATE EMAIL
 */



export default function Admin_SetUsr() {


    // Variables and States
    const [admins, setAdmins] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [buttonText, setButtonText] = useState("Add");
    const [headingText, setHeadingText] = useState("Add New Admin");
    const [adminID, setAdminID] = useState("");


    const filteredNames = admins.filter(admin =>
        admin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Admin Information State
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

    /**
     * Handle input changes for admin information fields
     * @param {*} e - The event object
     * @returns {void}
     */
    const handleChange = (e) => {
        setAdminInfo(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    /**
     * Handle the addition of a new admin
     * @returns {void}
     */
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

    /**
     * Handle the selection of an admin from the list   
     * @param {*} admin 
     * @returns {void}
     */
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



    /**
     * 
     * @param {*} e 
     * @returns {void}
     * Handles the change of profile picture by reading the selected file and updating the adminInfo state with the new image data.
     */
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


    /**
     * 
     * @param {*} id 
     * @returns {void}
     * Handles the deletion of an admin by calling the controller's deleteAdmin method and updating the local admins state to remove the deleted admin from the UI.
     */
    const handleDelete = (id) => {
        controller.deleteAdmin(id).then(() => {
            console.log("Admin Deleted Successfully from UI file");
            setAdmins(prevAdmins => prevAdmins.filter(admin => admin.id !== id));
        }).catch((error) => {
            console.log("Error deleting admin:", error);
        });
    }


    /**
     * Handles the form submission for adding or updating an admin
     * @param {*} e - The event object
     * @returns {void}
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
                // console.log(adminInfo)
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

                // console.log(adminInfo)
                break;
        }
    };

    /**
     * 
     * @param {*} e 
     * @returns {void}
     * Handles the search input change to filter admins by name.
     */
    const searchAdmins = (e) => {
        setSearchTerm(e.target.value)
    }

    useEffect(() => {
        controller.getAllAdmins().then(() => {
            console.log("Admins fetched successfully using controller file");
        })
    }, []);


    /**
     * Renders the Admin_SetUser component with form fields and admin list
     * @returns {JSX.Element}
     */
    return (
        <>
            <Background_Particles />

            <div className={style.outerDiv}>
                <div
                    className={style.formContainer}
                    style={style.hideScrollbar}
                >
                    <style>
                        {`div::-webkit-scrollbar { display: none; }`}
                    </style>

                    <Heading headingText={headingText} handleAddNewAdmin={handleAddNewAdmin} />

                    <div className={style.innerFlex}>
                        <div className={style.leftFields}>
                            <NameField adminInfo={adminInfo} handleChange={handleChange} />
                            <EmailField adminInfo={adminInfo} handleChange={handleChange} buttonText={buttonText} />
                        </div>
                        <ProfilePictureField adminInfo={adminInfo} handleImageChange={handleImageChange} />
                    </div>

                    <RoleField adminInfo={adminInfo} handleChange={handleChange} />
                    <PasswordField adminInfo={adminInfo} handleChange={handleChange} buttonText={buttonText} />
                    <PhoneNumberField adminInfo={adminInfo} handleChange={handleChange} />
                    <AddressField adminInfo={adminInfo} handleChange={handleChange} />
                    <SubmitButton handleSubmit={handleSubmit} buttonText={buttonText} />
                </div>

                <div className={style.adminListContainer}>
                    <h2 className={style.listHeading} style={{ fontFamily: 'Times New Roman' }}>All Admins</h2>
                    <SearchItems searchTerm={searchTerm} searchAdmins={searchAdmins} />
                    <AdminList admins={admins} filteredNames={filteredNames} handleListItemClick={handleListItemClick} handleDelete={handleDelete} />
                </div>
            </div>
        </>
    );
}
