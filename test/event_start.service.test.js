// src/__tests__/event_start.service.test.js
import { EventStartService } from "../../services/Events/_event_start.service.js";
import { FirebaseEventRepository } from "../../services/Events/_repositories/_IEventRepository.js";
import { Participant } from "../../models/Participants_Model.js";

jest.mock("../../services/Events/_repositories/_IEventRepository.js", () => ({
    FirebaseEventRepository: jest.fn().mockImplementation(() => ({
        _CheckEntryForEvent: jest.fn().mockResolvedValue({ data: false }),
        _MakeNewEntryForEvent: jest.fn().mockResolvedValue({}),
        _FetchScoreCard: jest.fn().mockResolvedValue({ data: [] }),
        _AddParticipation: jest.fn().mockResolvedValue({}),
    })),
}));

describe("EventStartService", () => {
    let service;

    beforeEach(() => {
        service = new EventStartService();
    });

    test("UserInfoManagement creates new participant if no entry", async () => {
        const spy = jest.spyOn(service.repository, "_MakeNewEntryForEvent");
        await service.UserInfoManagement({ eventID: "e1", participatorName: "Test", participatorID: "u1" });
        expect(spy).toHaveBeenCalled();
    });

    test("EntryRegulator returns entry data", async () => {
        const result = await service.EntryRegulator({ eventID: "e1", userID: "u1" });
        expect(result).toEqual({ success: true, data: false });
    });

    test("FetchScoreCard returns data", async () => {
        const result = await service.FetchScoreCard({ eventId: "e1" });
        expect(result).toEqual({ success: true, data: [] });
    });

    test("AddToParticipationList calls repository", async () => {
        const spy = jest.spyOn(service.repository, "_AddParticipation");
        const result = await service.AddToParticipationList({ id: "u1", eventId: "e1", title: "Test Event" });
        expect(spy).toHaveBeenCalledWith({ id: "u1", eventID: "e1", title: "Test Event" });
        expect(result.success).toBe(true);
    });
});
