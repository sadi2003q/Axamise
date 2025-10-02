// path: src/controller/admin.setUser.controller.js


import AdminSetUserService from "../services/_admin.setUser.service";
import { SERVICE } from "../Utilities.js";
import { AuthenticationService } from "../services/_Authentication.service.js";

export class Admin_InfoController {
    constructor(adminInfo, setAdmins, adminID) {
        this.adminInfo = adminInfo;
        this.service = AuthenticationService.getAuthenticationStatus(adminInfo, SERVICE.admin_setUser);
        this.setAdmins = setAdmins;
        this.adminID = adminID;
    }

    async handleEmailSignUp() {
        const result = await this.service.signUpWithEmailPassword();
        this.processResult(result);
    }


    async getAllAdmins() {
        const result = await this.service.getAllAdmins();
        this.setAdmins(result.data || []);
    }

    async updateAdmin() {
        const result = await this.service.updateAdmin(this.adminID, this.adminInfo);
        this.processResult(result);
    }

    async deleteAdmin(id) {
        await this.service.deleteAdmin(id);
        console.log('Admin user deleted successfully from controller file');
    }


    processResult(result) {
        if (result.success) {
            console.log('Admin user created with ID:', result.id);
            
        } else {
            console.error('Error creating admin user:', result.error);
        }
    }
}
