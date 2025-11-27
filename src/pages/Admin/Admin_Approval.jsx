// File: src/pages/Admin_Approval.jsx
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

/**
 * Admin Approval Page
 *
 * This component handles the approval workflow for pending questions submitted by users.
 * Admins can review, approve, reject, or request modifications for questions before they
 * are published to the platform.
 *
 * Features:
 * - Display pending questions with full details
 * - Code editor for function template configuration
 * - Approval/Rejection/Modification workflow
 * - Real-time updates to question status
 *
 * @component
 * @example
 * return <Admin_Approval />
 */

// Global Context
import { useGlobal } from "../../GlobalContext.jsx";

// Libraries
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

// Models
import Question from '../../models/Question_Model.js';

// Components
import { Background_Particles } from '../../Components/__Admin_Login.jsx';
import { Question_Showing_Description } from '../../Components/__Question_List.jsx';
import { Drawer_Input2 } from "../../Components/__Question_Create.jsx";
import { ApprovalPanel, ObservationField, AdminPageHeader, EventFetchingLoadingScreen } from '../../Components/__Admin_Approval.jsx';

// Model
import { AdminApproval_Question } from '../../models/AdminApproval_Model.js';

// Controller 
import { Admin_ApproveController } from '../../controller/Admin/admin.approve.controller.js';

// Utilities
import {ADMIN_APPROVAL_DISPLAY_MODE, NOTIFICATION_TYPES} from '../../Utilities.ts';






function ApprovalPanelWrapper({
      functionName,
      setFunctionName,
      returnType,
      setReturnType,
      status,
      setStatus,
      functionCode,
      setFunctionCode,
      editorRef,
      handleApprove,
      questionID,
      onClose
    }) {
    return (
    <motion.div
    className="h-[86vh] w-[30vw] rounded-2xl overflow-auto"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.25 }}
    >
    <ApprovalPanel
    functionName={functionName}
    setFunctionName={setFunctionName}
    returnType={returnType}
    setReturnType={setReturnType}
    status={status}
    setStatus={setStatus}
    functionCode={functionCode}
    setFunctionCode={setFunctionCode}
    editorRef={editorRef}
    handleApprove={handleApprove}
    questionID={questionID}
    onClose={onClose}
    />
    </motion.div>
    );
    }



function RejectionPanelWrapper({
       title,
       setTitle,
       reason,
       setReason,
       questionID,
       createdBy_uid,
       onReject,
       onClose
   }) {
return (
<motion.div
className="h-[86vh] w-[30vw] rounded-2xl overflow-auto"
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 0.25 }}
>
<ObservationField
title={title}
setTitle={setTitle}
backgroundColor="rgba(244, 67, 54, 0.65)"
buttonColor="error"
reason={reason}
setReason={setReason}
onReject={() =>
onReject({
objectID: questionID,
recipientID: createdBy_uid
})
}
buttonText="Confirm Rejection"
onClose={onClose}
HeadingText="Reject Question"
inputLabelText="Reason for Rejection"
/>
</motion.div>
);
}



function ModificationPanelWrapper({
      title,
      setTitle,
      reason,
      setReason,
      questionID,
      createdBy_uid,
      onModify,
      onClose
  }) {
return (
<motion.div
className="h-[86vh] w-[30vw] rounded-2xl overflow-auto"
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 0.25 }}
>
<ObservationField
title={title}
setTitle={setTitle}
backgroundColor="rgba(76, 175, 80, 0.5)"
buttonColor="success"
reason={reason}
setReason={setReason}
onReject={() =>
onModify({
objectID: questionID,
recipientID: createdBy_uid
})
}
buttonText="Request for Modification"
onClose={onClose}
HeadingText="Ask Modification"
inputLabelText="Things to Modify..."
/>
</motion.div>
);
}



