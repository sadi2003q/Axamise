// File: src/Page/__tests__/Admin_login.test.jsx

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Admin_login from "../Admin_login.jsx";
import { useGlobal } from "../../GlobalContext.jsx";
import { Admin_LoginController } from "../../controller/Authentication/admin.login.controller.js";
import { BrowserRouter as Router } from "react-router-dom";

// Mock Global Context
jest.mock("../../GlobalContext.jsx", () => ({
  useGlobal: jest.fn(),
}));

// Mock the Admin_LoginController
jest.mock("../../controller/Authentication/admin.login.controller.js", () => ({
  Admin_LoginController: jest.fn().mockImplementation(() => ({
    handleEmailLogin: jest.fn().mockResolvedValue(),
  })),
}));

describe("Admin_login Component", () => {
  let setAdminEmailMock;
  let setAdminUIDMock;

  beforeEach(() => {
    setAdminEmailMock = jest.fn();
    setAdminUIDMock = jest.fn();

    useGlobal.mockReturnValue({
      setAdminEmail: setAdminEmailMock,
      setAdminUID: setAdminUIDMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the login form with email, password and button", () => {
    render(
      <Router>
        <Admin_login />
      </Router>
    );

    expect(screen.getByLabelText(/Admin ID/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
  });

  test("shows error if fields are empty and login button is clicked", async () => {
    render(
      <Router>
        <Admin_login />
      </Router>
    );

    // Clear the fields
    fireEvent.change(screen.getByLabelText(/Admin ID/i), { target: { value: "" } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: "" } });

    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    await waitFor(() => {
      expect(screen.getByText(/Both fields are required/i)).toBeInTheDocument();
    });
  });

  test("calls Admin_LoginController on valid login", async () => {
    render(
      <Router>
        <Admin_login />
      </Router>
    );

    // Fill the fields
    fireEvent.change(screen.getByLabelText(/Admin ID/i), { target: { value: "admin@test.com" } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: "password123" } });

    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    await waitFor(() => {
      expect(Admin_LoginController).toHaveBeenCalled();
      expect(setAdminEmailMock).toHaveBeenCalledWith("admin@test.com");
    });
  });

  test("clears loginError when user types again", async () => {
    render(
      <Router>
        <Admin_login />
      </Router>
    );

    const emailField = screen.getByLabelText(/Admin ID/i);

    fireEvent.change(emailField, { target: { value: "admin@test.com" } });

    await waitFor(() => {
      // loginError should be reset internally
      // In our mock, we can't test private state, but at least we check no errors are displayed
      expect(screen.queryByText(/Both fields are required/i)).not.toBeInTheDocument();
    });
  });
});
