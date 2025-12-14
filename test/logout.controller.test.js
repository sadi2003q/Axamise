// path: src/__tests__/logout.controller.test.js
import { LogoutController } from "../../controller/Authentication/logout.controller.js";

jest.mock("../../services/Authentication/_logout.service.js", () => ({
    LogoutService: jest.fn().mockImplementation(() => ({
        logout: jest.fn()
    }))
}));

jest.mock("../../localCache.js", () => ({
    CacheManager: {
        clearAll: jest.fn()
    }
}));

import { LogoutService } from "../../services/Authentication/_logout.service.js";
import { CacheManager } from "../../localCache.js";

describe("LogoutController", () => {
    let controller;
    let mockService;
    let setOpen, setCurrentUser, setUser_uid, setCurrentName, setAdminEmail, navigate;

    beforeEach(() => {
        mockService = new LogoutService();
        mockService.logout.mockResolvedValue({ success: true });

        setOpen = jest.fn();
        setCurrentUser = jest.fn();
        setUser_uid = jest.fn();
        setCurrentName = jest.fn();
        setAdminEmail = jest.fn();
        navigate = jest.fn();

        controller = new LogoutController({
            setOpen,
            setCurrentUser,
            setUser_uid,
            setCurrentName,
            setAdminEmail,
            navigate
        });
    });

    test("handleLogoutClick should open dialog", () => {
        controller.handleLogoutClick();
        expect(setOpen).toHaveBeenCalledWith(true);
    });

    test("handleCancel should close dialog", () => {
        controller.handleCancel();
        expect(setOpen).toHaveBeenCalledWith(false);
    });

    test("handleConfirmLogout should logout and clear state", async () => {
        await controller.handleConfirmLogout();

        expect(mockService.logout).toHaveBeenCalled();
        expect(CacheManager.clearAll).toHaveBeenCalled();

        expect(setCurrentUser).toHaveBeenCalledWith(null);
        expect(setUser_uid).toHaveBeenCalledWith("Not Defined");
        expect(setCurrentName).toHaveBeenCalledWith(null);
        expect(setAdminEmail).toHaveBeenCalledWith(null);

        expect(setOpen).toHaveBeenCalledWith(false);
        expect(navigate).toHaveBeenCalledWith("/LOGIN");
    });

    test("handleConfirmLogout should catch errors", async () => {
        mockService.logout.mockRejectedValue(new Error("test error"));

        await controller.handleConfirmLogout();

        expect(mockService.logout).toHaveBeenCalled();
    });
});
