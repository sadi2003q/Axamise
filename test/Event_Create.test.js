/// <reference types="vitest" />
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import Event_Create from "../Event_Create";
import React from "react";

// -------------------------------
// MOCK: Global context
// -------------------------------
vi.mock("../../../GlobalContext.jsx", () => ({
  useGlobal: () => ({
    user_uid: "test-user-123",
  }),
}));

// -------------------------------
// MOCK: react-router
// -------------------------------
const mockNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
  useLocation: () => ({
    state: null, // no itemID (creating new event)
  }),
}));

// -------------------------------
// MOCK: Controller
// -------------------------------
const mockHandleUploadEvent = vi.fn();

vi.mock("../../../controller/Events/event_create.controller.js", () => {
  return {
    EventCreateServiceController: vi.fn().mockImplementation(() => ({
      handleUploadEvent: mockHandleUploadEvent,
      handleUpdateEvent: vi.fn(),
      handleFetchEvent: vi.fn(),
    })),
  };
});

// -------------------------------
// MOCKED COMPONENTS
// -------------------------------
vi.mock("../../../Components/__Event_Create.jsx", () => ({
  CustomTextField: ({ label, name, value, onChange }) => (
    <input aria-label={label} name={name} value={value} onChange={onChange} />
  ),
  DescriptionField: ({ name, value, onChange }) => (
    <textarea name={name} value={value} onChange={onChange}></textarea>
  ),
  DurationTextField: ({ label, name, value, onChange }) => (
    <input aria-label={label} name={name} value={value} onChange={onChange} />
  ),
  Event_Description: ({ children }) => <div>{children}</div>,
  Event_Scheduling: ({ children }) => <div>{children}</div>,
  Event_style: {
    Outer_Container: "outer-container",
    Inner_container: "inner-container",
  },
}));

vi.mock("../../../Components/__Event_Question.jsx", () => ({
  Heading: ({ title }) => <h2>{title}</h2>,
  AddQuestionButton: ({ handleAddQuestion }) => (
    <button onClick={handleAddQuestion}>Add Question</button>
  ),
  QuestionForm: ({ index, handleDelete }) => (
    <div>
      <button onClick={() => handleDelete(index)}>Delete</button>
    </div>
  ),
}));

vi.mock("../../../Components/__Admin_Login", () => ({
  Background_Particles: () => <div></div>,
}));

// -------------------------------
// TESTS
// -------------------------------

describe("Event_Create Page Tests (Vitest)", () => {
  it("renders the page correctly with title", () => {
    render(<Event_Create />);
    expect(screen.getByText("New Event")).toBeInTheDocument();
  });

  it("default event values appear in input fields", () => {
    render(<Event_Create />);

    expect(screen.getByLabelText("Title").value).toBe("Simple Title");
    expect(screen.getByLabelText("Date (DD/MM/YYYY)").value).toBe("2023-10-01");
  });

  it("form updates when user types", () => {
    render(<Event_Create />);

    const titleInput = screen.getByLabelText("Title");
    fireEvent.change(titleInput, { target: { value: "Updated Title" } });

    expect(titleInput.value).toBe("Updated Title");
  });

  it("Add Question Button adds a new question", () => {
    render(<Event_Create />);

    const addButton = screen.getByText("Add Question");
    fireEvent.click(addButton);

    // should have 2 delete buttons (initial + new)
    expect(screen.getAllByText("Delete").length).toBe(2);
  });

  it("Create button triggers event upload", () => {
    render(<Event_Create />);

    const button = screen.getByText("Create");
    fireEvent.click(button);

    expect(mockHandleUploadEvent).toHaveBeenCalledTimes(1);
  });
});
