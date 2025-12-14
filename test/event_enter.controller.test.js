// path: test/event.enter.controller.test.js

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { EventEnterController } from "../src/controller/Events/event_enter.controller.js";
import { EventService } from "../src/services/Events/_repositories/_factory.event.service.js";
import { SERVICE, routes } from "../src/Utilities.js";

describe("EventEnterController", () => {
    let controller;
    let mockService;
    let navigate;
    let setCurrentScoreState;

    beforeEach(() => {
        navigate = vi.fn();
        setCurrentScoreState = vi.fn();

        // Mock EventService methods
        mockService = {
            UserInfoManagement: vi.fn(),
            EntryRegulator: vi.fn(),
            FetchScoreCard: vi.fn(),
            AddToParticipationList: vi.fn(),
            FetchAllParticipationList: vi.fn(),
        };

        // Mock factory call
        vi.spyOn(EventService, "createService").mockReturnValue(mockService);

        controller = new EventEnterController(navigate, setCurrentScoreState);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    // ---------------------------------------------------------
    // Navigation Test
    // ---------------------------------------------------------
    describe("_handleNavigation_EventSolve", () => {
        it("should navigate to event solving page with state", () => {
            const item = { id: "event1" };

            controller._handleNavigation_EventSolve(item);

            expect(navigate).toHaveBeenCalledWith(routes.solving_page, {
                state: { event: item },
            });
        });
    });

    // ---------------------------------------------------------
    // _handleUserInformationForEvent
    // ---------------------------------------------------------
    describe("_handleUserInformationForEvent", () => {
        it("should call UserInfoManagement with correct parameters", () => {
            mockService.UserInfoManagement.mockResolvedValue({
                success: true
            });

            controller._handleUserInformationForEvent({
                eventID: "EVT101",
                userID: "USR55",
                name: "John Doe"
            });

            expect(mockService.UserInfoManagement).toHaveBeenCalledWith({
                eventID: "EVT101",
                participatorName: "John Doe",
                participatorID: "USR55"
            });
        });
    });

    // ---------------------------------------------------------
    // _handleEventEntry
    // ---------------------------------------------------------
    describe("_handleEventEntry", () => {
        it("should return success and data from service", async () => {
            mockService.EntryRegulator.mockResolvedValue({
                data: { status: "allowed" }
            });

            const res = await controller._handleEventEntry({
                eventID: "EVT50",
                userID: "USR10"
            });

            expect(mockService.EntryRegulator).toHaveBeenCalledWith({
                eventID: "EVT50",
                userID: "USR10",
            });

            expect(res).toEqual({
                success: true,
                data: { status: "allowed" }
            });
        });
    });

    // ---------------------------------------------------------
    // _handleFetchScoreCard
    // ---------------------------------------------------------
    describe("_handleFetchScoreCard", () => {
        it("should fetch score card and update state", async () => {
            mockService.FetchScoreCard.mockResolvedValue({
                data: { score: 99 }
            });

            await controller._handleFetchScoreCard({ eventID: "EVT100" });

            expect(mockService.FetchScoreCard).toHaveBeenCalledWith({
                eventId: "EVT100"
            });

            expect(setCurrentScoreState).toHaveBeenCalledWith({ score: 99 });
        });
    });

    // ---------------------------------------------------------
    // addEventToParticipation
    // ---------------------------------------------------------
    describe("addEventToParticipation", () => {
        it("should call AddToParticipationList with params", async () => {
            mockService.AddToParticipationList.mockResolvedValue({});

            await controller.addEventToParticipation({
                eventID: "EVT77",
                id: "USR20",
                title: "Sample Event"
            });

            expect(mockService.AddToParticipationList).toHaveBeenCalledWith({
                id: "USR20",
                title: "Sample Event",
                eventId: "EVT77",
            });
        });
    });

    // ---------------------------------------------------------
    // sortParticipants
    // ---------------------------------------------------------
    describe("sortParticipants", () => {
        it("should fetch participants", async () => {
            mockService.FetchAllParticipationList.mockResolvedValue({
                data: [{ id: "P1" }]
            });

            await controller.sortParticipants({ eventID: "EVT300" });

            expect(mockService.FetchAllParticipationList).toHaveBeenCalledWith({
                eventID: "EVT300",
            });
        });

        it("should log when no participants found", async () => {
            // mock console.log
            const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

            mockService.FetchAllParticipationList.mockResolvedValue({ data: [] });

            await controller.sortParticipants({ eventID: "EVT300" });

            expect(consoleSpy).toHaveBeenCalledWith("No participation found this Event");

            consoleSpy.mockRestore();
        });
    });
});
