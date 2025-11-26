import { LogoutService } from "../../services/Authentication/_logout.service.js";
import { CacheManager } from '../../localCache.js'


export class LogoutController {
    constructor({
                    setOpen,
                    setCurrentUser,
                    setUser_uid,
                    setCurrentName,
                    setAdminEmail,
                    navigate
                }) {
        this.setOpen = setOpen;
        this.setCurrentUser = setCurrentUser;
        this.setUser_uid = setUser_uid;
        this.setCurrentName = setCurrentName;
        this.setAdminEmail = setAdminEmail;
        this.navigate = navigate;

        this.service = new LogoutService();
    }

    handleLogoutClick = () => {
        this.setOpen(true);
    };

    handleCancel = () => {
        this.setOpen(false);
    };

    handleConfirmLogout = async () => {
        try {
            await this.service.logout();
            CacheManager.clearAll();

            // CLEAR GLOBAL VARIABLES
            this.setCurrentUser(null);
            this.setUser_uid("Not Defined");
            this.setCurrentName(null);
            this.setAdminEmail(null);

            this.setOpen(false);

            // Redirect to LOGIN page
            this.navigate("/LOGIN");
        } catch (error) {
            console.error(error);
        }

    };
}
