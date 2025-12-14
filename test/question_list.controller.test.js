// Path: src/controller/Questions/__tests__/question_list.controller.test.js

import { QuestionListController } from "../question_list.controller.js";
import { QuestionService } from "../../../services/Questions/_factory.question.service.js";
import { routes } from "../../../Utilities.js";

jest.mock("../../../services/Questions/_factory.question.service.js");

describe("QuestionListController", () => {
  let controller;
  let setAllQuestion, setSelectedQuestion, setError, navigate, setSolvedProblem;
  let questions;

  beforeEach(() => {
    questions = [];
    setAllQuestion = jest.fn();
    setSelectedQuestion = jest.fn();
    setError = jest.fn();
    navigate = jest.fn();
    setSolvedProblem = jest.fn();

    // Mock service methods
    QuestionService.createService = jest.fn().mockReturnValue({
      _Fetch_All_Question: jest.fn().mockResolvedValue({ success: true, data: [{ id: "q1" }] }),
      _Delete_Specific_Function: jest.fn().mockResolvedValue({ success: true }),
      _FetchSolvedProblemList: jest.fn().mockResolvedValue({ success: true, data: ["q1"] }),
    });

    controller = new QuestionListController(
      questions,
      setAllQuestion,
      setSelectedQuestion,
      setError,
      navigate,
      setSolvedProblem
    );
  });

  test("handleFetchAll fetches questions and updates state", async () => {
    await controller.handleFetchAll();
    expect(setAllQuestion).toHaveBeenCalledWith([{ id: "q1" }]);
  });

  test("handleEditButton calls navigate with correct route", () => {
    controller.handleEditButton("q1");
    expect(navigate).toHaveBeenCalledWith(routes.question_create, { state: { questionID: "q1" } });
  });

  test("handleSolveButton calls navigate with correct route", () => {
    controller.handleSolveButton("q1");
    expect(navigate).toHaveBeenCalledWith(routes.solving_page, { state: { questionID: "q1" } });
  });

  test("handleDeleteQuestion deletes question and updates state", async () => {
    const prevQuestions = [{ id: "q1" }, { id: "q2" }];
    controller.setAllQuestion(prevQuestions);

    await controller.handleDeleteQuestion("q1");

    // Check if setAllQuestion called with filtered list
    expect(setAllQuestion).toHaveBeenCalledWith(expect.arrayContaining([{ id: "q2" }]));
  });

  test("handleSolvedProblemList fetches solved problem IDs", async () => {
    await controller.handleSolvedProblemList("user1");
    expect(setSolvedProblem).toHaveBeenCalledWith(["q1"]);
  });
});
