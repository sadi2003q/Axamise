// models/Student.js
export default class Student {
    constructor({ firstName, lastName, id, email, password, dob, gender, image = "" }) {
        this.firstName = firstName || "";
        this.lastName = lastName || "";
        this.id = id || "";
        this.email = email || "";
        this.password = password || "";
        this.dob = dob || "";
        this.gender = gender || "";
        this.image = image;
    }

    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    isValid() {
        return this.firstName && this.lastName && this.id && this.email && this.password && this.gender;
    }

    // ✅ Move password strength logic into Model (encapsulation)
    getPasswordStrength() {
        if (this.password.length >= 10) return { text: "(Very Strong)", color: "#22c55e" };
        if (this.password.length >= 6) return { text: "(Strong)", color: "#facc15" };
        if (this.password.length >= 3) return { text: "(Weak)", color: "#f97316" };
        return { text: "(Too Short)", color: "#ef4444" };
    }
}
