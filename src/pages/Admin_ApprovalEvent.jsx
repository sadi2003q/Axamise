/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

// React LIbraries
import { useEffect, useState } from 'react';

// Custom Components
import { Background_Particles } from '../Components/__Admin_Login.jsx';
import { motion } from 'framer-motion';
import { Event_Showing_Description } from '../Components/__Admin_Approval_Events.jsx';
import {AdminPageHeader, ObservationField} from '../Components/__Admin_Approval.jsx';
import {  Drawer_Input2 } from "../Components/__Question_Create.jsx";

// Models
import { Events_Model } from '../models/Event_Model.js';


// Controller
import { Admin_ApproveEventController } from '../controller/admin.approve.event.controller.js';
import {ADMIN_APPROVAL_DISPLAY_MODE} from "../Utilities.js";




export default function Admin_ApprovalEvent() {

    // States
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [approvalOpen, setApprovalOpen] = useState(false);

    const [reason, setReason] = useState("");
    const [displayMode, setDisplayMode] = useState(ADMIN_APPROVAL_DISPLAY_MODE.APPROVED);
    const [title, setTitle] = useState("");


    // All Requested events
    const [allEvents, setAllEvents] = useState([]);


    const [eventModel, setEventModel] = useState(new Events_Model(
        "", "", "", "", { hours: 0, minutes: 0 }, "", "", Date.now()
    ));
    // Models
    const events_model = new Events_Model(
        "Sample Event Title",                 // title
        "This is a sample event description.",// description
        "2024-12-31",                         // date
        "18:00",                              // startTime
        { hours: 2, minutes: 30 },            // duration
        "Admin",                              // createdBy
        "admin123",                           // createdBy_uid
        Date.now()                            // createdAt
    );


    // Controller Instance
    const controller = new Admin_ApproveEventController({
        setAllEvents: setAllEvents,
        setEventModel: setEventModel
    });




    // Handling Functions
    const handleDirectApprove = () => {
        setDisplayMode(ADMIN_APPROVAL_DISPLAY_MODE.APPROVED);
        setApprovalOpen(!approvalOpen)
    }

    const handleNotify = () => {
        setDisplayMode(ADMIN_APPROVAL_DISPLAY_MODE.MODIFICATION);
        setApprovalOpen(!approvalOpen)
    }

    const handleReject = () => {
        setDisplayMode(ADMIN_APPROVAL_DISPLAY_MODE.REJECTED);
        setApprovalOpen(!approvalOpen)
    }





    // Initialization Functions
    useEffect(() => {

        controller.fetchAllPendingEvents()
            .then(eventDetails => {
                
            })
            .catch(error => {
                
            });

    }, []);




    return (
        <>
            <Background_Particles />

            <div className="w-screen h-screen relative flex items-center justify-center gap-4">

                {/* Main Div */}
                <motion.div
                    className="h-[86vh] rounded-2xl z-40 flex flex-col justify-between"
                    animate={{ width: approvalOpen ? "40vw" : "66vw" }}
                    transition={{ duration: 0.25 }}
                >

                    <AdminPageHeader questionMakerName={`Adnan Abudllah Sadi`} setDrawerOpen={setDrawerOpen} />

                    {/* Question Description */}
                    <div className="p-4 flex-grow gap-3 overflow-y-auto">
                        <Event_Showing_Description
                            event={eventModel}
                            handleDeleteButton={handleReject}
                            handleNotifyButton={handleNotify}
                            handleDirectApprove={handleDirectApprove}


                            require_Delete_Button={true}
                            require_Revert_Back_Button={true}
                            require_direct_approve_Button={true}
                        />
                    </div>


                </motion.div>

                {/* Approval/Rejection/Modification Panel */}
                {approvalOpen && (
                    <motion.div
                        className="h-[86vh] w-[30vw] rounded-2xl overflow-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.25 }}
                    >



                    <ObservationField
                                    title={title}
                                    setTitle={setTitle}

                                    backgroundColor={
                                        displayMode === ADMIN_APPROVAL_DISPLAY_MODE.REJECTED ?
                                        "rgba(244, 67, 54, 0.65)" :
                                        "rgba(76, 175, 80, 0.5)"
                                    }

                                    buttonColor={
                                        displayMode === ADMIN_APPROVAL_DISPLAY_MODE.REJECTED ?
                                        "error" :
                                        "success"
                                    }

                                    reason={reason}
                                    setReason={setReason}


                                    onReject={
                                        displayMode === ADMIN_APPROVAL_DISPLAY_MODE.REJECTED ?
                                            () => {
                                            console.log(`display mode is this : ${displayMode}`)
                                            } :
                                            () => {
                                                console.log(`display mode is that : ${displayMode}`)
                                            }

                                    }

                                    buttonText={
                                        displayMode === ADMIN_APPROVAL_DISPLAY_MODE.REJECTED ?
                                        "Confirm Rejection" :
                                        "Request for Modification"
                                    }

                                    onClose={() => setApprovalOpen(false)}

                                    HeadingText={
                                        displayMode === ADMIN_APPROVAL_DISPLAY_MODE.REJECTED ?
                                        "Reject Question" :
                                        "Ask Modification"
                                    }

                                    inputLabelText={
                                        displayMode === ADMIN_APPROVAL_DISPLAY_MODE.REJECTED ?
                                        "Reason for Rejection" :
                                        "Things to be Modify..."}
                                />






                    </motion.div>
                )}
            </div>


            {/* Drawer for Pending Questions */}
            <Drawer_Input2
                drawerOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                item={allEvents}
                iconColor="cyan"
                onItemClick={(item) => {
                    setEventModel(item);
                    setDrawerOpen(false);
                    // console.log("Selected Question:", item);
                    // setQuestionID(item.id);

                    // setQuestion(item);
                    // setDrawerOpen(false);
                    // setApprovalOpen(false);
                }}
                anchor="left"
                showSearch={false}
            />
        </>
    );


}



