// path: test/admin.login.controller.test.js

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Admin_LoginController } from '../src/controller/Authentication/admin.login.controller.js';
import { AuthenticationService } from "../src/services/Authentication/_factory.Authentication.service.js";
import { SERVICE } from '../src/Utilities.js'

describe("Admin_LoginController", () => {
    let controller;
    let mockService;
    let navigate, setFieldError;
    let mockUser;

    beforeEach(() => {
        mockUser = {email: "test@gmail.com", password: "password123"}
        navigate = vi.fn();
        setFieldError = vi.fn();

        mockService = {
            login: vi.fn(),
        };

        vi.spyOn(AuthenticationService, "create").mockReturnValue(mockService);

        controller = new Admin_LoginController(
            mockUser,
            navigate,
            setFieldError
        );
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe("handleEmailLogin", () => {
        it("should call service login and process success result", async () => {
            const mockResult = { success: true, id: "test-id-123" };
            mockService.login.mockResolvedValue(mockResult);

            await controller.handleEmailLogin();

            expect(AuthenticationService.create).toHaveBeenCalledWith(mockUser, SERVICE.ADMIN_LOGIN);
            expect(mockService.login).toHaveBeenCalledWith();
            expect(setFieldError).not.toHaveBeenCalled();
            // Note: navigate is commented out in the code, so not expected
        });

        it("should handle login failure with invalid credentials", async () => {
            const mockError = { code: "auth/invalid-credential", message: "Invalid credentials" };
            const mockResult = { success: false, error: mockError };
            mockService.login.mockResolvedValue(mockResult);

            await controller.handleEmailLogin();

            expect(mockService.login).toHaveBeenCalledWith();
            expect(setFieldError).toHaveBeenCalledWith("Invalid credentials. Please check your email and password.");
        });

        it("should handle login failure with invalid email", async () => {
            const mockError = { code: "auth/invalid-email", message: "Invalid email" };
            const mockResult = { success: false, error: mockError };
            mockService.login.mockResolvedValue(mockResult);

            await controller.handleEmailLogin();

            expect(mockService.login).toHaveBeenCalledWith();
            expect(setFieldError).toHaveBeenCalledWith("Invalid email format.");
        });

        it("should handle unknown login failure", async () => {
            const mockError = { code: "unknown-code", message: "Unknown error" };
            const mockResult = { success: false, error: mockError };
            mockService.login.mockResolvedValue(mockResult);

            await controller.handleEmailLogin();

            expect(mockService.login).toHaveBeenCalledWith();
            expect(setFieldError).toHaveBeenCalledWith("Unknown error");
        });
    });
});