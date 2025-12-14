import QuestionCreateService from "../QuestionService.js";
import Question from "../../models/Question_Model.js";
import { db } from "../../firebase.js";
import { collection, addDoc, doc, setDoc, getDoc, getDocs, query, where } from "firebase/firestore";

// Mock Firestore functions
jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  addDoc: jest.fn(),
  doc: jest.fn(),
  setDoc: jest.fn(),
  getDoc: jest.fn(),
  getDocs: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
}));

describe("QuestionCreateService", () => {
  let service;
  const sampleQuestion = new Question({
    title: "Test Question",
    description: "Sample description",
    mark: 10,
    difficulty: "Medium",
    type: "Array",
    event_uid: "event123",
    createdBy: "TestUser",
    createdBy_uid: "user123",
  });

  beforeEach(() => {
    service = new QuestionCreateService();
    jest.clearAllMocks();
  });

  test("_Question_Upload should return success with data", async () => {
    addDoc.mockResolvedValueOnce({});
    collection.mockReturnValueOnce("collectionRef");

    const res = await service._Question_Upload(sampleQuestion);

    expect(collection).toHaveBeenCalledWith(db, "question");
    expect(addDoc).toHaveBeenCalledWith("collectionRef", { ...sampleQuestion });
    expect(res).toEqual({ success: true, data: sampleQuestion });
  });

  test("_Question_Upload should return failure on error", async () => {
    const error = new Error("Firestore error");
    addDoc.mockRejectedValueOnce(error);
    collection.mockReturnValueOnce("collectionRef");

    const res = await service._Question_Upload(sampleQuestion);

    expect(res).toEqual({ success: false, error });
  });

  test("_Question_Update should return success with updated data", async () => {
    setDoc.mockResolvedValueOnce({});
    doc.mockReturnValueOnce("docRef");

    const res = await service._Question_Update("q123", sampleQuestion);

    expect(doc).toHaveBeenCalledWith(db, "question", "q123");
    expect(setDoc).toHaveBeenCalledWith("docRef", { ...sampleQuestion, updatedAt: expect.any(String) });
    expect(res.success).toBe(true);
  });

  test("_Question_Update should return failure on error", async () => {
    const error = new Error("Firestore update error");
    setDoc.mockRejectedValueOnce(error);
    doc.mockReturnValueOnce("docRef");

    const res = await service._Question_Update("q123", sampleQuestion);

    expect(res).toEqual({ success: false, error });
  });

  test("_Fetch_Question should return success if doc exists", async () => {
    const mockDocSnap = {
      exists: jest.fn().mockReturnValue(true),
      id: "doc123",
      data: jest.fn().mockReturnValue({ foo: "bar" }),
    };
    getDoc.mockResolvedValueOnce(mockDocSnap);
    doc.mockReturnValueOnce("docRef");

    const res = await service._Fetch_Question("doc123");

    expect(doc).toHaveBeenCalledWith(db, "approvedQuestions", "doc123");
    expect(getDoc).toHaveBeenCalledWith("docRef");
    expect(res).toEqual({ success: true, data: { uid: "doc123", foo: "bar" } });
  });

  test("_Fetch_Question should return failure if doc does not exist", async () => {
    const mockDocSnap = { exists: jest.fn().mockReturnValue(false) };
    getDoc.mockResolvedValueOnce(mockDocSnap);
    doc.mockReturnValueOnce("docRef");

    const res = await service._Fetch_Question("doc123");

    expect(res).toEqual({ success: false, error: "Not found" });
  });

  test("GetAllEvents should return success with events", async () => {
    const mockDocs = [
      { id: "e1", data: () => ({ title: "Event 1" }) },
      { id: "e2", data: () => ({ title: "Event 2" }) },
    ];
    getDocs.mockResolvedValueOnce({ docs: mockDocs });
    collection.mockReturnValueOnce("eventsRef");
    query.mockReturnValueOnce("queryRef");
    where.mockReturnValueOnce("whereRef");

    const res = await service.GetAllEvents("user123");

    expect(getDocs).toHaveBeenCalledWith("queryRef");
    expect(res).toEqual({
      success: true,
      data: [
        { id: "e1", title: "Event 1" },
        { id: "e2", title: "Event 2" },
      ],
    });
  });

  test("GetAllEvents should return failure on error", async () => {
    const error = new Error("Firestore getDocs error");
    getDocs.mockRejectedValueOnce(error);
    collection.mockReturnValueOnce("eventsRef");
    query.mockReturnValueOnce("queryRef");
    where.mockReturnValueOnce("whereRef");

    const res = await service.GetAllEvents("user123");

    expect(res).toEqual({ success: false, error });
  });
});
