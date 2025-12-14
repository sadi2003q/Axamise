// path: test/admin.approve.controller.test.js

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import { Admin_ApproveController } from "../src/controller/Admin/admin.approve.controller.js";
import { ApprovalService } from "../src/services/Admin/_base/_factory.approval.service.ts";
import { NotificationService } from "../src/services/users/_Notification.service.js";

import { ADMIN_APPROVAL_DISPLAY_MODE, SERVICE } from "../src/Utilities.ts";

describe("Admin_ApproveController", () => {
    let controller;

    // UI state setters
    let setAllPendingQuestions,
        setApprovalOpen,
        setQuestion,
        setQuestionID,
        setDisplayMode,
        setIsEmpty,
        navigate;

    // Services
    let mockService;
    let mockNotificationService;

    beforeEach(() => {
        // UI mocks
        setAllPendingQuestions = vi.fn();
        setApprovalOpen = vi.fn();
        setQuestion = vi.fn();
        setQuestionID = vi.fn();
        setDisplayMode = vi.fn();
        setIsEmpty = vi.fn();
        navigate = vi.fn();

        // Service mocks
        mockService = {
            _Fetch_All_Question: vi.fn(),
            _Delete_Specific_Function: vi.fn(),
            ApproveQuestion: vi.fn(),
            _AddModifiedQuestion: vi.fn()
        };

        mockNotificationService = {
            createNotification: vi.fn()
        };

        // Mock factory
        vi.spyOn(ApprovalService, "createService").mockReturnValue(mockService);
        vi.spyOn(NotificationService.prototype, "createNotification")
            .mockImplementation(mockNotificationService.createNotification);

        controller = new Admin_ApproveController(
            setAllPendingQuestions,
            false,
            setApprovalOpen,
            setQuestion,
            setQuestionID,
            ADMIN_APPROVAL_DISPLAY_MODE.APPROVAL,
            setDisplayMode,
            "Sample Title",
            "Sample Reason",
            setIsEmpty,
            navigate
        );
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    // ---------------------------------------------------------
    // fetchAllRequestedQuestions
    // ---------------------------------------------------------
    describe("fetchAllRequestedQuestions", () => {
        it("should fetch questions and update UI when questions exist", async () => {
            mockService._Fetch_All_Question.mockResolvedValue({
                data: [{ id: "Q01" }]
            });

            const result = await controller.fetchAllRequestedQuestions();

            expect(mockService._Fetch_All_Question).toHaveBeenCalledWith("admin");
            expect(setAllPendingQuestions).toHaveBeenCalledWith([{ id: "Q01" }]);
            expect(setQuestion).toHaveBeenCalledWith({ id: "Q01" });
            expect(setQuestionID).toHaveBeenCalledWith("Q01");

            expect(result).toEqual({ success: true, data: [{ id: "Q01" }] });
        });

        it("should set empty state when no questions exist", async () => {
            mockService._Fetch_All_Question.mockResolvedValue({ data: [] });

            await controller.fetchAllRequestedQuestions();

            expect(setIsEmpty).toHaveBeenCalledWith(true);
        });
    });

    // ---------------------------------------------------------
    // deleteQuestion
    // ---------------------------------------------------------
    describe("deleteQuestion", () => {
        it("should delete a question and return response", async () => {
            mockService._Delete_Specific_Function.mockResolvedValue({
                data: "deleted"
            });

            const res = await controller.deleteQuestion("Q10");

            expect(mockService._Delete_Specific_Function).toHaveBeenCalledWith("Q10");
            expect(res).toEqual({ success: true, data: "deleted" });
        });
    });

    // ---------------------------------------------------------
    // handleApprove
    // ---------------------------------------------------------
    describe("handleApprove", () => {
        it("should call service ApproveQuestion", () => {
            controller.handleApprove("Q100", { question: "test" });

            expect(mockService.ApproveQuestion).toHaveBeenCalledWith("Q100", {
                question: "test"
            });
        });
    });

    // ---------------------------------------------------------
    // moveToApprovalPage
    // ---------------------------------------------------------
    describe("moveToApprovalPage", () => {
        it("should set display mode and open side panel if closed", () => {
            controller.moveToApprovalPage();

            expect(setDisplayMode).toHaveBeenCalledWith(
                ADMIN_APPROVAL_DISPLAY_MODE.APPROVAL
            );
            expect(setApprovalOpen).toHaveBeenCalled();
        });
    });

    // ---------------------------------------------------------
    // handleReject
    // ---------------------------------------------------------
    describe("handleReject", () => {
        it("should change display mode and open side panel if needed", () => {
            controller.handleReject({ id: "Q1" });

            expect(setDisplayMode).toHaveBeenCalledWith(
                ADMIN_APPROVAL_DISPLAY_MODE.REJECTED
            );
            expect(setApprovalOpen).toHaveBeenCalled();
        });
    });

    // ---------------------------------------------------------
    // revertBack
    // ---------------------------------------------------------
    describe("revertBack", () => {
        it("should switch to modification mode and open panel if closed", () => {
            controller.revertBack({ id: "Q1" });

            expect(setDisplayMode).toHaveBeenCalledWith(
                ADMIN_APPROVAL_DISPLAY_MODE.MODIFICATION
            );
            expect(setApprovalOpen).toHaveBeenCalled();
        });
    });

    // ---------------------------------------------------------
    // handleModified
    // ---------------------------------------------------------
    describe("handleModified", () => {
        it("should call AddModifiedQuestion and create notification", async () => {
            mockService._AddModifiedQuestion.mockResolvedValue({});

            await controller.handleModified({
                id: "Q22",
                recipientID: "USR100"
            });

            expect(mockService._AddModifiedQuestion).toHaveBeenCalledWith({
                questionID: "Q22"
            });

            expect(mockNotificationService.createNotification).toHaveBeenCalled();
        });
    });

    // ---------------------------------------------------------
    // handleRejectQuestions
    // ---------------------------------------------------------
    describe("handleRejectQuestions", () => {
        it("should call delete and create notification", async () => {
            mockService._Delete_Specific_Function.mockResolvedValue({});

            await controller.handleRejectQuestions({
                id: "Q99",
                recipientID: "USR10"
            });

            expect(mockNotificationService.createNotification).toHaveBeenCalled();
            expect(mockService._Delete_Specific_Function).toHaveBeenCalledWith("Q99");
        });
    });

    // ---------------------------------------------------------
    // Navigation
    // ---------------------------------------------------------
    describe("Navigation", () => {
        it("should navigate to question approval page", () => {
            controller.handleNavigation_Question();
            expect(navigate).toHaveBeenCalledWith("/ADMIN_APPROVAL");
        });

        it("should navigate to event approval page", () => {
            controller.handleNavigation_Event();
            expect(navigate).toHaveBeenCalledWith("/ADMIN_APPROVALEVENT");
        });
    });
});
