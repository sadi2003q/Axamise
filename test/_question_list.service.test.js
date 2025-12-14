// path: test/question_list.services.test.js

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { QuestionListService } from "../src/services/Questions/_question_list.service.js";
import { db } from "../src/firebase.js";
import { Database } from "../src/Utilities.js";

// Firestore methods mock
import * as firestore from "firebase/firestore";

describe("QuestionListService", () => {
  let service;

  beforeEach(() => {
    service = new QuestionListService();

    // Mock Firestore functions
    vi.spyOn(firestore, "collection").mockImplementation(() => "mockCollection");
    vi.spyOn(firestore, "doc").mockImplementation(() => "mockDoc");
    vi.spyOn(firestore, "getDocs");
    vi.spyOn(firestore, "deleteDoc").mockResolvedValue();
    vi.spyOn(firestore, "updateDoc").mockResolvedValue();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // -----------------------------------------------------
  // _Fetch_All_Question
  // -----------------------------------------------------
  describe("_Fetch_All_Question", () => {
    it("should fetch questions and filter out MODIFICATION status", async () => {
      const fakeDocs = [
        { id: "1", data: () => ({ title: "Q1", status: "APPROVED" }) },
        { id: "2", data: () => ({ title: "Q2", status: "MODIFICATION" }) },
        { id: "3", data: () => ({ title: "Q3" }) }
      ];

      firestore.getDocs.mockResolvedValue({
        docs: fakeDocs
      });

      const result = await service._Fetch_All_Question("admin");

      // Collection path check
      expect(firestore.collection).toHaveBeenCalledWith(db, Database.question);

      expect(result.success).toBe(true);
      expect(result.data.length).toBe(2); // Q1 + Q3
      expect(result.data.map(q => q.id)).toEqual(["1", "3"]);
    });

    it("should return an error on failure", async () => {
      firestore.getDocs.mockRejectedValue(new Error("Firestore error"));

      const result = await service._Fetch_All_Question();

      expect(result.success).toBe(false);
      expect(result.error).toBe("Error fetching questions");
    });
  });

  // -----------------------------------------------------
  // _Delete_Specific_Function
  // -----------------------------------------------------
  describe("_Delete_Specific_Function", () => {
    it("should delete a document successfully", async () => {
      const result = await service._Delete_Specific_Function("q123");

      expect(firestore.doc).toHaveBeenCalledWith(db, Database.question, "q123");
      expect(firestore.deleteDoc).toHaveBeenCalledWith("mockDoc");

      expect(result.success).toBe(true);
    });

    it("should return error on failure", async () => {
      firestore.deleteDoc.mockRejectedValue(new Error("delete failed"));

      const result = await service._Delete_Specific_Function("q123");

      expect(result.success).toBe(false);
    });
  });

  // -----------------------------------------------------
  // _FetchSolvedProblemList
  // -----------------------------------------------------
  describe("_FetchSolvedProblemList", () => {
    it("should return list of solved problem IDs", async () => {
      const mockDocs = [
        { data: () => ({ question_id: "q1" }) },
        { data: () => ({ question_id: "q2" }) }
      ];

      firestore.getDocs.mockResolvedValue({
        empty: false,
        docs: mockDocs,
      });

      const result = await service._FetchSolvedProblemList({ id: "user1" });

      expect(firestore.collection).toHaveBeenCalledWith(
          db,
          Database.student,
          "user1",
          "solvedProblems"
      );

      expect(result.success).toBe(true);
      expect(result.data).toEqual(["q1", "q2"]);
    });

    it("should return empty response if no solvedProblems subcollection exists", async () => {
      firestore.getDocs.mockResolvedValue({
        empty: true,
        docs: [],
      });

      const result = await service._FetchSolvedProblemList({ id: "user1" });

      expect(result.success).toBe(false);
      expect(result.data).toEqual([]);
    });

    it("should return error object on failure", async () => {
      firestore.getDocs.mockRejectedValue(new Error("fetch error"));

      const result = await service._FetchSolvedProblemList({ id: "user1" });

      expect(result.success).toBe(false);
      expect(result.message).toBe("Error fetching solved problem IDs.");
    });
  });

  // -----------------------------------------------------
  // _AddModifiedQuestion
  // -----------------------------------------------------
  describe("_AddModifiedQuestion", () => {
    it("should update question status to MODIFICATION", async () => {
      const result = await service._AddModifiedQuestion({ questionID: "q555" });

      expect(firestore.doc).toHaveBeenCalledWith(db, Database.question, "q555");
      expect(firestore.updateDoc).toHaveBeenCalledWith("mockDoc", {
        status: "MODIFICATION",
      });

      expect(result.success).toBe(true);
    });

    it("should return error on failure", async () => {
      firestore.updateDoc.mockRejectedValue(new Error("update failed"));

      const result = await service._AddModifiedQuestion({ questionID: "q555" });

      expect(result.success).toBe(false);
      expect(result.error).toBe("Error adding modified question");
    });
  });
});
