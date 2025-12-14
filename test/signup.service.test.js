// src/__tests__/signup.service.test.js
import SignUpService from "../../services/Authentication/_signup.service.ts";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import Student from "../../models/Student_Model.js";

jest.mock("firebase/auth", () => ({
  createUserWithEmailAndPassword: jest.fn(),
  signInWithPopup: jest.fn()
}));

jest.mock("firebase/firestore", () => ({
  setDoc: jest.fn(),
  doc: jest.fn()
}));

describe("SignUpService", () => {
  let service;
  const student = new Student({ email: "test@test.com", password: "123" });

  beforeEach(() => {
    service = new SignUpService(student);
  });

  test("signup success", async () => {
    createUserWithEmailAndPassword.mockResolvedValue({ user: { uid: "123" } });
    doc.mockReturnValue("docRef");
    setDoc.mockResolvedValue({});

    const res = await service.signup();
    expect(res.success).toBe(true);
    expect(res.id).toBe("123");
  });

  test("signup failure", async () => {
    createUserWithEmailAndPassword.mockRejectedValue(new Error("Fail"));
    const res = await service.signup();
    expect(res.success).toBe(false);
  });

  test("signUpWithGoogle success", async () => {
    signInWithPopup.mockResolvedValue({ user: { uid: "123" } });
    doc.mockReturnValue("docRef");
    setDoc.mockResolvedValue({});

    const res = await service.signUpWithGoogle();
    expect(res.success).toBe(true);
    expect(res.id).toBe("123");
  });

  test("signUpWithGoogle failure", async () => {
    signInWithPopup.mockRejectedValue(new Error("Fail"));
    const res = await service.signUpWithGoogle();
    expect(res.success).toBe(false);
  });
});
