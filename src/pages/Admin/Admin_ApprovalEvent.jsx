/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

// React Libraries
import { useEffect, useState } from 'react';

// Custom Components
import { Background_Particles } from '../../Components/__Admin_Login.jsx';
import { motion } from 'framer-motion';
import { Event_Showing_Description } from '../../Components/__Admin_Approval_Events.jsx';
import {AdminPageHeader, ObservationField, EventFetchingLoadingScreen} from '../../Components/__Admin_Approval.jsx';
import {  Drawer_Input2 } from "../../Components/__Question_Create.jsx";

// Models
import { Events_Model } from '../../models/Event_Model.js';


// Controller
import { Admin_ApproveEventController } from '../../controller/Admin/admin.approve.event.controller.js';
import {ADMIN_APPROVAL_DISPLAY_MODE} from "../../Utilities.ts";

import { useGlobal } from "../../GlobalContext.jsx";
import {ShowerHead} from "lucide-react";


export default function Admin_ApprovalEvent() {


    // States
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [approvalOpen, setApprovalOpen] = useState(false);

    const [reason, setReason] = useState("Demo Reason");
    const [displayMode, setDisplayMode] = useState(ADMIN_APPROVAL_DISPLAY_MODE.APPROVED);
    const [title, setTitle] = useState("Demo Title");

    const [isEmpty, setIsEmpty] = useState(false);


    // All Requested events
    const [allEvents, setAllEvents] = useState([]);
    const [eventID, setEventID] = useState("");


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
        allEvents: allEvents,
        setAllEvents: setAllEvents,
        eventModel: eventModel,
        setEventModel: setEventModel,
        approvalOpen: approvalOpen,
        setApprovalOpen: setApprovalOpen,
        setDisplayMode: setDisplayMode,
        title: title,
        reason: reason,
        setIsEmpty: setIsEmpty,
        eventID: eventID,
        setEventID: setEventID
    });


    // Precompute values
    const isRejected = displayMode === ADMIN_APPROVAL_DISPLAY_MODE.REJECTED;

    const backgroundColor = isRejected
        ? "rgba(244, 67, 54, 0.65)"
        : "rgba(76, 175, 80, 0.5)";

    const buttonColor = isRejected ? "error" : "success";

    const buttonText = isRejected
        ? "Confirm Rejection"
        : "Request for Modification";

    const headingText = isRejected
        ? "Reject Question"
        : "Ask Modification";

    const inputLabelText = isRejected
        ? "Reason for Rejection"
        : "Things to be Modify...";


    const ShowHeader = () => {
        if (isEmpty) {
            return (
                <AdminPageHeader questionMakerName={`Adnan Abdullah Sadi`} setDrawerOpen={setDrawerOpen} />
            );
        } else {
            return (
                <div></div>
            )
        }
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

                    <ShowHeader/>

                    {/* Question Description */}
                    <div className="p-4 flex-grow gap-3 overflow-y-auto">

                        { !isEmpty ?
                            (
                                <Event_Showing_Description
                                    event={eventModel}


                                    handleDeleteButton={controller.handleRejectionPanel}
                                    handleNotifyButton={controller.handleNotificationPanel}
                                    handleDirectApprove={controller.handleDirectApproval}


                                    require_Delete_Button={true}
                                    require_Revert_Back_Button={true}
                                    require_direct_approve_Button={true}
                                />
                            ) : ( <EventFetchingLoadingScreen/> )
                        }


                    </div>


                </motion.div>

                {/* Approval/Rejection/Modification Panel */}
                {approvalOpen && (
                    <motion.div
                        className="h-[86vh] w-[30vw] rounded-2xl overflow-auto"
                        initial={{opacity: 0}}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.25 }}
                    >


                        <ObservationField
                            title={title}
                            setTitle={setTitle}
                            backgroundColor={backgroundColor}
                            buttonColor={buttonColor}
                            reason={reason}
                            setReason={setReason}
                            onReject={() => {
                                controller.handleSendNotification({
                                    type: isRejected ? "Event Rejected" : "Request Modification",
                                })
                            }}
                            buttonText={buttonText}
                            onClose={() => setApprovalOpen(false)}
                            HeadingText={headingText}
                            inputLabelText={inputLabelText}
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
                    setEventID(item.id);
                }}
                anchor="left"
                showSearch={false}
            />
        </>
    );


}



