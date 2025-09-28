import { Admin_ApproveService } from "../services/_admin.approver.service.js";

export class Admin_ApproveController {
    constructor(setAllPendingQuestions) {
        this.service = new Admin_ApproveService();
        this.setAllPendingQuestions = setAllPendingQuestions;
    }

    fetchAllRequestedQuestions = async () => {
        try {
            const result = await this.service._Fetch_All_Question();
            this.setAllPendingQuestions(result.data);
            return {success: true, data: result.data};
        } catch (error) {
            console.log("Error fetching questions:", error);
            return {success: false, error: error.message};
        }
    }

    deleteQuestion = async (id) => {
        try {
            const result = await this.service._Delete_Specific_Function(id);
            return {success: true, data: result.data};
        } catch (error) {
            console.log("Error deleting question:", error);
            return {success: false, error: error.message};
        }
    }


    handleEdit = (question) => {
        // Logic to handle editing a question
        console.log("Editing question:", question);
        // You can implement navigation or state updates here
    }


    handleDelete = (question) => {
        // Logic to handle deleting a question
        console.log("Deleting question:", question);
        // You can implement navigation or state updates here
    }


    handleSolve = (question) => {
        // Logic to handle solving a question
        console.log("Solving question:", question);
        // You can implement navigation or state updates here
    }



}







