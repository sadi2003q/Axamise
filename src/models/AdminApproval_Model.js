

export class AdminApproval_Question {
    constructor({ question, approvedBy, approvedBy_uid, approvedAt, functionName, params, returnType, status, mainFunctionCode }) {
        this.question = question || null; // Should be an instance of Question
        this.approvedBy = approvedBy || "";
        this.approvedBy_uid = approvedBy_uid || "";
        this.approvedAt = approvedAt || new Date();
        this.functionName = functionName || "";
        this.mainFunctionCode = mainFunctionCode || "";
        this.params = params || [];
        this.returnType = returnType || "";
        this.status = status || "Pending"; // Possible values: Pending, Approved, Rejected
        // this.input = 
        // output
    }
}
