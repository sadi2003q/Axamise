// src/__tests__/event_create.service.test.js
import { EventCreateService } from "../../services/Events/_event_create.service.ts";
import { Events_Model } from "../../models/Event_Model.js";

jest.mock("../../services/Events/_repositories/_IEventRepository", () => ({
  FirebaseEventRepository: jest.fn().mockImplementation(() => ({
    _Create_Event: jest.fn().mockResolvedValue({ success: true }),
    _UpdateEvent: jest.fn().mockResolvedValue({ success: true }),
    _Fetch_Event: jest.fn().mockResolvedValue({ success: true, data: {} }),
  })),
}));

describe("EventCreateService", () => {
  let event;
  let service;

  beforeEach(() => {
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

    service = new EventCreateService(event);
  });

  test("_Upload_Event calls repository", async () => {
    const result = await service._Upload_Event();
    expect(result).toEqual({ success: true });
  });

  test("_Update_Event calls repository", async () => {
    const result = await service._Update_Event("abc123");
    expect(result).toEqual({ success: true });
  });

  test("_Fetch_Event calls repository", async () => {
    const result = await service._Fetch_Event("abc123");
    expect(result).toEqual({ success: true, data: {} });
  });
});
