import { SolvingSectionController } from "../solving_section.controller.js";
import { Solve_Model } from "../../models/Solve_Model.js";

const mockService = {
    _Fetch_Question: jest.fn(),
    runCode: jest.fn(),
    solve_approve: jest.fn(),
    _CheckIfSolved: jest.fn(),
    _SetEventScore: jest.fn(),
    _ModifyScoreAfterRun: jest.fn(),
    _AddToSolverList: jest.fn(),
    _EncounterProblem: jest.fn(),
};

jest.mock("../../services/Questions/_factory.question.service.js", () => ({
    QuestionService: { createService: jest.fn(() => mockService) }
}));

describe("SolvingSectionController", () => {
    let controller, setQuestion, setRunResult, setIsSuccess, editorRef, setIsRunning, setIsCalculatingScore, setCurrentCode, setSolver;

    beforeEach(() => {
        setQuestion = jest.fn();
        setRunResult = jest.fn();
        setIsSuccess = jest.fn();
        editorRef = { current: { getValue: jest.fn(), setValue: jest.fn() } };
        setIsRunning = jest.fn();
        setIsCalculatingScore = jest.fn();
        setCurrentCode = jest.fn();
        setSolver = jest.fn();

        controller = new SolvingSectionController(
            setQuestion,
            setRunResult,
            setIsSuccess,
            editorRef,
            setIsRunning,
            setIsCalculatingScore,
            setCurrentCode,
            "libPart",
            "mainPart",
            { solver_id: "u1" },
            setSolver,
            jest.fn(),
            0
        );

        jest.clearAllMocks();
    });

    test("fetchQuestion sets question if success", async () => {
        mockService._Fetch_Question.mockResolvedValueOnce({ success: true, data: { id: "q1" } });
        await controller.fetchQuestion("q1");
        expect(setQuestion).toHaveBeenCalledWith({ id: "q1" });
        expect(setCurrentCode).toHaveBeenCalledWith(undefined);
    });

    test("handleRunCode runs code and sets success", async () => {
        editorRef.current.getValue.mockReturnValue("code");
        mockService.runCode.mockResolvedValue({ output: "ok", error: "" });
        mockService.solve_approve.mockResolvedValue({ success: true });

        await controller.handleRunCode({ id: "u1", dryRun: false });

        expect(setIsRunning).toHaveBeenCalled();
        expect(setRunResult).toHaveBeenCalledWith("ok");
        expect(setIsSuccess).toHaveBeenCalledWith(true);
        expect(mockService.solve_approve).toHaveBeenCalled();
    });

    test("handleIfSolvedPreviously calls service", async () => {
        mockService._CheckIfSolved.mockResolvedValue({ success: true, data: true });
        const res = await controller.handleIfSolvedPreviously({ userID: "u1", questionID: "q1" });
        expect(mockService._CheckIfSolved).toHaveBeenCalledWith({ user_id: "u1", question_id: "q1" });
    });
});
