// path: src/controller/users/__tests__/notifications.controller.test.js

import { NotificationsController } from "../notifications.controller.js";
import { NotificationsService } from "../../services/users/_Notifications.service.js";

jest.mock("../../services/users/_Notifications.service.js");

describe("NotificationsController", () => {
  let controller;
  let setNotificationsMock;
  let serviceMock;

  beforeEach(() => {
    setNotificationsMock = jest.fn();

    serviceMock = {
      _Send_Notification: jest.fn(),
      _Retrieve_Notification: jest.fn(),
      _Delete_Notification: jest.fn(),
      _Mark_As_Read: jest.fn(),
    };

    NotificationsService.mockImplementation(() => serviceMock);

    controller = new NotificationsController({ setNotifications: setNotificationsMock });
  });

  afterEach(() => jest.clearAllMocks());

  test("_set_notifications calls service and logs result", async () => {
    const notifications = [{ title: "Test" }];
    serviceMock._Send_Notification.mockResolvedValue({ message: "Notification sent" });

    await controller._set_notifications(notifications);

    expect(serviceMock._Send_Notification).toHaveBeenCalledWith(notifications);
  });

  test("_get_notifications fetches notifications and sets state", async () => {
    const data = [{ title: "notif1" }];
    serviceMock._Retrieve_Notification.mockResolvedValue({ data });

    await controller._get_notifications({ userID: "user1" });

    expect(serviceMock._Retrieve_Notification).toHaveBeenCalledWith("user1");
    expect(setNotificationsMock).toHaveBeenCalledWith(data);
  });

  test("_delete_notification deletes notification and updates state", async () => {
    const notificationID = "notif1";
    const prevNotifications = [{ id: "notif1" }, { id: "notif2" }];
    setNotificationsMock.mockImplementation((fn) => fn(prevNotifications));

    serviceMock._Delete_Notification.mockResolvedValue({ message: "Deleted" });

    await controller._delete_notification({ notificationID });

    expect(serviceMock._Delete_Notification).toHaveBeenCalledWith(notificationID);
    expect(setNotificationsMock).toHaveBeenCalled();
  });

  test("_mark_as_read calls service with user ID", async () => {
    serviceMock._Mark_As_Read.mockResolvedValue({});

    await controller._mark_as_read({ id: "user1" });

    expect(serviceMock._Mark_As_Read).toHaveBeenCalledWith("user1");
  });
});
