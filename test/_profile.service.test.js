// path: test/profile.service.test.js

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { _profileService } from "../src/services/users/_profile.service.js";
import { UsersRepository } from "../src/services/users/repository.js";

describe("_profileService", () => {
  let service;
  let mockRepository;

  beforeEach(() => {
    mockRepository = {
      _fetch_userInformation: vi.fn(),
      _fetchTotalNumberOfQuestion: vi.fn(),
      _solvedQuestionCount: vi.fn(),
      _fetch_Event_Created_by_user: vi.fn(),
      _fetch_Question_created_by_user: vi.fn(),
      _fetch_solved_Questions_list: vi.fn(),
      _Fetch_Question_Participation_Count: vi.fn(),
      _Fetch_Event_Participant_Count: vi.fn(),
      _fetch_participated_Event_Information: vi.fn(),
      _Fetch_Solved_Question_name: vi.fn(),
      _Fetch_Problem_EventCount: vi.fn(),
    };

    // Replace UsersRepository with mock object
    vi.spyOn(UsersRepository.prototype, "constructor").mockReturnValue(mockRepository);
    vi.spyOn(UsersRepository.prototype, "_fetch_userInformation").mockImplementation(mockRepository._fetch_userInformation);
    vi.spyOn(UsersRepository.prototype, "_fetchTotalNumberOfQuestion").mockImplementation(mockRepository._fetchTotalNumberOfQuestion);
    vi.spyOn(UsersRepository.prototype, "_solvedQuestionCount").mockImplementation(mockRepository._solvedQuestionCount);
    vi.spyOn(UsersRepository.prototype, "_fetch_Event_Created_by_user").mockImplementation(mockRepository._fetch_Event_Created_by_user);
    vi.spyOn(UsersRepository.prototype, "_fetch_Question_created_by_user").mockImplementation(mockRepository._fetch_Question_created_by_user);
    vi.spyOn(UsersRepository.prototype, "_fetch_solved_Questions_list").mockImplementation(mockRepository._fetch_solved_Questions_list);
    vi.spyOn(UsersRepository.prototype, "_Fetch_Question_Participation_Count").mockImplementation(mockRepository._Fetch_Question_Participation_Count);
    vi.spyOn(UsersRepository.prototype, "_Fetch_Event_Participant_Count").mockImplementation(mockRepository._Fetch_Event_Participant_Count);
    vi.spyOn(UsersRepository.prototype, "_fetch_participated_Event_Information").mockImplementation(mockRepository._fetch_participated_Event_Information);
    vi.spyOn(UsersRepository.prototype, "_Fetch_Solved_Question_name").mockImplementation(mockRepository._Fetch_Solved_Question_name);
    vi.spyOn(UsersRepository.prototype, "_Fetch_Problem_EventCount").mockImplementation(mockRepository._Fetch_Problem_EventCount);

    service = new _profileService();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // ---------------------------
  // TESTS FOR EACH METHOD
  // ---------------------------

  describe("fetch_users_Information", () => {
    it("should call repository to fetch user info", async () => {
      mockRepository._fetch_userInformation.mockResolvedValue({ data: "user-info" });

      const result = await service.fetch_users_Information({ id: "123" });

      expect(mockRepository._fetch_userInformation).toHaveBeenCalledWith({ id: "123" });
      expect(result).toEqual({ data: "user-info" });
    });
  });

  describe("fetch_Solved_Ratio", () => {
    it("should return total and solved question counts", async () => {
      mockRepository._fetchTotalNumberOfQuestion.mockResolvedValue({ data: 10 });
      mockRepository._solvedQuestionCount.mockResolvedValue({ data: 4 });

      const result = await service.fetch_Solved_Ratio({ id: "user1" });

      expect(mockRepository._fetchTotalNumberOfQuestion).toHaveBeenCalled();
      expect(mockRepository._solvedQuestionCount).toHaveBeenCalledWith({ id: "user1" });

      expect(result).toEqual({
        totalQuestions: 10,
        solvedQuestions: 4,
      });
    });
  });

  describe("Fetch_Created_Event_by_Id", () => {
    it("should fetch created events", async () => {
      mockRepository._fetch_Event_Created_by_user.mockResolvedValue({ data: "event-info" });

      const result = await service.Fetch_Created_Event_by_Id({ id: "u1" });

      expect(mockRepository._fetch_Event_Created_by_user).toHaveBeenCalledWith({ id: "u1" });
      expect(result).toEqual({ data: "event-info" });
    });
  });

  describe("Fetch_Question_Created_ByUser", () => {
    it("should fetch created questions", async () => {
      mockRepository._fetch_Question_created_by_user.mockResolvedValue({ data: ["q1"] });

      const result = await service.Fetch_Question_Created_ByUser({ id: "u1" });

      expect(mockRepository._fetch_Question_created_by_user).toHaveBeenCalledWith({ id: "u1" });
      expect(result).toEqual({ data: ["q1"] });
    });
  });

  describe("Fetch_Solved_Questions_list", () => {
    it("should fetch solved questions list", async () => {
      mockRepository._fetch_solved_Questions_list.mockResolvedValue({ data: ["solved1"] });

      const result = await service.Fetch_Solved_Questions_list({ id: "u1" });

      expect(mockRepository._fetch_solved_Questions_list).toHaveBeenCalledWith({ id: "u1" });
      expect(result).toEqual({ data: ["solved1"] });
    });
  });

  describe("Fetch_Question_Participation_Count", () => {
    it("should fetch question participation count", async () => {
      mockRepository._Fetch_Question_Participation_Count.mockResolvedValue({ data: 5 });

      const result = await service.Fetch_Question_Participation_Count({ questionId: "q123" });

      expect(mockRepository._Fetch_Question_Participation_Count).toHaveBeenCalledWith({ questionID: "q123" });
      expect(result).toEqual({ data: 5 });
    });
  });

  describe("Fetch_Event_Participation_Count", () => {
    it("should fetch event participation count", async () => {
      mockRepository._Fetch_Event_Participant_Count.mockResolvedValue({ data: 20 });

      const result = await service.Fetch_Event_Participation_Count({ eventID: "e123" });

      expect(mockRepository._Fetch_Event_Participant_Count).toHaveBeenCalledWith({ eventID: "e123" });
      expect(result).toEqual({ data: 20 });
    });
  });

  describe("Fetch_My_Participated_Event_Information", () => {
    it("should fetch participated event info", async () => {
      mockRepository._fetch_participated_Event_Information.mockResolvedValue({ data: "event" });

      const result = await service.Fetch_My_Participated_Event_Information({ userID: "u1" });

      expect(mockRepository._fetch_participated_Event_Information).toHaveBeenCalledWith({ id: "u1" });
      expect(result).toEqual({ data: "event" });
    });
  });

  describe("Fetch_Question_Name", () => {
    it("should fetch solved question name", async () => {
      mockRepository._Fetch_Solved_Question_name.mockResolvedValue({ data: "Question Title" });

      const result = await service.Fetch_Question_Name({ questionId: "q1" });

      expect(mockRepository._Fetch_Solved_Question_name).toHaveBeenCalledWith({ questionID: "q1" });
      expect(result).toEqual({ data: "Question Title" });
    });
  });

  describe("Fetch_Relevant_Counts", () => {
    it("should fetch problem/event count", async () => {
      mockRepository._Fetch_Problem_EventCount.mockResolvedValue({ data: 7 });

      const result = await service.Fetch_Relevant_Counts({ userID: "u1", type: "problem" });

      expect(mockRepository._Fetch_Problem_EventCount).toHaveBeenCalledWith({
        userID: "u1",
        type: "problem",
      });

      expect(result).toEqual({ data: 7 });
    });
  });
});
