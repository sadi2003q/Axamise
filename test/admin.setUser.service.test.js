import AdminSetUserService from "../../src/services/Authentication/_admin.setUser.service.ts";

jest.mock("firebase/auth", () => ({
    createUserWithEmailAndPassword: jest.fn()
}));

jest.mock("firebase/firestore", () => ({
    doc: jest.fn(),
    setDoc: jest.fn(),
    getDocs: jest.fn(),
    deleteDoc: jest.fn(),
    collection: jest.fn(),
}));

import {
    createUserWithEmailAndPassword
} from "firebase/auth";

import {
    doc,
    setDoc,
    getDocs,
    deleteDoc,
    collection
} from "firebase/firestore";

describe("AdminSetUserService", () => {

    const adminInfo = {
        name: "Admin",
        email: "admin@gmail.com",
        password: "12345"
    };

    test("signup() success", async () => {
        createUserWithEmailAndPassword.mockResolvedValue({
            user: { uid: "UID123" }
        });

        const service = new AdminSetUserService(adminInfo);

        const result = await service.signup();

        expect(result.success).toBe(true);
        expect(result.id).toBe("UID123");
    });

    test("signup() failure", async () => {
        createUserWithEmailAndPassword.mockRejectedValue(new Error("Error"));

        const service = new AdminSetUserService(adminInfo);
        const result = await service.signup();

        expect(result.success).toBe(false);
    });

    test("getAllAdmins() returns all docs", async () => {
        getDocs.mockResolvedValue({
            forEach: (cb) => cb({ id: "A1", data: () => ({ name: "Admin A" }) })
        });

        const service = new AdminSetUserService(adminInfo);
        const result = await service.getAllAdmins();

        expect(result.success).toBe(true);
        expect(result.data.length).toBe(1);
    });

    test("deleteUser() success", async () => {
        deleteDoc.mockResolvedValue();

        const service = new AdminSetUserService(adminInfo);
        const result = await service.deleteUser("D1");

        expect(result.success).toBe(true);
    });
});
