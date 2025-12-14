// path: src/__tests__/Logout.view.test.jsx
import { render, fireEvent, screen } from "@testing-library/react";
import Logout from "../../views/Logout.jsx";

jest.mock("../../controller/Authentication/logout.controller.js", () => {
    return {
        LogoutController: jest.fn().mockImplementation(() => ({
            handleLogoutClick: jest.fn(),
            handleCancel: jest.fn(),
            handleConfirmLogout: jest.fn()
        }))
    };
});

jest.mock("../../GlobalContext.jsx", () => ({
    useGlobal: jest.fn(() => ({
        user_uid: "123",
        setCurrentUser: jest.fn(),
        setUser_uid: jest.fn(),
        setCurrentName: jest.fn(),
        setAdminEmail: jest.fn()
    }))
}));

jest.mock("react-router-dom", () => ({
    useNavigate: jest.fn(() => jest.fn())
}));

describe("Logout View", () => {
    test("renders logout button", () => {
        render(<Logout />);
        expect(screen.getByText(/Logout/i)).toBeInTheDocument();
    });

    test("calls controller.handleLogoutClick when logout button clicked", () => {
        const mockController = require("../../controller/Authentication/logout.controller.js");
        const instance = { handleLogoutClick: jest.fn() };
        mockController.LogoutController.mockReturnValue(instance);

        render(<Logout />);

        fireEvent.click(screen.getByText("Logout"));

        expect(instance.handleLogoutClick).toHaveBeenCalled();
    });

    test("confirm button calls controller.handleConfirmLogout", () => {
        const mockController = require("../../controller/Authentication/logout.controller.js");
        const instance = {
            handleLogoutClick: jest.fn(),
            handleCancel: jest.fn(),
            handleConfirmLogout: jest.fn()
        };

        mockController.LogoutController.mockReturnValue(instance);

        render(<Logout />);

        fireEvent.click(screen.getByText("Logout")); // open dialog

        expect(instance.handleLogoutClick).toHaveBeenCalled();
    });
});
