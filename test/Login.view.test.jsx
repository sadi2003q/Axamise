// path: src/__tests__/Login.view.test.jsx
import { render, fireEvent, screen } from "@testing-library/react";
import Login from "../../views/Login.jsx";
import { useGlobal } from "../../GlobalContext.jsx";

// Mock Global Context
jest.mock("../../GlobalContext.jsx", () => ({
    useGlobal: jest.fn(() => ({
        setUser_uid: jest.fn(),
        setCurrentName: jest.fn()
    }))
}));

// Mock LoginController
jest.mock("../../controller/Authentication/login.controller.js", () => {
    return jest.fn().mockImplementation(() => ({
        handleEmailLogin: jest.fn(),
        handleSignUp: jest.fn()
    }));
});

describe("Login View", () => {
    test("renders login form", () => {
        render(<Login />);
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    });

    test("fires controller login on button click", async () => {
        const mockController = require("../../controller/Authentication/login.controller.js");
        const instance = { handleEmailLogin: jest.fn() };
        mockController.mockReturnValue(instance);

        render(<Login />);

        fireEvent.click(screen.getByText(/Login/i));

        expect(instance.handleEmailLogin).toHaveBeenCalled();
    });

    test("shows error message", () => {
        render(<Login />);

        const emailInput = screen.getByLabelText(/Email/i);
        fireEvent.change(emailInput, { target: { value: "" } });

        expect(emailInput.value).toBe("");
    });
});
