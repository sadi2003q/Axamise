// src/__tests__/Event_Show.test.jsx
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Event_Show from "../../pages/Event_Show.jsx";
import { useGlobal } from "../../GlobalContext.jsx";
import { useNavigate } from "react-router-dom";
import { EventShowController } from "../../controller/Events/event_show.controller.js";

jest.mock("../../GlobalContext.jsx", () => ({
    useGlobal: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
    useNavigate: jest.fn(),
}));

jest.mock("../../controller/Events/event_show.controller.js", () => ({
    EventShowController: jest.fn().mockImplementation(() => ({
        fetchEvents: jest.fn().mockResolvedValue(),
        handleNavigation_EventEnter: jest.fn(),
        handleAddQuestion: jest.fn(),
        handleEdit: jest.fn(),
        handleDelete: jest.fn(),
    })),
}));

describe("Event_Show Component", () => {
    const navigate = jest.fn();

    beforeEach(() => {
        useGlobal.mockReturnValue({ user_uid: "u1" });
        useNavigate.mockReturnValue(navigate);
    });

    test("renders heading and triggers fetchEvents", async () => {
        render(<Event_Show />);
        expect(screen.getByText(/Events Hub/i)).toBeInTheDocument();

        await waitFor(() => {
            expect(EventShowController).toHaveBeenCalled();
        });
    });

    test("redirects to login if no user_uid", () => {
        useGlobal.mockReturnValue({ user_uid: null });
        render(<Event_Show />);
        expect(navigate).toHaveBeenCalledWith(expect.any(String));
    });
});
