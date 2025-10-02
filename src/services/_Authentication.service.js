
import { SERVICE } from '../Utilities.js'

import { Admin_LoginService } from './_admin.login.service.js'
import AdminSetUserService from './_admin.setUser.service.js'
import SignUpService from './_signup.service.js'
import LoginService from './_login.service.js'


export class AuthenticationService {
    constructor(user, service) {
        this.user = user;
        this.service = service;
    }


    static getAuthenticationStatus(user, serviceType) {
        switch (serviceType) {
            case SERVICE.login:
                return new LoginService(user);

            case SERVICE.signup:
                return new SignUpService(user);

            case SERVICE.admin_login:
                return new Admin_LoginService(user);

            case SERVICE.admin_setUser:
                return new AdminSetUserService(user);

            default:
                throw new Error(`Unknown authentication service: ${serviceType}`);
        }
    }
}




