/* eslint-disable no-unused-vars */

// React LIbraries
import { useState } from 'react';

// Custom Components
import { Background_Particles } from '../Components/__Admin_Login.jsx';
import { motion } from 'framer-motion';
import { Event_Showing_Description } from '../Components/__Admin_Approval_Events.jsx';
import { AdminPageHeader } from '../Components/__Admin_Approval.jsx';
import { Drawer_Input2 } from "../Components/__Question_Create.jsx";

// Models
import { Events_Model } from '../models/Event_Model.js';




export default function Admin_ApprovalEvent() {

    // States
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [approvalOpen, setApprovalOpen] = useState(false);



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
                            event={events_model}
                            handleEditButton={() => setApprovalOpen(!approvalOpen)}
                            handleDeleteButton={() => setApprovalOpen(!approvalOpen)}
                            handleViewButton={() => setApprovalOpen(!approvalOpen)}
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





                    </motion.div>
                )}
            </div>


            {/* Drawer for Pending Questions */}
            <Drawer_Input2
                drawerOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                // item={}
                iconColor="cyan"
                // onItemClick={(item) => {
                //     setQuestionID(item.id);

                //     setQuestion(item);
                //     setDrawerOpen(false);
                //     setApprovalOpen(false);
                // }}
                anchor="left"
            />
        </>
    );


}



