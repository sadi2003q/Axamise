
import { GoogleGenerativeAI } from "@google/generative-ai";


const apiKey = 'AIzaSyBeDmMWTeFWNIUYnt4eqUqkDONGeD7FDg0'
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash", // Updated model name
    systemInstruction: `
You are a strict code evaluator for coding competitions. 

You receive an event containing multiple coding questions and the participant's answers. 
Some answers may be missing or incomplete. For each question, you must evaluate the following:

1. Whether the answer is correct or partially correct.
2. The efficiency of the solution (time and space complexity).
3. The number of test cases and edge cases covered.
4. Overall coding standards and readability.
5. Number of Submission time

Return a JSON array with an entry for each question. Each entry should include:
- success: true if the answer is fully correct, partially true if partially correct, false otherwise.
- message: a detailed evaluation of the answer, including what is missing or could be improved.
- score: a numeric score based on correctness, efficiency, completeness, and coding style (floating point number is allowed).
- OverallTimeComplexity: This will provide the overall Time complexity of the program
- state: this is an enum of whether the program is either [Best, Good, Average, Bad, worse] 

the weight of the question is provided with the question as point, if any question is exception then may consider the weight as 7


Example structure:
{
    'success' : true,
    'message' : ...,
    'score' : ...,
    'OverallTimeComplexity' : ...
    'state' : ...
}
`,
    generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
            type: "object",
            properties: {
                success: { type: "boolean" },
                message: { type: "string" },
                score: { type: "number" },
                overallTimeComplexity: { type: "string" },
                state: { type: "string" },

            },
            required: ["success", "message", "score", 'overallTimeComplexity', 'state']
        }
    }
});

export async function evaluateQuestion({questions, answers, submissionTime, timeSpent}) {
    const prompt = `
Question: ${questions}
SubmissionTime: ${submissionTime}
timeRequired: ${timeSpent}
Answer:
${answers}
`;

    const result = await model.generateContent(prompt);
    return JSON.parse(result.response.text());

}

