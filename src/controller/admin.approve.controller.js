
// File: src/controller/admin.approve.controller.js



import { Admin_ApproveService } from "../services/_admin.approver.service.js";
import { ADMIN_APPROVAL_DISPLAY_MODE } from '../Utilities.js';


export class Admin_ApproveController {
    constructor(setAllPendingQuestions, approvalOpen, setApprovalOpen, setQuestion, setQuestionID, displayMode, setDisplayMode, reason) {
        this.service = new Admin_ApproveService();
        this.setAllPendingQuestions = setAllPendingQuestions;
        this.approvalOpen = approvalOpen;
        this.setApprovalOpen = setApprovalOpen;
        this.setQuestion = setQuestion;
        this.setQuestionID = setQuestionID;
        this.displayMode = displayMode
        this.setDisplayMode = setDisplayMode;
        this.reason = reason;

    }

    fetchAllRequestedQuestions = async () => {
        try {
            const result = await this.service._Fetch_All_Question();
            this.setAllPendingQuestions(result.data);
            this.setQuestion(result.data[0]);
            this.setQuestionID(result.data[0].id);

            return { success: true, data: result.data };
        } catch (error) {
            console.log("Error fetching questions:", error);
            return { success: false, error: error.message };
        }
    }

    deleteQuestion = async (id) => {
        try {
            const result = await this.service._Delete_Specific_Function(id);
            return { success: true, data: result.data };
        } catch (error) {
            console.log("Error deleting question:", error);
            return { success: false, error: error.message };
        }
    }


    handleApprove = (questionID, approveQuestion) => {

        console.log(`Question : ${approveQuestion}`)

        // console.log(`question : ${approveQuestion.question}`)
        // console.log(`approvedBy : ${approveQuestion.approvedBy}`)
        // console.log(`approvedBy_uid : ${approveQuestion.approvedBy_uid}`)
        // console.log(`functionName : ${approveQuestion.functionName}`)
        // console.log(`returnType : ${approveQuestion.returnType}`)
        // console.log(`status : ${approveQuestion.status}`)
        // console.log(`mainFunctionCode : ${approveQuestion.mainFunctionCode}`)


        this.service.approveQuestion(questionID, approveQuestion);
    }

    OpenSidePage = () => this.setApprovalOpen(prev => !prev);

    moveToApprovalPage = () => {
        this.setDisplayMode(ADMIN_APPROVAL_DISPLAY_MODE.APPROVAL);
        if (!this.approvalOpen) this.OpenSidePage();
    }

    handleReject = () => {
        this.setDisplayMode(ADMIN_APPROVAL_DISPLAY_MODE.REJECTED);
        if (!this.approvalOpen) this.OpenSidePage();
    }


    revertBack = () => {
        this.setDisplayMode(ADMIN_APPROVAL_DISPLAY_MODE.MODIFICATION);
        if (!this.approvalOpen) this.OpenSidePage();
    }



    approveQuestion = async (id, question) => {
        try {
            const result = await this.service.approveQuestion(id, question);
            if (result.success) console.log('Data set Successful')
        } catch (error) {
            console.log("Error approving question:", error);
            return { success: false, error: error.message };
        }
    }


}




