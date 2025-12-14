// path: src/services/users/__tests__/NotificationsService.test.js

import { NotificationsService } from "../_Notifications.service.js";
import { UsersRepository } from "../repository";

jest.mock("../repository");

describe("NotificationsService", () => {
  let service;
  let repoMock;

  beforeEach(() => {
    repoMock = {
      _MakeNotification: jest.fn(),
      _GetNotificationById: jest.fn(),
      _DeleteNotification: jest.fn(),
      _DeleteAllNotification: jest.fn(),
      _ReadNotifications: jest.fn(),
    };
    UsersRepository.mockImplementation(() => repoMock);
    service = new NotificationsService();
  });

  afterEach(() => jest.clearAllMocks());

  test("_Send_Notification calls repository", async () => {
    const notif = { title: "Test" };
    repoMock._MakeNotification.mockResolvedValue({ success: true });
    const result = await service._Send_Notification(notif);
    expect(repoMock._MakeNotification).toHaveBeenCalledWith(notif);
    expect(result.success).toBe(true);
  });

  test("_Retrieve_Notification calls repository", async () => {
    repoMock._GetNotificationById.mockResolvedValue({ data: [1, 2] });
    const result = await service._Retrieve_Notification("user1");
    expect(repoMock._GetNotificationById).toHaveBeenCalledWith("user1");
    expect(result.data).toEqual([1, 2]);
  });

  test("_Delete_Notification calls repository", async () => {
    repoMock._DeleteNotification.mockResolvedValue({ success: true });
    await service._Delete_Notification("notif1");
    expect(repoMock._DeleteNotification).toHaveBeenCalledWith("notif1");
  });

  test("_Mark_As_Read calls repository", async () => {
    repoMock._ReadNotifications.mockResolvedValue({ success: true });
    await service._Mark_As_Read("user1");
    expect(repoMock._ReadNotifications).toHaveBeenCalledWith("user1");
  });
});
