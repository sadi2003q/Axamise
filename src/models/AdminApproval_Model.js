
// File: src/models/AdminApproval_Model.js

import Question from "./Question_Model.js";


export class AdminApproval_Question extends Question {
    constructor({
        question = {},   // default to {}
        approvedBy = "",
        approvedBy_uid = "",
        approvedAt = new Date(),
        functionName = "",
        returnType = "",
        status = "Pending",
        mainFunctionCode = ""
    } = {}) {   // ✅ default the whole arg to {} if undefined
        super(question);   // directly pass the object
        this.question = { ...question }; // safe copy
        this.approvedBy = approvedBy;
        this.approvedBy_uid = approvedBy_uid;
        this.approvedAt = approvedAt;
        this.functionName = functionName;
        this.mainFunctionCode = mainFunctionCode;
        this.returnType = returnType;
        this.status = status;

       
    }

    


    getMainFunctionCode() {
        return `
#include <iostream>
using namespace std;

int main() {

    ${this.returnType} result = ${this.functionName}(${Object.keys(this.paramsValue).join(", ")});

    cout << result << endl;

    return 0;
}
    `;
    }

}
