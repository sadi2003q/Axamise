// src/__tests__/EventStart.test.jsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EventStart from "../../pages/EventStart.jsx";
import { useGlobal } from "../../GlobalContext.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import { EventEnterController } from "../../controller/Events/event_enter.controller.js";

jest.mock("../../GlobalContext.jsx", () => ({
    useGlobal: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
    useNavigate: jest.fn(),
    useLocation: jest.fn(),
}));

jest.mock("../../controller/Events/event_enter.controller.js", () => ({
    EventEnterController: jest.fn().mockImplementation(() => ({
        _handleEventEntry: jest.fn().mockResolvedValue({ data: false }),
        _handleFetchScoreCard: jest.fn().mockResolvedValue(),
        _handleUserInformationForEvent: jest.fn(),
        _handleNavigation_EventSolve: jest.fn(),
        addEventToParticipation: jest.fn().mockResolvedValue({ success: true }),
    })),
}));

describe("EventStart Component", () => {
    const navigate = jest.fn();
    const user_uid = "u1";

    beforeEach(() => {
        useGlobal.mockReturnValue({ currentName: "Tester", user_uid });
        useNavigate.mockReturnValue(navigate);
        useLocation.mockReturnValue({ state: { item: { id: "e1", title: "Event 1", allQuestions: [{ point: 10 }] } } });
    });

    test("renders event info and button", () => {
        render(<EventStart />);
        expect(screen.getByText(/AI Challenge 2025/i)).toBeInTheDocument();
        expect(screen.getByText(/Start Event/i)).toBeInTheDocument();
    });

    test("start button calls controller methods", async () => {
        render(<EventStart />);
        const btn = screen.getByRole("button", { name: /Start Event/i });
        fireEvent.click(btn);

        await waitFor(() => {
            const controllerInstance = EventEnterController.mock.results[0].value;
            expect(controllerInstance._handleUserInformationForEvent).toHaveBeenCalled();
            expect(controllerInstance._handleNavigation_EventSolve).toHaveBeenCalled();
            expect(controllerInstance.addEventToParticipation).toHaveBeenCalled();
        });
    });
});
