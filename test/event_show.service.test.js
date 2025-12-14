// src/__tests__/event_show.service.test.js
import { EventShowService } from "../../services/Events/_event_show.service.js";
import { FirebaseEventRepository } from "../../services/Events/_repositories/_IEventRepository";

jest.mock("../../services/Events/_repositories/_IEventRepository", () => ({
    FirebaseEventRepository: jest.fn().mockImplementation(() => ({
        _FetchAllEvent: jest.fn().mockResolvedValue({ success: true, data: [{ id: "1", title: "Test Event" }] }),
        _GetAllEventById: jest.fn().mockResolvedValue({ success: true, data: [{ id: "2", title: "User Event" }] }),
        _Delete_Event: jest.fn().mockResolvedValue({ success: true }),
    })),
}));

describe("EventShowService", () => {
    let service;

    beforeEach(() => {
        service = new EventShowService();
    });

    test("GetAllEvents returns all events when UID is empty", async () => {
        const result = await service.GetAllEvents("");
        expect(result.data).toEqual([{ id: "1", title: "Test Event" }]);
    });

    test("GetAllEvents returns user-specific events when UID is provided", async () => {
        const result = await service.GetAllEvents("u1");
        expect(result.data).toEqual([{ id: "2", title: "User Event" }]);
    });

    test("Delete_Event calls repository and returns success", async () => {
        const result = await service.Delete_Event("1");
        expect(result.success).toBe(true);
    });
});
