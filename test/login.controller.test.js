import { describe, it, expect, vi, beforeEach } from "vitest";
import LoginController from "../src/controller/Authentication/login.controller.js";
import { AuthenticationService } from "../src/services/Authentication/_Authentication.service.js"; // real import

describe("LoginController", () => {
    let controller;
    let mockService;
    let setId, setCurrentName, navigate, setFieldError;

    beforeEach(() => {
        setId = vi.fn();
        setCurrentName = vi.fn();
        navigate = vi.fn();
        setFieldError = vi.fn();

        mockService = {
            login: vi.fn(),
            getUserInfo: vi.fn(),
        };

        // ✅ Spy on the static method of the real class
        vi.spyOn(AuthenticationService, "create").mockReturnValue(mockService);

        controller = new LoginController(
            { email: "test@email.com", password: "123456" },
            setId,
            setCurrentName,
            navigate,
            setFieldError
        );
    });

    it("should call login and navigate on success", async () => {
        mockService.login.mockResolvedValue({ success: true, id: "user123" });
        mockService.getUserInfo.mockResolvedValue({
            success: true,
            data: { firstName: "Adnan", lastName: "Sadi" },
        });

        await controller.handleEmailLogin();

        expect(AuthenticationService.create).toHaveBeenCalled();
        expect(mockService.login).toHaveBeenCalled();
        expect(setId).toHaveBeenCalledWith("user123");
        expect(setCurrentName).toHaveBeenCalledWith("Adnan Sadi");
        expect(navigate).toHaveBeenCalled();
    });

    it("should handle login failure correctly", async () => {
        mockService.login.mockResolvedValue({
            success: false,
            error: { message: "Invalid credentials" },
        });

        await controller.handleEmailLogin();

        expect(setFieldError).toHaveBeenCalledWith({
            field: "email",
            message: "Invalid credentials",
        });
    });


});
