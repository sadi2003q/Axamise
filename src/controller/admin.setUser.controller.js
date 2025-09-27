// controllers/Admin_InfoController.js
import AdminSetUserService from "../services/_admin.setUser.service";

export class Admin_InfoController {
    constructor(adminInfo, setAdmins) {
        this.adminInfo = adminInfo;
        this.service = new AdminSetUserService(adminInfo);
        this.setAdmins = setAdmins;
    }

    async handleEmailSignUp() {
        const result = await this.service.signUpWithEmailPassword();
        this.processResult(result);
    }


    async getAllAdmins() {
        const result = await this.service.getAllAdmins();
        this.setAdmins(result.data || []);
    }

    processResult(result) {
        if (result.success) {
            console.log('Admin user created with ID:', result.id);
            
        } else {
            console.error('Error creating admin user:', result.error);
        }
    }
}
