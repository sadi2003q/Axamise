// src/controller/users/__tests__/profile.controller.test.js
import { ProfileController } from "../profile.controller.js";
import { _profileService } from "../../services/users/_profile.service.ts";

jest.mock("../../services/users/_profile.service.ts");

describe("ProfileController", () => {
  let controller;
  let serviceMock;

  const mockSetUser = jest.fn();
  const mockSetTotal = jest.fn();
  const mockSetSolved = jest.fn();
  const mockSetMyEventParticipant = jest.fn();
  const mockSetMyParticipatedEvent = jest.fn();
  const mockSetMySolvedQuestions = jest.fn();
  const mockSetMyCreatedQuestions = jest.fn();

  beforeEach(() => {
    serviceMock = {
      fetch_users_Information: jest.fn(),
      fetch_Solved_Ratio: jest.fn(),
      Fetch_My_Participated_Event_Information: jest.fn(),
      Fetch_Created_Event_by_Id: jest.fn(),
      Fetch_Event_Participation_Count: jest.fn(),
      Fetch_Solved_Questions_list: jest.fn(),
      Fetch_Question_Created_ByUser: jest.fn(),
      Fetch_Question_Participant_Count: jest.fn(),
    };

    _profileService.mockImplementation(() => serviceMock);

    controller = new ProfileController(
      mockSetUser,
      mockSetTotal,
      mockSetSolved,
      mockSetMyEventParticipant,
      mockSetMyParticipatedEvent,
      mockSetMySolvedQuestions,
      mockSetMyCreatedQuestions
    );
  });

  afterEach(() => jest.clearAllMocks());

  test("getProfileInformation calls service and sets user", async () => {
    serviceMock.fetch_users_Information.mockResolvedValue({ data: { name: "John" } });

    await controller.getProfileInformation({ id: "user1" });

    expect(serviceMock.fetch_users_Information).toHaveBeenCalledWith({ id: "user1" });
    expect(mockSetUser).toHaveBeenCalledWith({ name: "John" });
  });

  test("getSolvedRatio fetches and sets total and solved questions", async () => {
    serviceMock.fetch_Solved_Ratio.mockResolvedValue({ totalQuestions: 10, solvedQuestions: 5 });

    await controller.getSolvedRatio({ id: "user1" });

    expect(serviceMock.fetch_Solved_Ratio).toHaveBeenCalledWith({ id: "user1" });
    expect(mockSetTotal).toHaveBeenCalledWith(10);
    expect(mockSetSolved).toHaveBeenCalledWith(5);
  });

  test("getMyParticipatedEventInformation sets participated events", async () => {
    serviceMock.Fetch_My_Participated_Event_Information.mockResolvedValue({ data: ["event1"] });

    await controller.getMyParticipatedEventInformation({ userID: "user1" });

    expect(mockSetMyParticipatedEvent).toHaveBeenCalledWith(["event1"]);
  });

  test("getMySolvedQuestionList sets solved questions", async () => {
    serviceMock.Fetch_Solved_Questions_list.mockReturnValue({ data: ["q1", "q2"] });

    await controller.getMySolvedQuestionList({ userID: "user1" });

    expect(mockSetMySolvedQuestions).toHaveBeenCalledWith(["q1", "q2"]);
  });
});
