

export class Admin_Info {
    constructor(name, email, role, phoneNumber, address, profilePicture = "", lastLogin, status, createdAt = new Date(), updatedAt = new Date()) {
        this.name = name;
        this.email = email;
        this.role = role;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.profilePicture = profilePicture;
        this.lastLogin = lastLogin;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    
}