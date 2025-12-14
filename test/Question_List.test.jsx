// Path: src/pages/__tests__/Question_List.test.jsx
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Question_List from "../Question_list.jsx";
import { useGlobal } from "../../GlobalContext.jsx";
import { BrowserRouter } from "react-router-dom";

// Mock GlobalContext
jest.mock("../../GlobalContext.jsx", () => ({
  useGlobal: jest.fn(),
}));

// Mock Controller
jest.mock("../../controller/Questions/question_list.controller.js", () => ({
  QuestionListController: jest.fn().mockImplementation(() => ({
    handleFetchAll: jest.fn(),
    handleSolvedProblemList: jest.fn(),
    handleEditButton: jest.fn(),
    handleDeleteQuestion: jest.fn(),
    handleSolveButton: jest.fn(),
  })),
}));

// Mock Background
jest.mock("../../Components/__Admin_Login.jsx", () => ({
  Background_Particles: () => <div data-testid="bg-particles" />,
}));

// Mock nested components
jest.mock("../../Components/__Question_List.jsx", () => ({
  Question_list: ({ children }) => <div>{children}</div>,
  QuestionHeader: ({ text }) => <div>{text}</div>,
  NestedList: () => <div data-testid="nested-list" />,
  Question_Description: ({ children }) => <div>{children}</div>,
  Question_Showing_Description: () => <div data-testid="question-desc" />,
}));

describe("Question_List Component", () => {
  beforeEach(() => {
    useGlobal.mockReturnValue({ user_uid: "test-user" });
  });

  const renderComponent = () =>
    render(
      <BrowserRouter>
        <Question_List />
      </BrowserRouter>
    );

  test("renders Question List title", () => {
    renderComponent();
    expect(screen.getByText("Question List")).toBeInTheDocument();
  });

  test("renders NestedList and Background_Particles", () => {
    renderComponent();
    expect(screen.getByTestId("nested-list")).toBeInTheDocument();
    expect(screen.getByTestId("bg-particles")).toBeInTheDocument();
  });

  test("shows 'Select a question' when no question is selected", () => {
    renderComponent();
    expect(screen.getByText("Select a question")).toBeInTheDocument();
  });

  test("calls controller methods on mount", async () => {
    renderComponent();
    const controllerInstance = require("../../controller/Questions/question_list.controller.js").QuestionListController.mock
      .instances[0];

    await waitFor(() => {
      expect(controllerInstance.handleFetchAll).toHaveBeenCalled();
      expect(controllerInstance.handleSolvedProblemList).toHaveBeenCalledWith("test-user");
    });
  });
});
