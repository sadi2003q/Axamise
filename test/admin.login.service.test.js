// File: src/services/__tests__/admin.login.service.test.js

import { Admin_LoginService } from "../_login.services.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import User from "../../models/User_Model.js";

// Mock Firebase auth
jest.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: jest.fn(),
}));

describe("Admin_LoginService", () => {
  let user;

  beforeEach(() => {
    user = new User("admin@test.com", "password123");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should login successfully with correct credentials", async () => {
    const mockFirebaseUser = {
      uid: "12345",
    };
    signInWithEmailAndPassword.mockResolvedValue({
      user: mockFirebaseUser,
    });

    const service = new Admin_LoginService(user);
    const result = await service.login();

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      expect.anything(), // auth object
      "admin@test.com",
      "password123"
    );
    expect(result.success).toBe(true);
    expect(result.id).toBe("12345");
    expect(result.user).toEqual(mockFirebaseUser);
  });

  test("should return error on failed login", async () => {
    const mockError = new Error("Invalid credentials");
    signInWithEmailAndPassword.mockRejectedValue(mockError);

    const service = new Admin_LoginService(user);
    const result = await service.login();

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      expect.anything(),
      "admin@test.com",
      "password123"
    );
    expect(result.success).toBe(false);
    expect(result.error).toBe(mockError);
  });
});
