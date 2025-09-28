


export class AdminApproval_Question {
    constructor({
        question = null,
        approvedBy = "",
        approvedBy_uid = "",
        approvedAt = new Date(),
        functionName = "",
        paramsValue = {}, // <-- directly pass params with values here
        returnType = "",
        status = "Pending",
        mainFunctionCode = ""
    }) {
        this.question = question;
        this.approvedBy = approvedBy;
        this.approvedBy_uid = approvedBy_uid;
        this.approvedAt = approvedAt;
        this.functionName = functionName;
        this.mainFunctionCode = mainFunctionCode;
        this.returnType = returnType;
        this.status = status;

        // Initialize paramsValue directly from input
        this.paramsValue = {};

        // Ensure all values are arrays for consistency
        Object.entries(paramsValue).forEach(([param, value]) => {
            this.paramsValue[param] = Array.isArray(value) ? value : [value];
        });
    }

    // Optional: generate all combinations of parameter values
    getParamCombinations() {
        const entries = Object.entries(this.paramsValue);
        if (!entries.length) return [];

        const combine = (arr, index = 0) => {
            if (index === arr.length) return [{}];
            const [key, values] = arr[index];
            const restCombinations = combine(arr, index + 1);
            const result = [];
            values.forEach(value => {
                restCombinations.forEach(comb => {
                    result.push({ ...comb, [key]: value });
                });
            });
            return result;
        };

        return combine(entries);
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
