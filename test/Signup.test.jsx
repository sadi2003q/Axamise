// src/__tests__/Signup.test.jsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Signup from "../../views/Authentication/Signup.jsx";
import { useNavigate } from "react-router-dom";
import { useGlobal } from "../../GlobalContext.jsx";

// Mock the hooks
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

jest.mock("../../GlobalContext.jsx", () => ({
  useGlobal: jest.fn(),
}));

// Mock SignUpController
jest.mock("../../controller/Authentication/signup.controller.js", () => {
  return jest.fn().mockImplementation(() => ({
    handleEmailSignUp: jest.fn().mockResolvedValue(),
    handleGoogleSignUp: jest.fn().mockResolvedValue(),
    handleLogin: jest.fn(),
  }));
});

describe("Signup Component", () => {
  const setUser_uid = jest.fn();
  const navigate = jest.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(navigate);
    useGlobal.mockReturnValue({ setUser_uid });
  });

  test("renders all fields", () => {
    render(<Signup />);

    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/ID/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Email$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date of Birth/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Gender/i)).toBeInTheDocument();
  });

  test("calls handleEmailSignUp on Sign Up button click", async () => {
    const { default: SignUpController } = await import(
      "../../controller/Authentication/signup.controller.js"
    );
    const mockHandleEmailSignUp = jest.fn().mockResolvedValue();
    SignUpController.mockImplementation(() => ({
      handleEmailSignUp: mockHandleEmailSignUp,
      handleGoogleSignUp: jest.fn(),
      handleLogin: jest.fn(),
    }));

    render(<Signup />);
    const signupBtn = screen.getByRole("button", { name: /Sign Up/i });
    fireEvent.click(signupBtn);

    await waitFor(() => {
      expect(mockHandleEmailSignUp).toHaveBeenCalled();
    });
  });

  test("calls handleGoogleSignUp on Google button click", async () => {
    const { default: SignUpController } = await import(
      "../../controller/Authentication/signup.controller.js"
    );
    const mockHandleGoogleSignUp = jest.fn().mockResolvedValue();
    SignUpController.mockImplementation(() => ({
      handleEmailSignUp: jest.fn(),
      handleGoogleSignUp: mockHandleGoogleSignUp,
      handleLogin: jest.fn(),
    }));

    render(<Signup />);
    const googleBtn = screen.getByRole("button", { name: /Sign in with Google/i });
    fireEvent.click(googleBtn);

    await waitFor(() => {
      expect(mockHandleGoogleSignUp).toHaveBeenCalled();
    });
  });

  test("calls handleLogin on Have an Account button click", async () => {
    const { default: SignUpController } = await import(
      "../../controller/Authentication/signup.controller.js"
    );
    const mockHandleLogin = jest.fn();
    SignUpController.mockImplementation(() => ({
      handleEmailSignUp: jest.fn(),
      handleGoogleSignUp: jest.fn(),
      handleLogin: mockHandleLogin,
    }));

    render(<Signup />);
    const loginBtn = screen.getByRole("button", { name: /Have an Account/i });
    fireEvent.click(loginBtn);

    await waitFor(() => {
      expect(mockHandleLogin).toHaveBeenCalled();
    });
  });

  test("updates input values when typing", () => {
    render(<Signup />);
    const firstNameInput = screen.getByLabelText(/First Name/i);
    fireEvent.change(firstNameInput, { target: { value: "John" } });
    expect(firstNameInput.value).toBe("John");
  });
});
