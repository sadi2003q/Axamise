

// File: src/controller/admin.approve.controller.js



import { Admin_ApproveService } from "../../services/Admin/_admin.approver.service.ts";
import { ADMIN_APPROVAL_DISPLAY_MODE } from '../../Utilities.ts';
import { Notification } from "../../models/Notification_Model.js";
import { NOTIFICATION_TYPES } from "../../Utilities.ts";
import { NotificationService } from "../../services/users/_Notification.service.js";
import { ApprovalService } from '../../services/Admin/_base/_factory.approval.service.ts'
import { SERVICE} from "../../Utilities.ts";

export class Admin_ApproveController {


    constructor(setAllPendingQuestions, approvalOpen, setApprovalOpen, setQuestion, setQuestionID, displayMode, setDisplayMode, title, reason, setIsEmpty) {
        
        // this.service = new Admin_ApproveService();
        this.service = ApprovalService.createService(SERVICE.APPROVAL_QUESTION)

        this.notificationService = new NotificationService();



        this.setAllPendingQuestions = setAllPendingQuestions;
        this.approvalOpen = approvalOpen;
        this.setApprovalOpen = setApprovalOpen;
        this.setQuestion = setQuestion;
        this.setQuestionID = setQuestionID;
        this.displayMode = displayMode
        this.setDisplayMode = setDisplayMode;
        this.title = title;
        this.reason = reason;
        this.setIsEmpty = setIsEmpty;

    }

    fetchAllRequestedQuestions = async () => {
        try {
            const result = await this.service._Fetch_All_Question('admin');
            this.setAllPendingQuestions(result.data);
            if(result.data.length > 0) {
                this.setQuestion(result.data[0]);
                this.setQuestionID(result.data[0].id);
            } else {
                this.setIsEmpty(true);
            }


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


        this.service.ApproveQuestion(questionID, approveQuestion).then();



    }

    OpenSidePage = () => this.setApprovalOpen(prev => !prev);

    moveToApprovalPage = () => {
        this.setDisplayMode(ADMIN_APPROVAL_DISPLAY_MODE.APPROVAL);
        if (!this.approvalOpen) this.OpenSidePage();
    }


    handleReject = ({objectID="Object ID Not Assigned",
                        recipientID = "Recipient ID Not Assigned",
                        title = "Question title",
                    }) => {
        

        // const notification = new Notification({
        //     title: this.title,
        //     body: this.reason +  '\n Please modify and resubmit.',
        //
        //     // working here
        //     type: NOTIFICATION_TYPES.reject_question,
        //     recipientID: recipientID,
        //     objectID: ""
        // })
        // notification.printNotification();

        // this.notificationService.createNotification({...notification}).then()
        // this.service._Delete_Specific_Function(objectID).then();


        this.setDisplayMode(ADMIN_APPROVAL_DISPLAY_MODE.REJECTED);

        if (!this.approvalOpen) this.OpenSidePage();

    }


    revertBack = async ({
                            objectID="Object ID Not Assigned",
                            recipientID = "Recipient ID Not Assigned",
                            type = "rejected",
                            title = "title",
                            reason = "This is the reason",
                        }) => {


        this.setDisplayMode(ADMIN_APPROVAL_DISPLAY_MODE.MODIFICATION);
        if (!this.approvalOpen) this.OpenSidePage();
    }


    handleModified = async({id, NotificationType = NOTIFICATION_TYPES.modification_question, recipientID}) => {


        const notification = new Notification({
            title: `${this.title}`,
            message: `Reason: ${this.reason}. \n Please modify and resubmit.`,
            type: NotificationType,
            recipientID: recipientID,
            objectID: id
        })

        this.service._AddModifiedQuestion({questionID: id}).then()



        console.log('Notification : ', notification);

        this.notificationService.createNotification({...notification}).then()


    }


    handleRejectQuestions = async ({id, NotificationType = NOTIFICATION_TYPES.reject_question, recipientID})  => {

        const notification = new Notification({
            title: `${this.title}`,
            message: `Reason: ${this.reason}. So the Question was Rejected`,
            type: NotificationType,
            recipientID: recipientID,
            objectID: id
        })


        console.log('THis HandleRejectQuestion function has been called');
        console.log('Notification : ', notification);


        this.notificationService.createNotification({...notification}).then()
        this.service._Delete_Specific_Function(id).then();

    }








}




