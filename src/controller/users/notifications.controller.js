
import { NotificationsService } from '../../services/users/_Notifications.service.js'


export class NotificationsController {
    constructor({setNotifications}) {
        this.service = new NotificationsService();
        this.setNotification = setNotifications;
    }


    _set_notifications= async (notifications) => {
        this.service._Send_Notification(notifications).then(result => {
            console.log(result.message);
        });
    }


    _get_notifications = async ({userID}) => {
        this.service._Retrieve_Notification(userID).then((response) => {
            console.log('id : ', userID);
            console.log('response : ', response.data);
            this.setNotification(response.data);
        })
    }


    _delete_notification = async ({notificationID}) => {
        this.service._Delete_Notification(notificationID).then(result => {
            console.log(notificationID)

            console.log(result.message);

            this.setNotification((prev) =>
                prev.filter((notif) => notif.id !== notificationID)
            );
        })
    }


    _mark_as_read = async ({id}) => {
        this.service._Mark_As_Read(id).then(() => {})
    }


}


