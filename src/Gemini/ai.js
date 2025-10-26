import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

// eslint-disable-next-line no-undef
if (!process.env.GEMINI_API_KEY) {
    throw new Error("Please set GEMINI_API_KEY in your .env");
}

// eslint-disable-next-line no-undef
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.5-pro", // Updated model name
    systemInstruction: `
You are a strict code evaluator for the competition.
You receive a coding question and a student's answer.
You must evaluate and return a JSON with success, message, and score.
Then Provide a score based on the number of submit time, time and space complexity, 
time spent to solve the problem, number of test and edge case to solve the problem, 
also describe the overall coding standard then give a score
`,
    generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
            type: "object",
            properties: {
                success: { type: "boolean" },
                message: { type: "string" },
                score: { type: "number" }
            },
            required: ["success", "message", "score"]
        }
    }
});

export async function evaluateQuestion(question, answer, submissionTime, timeSpent, questionWright = 7) {
    const prompt = `
Question: ${question}
SubmissionTime: ${submissionTime}
questionWeight: ${questionWright}
timeRequired: ${timeSpent}
Answer:
${answer}
`;

    const result = await model.generateContent(prompt);
    const data = JSON.parse(result.response.text());
    return data;
}




async function main() {
    const question = `
Write a function in C++ that takes an array of integers and a target number.
Return true if any three numbers in the array sum up to the target, otherwise return false.
`;

    const answer = `
#include <vector>
using namespace std;

bool findTripletSum(vector<int> nums, int target) {
    int n = nums.size();
    for(int i = 0; i < n - 2; i++) {
        for(int j = i + 1; j < n - 1; j++) {
            for(int k = j + 1; k < n; k++) {
                if(nums[i] + nums[j] + nums[k] == target) {
                    return true;
                }
            }
        }
    }
    return false;
}
`;


    const submissionTime = new Date().toISOString(); // current time in ISO format
    const timeSpent = "5 minutes"; // example string or number of seconds

    const result = await evaluateQuestion(question, answer, submissionTime, timeSpent);

    console.log("Evaluation Result:", result);
}



main()