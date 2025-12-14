// Path: src/services/users/__tests__/Feed.service.test.js

import { FeedService } from "../_Feed.service.js";
import { UsersRepository } from "../repository.js";

// Mock the UsersRepository
jest.mock("../repository.js", () => {
  return {
    UsersRepository: jest.fn().mockImplementation(() => ({
      _fetchRandomEvent: jest.fn(),
      _fetchRandomQuestion: jest.fn(),
      _fetchTotalNumberOfQuestion: jest.fn(),
      _fetchDifficultyCount: jest.fn(),
      _solvedQuestionCount: jest.fn(),
      _fetchQuestionCount_byCategory: jest.fn(),
    })),
  };
});

describe("FeedService", () => {
  let service;
  let repositoryMock;

  beforeEach(() => {
    service = new FeedService();
    repositoryMock = service["repository"]; // access private repository
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("_Fetch_Events calls repository._fetchRandomEvent and returns data", async () => {
    const mockResponse = { success: true, data: ["event1", "event2"] };
    repositoryMock._fetchRandomEvent.mockResolvedValue(mockResponse);

    const result = await service._Fetch_Events();
    expect(repositoryMock._fetchRandomEvent).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockResponse);
  });

  test("_Fetch_Questions calls repository._fetchRandomQuestion and returns data", async () => {
    const mockResponse = { success: true, data: ["q1", "q2"] };
    repositoryMock._fetchRandomQuestion.mockResolvedValue(mockResponse);

    const result = await service._Fetch_Questions();
    expect(repositoryMock._fetchRandomQuestion).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockResponse);
  });

  test("_Fetch_QuestionCount calls repository._fetchTotalNumberOfQuestion", async () => {
    const mockResponse = { success: true, data: 42 };
    repositoryMock._fetchTotalNumberOfQuestion.mockResolvedValue(mockResponse);

    const result = await service._Fetch_QuestionCount();
    expect(repositoryMock._fetchTotalNumberOfQuestion).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockResponse);
  });

  test("_Fetch_DifficultyCount calls repository._fetchDifficultyCount with difficulty", async () => {
    const mockResponse = { success: true, data: 10 };
    repositoryMock._fetchDifficultyCount.mockResolvedValue(mockResponse);

    const difficulty = "easy";
    const result = await service._Fetch_DifficultyCount({ difficulty });
    expect(repositoryMock._fetchDifficultyCount).toHaveBeenCalledWith({ difficulty });
    expect(result).toEqual(mockResponse);
  });

  test("_Fetch_SolvedCount calls repository._solvedQuestionCount with id", async () => {
    const mockResponse = { success: true, data: 5 };
    repositoryMock._solvedQuestionCount.mockResolvedValue(mockResponse);

    const userId = "user123";
    const result = await service._Fetch_SolvedCount({ id: userId });
    expect(repositoryMock._solvedQuestionCount).toHaveBeenCalledWith({ id: userId });
    expect(result).toEqual(mockResponse);
  });

  test("_Fetch_QuestionByCategory calls repository._fetchQuestionCount_byCategory with category", async () => {
    const mockResponse = { success: true, data: 7 };
    repositoryMock._fetchQuestionCount_byCategory.mockResolvedValue(mockResponse);

    const category = "algorithms";
    const result = await service._Fetch_QuestionByCategory({ category });
    expect(repositoryMock._fetchQuestionCount_byCategory).toHaveBeenCalledWith({ category });
    expect(result).toEqual(mockResponse);
  });
});
