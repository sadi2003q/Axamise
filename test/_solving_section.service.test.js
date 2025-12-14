import { SolveService } from "../_solving_section.service.js";
import { db } from "../../firebase.js";
import { doc, getDoc, setDoc, updateDoc, collection } from "firebase/firestore";
import { NotificationsService } from "../users/_Notifications.service";

jest.mock("firebase/firestore", () => ({
    doc: jest.fn(),
    getDoc: jest.fn(),
    setDoc: jest.fn(),
    updateDoc: jest.fn(),
    collection: jest.fn(),
}));

jest.mock("../users/_Notifications.service", () => ({
    NotificationsService: jest.fn().mockImplementation(() => ({
        _Send_Notification: jest.fn().mockResolvedValue(true)
    })),
}));

global.fetch = jest.fn();

describe("SolveService", () => {
    let service;

    beforeEach(() => {
        service = new SolveService();
        jest.clearAllMocks();
    });

    test("_Fetch_Question returns success if doc exists", async () => {
        getDoc.mockResolvedValue({ exists: () => true, id: "q1", data: () => ({ title: "Test" }) });
        doc.mockReturnValue("docRef");

        const res = await service._Fetch_Question("q1");
        expect(res).toEqual({ success: true, data: { id: "q1", title: "Test" } });
    });

    test("_Fetch_Question returns failure if doc does not exist", async () => {
        getDoc.mockResolvedValue({ exists: () => false });
        doc.mockReturnValue("docRef");

        const res = await service._Fetch_Question("q2");
        expect(res).toEqual({ success: false, error: "No such document found" });
    });

    test("runCode returns output from API", async () => {
        fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue({
                run: { stdout: "Hello", stderr: "" }
            })
        });

        const res = await service.runCode("int main(){}");
        expect(res).toEqual({ success: true, output: "Hello", error: "" });
    });

    test("solve_approve sets document successfully", async () => {
        setDoc.mockResolvedValue(true);
        collection.mockReturnValue("collectionRef");
        doc.mockReturnValue("docRef");

        const mockSolver = { solver_id: "u1", question_id: "q1", date: "2025-12-04", solve_code: "code", event_id: "" };
        const res = await service.solve_approve("u1", mockSolver);

        expect(res).toEqual({
            success: true,
            message: `Problem q1 successfully stored for user u1`,
        });
    });

    test("_CheckIfSolved returns true if doc exists", async () => {
        getDoc.mockResolvedValue({ exists: () => true });
        doc.mockReturnValue("docRef");

        const res = await service._CheckIfSolved({ user_id: "u1", question_id: "q1" });
        expect(res).toEqual({ success: true, data: true });
    });

    test("_SetEventScore sets score and sends notification", async () => {
        setDoc.mockResolvedValue(true);
        collection.mockReturnValue("scoreCardRef");
        doc.mockReturnValue("docRef");

        const res = await service._SetEventScore({
            userID: "u1",
            name: "User",
            eventID: "e1",
            score: "100",
            state: "passed",
            timeComplexity: "O(n)"
        });

        expect(res).toEqual({ success: true, message: "Score added successfully!" });
    });

    test("_AddToSolverList sets document successfully", async () => {
        setDoc.mockResolvedValue(true);
        doc.mockReturnValue("docRef");
        collection.mockReturnValue("collectionRef");

        const res = await service._AddToSolverList({ userID: "u1", questionID: "q1" });
        expect(res).toEqual({
            success: true,
            message: `User: u1 successfully added to SolverList`,
        });
    });
});
