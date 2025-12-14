// src/__tests__/Event_Create.test.jsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Event_Create from "../../pages/Event_Create.jsx";
import { useGlobal } from "../../GlobalContext.jsx";
import { useNavigate } from "react-router-dom";
import { EventCreateServiceController } from "../../controller/Events/event_create.controller.js";

jest.mock("../../GlobalContext.jsx", () => ({
  useGlobal: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
  useLocation: jest.fn().mockReturnValue({ state: {} }),
}));

jest.mock("../../controller/Events/event_create.controller.js", () => ({
  EventCreateServiceController: jest.fn().mockImplementation(() => ({
    handleUploadEvent: jest.fn(),
    handleUpdateEvent: jest.fn(),
    handleFetchEvent: jest.fn(),
  })),
}));

describe("Event_Create Component", () => {
  const navigate = jest.fn();
  const user_uid = "123";

  beforeEach(() => {
    useGlobal.mockReturnValue({ user_uid });
    useNavigate.mockReturnValue(navigate);
  });

  test("renders input fields", () => {
    render(<Event_Create />);
    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Start Time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Hours/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Minutes/i)).toBeInTheDocument();
  });

  test("calls controller handleUploadEvent on button click", async () => {
    const { EventCreateServiceController } = await import(
      "../../controller/Events/event_create.controller.js"
    );
    const mockController = {
      handleUploadEvent: jest.fn(),
      handleUpdateEvent: jest.fn(),
      handleFetchEvent: jest.fn(),
    };
    EventCreateServiceController.mockImplementation(() => mockController);

    render(<Event_Create />);
    const createBtn = screen.getByRole("button", { name: /Create/i });
    fireEvent.click(createBtn);

    await waitFor(() => {
      expect(mockController.handleUploadEvent).toHaveBeenCalled();
    });
  });
});
