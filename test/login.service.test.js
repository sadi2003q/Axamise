// path: src/__tests__/login.service.test.js
import LoginService from "../../services/Authentication/_login.service.ts";

jest.mock("firebase/auth", () => ({
    signInWithEmailAndPassword: jest.fn()
}));

jest.mock("firebase/firestore", () => ({
    getDoc: jest.fn(),
    doc: jest.fn()
}));

import { signInWithEmailAndPassword } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";

describe("LoginService", () => {
    let service, user;

    beforeEach(() => {
        user = { email: "test@test.com", password: "12345" };
        service = new LoginService(user);
    });

    test("login success", async () => {
        signInWithEmailAndPassword.mockResolvedValue({
            user: { uid: "123" }
        });

        const result = await service.login();

        expect(result.success).toBe(true);
        expect(result.id).toBe("123");
        expect(signInWithEmailAndPassword).toHaveBeenCalled();
    });

    test("login failure", async () => {
        signInWithEmailAndPassword.mockRejectedValue({
            message: "Wrong password"
        });

        const result = await service.login();

        expect(result.success).toBe(false);
        expect(result.error.message).toBe("Wrong password");
    });

    test("getUserInfo success", async () => {
        getDoc.mockResolvedValue({
            exists: () => true,
            data: () => ({ firstName: "John", lastName: "Doe" })
        });

        const result = await service.getUserInfo("123");

        expect(result.success).toBe(true);
        expect(result.data.firstName).toBe("John");
    });

    test("getUserInfo not found", async () => {
        getDoc.mockResolvedValue({
            exists: () => false
        });

        const result = await service.getUserInfo("123");

        expect(result.success).toBe(false);
        expect(result.error).toBe("User not found");
    });
});
