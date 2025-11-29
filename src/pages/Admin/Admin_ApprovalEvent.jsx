/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

// React Libraries
import {useEffect, useRef, useState} from 'react';

// Custom Components
import { Background_Particles } from '../../Components/__Admin_Login.jsx';
import { NOTIFICATION_TYPES } from "../../Utilities.ts";
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
import {cardOverflowClasses} from "@mui/joy";
import {Question_Showing_Description} from "../../Components/__Question_List.jsx";


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


    const [eventModel, setEventModel] = useState(new Events_Model({
            title: "Simple Title",
            description: "Simple Description",
            date: "2023-10-01",
            startTime: "10:00",
            duration: { hours: 2, minutes: 30 },
            createdBy: "current name is undefined",
            createdBy_uid:  'Not Found', // Issue with this
            createdAt: Date.now(),
            allQuestions: []
    }

    ));



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





    const [functionCode, setFunctionCode] = useState("");
    const editorRef = useRef(null);
    const onApprove = () => {
        setEventModel(prev => {
            return { ...prev, mainFunctionCode: functionCode };

        });


    };



    const ShowHeader = () => {
        if (!isEmpty) {
            return (
                <AdminPageHeader questionMakerName={`Adnan Abdullah Sadi`} setDrawerOpen={setDrawerOpen} />
            );
        } else {
            return (
                <div></div>
            )
        }
    }



    // Determine the panel’s configuration based on displayMode
    const panelConfig = {
        [ADMIN_APPROVAL_DISPLAY_MODE.APPROVED]: {
            backgroundColor: "rgba(76, 175, 80, 0.5)",
            buttonColor: "success",
            buttonText: "Confirm Approval",
            headingText: "Direct Approval",
            inputLabelText: "Code for Approval",
            directApproval: true,

            onClick: () => {
                onApprove();
                controller.handleSendNotification({ type: ADMIN_APPROVAL_DISPLAY_MODE.APPROVED, notification_type: NOTIFICATION_TYPES.approve_event, mainFunctionCode: functionCode });
            },
        },
        [ADMIN_APPROVAL_DISPLAY_MODE.REJECTED]: {
            backgroundColor: "rgba(244, 67, 54, 0.65)",
            buttonColor: "error",
            buttonText: "Confirm Rejection",
            headingText: "Reject Event",
            inputLabelText: "Reason for Rejection",
            directApproval: false,
            onClick: () =>
                controller.handleSendNotification({ type: ADMIN_APPROVAL_DISPLAY_MODE.REJECTED, notification_type: NOTIFICATION_TYPES.reject_event }),
        },
        [ADMIN_APPROVAL_DISPLAY_MODE.MODIFICATION]: {
            backgroundColor: "rgba(255, 235, 59, 0.4)",
            buttonColor: "warning",
            buttonText: "Request Modification",
            headingText: "Ask for Modification",
            inputLabelText: "Things to be Modified...",
            directApproval: false,
            onClick: () =>
                controller.handleSendNotification({ type: ADMIN_APPROVAL_DISPLAY_MODE.MODIFICATION, notification_type: NOTIFICATION_TYPES.modification_event }),
        },
    }[displayMode];


    // Initialization Functions
    useEffect(() => {

        controller.fetchAllPendingEvents()
            .then(eventDetails => {})
            .catch(error => {});

        console.log(eventModel)

    }, []);







    return (
        <>


            <div className="w-screen h-screen relative flex items-center justify-center gap-4 bg-black">
                <Background_Particles />

                <Background_Particles />

                {/* Main Div */}
                <motion.div
                    className="h-[86vh] rounded-2xl z-40 flex flex-col justify-between"
                    animate={{ width: approvalOpen ? "40vw" : "66vw" }}
                    transition={{ duration: 0.25 }}
                >

                    <ShowHeader/>

                    {/* Question Description */}
                    <div className="p-4 flex-grow gap-3 overflow-y-auto">

                        { !isEmpty ? (
                            <div className="w-full text-white space-y-8">

                                {/* === Event Description Section === */}
                                <div>
                                    <h2 className="text-3xl font-bold text-indigo-400 border-b border-indigo-700 pb-2 mb-3">
                                        🎯 Event Description
                                    </h2>
                                    <p className="text-sm text-gray-400 mb-4">
                                        Overview and administrative actions for the selected event.
                                    </p>

                                    <Event_Showing_Description
                                        event={eventModel}
                                        handleDeleteButton={controller.handleRejectionPanel}
                                        handleNotifyButton={controller.handleNotificationPanel}
                                        handleDirectApprove={controller.handleApprovalPanel}
                                        require_Delete_Button={true}
                                        require_Revert_Back_Button={true}
                                        require_direct_approve_Button={true}
                                    />
                                </div>

                                {/* === Event Questions Section === */}
                                <div>
                                    <h2 className="text-3xl font-bold text-cyan-400 border-b border-cyan-700 pb-2 mb-3">
                                        🧠 Event Questions
                                    </h2>
                                    <p className="text-sm text-gray-400 mb-4">
                                        All questions associated with this event are listed below.
                                    </p>

                                    {eventModel?.allQuestions?.length > 0 ? (
                                        eventModel.allQuestions.map((question, index) => (
                                            <div key={index} className="my-4">
                                                {Question_Showing_Description({ question })}
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-500 italic">No questions added yet.</p>
                                    )}
                                </div>
                            </div>

                        ) : (
                            <EventFetchingLoadingScreen />
                        )}
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
                            reason={reason}
                            setReason={setReason}
                            onClose={() => setApprovalOpen(false)}

                            backgroundColor={panelConfig.backgroundColor}
                            buttonColor={panelConfig.buttonColor}
                            buttonText={panelConfig.buttonText}
                            HeadingText={panelConfig.headingText}
                            inputLabelText={panelConfig.inputLabelText}

                            directApproval={panelConfig.directApproval}
                            editorRef={editorRef}
                            setFunctionCode={setFunctionCode}
                            onReject={panelConfig.onClick}
                            onApprove={panelConfig.onClick}
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

                    console.log(item)
                }}
                anchor="left"
                showSearch={false}
            />
        </>
    );


}



