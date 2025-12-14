// Path: src/controller/users/__tests__/feed.controller.test.js

import { FeedController } from "../feed.controller.js";
import { FeedService } from "../../services/users/_Feed.service.js";
import { LocalCache } from "../../localCache.js";

// Mock FeedService and LocalCache
jest.mock("../../services/users/_Feed.service.js");
jest.mock("../../localCache.js");

describe("FeedController", () => {
  let controller;
  let setRandomEvent, setRandomQuestion, navigate;
  let setEasyQuestionCount, setMediumQuestionCount, setHardQuestionCount;
  let setSolvedQuestionCount, setTotalNumberOfQuestions, setQuestionCount_Category;
  let serviceMock, cacheMock, questionCacheMock;

  beforeEach(() => {
    // Mock functions for state setters
    setRandomEvent = jest.fn();
    setRandomQuestion = jest.fn();
    navigate = jest.fn();
    setEasyQuestionCount = jest.fn();
    setMediumQuestionCount = jest.fn();
    setHardQuestionCount = jest.fn();
    setSolvedQuestionCount = jest.fn();
    setTotalNumberOfQuestions = jest.fn();
    setQuestionCount_Category = jest.fn();

    // Mock service methods
    serviceMock = {
      _Fetch_Events: jest.fn(),
      _Fetch_Questions: jest.fn(),
      _Fetch_QuestionCount: jest.fn(),
      _Fetch_DifficultyCount: jest.fn(),
      _Fetch_SolvedCount: jest.fn(),
      _Fetch_QuestionByCategory: jest.fn(),
    };

    FeedService.mockImplementation(() => serviceMock);

    // Mock LocalCache
    cacheMock = { load: jest.fn(), isSame: jest.fn(), save: jest.fn() };
    questionCacheMock = { load: jest.fn(), isSame: jest.fn(), save: jest.fn() };
    LocalCache.mockImplementation((key) =>
      key === "eventCache" ? cacheMock : questionCacheMock
    );

    // Initialize controller
    controller = new FeedController(
      setRandomEvent,
      setRandomQuestion,
      navigate,
      setEasyQuestionCount,
      setMediumQuestionCount,
      setHardQuestionCount,
      setSolvedQuestionCount,
      setTotalNumberOfQuestions,
      setQuestionCount_Category
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("fetchEventHandler uses cache if exists and fetches fresh events", async () => {
    const cachedData = [{ title: "cachedEvent" }];
    const fetchedData = [{ title: "fetchedEvent" }];
    cacheMock.load.mockReturnValue(cachedData);
    cacheMock.isSame.mockReturnValue(false);
    serviceMock._Fetch_Events.mockResolvedValue({ success: true, data: fetchedData });

    await controller.fetchEventHandler();

    expect(setRandomEvent).toHaveBeenCalledWith(expect.arrayContaining(cachedData));
    expect(serviceMock._Fetch_Events).toHaveBeenCalledTimes(1);
    expect(cacheMock.save).toHaveBeenCalledWith(fetchedData);
    expect(setRandomEvent).toHaveBeenCalledWith(expect.arrayContaining(fetchedData));
  });

  test("fetchQuestionHandler uses cache and fetches fresh questions", async () => {
    const cachedData = [{ id: "q1" }];
    const fetchedData = [{ id: "q2" }];
    questionCacheMock.load.mockReturnValue(cachedData);
    questionCacheMock.isSame.mockReturnValue(false);
    serviceMock._Fetch_Questions.mockResolvedValue({ success: true, data: fetchedData });

    await controller.fetchQuestionHandler();

    expect(setRandomQuestion).toHaveBeenCalledWith(expect.arrayContaining(cachedData));
    expect(serviceMock._Fetch_Questions).toHaveBeenCalledTimes(1);
    expect(questionCacheMock.save).toHaveBeenCalledWith(fetchedData);
    expect(setRandomQuestion).toHaveBeenCalledWith(expect.arrayContaining(fetchedData));
  });

  test("fetchQuestionCount_byDifficulty calls correct setter", async () => {
    serviceMock._Fetch_DifficultyCount.mockResolvedValue({ data: 5 });
    await controller.fetchQuestionCount_byDifficulty({ difficulty: "easy" });
    expect(setEasyQuestionCount).toHaveBeenCalledWith(5);
  });

  test("fetchSolvedQuestions_count sets solved count", async () => {
    serviceMock._Fetch_SolvedCount.mockResolvedValue({ data: 7 });
    await controller.fetchSolvedQuestions_count({ id: "user1" });
    expect(setSolvedQuestionCount).toHaveBeenCalledWith(7);
  });

  test("fetchQuestionCount_byCategory updates category counts", async () => {
    const categories = ["algorithms", "ds"];
    serviceMock._Fetch_QuestionByCategory
      .mockResolvedValueOnce({ data: 3, message: "" })
      .mockResolvedValueOnce({ data: 2, message: "" });
    Object.values = jest.fn(() => categories);

    await controller.fetchQuestionCount_byCategory();
    expect(setQuestionCount_Category).toHaveBeenCalledTimes(2);
  });
});
