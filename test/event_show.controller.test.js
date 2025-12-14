// src/__tests__/event_show.controller.test.js
import { EventShowController } from "../../controller/Events/event_show.controller.js";
import { EventService } from "../../services/Events/_repositories/_factory.event.service.js";
import { SERVICE } from "../../Utilities.js";
import { LocalCache } from "../../localCache.js";

jest.mock("../../services/Events/_repositories/_factory.event.service.js", () => ({
    EventService: {
        createService: jest.fn(() => ({
            GetAllEvents: jest.fn().mockResolvedValue({ success: true, data: [{ id: "1", title: "Test Event" }] }),
            Delete_Event: jest.fn().mockResolvedValue({ success: true }),
        })),
    },
}));

jest.mock("../../localCache.js", () => ({
    LocalCache: jest.fn().mockImplementation(() => ({
        load: jest.fn(),
        save: jest.fn(),
        isSame: jest.fn().mockReturnValue(false),
    })),
}));

describe("EventShowController", () => {
    let controller;
    let setEvents;
    let setLoading;
    let setError;
    let navigate;

    beforeEach(() => {
        setEvents = jest.fn();
        setLoading = jest.fn();
        setError = jest.fn();
        navigate = jest.fn();

        controller = new EventShowController([], setEvents, "", setLoading, setError, navigate);
    });

    test("handleNavigation_EventEnter calls navigate", () => {
        const item = { id: "1" };
        controller.handleNavigation_EventEnter(item);
        expect(navigate).toHaveBeenCalledWith(expect.any(String), { state: { item } });
    });

    test("handleAddQuestion calls navigate", () => {
        const item = { id: "1" };
        controller.handleAddQuestion(item);
        expect(navigate).toHaveBeenCalledWith(expect.any(String), { state: { itemID: "1" } });
    });

    test("handleEdit calls navigate", () => {
        const item = { id: "1" };
        controller.handleEdit(item);
        expect(navigate).toHaveBeenCalledWith(expect.any(String), { state: { itemID: "1" } });
    });

    test("handleDelete removes event on success", async () => {
        controller.setEvents = jest.fn();
        const item = { id: "1" };
        await controller.handleDelete(item);
        expect(controller.setEvents).toHaveBeenCalled();
    });

    test("fetchEvents loads from service and updates state", async () => {
        await controller.fetchEvents("uid");
        expect(controller.setEvents).toHaveBeenCalledWith([{ id: "1", title: "Test Event" }]);
        expect(controller.setLoading).toHaveBeenCalledWith(false);
    });
});
