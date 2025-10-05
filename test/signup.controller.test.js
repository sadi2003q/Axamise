import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import SignUpController from "../src/controller/Authentication/signup.controller.js"; // Adjust path as needed
import { AuthenticationService } from "../src/services/Authentication/_Authentication.service.js";
import { SERVICE } from "../src/Utilities.js"; // For verification

describe("SignUpController", () => {
    let controller;
    let mockService;
    let setId;
    let navigate;
    let setFieldError;
    let mockStudent;

    beforeEach(() => {
        mockStudent = { email: "test@email.com", password: "123456" };
        setId = vi.fn();
        navigate = vi.fn();
        setFieldError = vi.fn();

        mockService = {
            signup: vi.fn(),
            signUpWithGoogle: vi.fn(),
        };

        vi.spyOn(AuthenticationService, "create").mockReturnValue(mockService);

        controller = new SignUpController(mockStudent, setId, navigate, setFieldError);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe("handleEmailSignUp", () => {
        it("should call signup, set ID, and navigate on success", async () => {
            const mockResult = { success: true, id: "user123" };
            mockService.signup.mockResolvedValue(mockResult);

            await controller.handleEmailSignUp();

            expect(AuthenticationService.create).toHaveBeenCalledWith(mockStudent, SERVICE.signup);
            expect(mockService.signup).toHaveBeenCalled();
            expect(setId).toHaveBeenCalledWith("user123");
            expect(navigate).toHaveBeenCalledWith("/login");
            expect(setFieldError).not.toHaveBeenCalled();
        });

        it("should handle signup failure with custom message", async () => {
            const errorMessage = "Email already in use";
            mockService.signup.mockResolvedValue({
                success: false,
                error: { message: errorMessage },
            });

            await controller.handleEmailSignUp();

            expect(setFieldError).toHaveBeenCalledWith({
                field: "email",
                message: errorMessage,
            });
            expect(setId).not.toHaveBeenCalled();
            expect(navigate).not.toHaveBeenCalled();
        });

        it("should handle signup failure with fallback message", async () => {
            mockService.signup.mockResolvedValue({
                success: false,
                error: { message: undefined }, // Triggers fallback
            });

            await controller.handleEmailSignUp();

            expect(setFieldError).toHaveBeenCalledWith({
                field: "email",
                message: "Signup failed",
            });
        });

        it("should propagate rejection from signup (unhandled)", async () => {
            const mockError = new Error("Network failure");
            mockService.signup.mockRejectedValue(mockError);

            await expect(controller.handleEmailSignUp()).rejects.toThrow("Network failure");
            expect(setFieldError).not.toHaveBeenCalled();
            expect(navigate).not.toHaveBeenCalled();
        });
    });

    describe("handleGoogleSignUp", () => {
        it("should call signUpWithGoogle, set ID, and navigate on success", async () => {
            const mockResult = { success: true, id: "user123" };
            mockService.signUpWithGoogle.mockResolvedValue(mockResult);

            await controller.handleGoogleSignUp();

            expect(mockService.signUpWithGoogle).toHaveBeenCalled();
            expect(setId).toHaveBeenCalledWith("user123");
            expect(navigate).toHaveBeenCalledWith("/login");
            expect(setFieldError).not.toHaveBeenCalled();
        });

        it("should handle Google signup failure with custom message", async () => {
            const errorMessage = "Google auth failed";
            mockService.signUpWithGoogle.mockResolvedValue({
                success: false,
                error: { message: errorMessage },
            });

            await controller.handleGoogleSignUp();

            expect(setFieldError).toHaveBeenCalledWith({
                field: "email",
                message: errorMessage,
            });
            expect(setId).not.toHaveBeenCalled();
            expect(navigate).not.toHaveBeenCalled();
        });

        it("should handle Google signup failure with fallback message", async () => {
            mockService.signUpWithGoogle.mockResolvedValue({
                success: false,
                error: { message: undefined }, // Triggers fallback
            });

            await controller.handleGoogleSignUp();

            expect(setFieldError).toHaveBeenCalledWith({
                field: "email",
                message: "Signup failed",
            });
        });

        it("should propagate rejection from signUpWithGoogle (unhandled)", async () => {
            const mockError = new Error("Google API error");
            mockService.signUpWithGoogle.mockRejectedValue(mockError);

            await expect(controller.handleGoogleSignUp()).rejects.toThrow("Google API error");
            expect(setFieldError).not.toHaveBeenCalled();
            expect(navigate).not.toHaveBeenCalled();
        });
    });
});