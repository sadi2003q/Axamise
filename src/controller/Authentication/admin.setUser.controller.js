// path: src/controller/admin.setUser.controller.js


import AdminSetUserService from "../../services/Authentication/_admin.setUser.service.ts";
import { SERVICE } from "../../Utilities.ts";
import { AuthenticationService } from "../../services/Authentication/_Authentication.service.ts";

export class Admin_InfoController {
    constructor(adminInfo, setAdmins, adminID) {
        this.adminInfo = adminInfo;
        this.service = AuthenticationService.create(adminInfo, SERVICE.admin_setUser);
        this.setAdmins = setAdmins;
        this.adminID = adminID;
    }

    async handleEmailSignUp() {
        const result = await this.service.signup();
        this.processResult(result);
    }


    async getAllAdmins() {
        const result = await this.service.getAllAdmins();
        this.setAdmins(result.data || []);
    }

    async updateAdmin() {
        const result = await this.service.updateUser(this.adminID, this.adminInfo);
        this.processResult(result);
    }

    async deleteAdmin(id) {
        await this.service.deleteUser(id);
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
