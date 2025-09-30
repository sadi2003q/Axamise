
// File: src/pages/Admin_Approval.jsx




/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Background_Particles } from '../Components/__Admin_Login.jsx';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import TextField from "@mui/material/TextField";
import { GetCommonProps2 } from '../Components/__Common.jsx';
import MenuItem from "@mui/material/MenuItem";

// MUI Components
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';

// Models
import Question from '../models/Question_Model.js';

// Components
import { Question_Showing_Description } from '../Components/__Question_List.jsx';
import { Drawer_Input2 } from "../Components/__Question_Create.jsx";
import { ApprovalPanel, ObservationField } from '../Components/__Admin_Approval.jsx';


// Editor
import Editor from "@monaco-editor/react";

// Model
import { AdminApproval_Question } from '../models/AdminApproval_Model.js';
import { Notification } from '../models/Notification_Model.js';

// Controller 
import { Admin_ApproveController } from '../controller/admin.approve.controller.js';

import { ADMIN_APPROVAL_DISPLAY_MODE } from '../Utilities.js';




export default function Admin_Approval() {
    const [allPendingQuestions, setAllPendingQuestions] = useState([]);
    const [question, setQuestion] = useState(
        new Question({
            title: "3 Some Problem",
            description:
                "Given an array of integers nums and an integer target, return indices of the three numbers such that they add up to target...",
            mark: 10,
            difficulty: "Medium",
            type: "Multiple Choice",
            event_uid: "Event123",
            createdBy: "Admin",
            createdBy_uid: "Admin123",
        })
    );

    // Approval specific state
    const [functionName, setFunctionName] = useState("myFunction");
    const [returnType, setReturnType] = useState("int");

    const [status, setStatus] = useState("Approved");
    const [functionCode, setFunctionCode] = useState("");

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [approvalOpen, setApprovalOpen] = useState(false);
    const [questionID, setQuestionID] = useState("NOT selected");



    // approval Rejention and Modification Request
    const [displayMode, setDisplayMode] = useState(ADMIN_APPROVAL_DISPLAY_MODE.APPROVED);

    // Rejection Message Handler
    const [reason, setReason] = useState("");
    const [title, setTitle] = useState("");


    const [notification, setNotification] = useState(
        new Notification({
            title: "Notification Title",
            message: "Notification Message",
            type: "info",
            isRead: false,
            objectID: "Obj123",
            recipientID: "User123",
            timestamp: new Date(),
        })
    );

    const controller = new Admin_ApproveController(setAllPendingQuestions, approvalOpen, setApprovalOpen, setQuestion, setQuestionID, displayMode, setDisplayMode, title, reason);



    // Editor ref
    const editorRef = useRef(null);


    const handleOnReject = () => {
        
    }



    useEffect(() => {
        controller.fetchAllRequestedQuestions();

    }, []);



    // Function code generator
    const generateFunctionCode = () => {
        const fName = functionName || "myFunction";
        const rType = returnType || "int";
        return `

#include <iostream>
using namespace std;

${rType} ${fName}() {
    // Your logic here
}

int main() {
    
    ${rType} n =  ;

    ${rType} result = ${fName}();
    cout << result << endl;
    return 0;

}
    

`;
    };

    // Update editor whenever functionName or returnType changes
    useEffect(() => {
        setFunctionCode(generateFunctionCode());
    }, [functionName, returnType]);

    const handleApprove = (id) => {
        const approvedQuestion = new AdminApproval_Question({
            question,
            approvedBy: "Admin",
            approvedBy_uid: "Admin123",
            functionName,
            returnType,
            status,
            mainFunctionCode: generateFunctionCode()
        });
        controller.handleApprove(id, approvedQuestion)
        setApprovalOpen(false)
        // ✅ update the pending questions list
        setAllPendingQuestions((prev) => {
            const updated = prev.filter((q) => q.id !== id);

            if (updated.length > 0) {
                setQuestion(updated[0]);
                setQuestionID(updated[0].id);
            } else {
                // if no questions left, reset
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
            }

            setFunctionName("myFunction");
            setReturnType("int");
            setStatus("Approved");
            setFunctionCode(functionCode);

            return updated;
        });

    };

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
                    <div className="p-4 flex justify-between">
                        <h2 className="text-xl font-bold">Requested by {question.createdBy}</h2>
                        <IconButton color='primary' onClick={() => setDrawerOpen(true)}>
                            <MenuOpenOutlinedIcon />
                        </IconButton>
                    </div>

                    <div className="p-4 flex-grow gap-3 overflow-y-auto">


                        <Question_Showing_Description
                            question={question}
                            handleDeleteButton={controller.handleReject}
                            handleEditButton={controller.moveToApprovalPage}
                            handleSolveButton={controller.revertBack}
                        />


                    </div>
                </motion.div>

                {/* Approval Panel */}
                {approvalOpen && (
                    <motion.div
                        className="h-[86vh] w-[30vw] rounded-2xl overflow-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.25 }}
                    >

                        {displayMode === ADMIN_APPROVAL_DISPLAY_MODE.APPROVAL ?
                            (
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
                                    onClose={controller.OpenSidePage}

                                />
                            ) : (
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
                                            () => controller.handleReject({
                                                objectID: questionID,
                                                recipientID: question.createdBy_uid
                                            }) :
                                            () => controller.revertBack({
                                                objectID: questionID,
                                                recipientID: question.createdBy_uid
                                            })
                                    }

                                    buttonText={
                                        displayMode === ADMIN_APPROVAL_DISPLAY_MODE.REJECTED ? "Confirm Rejection" : 
                                        "Request for Modification"
                                    }

                                    onClose={controller.OpenSidePage}
                                    
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
                            )
                        }


                        





                    </motion.div>
                )}
            </div>

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
        </>
    );
}
