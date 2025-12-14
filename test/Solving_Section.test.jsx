// Path: src/pages/__tests__/Solving_Section.test.jsx

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Solving_Section from "../Solving_Section.jsx";
import { BrowserRouter } from "react-router-dom";
import { useGlobal } from "../../GlobalContext.jsx";
import { SolvingSectionController } from "../../controller/Questions/solving_section.controller.js";

// ---------------------- MOCKS ----------------------

// Mock GlobalContext
jest.mock("../../GlobalContext.jsx", () => ({
  useGlobal: jest.fn(),
}));

// Mock Controller
jest.mock("../../controller/Questions/solving_section.controller.js", () => ({
  SolvingSectionController: jest.fn().mockImplementation(() => ({
    fetchQuestion: jest.fn().mockResolvedValue({}),
    handleRunCode: jest.fn().mockResolvedValue({}),
    handleIfSolvedPreviously: jest.fn().mockResolvedValue({ data: true }),
    addToSolverList: jest.fn().mockResolvedValue({}),
    addToProblemEncountered: jest.fn().mockResolvedValue({}),
  })),
}));

// Mock Monaco Editor
jest.mock("@monaco-editor/react", () => {
  return function MockEditor(props) {
    return <textarea data-testid="editor" value={props.defaultValue} onChange={(e) => props.onChange(e.target.value)} />;
  };
});

// ---------------------- TESTS ----------------------

describe("Solving_Section Component", () => {
  beforeEach(() => {
    useGlobal.mockReturnValue({ user_uid: "test-user", currentName: "Test User" });
  });

  const renderComponent = (state = {}) =>
    render(
      <BrowserRouter>
        <Solving_Section />
      </BrowserRouter>
    );

  test("renders component and displays question title", async () => {
    renderComponent();

    const title = await screen.findByText(/Demo/i);
    expect(title).toBeInTheDocument();
  });

  test("disables Run Code button when editor is empty", () => {
    renderComponent();

    const button = screen.getByRole("button", { name: /Run the code/i });
    expect(button).toBeDisabled();
  });

  test("enables Run Code button when editor has code", async () => {
    renderComponent();

    const editor = screen.getByTestId("editor");
    const button = screen.getByRole("button", { name: /Run the code/i });

    fireEvent.change(editor, { target: { value: "int main() { return 0; }" } });

    await waitFor(() => {
      expect(button).not.toBeDisabled();
    });
  });

  test("calls handleRunCode when Run Code button is clicked", async () => {
    renderComponent();

    const editor = screen.getByTestId("editor");
    const button = screen.getByRole("button", { name: /Run the code/i });

    fireEvent.change(editor, { target: { value: "int main() { return 0; }" } });

    await waitFor(() => {
      fireEvent.click(button);
    });

    const controllerInstance = SolvingSectionController.mock.instances[0];
    expect(controllerInstance.handleRunCode).toHaveBeenCalled();
  });

  test("renders countdown timer for events", async () => {
    // Simulate location.state with event
    jest.spyOn(require("react-router-dom"), "useLocation").mockReturnValue({
      state: {
        event: { title: "Test Event", hours: 0, minutes: 1, questions: [] },
      },
    });

    render(
      <BrowserRouter>
        <Solving_Section />
      </BrowserRouter>
    );

    expect(screen.getByText("Test Event")).toBeInTheDocument();
    expect(screen.getByText("00")).toBeInTheDocument(); // hours
    expect(screen.getAllByText("01")[0]).toBeInTheDocument(); // minutes
  });
});
