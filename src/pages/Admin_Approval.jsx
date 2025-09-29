
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

// Editor
import Editor from "@monaco-editor/react";

// Model
import { AdminApproval_Question } from '../models/AdminApproval_Model.js';

// Controller 
import { Admin_ApproveController } from '../controller/admin.approve.controller.js';

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



    const controller = new Admin_ApproveController(setAllPendingQuestions, setApprovalOpen, setQuestion, setQuestionID);



    // Editor ref
    const editorRef = useRef(null);

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
                        <div className="p-4 flex flex-col gap-4">
                            <h3 className="text-lg font-bold text-center">Approval Panel</h3>

                            {/* Function Name & Return Type */}
                            <TextField
                                {...GetCommonProps2({ borderColor: "gray", hoverColor: "lightgray", textColor: "white" })}
                                label="Function Name"
                                value={functionName}
                                onChange={(e) => setFunctionName(e.target.value)}
                                fullWidth
                            />
                            <TextField
                                {...GetCommonProps2({ borderColor: "gray", hoverColor: "lightgray", textColor: "white" })}
                                label="Return Type"
                                value={returnType}
                                onChange={(e) => setReturnType(e.target.value)}
                                placeholder="e.g. int, string"
                                fullWidth
                            />

                            {/* Status */}
                            <TextField
                                select
                                label="Status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                {...GetCommonProps2({ borderColor: "gray", textColor: "white" })}
                                fullWidth
                            >
                                <MenuItem value="Pending">Pending</MenuItem>
                                <MenuItem value="Approved">Approved</MenuItem>
                                <MenuItem value="Rejected">Rejected</MenuItem>
                            </TextField>

                            {/* Monaco Editor for Function Preview */}
                            <div className="flex flex-col gap-2">
                                <h4 className="text-sm font-semibold">Function Preview (Editable)</h4>
                                <div className="h-60 border rounded overflow-hidden">
                                    <Editor
                                        height="100%"
                                        defaultLanguage="cpp"
                                        value={functionCode}
                                        theme="vs-dark"
                                        options={{
                                            fontSize: 14,
                                            minimap: { enabled: false },
                                            scrollBeyondLastLine: false,
                                            automaticLayout: true,
                                        }}
                                        onMount={(editor) => {
                                            editorRef.current = editor;
                                        }}
                                        onChange={(value) => setFunctionCode(value)}
                                    />
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-2 justify-end">
                                <Button
                                    variant="contained"
                                    sx={{ backgroundColor: "#f59e0b", color: "white", "&:hover": { backgroundColor: "#d97706" } }}
                                    onClick={() => console.log("Reverted")}
                                >
                                    Revert Back
                                </Button>
                                <Button
                                    variant="contained"
                                    sx={{ backgroundColor: "#22c55e", color: "white", "&:hover": { backgroundColor: "#16a34a" } }}
                                    onClick={() => handleApprove(questionID)}
                                >
                                    Approve
                                </Button>
                            </div>
                        </div>
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
