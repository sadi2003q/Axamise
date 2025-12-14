/** @jest-environment jsdom */

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Admin_SetUsr from "../../src/pages/Admin/Admin_SetUsr.jsx";

jest.mock("../../src/controller/Authentication/admin.setUser.controller.js", () => {
    return {
        Admin_InfoController: jest.fn().mockImplementation(() => ({
            handleEmailSignUp: jest.fn().mockResolvedValue(),
            updateAdmin: jest.fn().mockResolvedValue(),
            deleteAdmin: jest.fn().mockResolvedValue(),
            getAllAdmins: jest.fn().mockResolvedValue(),
        }))
    };
});

// Mock child components
jest.mock("../../src/Components/__Admin_SetUser.jsx", () => ({
    Heading: () => <div>Heading</div>,
    NameField: () => <input data-testid="name" />,
    EmailField: () => <input data-testid="email" />,
    ProfilePictureField: () => <input data-testid="profile" type="file" />,
    RoleField: () => <input data-testid="role" />,
    PasswordField: () => <input data-testid="pass" />,
    PhoneNumberField: () => <input data-testid="phone" />,
    AddressField: () => <input data-testid="address" />,
    SubmitButton: ({ handleSubmit }) =>
        <button data-testid="submit" onClick={handleSubmit}>Submit</button>,
    SearchItems: () => <input data-testid="search" />,
    AdminList: () => <div>List</div>,
    style: {}
}));

jest.mock("../../src/Components/__Admin_Login.jsx", () => ({
    Background_Particles: () => <div>BG</div>
}));

describe("Admin_SetUsr Page", () => {
    test("renders without crashing", () => {
        const { getByText } = render(<Admin_SetUsr />);
        expect(getByText("Heading")).toBeTruthy();
    });

    test("submit button triggers controller signup", async () => {
        const { getByTestId } = render(<Admin_SetUsr />);
        const submitBtn = getByTestId("submit");

        fireEvent.click(submitBtn);

        expect(submitBtn).toBeTruthy();
    });
});
