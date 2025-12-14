// path: src/__tests__/logout.service.test.js
import { LogoutService } from "../../services/Authentication/_logout.service.js";

jest.mock("firebase/auth", () => ({
    getAuth: jest.fn(() => ({ auth: true })),
    signOut: jest.fn()
}));

import { getAuth, signOut } from "firebase/auth";

describe("LogoutService", () => {
    let service;

    beforeEach(() => {
        service = new LogoutService();
    });

    test("logout success", async () => {
        signOut.mockResolvedValue();

        const result = await service.logout();

        expect(signOut).toHaveBeenCalled();
        expect(result.success).toBe(true);
        expect(result.message).toBe("Successfully logged out");
    });

    test("logout failure", async () => {
        signOut.mockRejectedValue({ message: "Signout failed" });

        const result = await service.logout();

        expect(result.success).toBe(false);
        expect(result.message).toBe("Signout failed");
    });
});
