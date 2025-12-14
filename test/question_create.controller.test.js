// src/__tests__/question_create.controller.test.js
import QuestionController from "../../controller/Questions/question_create.controller.js";
import Question from "../../models/Question_Model.js";

const mockNavigate = jest.fn();
const mockSetQuestion = jest.fn();
const mockSetError = jest.fn();

const mockService = {
  _Question_Upload: jest.fn(),
  _Question_Update: jest.fn(),
  _Fetch_Question: jest.fn(),
  GetAllEvents: jest.fn(),
};

jest.mock("../../services/Questions/_factory.question.service.js", () => ({
  QuestionService: {
    createService: () => mockService
  }
}));

describe("QuestionController", () => {
  let controller;
  let question;

  beforeEach(() => {
    question = new Question({
      title: "Test",
      description: "Desc",
      mark: 10,
      difficulty: "Easy",
      type: "MCQ",
      event_uid: "event1",
      createdBy: "user1",
      createdBy_uid: "uid1",
    });

    controller = new QuestionController(question, mockSetQuestion, mockSetError, mockNavigate);
  });

  test("handleUpload calls service and navigates on success", async () => {
    mockService._Question_Upload.mockResolvedValue({ success: true });
    await controller.handleUpload();
    expect(mockNavigate).toHaveBeenCalled();
  });

  test("handleUpload sets error on invalid question", async () => {
    question.isValid = () => false;
    const controller2 = new QuestionController(question, mockSetQuestion, mockSetError, mockNavigate);
    await controller2.handleUpload();
    expect(mockSetError).toHaveBeenCalledWith("Please fill all fields.");
  });

  test("handleUpdate calls service and navigates on success", async () => {
    mockService._Question_Update.mockResolvedValue({ success: true });
    await controller.handleUpdate("q1");
    expect(mockNavigate).toHaveBeenCalled();
  });

  test("handleFetch sets question if success", async () => {
    mockService._Fetch_Question.mockResolvedValue({ success: true, data: question });
    await controller.handleFetch("q1");
    expect(mockSetQuestion).toHaveBeenCalledWith(question);
  });

  test("handleFetch sets error if fail", async () => {
    mockService._Fetch_Question.mockResolvedValue({ success: false, error: "Not found" });
    await controller.handleFetch("q1");
    expect(mockSetError).toHaveBeenCalledWith("Not found");
  });

  test("GetAllEvents calls service", async () => {
    mockService.GetAllEvents.mockResolvedValue({ success: true });
    const result = await controller.GetAllEvents("uid1");
    expect(result.success).toBe(true);
  });
});
