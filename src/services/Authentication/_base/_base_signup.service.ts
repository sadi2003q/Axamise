
import { Firebase_Response} from "../../../Utilities";
import Student from "../../../models/Student_Model";
import { Admin_Info } from '../../../models/AdminInfo_Model'



export abstract class _Base_SignUp<T>{
    protected user: T
    protected constructor(user: T) {
        this.user = user;
    }

    abstract signup() : Promise<Firebase_Response>
    abstract updateUser(id: string, info: T) : Promise<Firebase_Response>
    abstract deleteUser(id: string): Promise<Firebase_Response>
}


