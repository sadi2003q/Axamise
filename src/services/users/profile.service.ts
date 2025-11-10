
import { UsersRepository} from "./repository";

export class ProfileService {
    private repository: UsersRepository;

    constructor() {
        this.repository = new UsersRepository();
    }


    async fetch_users_Information({id}: {id: string}) {
        return await this.repository._fetch_userInformation({id: id})
    }



}