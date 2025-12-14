// File: src/services/__tests__/admin.approve.service.test.js

import { Admin_ApproveService } from "../src/services/Admin/_admin.approver.service.js";
import { db } from "../src/firebase.js";
import { setDoc, doc } from "firebase/firestore";
import { jest, describe, test, expect, beforeEach } from "@jest/globals";

jest.mock("../src/firebase.js", () => ({
  db: {}
}));

jest.mock("firebase/firestore", () => ({
  setDoc: jest.fn(),
  doc: jest.fn(),
  serverTimestamp: jest.fn(),
}));

describe("Admin_ApproveService", () => {
  let service;

  beforeEach(() => {
    service = new Admin_ApproveService();
    service._Delete_Specific_Function = jest.fn().mockResolvedValue({});
    jest.clearAllMocks();
  });

  test("getAllPending writes to Firestore and deletes the question", async () => {
    const fakeQuestion = {
      question: {
        createdBy: "user",
        createdBy_uid: "user123",
        description: "desc",
        difficulty: "Medium",
        event_uid: "E123",
        mark: 5,
        title: "Test",
        type: "MCQ"
      },
      approvedBy: "admin",
      approvedBy_uid: "admin123",
      functionName: "myFunc",
      returnType: "int",
      status: "Approved",
      mainFunctionCode: "code"
    };

    // Mock doc function to return a fake reference
    doc.mockReturnValue("docRef");

    await service.getAllPending("q1", fakeQuestion);

    // Firestore doc should be created with correct parameters
    expect(doc).toHaveBeenCalledWith(db, "approvedQuestions", "q1");

    expect(setDoc).toHaveBeenCalledWith("docRef", expect.objectContaining({
      approvedBy: "admin",
      approvedBy_uid: "admin123",
      createdBy: "user",
      createdBy_uid: "user123",
      description: "desc",
      difficulty: "Medium",
      event_uid: "E123",
      functionName: "myFunc",
      mark: 5,
      returnType: "int",
      status: "Approved",
      title: "Test",
      type: "MCQ",
      mainFunctionCode: "code"
    }));

    // Should call _Delete_Specific_Function after approval
    expect(service._Delete_Specific_Function).toHaveBeenCalledWith("q1");
  });

  // test("getAllPending returns error when setDoc fails", async () => {
  //   const fakeQuestion = { question: {} };
  //
  //   setDoc.mockImplementationOnce(() => { throw new Error("Firestore error"); });
  //
  //   const result = await service.getAllPending("q2", fakeQuestion);
  //
  //   expect(result).toEqual({ success: false, error: "Firestore error" });
  // });
});
