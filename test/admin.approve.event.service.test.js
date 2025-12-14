// File: src/services/Admin/__tests__/admin.approve.event.service.test.js

import { Admin_ApproveEventService } from "../_admin.approve.event.service.js";
import { db } from "../../../firebase.js";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { EVENT_APPROVAL_STATUS } from "../../../Utilities.js";

// Mock Firestore
jest.mock("../../../firebase.js", () => ({
  db: {},
}));

jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  getDocs: jest.fn(),
  doc: jest.fn(),
  updateDoc: jest.fn(),
}));

describe("Admin_ApproveEventService", () => {
  let service;

  beforeEach(() => {
    service = new Admin_ApproveEventService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("getAllPending returns events array successfully", async () => {
    const fakeSnapshot = {
      docs: [
        { id: "event1", data: () => ({ title: "Event One", status: EVENT_APPROVAL_STATUS.pending }) },
        { id: "event2", data: () => ({ title: "Event Two", status: EVENT_APPROVAL_STATUS.pending }) },
      ],
    };

    getDocs.mockResolvedValue(fakeSnapshot);

    const result = await service.getAllPending();

    expect(getDocs).toHaveBeenCalled();
    expect(result.success).toBe(true);
    expect(result.data.length).toBe(2);
    expect(result.data[0].id).toBe("event1");
    expect(result.data[1].title).toBe("Event Two");
  });

  test("getAllPending handles errors", async () => {
    getDocs.mockRejectedValue(new Error("Firestore read failed"));

    const result = await service.getAllPending();

    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });

  test("approve sets event status to approved with mainFunctionCode", async () => {
    updateDoc.mockResolvedValue({});

    const result = await service.approve("event1", false, "function test() {}");

    expect(updateDoc).toHaveBeenCalled();
    expect(result.success).toBe(true);
  });

  test("approve sets event status to modify when modification is required", async () => {
    updateDoc.mockResolvedValue({});

    const result = await service.approve("event2", true);

    expect(updateDoc).toHaveBeenCalledWith(expect.anything(), { status: EVENT_APPROVAL_STATUS.modify });
    expect(result.success).toBe(true);
  });

  test("approve handles errors", async () => {
    updateDoc.mockRejectedValue(new Error("Firestore write failed"));

    const result = await service.approve("event3");

    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });
});
