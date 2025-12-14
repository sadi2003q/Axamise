import { Admin_InfoController } from "../../src/controller/admin.setUser.controller.js";
import { AuthenticationService } from "../../src/services/Authentication/_factory.Authentication.service.ts";

jest.mock("../../src/services/Authentication/_factory.Authentication.service.ts", () => ({
    AuthenticationService: {
        create: jest.fn()
    }
}));

describe("Admin_InfoController", () => {
    let mockService;
    let mockSetAdmins;

    beforeEach(() => {
        mockService = {
            signup: jest.fn(),
            getAllAdmins: jest.fn(),
            updateUser: jest.fn(),
            deleteUser: jest.fn(),
        };

        AuthenticationService.create.mockReturnValue(mockService);
        mockSetAdmins = jest.fn();
    });

    test("handleEmailSignUp() should call signup and processResult", async () => {
        const controller = new Admin_InfoController(
            { email: "admin@gmail.com", password: "12345" },
            mockSetAdmins,
            "id123"
        );

        mockService.signup.mockResolvedValue({ success: true, id: "A1" });
        const logSpy = jest.spyOn(console, "log").mockImplementation();

        await controller.handleEmailSignUp();

        expect(mockService.signup).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledWith("Admin user created with ID:", "A1");

        logSpy.mockRestore();
    });

    test("getAllAdmins() should set admins", async () => {
        const controller = new Admin_InfoController({}, mockSetAdmins, "id123");

        mockService.getAllAdmins.mockResolvedValue({
            success: true,
            data: [{ id: 1, name: "Admin A" }]
        });

        await controller.getAllAdmins();

        expect(mockService.getAllAdmins).toHaveBeenCalled();
        expect(mockSetAdmins).toHaveBeenCalledWith([{ id: 1, name: "Admin A" }]);
    });

    test("updateAdmin() should call updateUser()", async () => {
        const controller = new Admin_InfoController(
            { name: "Updated" },
            mockSetAdmins,
            "id123"
        );

        mockService.updateUser.mockResolvedValue({ success: true });
        const logSpy = jest.spyOn(console, "log").mockImplementation();

        await controller.updateAdmin();

        expect(mockService.updateUser).toHaveBeenCalledWith("id123", { name: "Updated" });
        expect(logSpy).toHaveBeenCalledWith("Admin user created with ID:", undefined);

        logSpy.mockRestore();
    });

    test("deleteAdmin() should call service deleteUser()", async () => {
        const controller = new Admin_InfoController({}, mockSetAdmins, "id123");

        mockService.deleteUser.mockResolvedValue({ success: true });
        const logSpy = jest.spyOn(console, "log").mockImplementation();

        await controller.deleteAdmin("del1");

        expect(mockService.deleteUser).toHaveBeenCalledWith("del1");
        expect(logSpy).toHaveBeenCalledWith("Admin user deleted successfully from controller file");

        logSpy.mockRestore();
    });
});
