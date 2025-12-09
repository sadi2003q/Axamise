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
import { useLocation } from 'react-router-dom';
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

// =========================================================================
// PANEL WRAPPERS
// =========================================================================

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

// =========================================================================
// MAIN COMPONENT
// =========================================================================

export default function Admin_Approval() {
    const location = useLocation();
    const { adminEmail, adminUID } = useGlobal();

    const [allPendingQuestions, setAllPendingQuestions] = useState([]);
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

    const [functionName, setFunctionName] = useState("myFunction");
    const [returnType, setReturnType] = useState("int");
    const [status, setStatus] = useState("Approved");
    const [functionCode, setFunctionCode] = useState("");
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [approvalOpen, setApprovalOpen] = useState(false);
    const [questionID, setQuestionID] = useState("NOT selected");
    const [isEmpty, setIsEmpty] = useState(false);
    const [displayMode, setDisplayMode] = useState(ADMIN_APPROVAL_DISPLAY_MODE.APPROVED);
    const [reason, setReason] = useState("");
    const [title, setTitle] = useState("");

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

    const editorRef = useRef(null);

    useEffect(() => {
        controller.fetchAllRequestedQuestions();
    }, []);

    useEffect(() => {
        if (location.state && location.state.questionId && allPendingQuestions.length > 0) {
            const match = allPendingQuestions.find(q => q.id === location.state.questionId);
            if (match) {
                setQuestionID(match.id);
                setQuestion(match);
                setApprovalOpen(false);
            }
        }
    }, [location.state, allPendingQuestions]);

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

int ${fName}() {
    // Your logic here
}

//---PART02---
int main() {
    
    ${rType} n =  ;
    
    _ output =  ;
    
    ${rType} result = ${fName}();
    
    if(output == result) cout<<"Submission Accepted"<<endl;
    else {
        cerr << "Wrong Answer" << endl;
        cerr << "Expected: " << expected << "\\nFound: " << result << endl;
        exit(1);
    }
 
    return 0;
}
`;
    };

    useEffect(() => {
        setFunctionCode(generateFunctionCode());
    }, [functionName, returnType]);

    // =========================================================================
    // EVENT HANDLERS
    // =========================================================================

    const handleApprove = (id, approvedBy = adminEmail, approvedBy_uid = adminUID) => {
        const approvedQuestion = new AdminApproval_Question({
            question,
            approvedBy,
            approvedBy_uid,
            functionName,
            returnType,
            status,
            mainFunctionCode: generateFunctionCode()
        });

        controller.handleApprove(id, approvedQuestion);
        setApprovalOpen(false);

        setAllPendingQuestions(prev => {
            const updated = prev.filter(q => q.id !== id);
            if (updated.length > 0) {
                setQuestion(updated[0]);
                setQuestionID(updated[0].id);
            } else {
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
            setFunctionName("myFunction");
            setReturnType("int");
            setStatus("Approved");
            setFunctionCode(functionCode);
            return updated;
        });
    };

    const handleModified = (id = '123') => {
        controller.handleModified({id, recipientID: question.createdBy_uid}).then();
    };

    const handleDelete = ({id = '123'}) => {
        controller.handleReject({ objectID: id, recipientID: question.createdBy_uid });
        controller.handleRejectQuestions({ id: question.id, recipientID: question.createdBy_uid }).then();
    };

    const ShowHeader = () => !isEmpty ? <AdminPageHeader questionMakerName={question.createdBy} setDrawerOpen={setDrawerOpen} /> : <></>;

    // =========================================================================
    // RENDER
    // =========================================================================

    return (
        <>
            <Background_Particles />

            <div className="w-screen h-screen relative flex items-center justify-center gap-4" style={{background:'#23232b'}}>
                <motion.div
                    className="h-[86vh] rounded-2xl z-40 flex flex-col justify-between"
                    animate={{ width: approvalOpen ? "40vw" : "66vw" }}
                    transition={{ duration: 0.25 }}
                >
                    <ShowHeader />

                    <div className="p-4 flex-grow gap-3 overflow-y-auto">
                        {isEmpty ? (
                            <EventFetchingLoadingScreen title="No Question Found" />
                        ) : (
                            <Question_Showing_Description
                                question={question}
                                handleDeleteButton={() => controller.handleReject({ objectID: question.id, recipientID: question.createdBy, title: question.title })}
                                handleEditButton={controller.moveToApprovalPage}
                                handleSolveButton={() => controller.revertBack({ recipientID: question.createdBy_uid, objectID: question.id, type: NOTIFICATION_TYPES.modification_event, title, reason }).then()}
                                require_Edit_Button={true}
                                require_Delete_Button={true}
                                require_Solve_Button={true}
                            />
                        )}
                    </div>
                </motion.div>

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
                                onReject={() => handleDelete({id: questionID})}
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
                                onModify={() => handleModified(questionID)}
                                onClose={controller.OpenSidePage}
                            />
                        )}
                    </>
                )}

                <Drawer_Input2
                    drawerOpen={drawerOpen}
                    onClose={() => setDrawerOpen(false)}
                    item={allPendingQuestions}
                    iconColor="cyan"
                    onItemClick={(item) => {
                        setQuestionID(item.id);
                        setQuestion(item);
                        setDrawerOpen(false);
                        setApprovalOpen(false);
                    }}
                    anchor="left"
                />
            </div>
        </>
    );
}
