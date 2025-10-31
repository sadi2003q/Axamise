// ✅ Path: src/controller/NotificationsService.ts

import { UsersRepository } from './repository';
import { Notification } from '../../models/Notification_Model';
import { Firebase_Response } from '../../Utilities';

export class NotificationsService {
    private repository: UsersRepository;

    constructor() {
        this.repository = new UsersRepository();
    }

    /**
     * Send (create) a new notification
     * @param notification Notification object
     */
    async _Send_Notification(notification: Notification): Promise<Firebase_Response> {
        return await this.repository._MakeNotification(notification);
    }

    /**
     * Retrieve all notifications for a specific user by their ID
     * @param id User ID
     */
    async _Retrieve_Notification(id: string): Promise<Firebase_Response> {
        return await this.repository._GetNotificationById(id);
    }

    /**
     * Delete a specific notification by its ID
     * @param notificationID Notification ID
     */
    async _Delete_Notification(notificationID: string): Promise<Firebase_Response> {
        return await this.repository._DeleteNotification(notificationID);
    }

    /**
     * Delete all notifications for a specific user
     * @param id User ID
     */
    async _Delete_All_Notifications(id: string): Promise<Firebase_Response> {
        return await this.repository._DeleteAllNotification(id);
    }

    /**
     * Mark all notifications as read for a specific user
     * @param id User ID
     */
    async _Mark_As_Read(id: string): Promise<Firebase_Response> {
        return await this.repository._ReadNotifications(id);
    }
}
