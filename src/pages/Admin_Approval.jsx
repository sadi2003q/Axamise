import { Background_Particles } from '../Components/__Admin_Login.jsx';
import { useEffect, useState } from 'react';

// MUI Components
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import IconButton from '@mui/material/IconButton';
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';

// Models
import Question from '../models/Question_Model.js';

// Components
import { Question_Showing_Description } from '../Components/__Question_List.jsx';
import { Drawer_Input2 } from "../Components/__Question_Create.jsx"; // ✅ reuse drawer


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

    // Drawer state
    const [drawerOpen, setDrawerOpen] = useState(false);

    // Example items for drawer


    const controller = new Admin_ApproveController(setAllPendingQuestions);

    const moveToAprovalPage = () => {
        console.log("Moving to Approval Page");
    }

    const revertBack = () => {
        console.log("Reverting question:");
        // You can implement navigation or state updates here
    }

    const handleReject = () => {
        console.log("Rejecting question:");
        // You can implement navigation or state updates here
    }



    useEffect(() => {
        controller.fetchAllRequestedQuestions();
    }, []);





    return (
        <>
            <Background_Particles />

            <div className="w-screen h-screen relative flex items-center justify-center">
                <div className="w-[66vw] h-[86vh] rounded-2xl  z-40 flex flex-col justify-between">

                    <div className="p-4 flex justify-between">
                        <h2 className="text-xl font-bold">Requested by {question.createdBy}</h2>

                        {/* Burger button */}
                        <IconButton color='primary' onClick={() => setDrawerOpen(true)}>
                            <MenuOpenOutlinedIcon />
                        </IconButton>
                    </div>

                    <div className="p-4 flex-grow gap-3 overflow-y-auto">
                        <Question_Showing_Description 
                            question={question} 
                            handleDeleteButton={handleReject} 
                            handleEditButton={moveToAprovalPage} 
                            handleSolveButton={revertBack} 
                        />
                    </div>

                    
                </div>
            </div>

            {/* Drawer (appears from left) */}
            <Drawer_Input2
                drawerOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                item={allPendingQuestions}
                iconColor="cyan"
                onItemClick={(item) => {
                    setQuestion(item );
                    setDrawerOpen(false);
                }}
                anchor="left" // ✅ force it to open from left
            />
        </>
    );
}
