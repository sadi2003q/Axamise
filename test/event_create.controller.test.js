// src/__tests__/event_create.controller.test.js
import { EventCreateServiceController } from "../../controller/Events/event_create.controller.js";
import { Events_Model } from "../../models/Event_Model.js";
import { EventCreateService } from "../../services/Events/_event_create.service.ts";

jest.mock("../../services/Events/_repositories/_factory.event.service.js", () => ({
  EventService: {
    createService: jest.fn(() => ({
      _Upload_Event: jest.fn(),
      _Update_Event: jest.fn(),
      _Fetch_Event: jest.fn(),
    })),
  },
}));

describe("EventCreateServiceController", () => {
  let controller;
  let setEvent;
  let setFieldError;
  let navigate;
  let event;

  beforeEach(() => {
    setEvent = jest.fn();
    setFieldError = jest.fn();
    navigate = jest.fn();

    event = new Events_Model({
      title: "Test Event",
      description: "Test Desc",
      date: "2023-10-01",
      startTime: "10:00",
      duration: { hours: 2, minutes: 30 },
      createdBy: "Tester",
      createdBy_uid: "123",
      createdAt: Date.now(),
    });

    controller = new EventCreateServiceController({
      event,
      setEvent,
      setFieldError,
      navigate,
    });
  });

  test("isValid returns true for complete event", () => {
    expect(controller.isValid()).toBe(true);
  });

  test("handleUploadEvent calls service when valid", async () => {
    controller.service._Upload_Event.mockResolvedValue({ success: true });
    await controller.handleUploadEvent();
    expect(controller.service._Upload_Event).toHaveBeenCalled();
  });

  test("handleUploadEvent sets error when invalid", async () => {
    controller.event.title = "";
    await controller.handleUploadEvent();
    expect(setFieldError).toHaveBeenCalledWith({
      field: "general",
      message: "Please fill in all required fields.",
    });
  });

  test("processResult navigates on success", () => {
    controller.processResult({ success: true });
    expect(navigate).toHaveBeenCalledWith(-1);
  });

  test("processResult sets error on failure", () => {
    const error = { message: "Failed" };
    controller.processResult({ success: false, error });
    expect(setFieldError).toHaveBeenCalledWith({
      field: "email",
      message: "Failed",
    });
  });
});
