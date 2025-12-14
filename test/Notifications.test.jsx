// path: src/pages/users/__tests__/Notifications.test.jsx

import { render, screen, fireEvent } from "@testing-library/react";
import Notifications from "../Notifications.jsx";
import { useNavigate } from "react-router-dom";
import { useGlobal } from "../../../GlobalContext.jsx";
import { NotificationsController } from "../../../controller/users/notifications.controller.js";

jest.mock("react-router-dom", () => ({ useNavigate: jest.fn() }));
jest.mock("../../../GlobalContext.jsx", () => ({ useGlobal: jest.fn() }));
jest.mock("../../../controller/users/notifications.controller.js", () => {
  return {
    NotificationsController: jest.fn().mockImplementation(() => ({
      _get_notifications: jest.fn().mockResolvedValue(),
      _mark_as_read: jest.fn().mockResolvedValue(),
    })),
  };
});

describe("Notifications Component", () => {
  const navigateMock = jest.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(navigateMock);
    useGlobal.mockReturnValue({ user_uid: "user123" });
  });

  afterEach(() => jest.clearAllMocks());

  test("renders notifications component", async () => {
    render(<Notifications />);
    expect(await screen.findByText(/Notification Center/i)).toBeInTheDocument();
  });

  test("redirects to login if user_uid missing", () => {
    useGlobal.mockReturnValue({ user_uid: null });
    render(<Notifications />);
    expect(navigateMock).toHaveBeenCalledWith("/login", { replace: true });
  });

  test("clicking notification marks it as read", async () => {
    render(<Notifications />);
    const firstNotification = await screen.findByText(/Hackathon Approved/i);
    fireEvent.click(firstNotification);
    expect(screen.getByText(/Hackathon Approved/i)).toBeInTheDocument();
  });
});
