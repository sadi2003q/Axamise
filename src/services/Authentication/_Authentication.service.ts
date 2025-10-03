// path: src/services/AuthenticationService.ts

import { SERVICE } from '../../Utilities';

import { Admin_LoginService } from './_admin.login.service';
import AdminSetUserService from './_admin.setUser.service';
import SignUpService from './_signup.service';
import LoginService from './_login.service';

// Models
import User from '../../models/User_Model.js';
import { Admin_Info } from '../../models/AdminInfo_Model.js';
import Student from '../../models/Student_Model.js';

export class AuthenticationService {

    /**
     * Factory method to create authentication service based on type
     */
    static create(
        user: User | Student | Admin_Info,
        serviceType: string
    ): LoginService | SignUpService | Admin_LoginService | AdminSetUserService {

        switch (serviceType) {
            case SERVICE.login:
                return new LoginService(user as User);

            case SERVICE.signup:
                return new SignUpService(user as Student);

            case SERVICE.admin_login:
                return new Admin_LoginService(user as User);

            case SERVICE.admin_setUser:
                return new AdminSetUserService(user as Admin_Info);

            default:
                throw new Error(`Unknown authentication service: ${serviceType}`);
        }
    }
}
