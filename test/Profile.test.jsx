// src/pages/Profile/__tests__/Profile.test.jsx
import { render, screen } from "@testing-library/react";
import Profile from "../Profile.jsx";
import { useGlobal } from "../../../GlobalContext.jsx";
import { useNavigate } from "react-router-dom";
import { ProfileController } from "../../../controller/users/profile.controller.js";

jest.mock("../../../GlobalContext.jsx", () => ({ useGlobal: jest.fn() }));
jest.mock("react-router-dom", () => ({ useNavigate: jest.fn() }));
jest.mock("../../../controller/users/profile.controller.js", () => ({
  ProfileController: jest.fn().mockImplementation(() => ({
    getProfileInformation: jest.fn().mockResolvedValue(),
    getSolvedRatio: jest.fn().mockResolvedValue(),
  })),
}));

describe("Profile Component", () => {
  const navigateMock = jest.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(navigateMock);
    useGlobal.mockReturnValue({ user_uid: "user123" });
  });

  afterEach(() => jest.clearAllMocks());

  test("renders Profile component", async () => {
    render(<Profile />);
    expect(await screen.findByText(/Dashboard/i)).toBeInTheDocument();
  });

  test("redirects to login if user_uid missing", () => {
    useGlobal.mockReturnValue({ user_uid: null });
    render(<Profile />);
    expect(navigateMock).toHaveBeenCalledWith("/login");
  });
});
