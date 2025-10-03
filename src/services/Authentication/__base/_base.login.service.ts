

import User from '../../../models/User_Model'
import { Firebase_Response } from '../../../Utilities'

export abstract class _Base_Login {
    protected user: User

    protected constructor(user: User) {
        this.user = user
    }


    abstract login() : Promise<Firebase_Response>

}

