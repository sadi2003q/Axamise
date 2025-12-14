// path: test/admin.approve.event.controller.test.js

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import { Admin_ApproveEventController } from "../src/controller/Admin/admin.approve.event.controller.js";
import { ApprovalService } from "../src/services/Admin/_base/_factory.approval.service.ts";
import { NotificationService } from "../src/services/users/_Notification.service.js";
import { EventShowService } from "../src/services/Events/_event_show.service.ts";
import { ADMIN_APPROVAL_DISPLAY_MODE, SERVICE } from "../src/Utilities.ts";

describe("Admin_ApproveEventController", () => {
  let controller;

  // UI State functions
  let setAllEvents,
      setEventModel,
      setApprovalOpen,
      setDisplayMode,
      setIsEmpty,
      setEventID,
      navigate;

  // Services
  let mockService;
  let mockNotificationService;
  let mockEventShowService;

  let fakeEventModel;
  let fakeEvents;

  beforeEach(() => {
    // Fake initial data
    fakeEventModel = { id: "EV1", createdBy_uid: "USER99" };
    fakeEvents = [{ id: "EV1" }, { id: "EV2" }];

    // UI mocks
    setAllEvents = vi.fn();
    setEventModel = vi.fn();
    setApprovalOpen = vi.fn();
    setDisplayMode = vi.fn();
    setIsEmpty = vi.fn();
    setEventID = vi.fn();
    navigate = vi.fn();

    // Service mocks
    mockService = {
      getAllPending: vi.fn(),
      approve: vi.fn(),
    };

    mockNotificationService = {
      createNotification: vi.fn(),
    };

    mockEventShowService = {
      Delete_Event: vi.fn(),
    };

    // Mock service factories
    vi.spyOn(ApprovalService, "createService").mockReturnValue(mockService);
    vi.spyOn(NotificationService.prototype, "createNotification")
        .mockImplementation(mockNotificationService.createNotification);
    vi.spyOn(EventShowService.prototype, "Delete_Event")
        .mockImplementation(mockEventShowService.Delete_Event);

    // Instantiate controller
    controller = new Admin_ApproveEventController({
      allEvents: fakeEvents,
      setAllEvents,
      eventModel: fakeEventModel,
      setEventModel,
      approvalOpen: false,
      setApprovalOpen,
      setDisplayMode,
      title: "Test Event",
      reason: "Reason Message",
      setIsEmpty,
      eventID: "EV1",
      setEventID,
      navigate
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // ===============================================================
  // PANEL OPEN FUNCTIONS
  // ===============================================================

  describe("Panel Handlers", () => {
    it("handleNotificationPanel should set modification & open panel", () => {
      controller.handleNotificationPanel();

      expect(setDisplayMode).toHaveBeenCalledWith(ADMIN_APPROVAL_DISPLAY_MODE.MODIFICATION);
      expect(setApprovalOpen).toHaveBeenCalledWith(true);
    });

    it("handleRejectionPanel should set rejected mode & open panel", () => {
      controller.handleRejectionPanel();

      expect(setDisplayMode).toHaveBeenCalledWith(ADMIN_APPROVAL_DISPLAY_MODE.REJECTED);
      expect(setApprovalOpen).toHaveBeenCalledWith(true);
    });

    it("handleApprovalPanel should set approved mode & open panel", () => {
      controller.handleApprovalPanel();

      expect(setDisplayMode).toHaveBeenCalledWith(ADMIN_APPROVAL_DISPLAY_MODE.APPROVED);
      expect(setApprovalOpen).toHaveBeenCalledWith(true);
    });
  });

  // ===============================================================
  // fetchAllPendingEvents
  // ===============================================================

  describe("fetchAllPendingEvents", () => {
    it("should populate event list and select first event", async () => {
      mockService.getAllPending.mockResolvedValue({
        data: [{ id: "EV1" }, { id: "EV2" }]
      });

      await controller.fetchAllPendingEvents();

      expect(setAllEvents).toHaveBeenCalledWith([{ id: "EV1" }, { id: "EV2" }]);
      expect(setEventID).toHaveBeenCalledWith("EV1");
      expect(setEventModel).toHaveBeenCalledWith({ id: "EV1" });
      expect(setIsEmpty).not.toHaveBeenCalled();
    });

    it("should set empty state when no events exist", async () => {
      mockService.getAllPending.mockResolvedValue({ data: [] });

      await controller.fetchAllPendingEvents();

      expect(setIsEmpty).toHaveBeenCalledWith(true);
    });
  });

  // ===============================================================
  // handleSendNotification
  // ===============================================================

  describe("handleSendNotification", () => {
    it("should send notification and approve modification", async () => {
      mockEventShowService.Delete_Event.mockResolvedValue();
      mockService.approve.mockResolvedValue();

      await controller.handleSendNotification({
        type: ADMIN_APPROVAL_DISPLAY_MODE.MODIFICATION,
        notification_type: "notify",
        mainFunctionCode: "code123"
      });

      expect(mockNotificationService.createNotification).toHaveBeenCalled();
      expect(mockService.approve).toHaveBeenCalledWith("EV1", true, "code123");
    });

    it("should delete event when rejected", async () => {
      mockEventShowService.Delete_Event.mockResolvedValue();

      await controller.handleSendNotification({
        type: ADMIN_APPROVAL_DISPLAY_MODE.REJECTED
      });

      expect(mockEventShowService.Delete_Event).toHaveBeenCalledWith("EV1");
    });
  });

  // ===============================================================
  // handleDirectApproval
  // ===============================================================

  describe("handleDirectApproval", () => {
    it("should approve event and send notification", async () => {
      mockService.approve.mockResolvedValue();
      mockNotificationService.createNotification.mockResolvedValue();

      const result = await controller.handleDirectApproval();

      expect(mockService.approve).toHaveBeenCalled();
      expect(mockNotificationService.createNotification).toHaveBeenCalled();
      expect(setApprovalOpen).toHaveBeenCalledWith(false);
      expect(setDisplayMode).toHaveBeenCalledWith(ADMIN_APPROVAL_DISPLAY_MODE.APPROVED);
      expect(result).toEqual({ success: true });
    });
  });

  // ===============================================================
  // Navigation
  // ===============================================================

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
