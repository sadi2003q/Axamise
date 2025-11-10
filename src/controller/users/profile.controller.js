
import { ProfileService } from '../../services/users/profile.service.js';




export class ProfileController {

    constructor(setUser) {
        this.service = new ProfileService();

        this.setUser = setUser;
    }


    async getProfileInformation({id}) {
        const response = await this.service.fetch_users_Information({id})
        console.log(response.data)
        this.setUser(response.data)

    }






}