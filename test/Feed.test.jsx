// Path: src/pages/__tests__/Feed.test.jsx

import { render, screen } from "@testing-library/react";
import Feed from "../Feed.jsx";
import { useNavigate } from "react-router-dom";
import { useGlobal } from "../../../GlobalContext.jsx";

// Mock hooks
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));
jest.mock("../../../GlobalContext.jsx", () => ({
  useGlobal: jest.fn(),
}));

// Mock FeedController
jest.mock("../../../controller/users/feed.controller.js", () => {
  return {
    FeedController: jest.fn().mockImplementation(() => ({
      fetchEventHandler: jest.fn().mockResolvedValue(),
      fetchQuestionHandler: jest.fn().mockResolvedValue(),
      fetchQuestionCount_byDifficulty: jest.fn().mockResolvedValue(),
      fetchTotalNumberOfQuestions: jest.fn().mockResolvedValue(),
      fetchSolvedQuestions_count: jest.fn().mockResolvedValue(),
      fetchQuestionCount_byCategory: jest.fn().mockResolvedValue(),
      handleNavigation_EventEnter: jest.fn(),
      handleNavigation_MoreEvent: jest.fn(),
      handleNavigation_MoreQuestion: jest.fn(),
    })),
  };
});

describe("Feed Component", () => {
  let navigateMock;

  beforeEach(() => {
    navigateMock = jest.fn();
    useNavigate.mockReturnValue(navigateMock);
    useGlobal.mockReturnValue({ user_uid: "user123" });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders Feed component without crashing", async () => {
    render(<Feed />);
    expect(await screen.findByText(/All Coding Challenges/i)).toBeInTheDocument();
    expect(await screen.findByText(/Event Listings/i)).toBeInTheDocument();
  });

  test("redirects to login if user_uid is missing", () => {
    useGlobal.mockReturnValue({ user_uid: null });
    render(<Feed />);
    expect(navigateMock).toHaveBeenCalledWith("/login", { replace: true });
  });
});