export default function Admin_Approval() {
    // =========================================================================
    // STATE MANAGEMENT
    // =========================================================================

    // Global Context
    const { adminEmail, adminUID } = useGlobal();

    /**
     * State for managing all pending questions awaiting approval
     * @type {[Array, Function]}
     */
    const [allPendingQuestions, setAllPendingQuestions] = useState([]);

    /**
     * State for currently selected question being reviewed
     * @type {[Question, Function]}
     */
    const [question, setQuestion] = useState(
        new Question({
            title: "3 Some Problem",
            description: "Given an array of integers nums and an integer target, return indices of the three numbers such that they add up to target...",
            mark: 10,
            difficulty: "Medium",
            type: "Multiple Choice",
            event_uid: "Event123",
            createdBy: "Admin",
            createdBy_uid: "Admin123",
        })
    );

    // Approval Configuration States
    const [functionName, setFunctionName] = useState("myFunction");  // Function name for code template
    const [returnType, setReturnType] = useState("int");            // Return type for function
    const [status, setStatus] = useState("Approved");               // Approval status
    const [functionCode, setFunctionCode] = useState("");           // Generated function code

    // UI Control States
    const [drawerOpen, setDrawerOpen] = useState(false);            // Controls pending questions drawer
    const [approvalOpen, setApprovalOpen] = useState(false);        // Controls approval panel visibility
    const [questionID, setQuestionID] = useState("NOT selected");   // Currently selected question ID
    const [isEmpty, setIsEmpty] = useState(false);                  // Flag for empty questions list

    // Rejection/Modification States
    const [displayMode, setDisplayMode] = useState(ADMIN_APPROVAL_DISPLAY_MODE.APPROVED);
    const [reason, setReason] = useState("");                       // Reason for rejection/modification
    const [title, setTitle] = useState("");                         // Title for rejection/modification

    // =========================================================================
    // CONTROLLER INITIALIZATION
    // =========================================================================

    /**
     * Controller instance for handling approval business logic
     * Manages API calls, state updates, and workflow transitions
     */
    const controller = new Admin_ApproveController(
        setAllPendingQuestions,
        approvalOpen,
        setApprovalOpen,
        setQuestion,
        setQuestionID,
        displayMode,
        setDisplayMode,
        title,
        reason,
        setIsEmpty
    );

    // =========================================================================
    // REFS
    // =========================================================================

    /**
     * Reference to Monaco editor instance for code editing
     */
    const editorRef = useRef(null);

    // =========================================================================
    // LIFECYCLE & SIDE EFFECTS
    // =========================================================================

    /**
     * Fetch all pending questions on component mount
     * Also logs admin email for debugging purposes
     */
    useEffect(() => {
        controller.fetchAllRequestedQuestions();
    }, []);

    /**
     * Generate function code template based on current function name and return type
     * Creates a C++ template with main function and test harness
     * @returns {string} Generated C++ code template
     */
    const generateFunctionCode = () => {
        const fName = functionName || "myFunction";
        const rType = returnType || "int";

        return `
#include <iostream>
#include <string>
#include <cstdlib>  
#include <bits/stdc++.h>


using namespace std;

//---PART01---

int functionName() {
    // Your logic here
}



//---PART02---
int main() {
    
    ${rType} n =  ;
    
    _ output =  ;
    
    ${rType} result = functionName();
    
    if(output == result) cout<<"Submission Accepted"<<endl;
    else {
        // Simpler error: Print to stderr and exit
        cerr << "Wrong Answer" << endl;
        cerr << "Expected: " << expected << "\nFound: " << result << endl;
        exit(1);  // Exit with error code (non-zero)
    }
 
    return 0;
}
`;
    };

    /**
     * Update function code whenever function name or return type changes
     * Ensures the code editor always shows the latest template
     */
    useEffect(() => {
        setFunctionCode(generateFunctionCode());
    }, [functionName, returnType]);

    // =========================================================================
    // EVENT HANDLERS
    // =========================================================================


    const findContributorID = ({questionID}) => {
        const question = allPendingQuestions.filter(question => question.id === questionID);
        return question.createdBy_uid
    }


    const handleUIChange = (id) => {
        setApprovalOpen(false);

        // Update pending questions list by removing approved question
        setAllPendingQuestions((prev) => {
            const updated = prev.filter((q) => q.id !== id);

            if (updated.length > 0) {
                // If questions remain, select the first one
                setQuestion(updated[0]);
                setQuestionID(updated[0].id);
            } else {
                // If no questions left, reset to empty state
                setQuestion(new Question({
                    title: "",
                    description: "",
                    mark: 0,
                    difficulty: "",
                    type: "",
                    event_uid: "",
                    createdBy: "",
                    createdBy_uid: ""
                }));
                setQuestionID("NOT selected");
                setIsEmpty(true);
            }

            // Reset form states
            setFunctionName("myFunction");
            setReturnType("int");
            setStatus("Approved");
            setFunctionCode(functionCode);

            return updated;
        });
    }



    /**
     * Handle question approval workflow
     * - Creates approved question object
     * - Updates pending questions list
     * - Resets form states
     * - Closes approval panel
     *
     * @param {string} id - The ID of the question being approved
     * @param approvedBy
     * @param approvedBy_uid
     */
    const handleApprove = (id, approvedBy = adminEmail, approvedBy_uid = adminUID) => {
        // Create approved question object with all necessary data
        const approvedQuestion = new AdminApproval_Question({
            question,
            approvedBy: approvedBy,
            approvedBy_uid: approvedBy_uid,
            functionName,
            returnType,
            status,
            mainFunctionCode: functionCode
        });

        // Process approval through controller
        controller.handleApprove(id, approvedQuestion);


        // Update the UI after Status assignment...
        handleUIChange(id)


        // LEFT: Notification send


    };





    const handleModified = (id = '123') => {

        //ModificationStatus
        controller.handleModified({id: id}).then()

        // Update the UI after Status assignment...
        handleUIChange(id)


        // LEFT : Notification send

    }


    const handleDelete = ({id = '123'}) => {

        //    handleReject = ({objectID="Object ID Not Assigned",
        //                      recipientID = "Recipient ID Not Assigned"})

        const makerID = findContributorID(id);
        controller.handleReject({
            objectID: id,
            recipientID: makerID,
        })



        // Update the UI after Status assignment...
        handleUIChange(id)
    }




    // =========================================================================
    // RENDER COMPONENTS
    // =========================================================================

    /**
     * Conditionally renders the admin page header
     * Only shows when there are questions to review
     *
     * @returns {JSX.Element} Admin page header or empty fragment
     */
    const ShowHeader = () => {
        if (!isEmpty) {
            return (
                <AdminPageHeader
                    questionMakerName={question.createdBy}
                    setDrawerOpen={setDrawerOpen}
                />
            );
        } else {
            return <></>;
        }
    };

    // =========================================================================
    // MAIN COMPONENT RENDER
    // =========================================================================

    return (
        <>
            {/**
             * Animated background particles
             */}
            <Background_Particles />

            <div className="w-screen h-screen relative flex items-center justify-center gap-4">
                {/* =================================================================
                    MAIN QUESTION REVIEW PANEL
                    ================================================================= */}
                <motion.div
                    className="h-[86vh] rounded-2xl z-40 flex flex-col justify-between"
                    animate={{ width: approvalOpen ? "40vw" : "66vw" }}
                    transition={{ duration: 0.25 }}
                >
                    {/* Conditional header rendering */}
                    <ShowHeader />

                    {/* Question Description Area */}
                    <div className="p-4 flex-grow gap-3 overflow-y-auto">
                        {isEmpty ? (
                            // Empty state - no questions to review
                            <EventFetchingLoadingScreen title="No Question Found" />
                        ) : (
                            // Question display with action buttons
                            <Question_Showing_Description
                                question={question}
                                handleDeleteButton={controller.handleReject}
                                handleEditButton={controller.moveToApprovalPage}
                                handleSolveButton={() => {
                                    controller.revertBack({type: NOTIFICATION_TYPES.modification_event})
                                }}
                                require_Edit_Button={true}
                                require_Delete_Button={true}
                                require_Solve_Button={true}
                            />
                        )}
                    </div>
                </motion.div>

                {/* =================================================================
                    APPROVAL/REJECTION/MODIFICATION SIDEBAR PANEL
                    ================================================================= */}



                {approvalOpen && (
                    <>
                        {displayMode === ADMIN_APPROVAL_DISPLAY_MODE.APPROVAL && (
                            <ApprovalPanelWrapper
                                functionName={functionName}
                                setFunctionName={setFunctionName}
                                returnType={returnType}
                                setReturnType={setReturnType}
                                status={status}
                                setStatus={setStatus}
                                functionCode={functionCode}
                                setFunctionCode={setFunctionCode}
                                editorRef={editorRef}
                                handleApprove={handleApprove}
                                questionID={questionID}
                                onClose={controller.OpenSidePage}
                            />
                        )}

                        {displayMode === ADMIN_APPROVAL_DISPLAY_MODE.REJECTED && (
                            <RejectionPanelWrapper
                                title={title}
                                setTitle={setTitle}
                                reason={reason}
                                setReason={setReason}
                                questionID={questionID}
                                createdBy_uid={question.createdBy_uid}
                                onReject={() => {
                                    handleDelete({id: questionID})
                                }}
                                onClose={controller.OpenSidePage}
                            />
                        )}

                        {displayMode === ADMIN_APPROVAL_DISPLAY_MODE.MODIFICATION && (
                            <ModificationPanelWrapper
                                title={title}
                                setTitle={setTitle}
                                reason={reason}
                                setReason={setReason}
                                questionID={questionID}
                                createdBy_uid={question.createdBy_uid}
                                onModify={() => {
                                    handleModified(questionID)
                                }}
                                onClose={controller.OpenSidePage}
                            />
                        )}
                    </>
                )}







            </div>

            {/* =================================================================
                PENDING QUESTIONS DRAWER
                Shows list of all questions awaiting review
                ================================================================= */}
            <Drawer_Input2
                drawerOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                item={allPendingQuestions}
                iconColor="cyan"
                onItemClick={(item) => {
                    // Handle question selection from drawer
                    setQuestionID(item.id);
                    setQuestion(item);
                    setDrawerOpen(false);
                    setApprovalOpen(false);  // Close approval panel when selecting new question
                }}
                anchor="left"
            />
        </>
    );
}