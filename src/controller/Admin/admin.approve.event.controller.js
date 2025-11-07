
import { Admin_ApproveEventService } from "../../services/Admin/_admin.approve.event.service.ts";
import {ADMIN_APPROVAL_DISPLAY_MODE} from "../../Utilities.ts";

import { Notification } from '../../models/Notification_Model.js'
import { NotificationService } from "../../services/users/_Notification.service.js";
import { EventShowService } from "../../services/Events/_event_show.service.ts";
import { ApprovalService } from '../../services/Admin/_base/_factory.approval.service.ts'
import { SERVICE} from "../../Utilities.ts";

export class Admin_ApproveEventController {
    constructor({allEvents,  setAllEvents, eventModel, setEventModel, approvalOpen, setApprovalOpen, setDisplayMode, title, reason, setIsEmpty, eventID, setEventID}) {

        // this.service = new Admin_ApproveEventService();
        this.service = ApprovalService.createService(SERVICE.APPROVAL_EVENT)
        this.notificationService = new NotificationService();



        this.eventService = new EventShowService();
        this.eventModel = eventModel;
        this.allEvents = allEvents;
        this.setAllEvents = setAllEvents;
        this.setEventModel = setEventModel
        this.approvalOpen = approvalOpen
        this.setApprovalOpen = setApprovalOpen
        this.setDisplayMode = setDisplayMode;
        this.title = title;
        this.reason = reason;
        this.setIsEmpty = setIsEmpty;
        this.eventID = eventID
        this.setEventID = setEventID;


    }

    // Handling Functions

    handleNotificationPanel = () => {
        this.setDisplayMode(ADMIN_APPROVAL_DISPLAY_MODE.MODIFICATION);
        this.setApprovalOpen(true)
    }

    handleRejectionPanel = () => {
        this.setDisplayMode(ADMIN_APPROVAL_DISPLAY_MODE.REJECTED);
        this.setApprovalOpen(true)
    }

    handleApprovalPanel = () => {
        this.setDisplayMode(ADMIN_APPROVAL_DISPLAY_MODE.APPROVED)
        this.setApprovalOpen(true)
    }


    fetchAllPendingEvents = async () => {
        try {
            
            const result = await this.service.getAllPending();
            this.setAllEvents(result.data);
            if(result.data.length > 0 ) {


                this.setEventID(result.data[0].id);
                this.setEventModel(result.data[0]);

                this.setIsEmpty(false);
            } else this.setIsEmpty(true);
            // console.log(`All events set in controller:`, result.data);
        } catch (error) {
            console.log("Error fetching events:", error);
            return { success: false, error: error.message };
        }
    }




    // Deletion / Modification / Approval will go through this function
    handleSendNotification = ({type, notification_type= 'notification', mainFunctionCode = ''}) => {

        const notification = new Notification({
            title: this.title,
            message: this.reason,
            type: notification_type,
            objectID: this.eventID,
            recipientID: this.eventModel.createdBy_uid,
            isRead: false,
            timestamp: new Date().toLocaleString(),
        })

        this.setApprovalOpen(false)
        notification.printNotification()

         this.notificationService.createNotification({...notification}).then(() => console.log('Notification sent success'))


        if( type === ADMIN_APPROVAL_DISPLAY_MODE.REJECTED )  this.eventService.Delete_Event(this.eventID).then(() => console.log('Event removed'))


        // Event Approval Function Calling
        this.service.approve( this.eventID, type === ADMIN_APPROVAL_DISPLAY_MODE.MODIFICATION, mainFunctionCode ).then(() => {
            console.log('event approved')
        });





        // Use the functional callback to guarantee updated state
        this.setAllEvents((prevEvents) => {
            const updatedEvents = prevEvents.filter(event => event.id !== this.eventID);
            return updatedEvents;
        });

// Update the eventModel and eventID after updating allEvents
        setTimeout(() => {
            const updatedEvents = this.allEvents.filter(event => event.id !== this.eventID);
            if (updatedEvents.length > 0) {
                this.setEventModel(updatedEvents[0]);
                this.setEventID(updatedEvents[0].id);
            } else {
                this.setIsEmpty(true);
                this.setEventModel(null);
                this.setEventID("");
            }
        }, 0);





    }






    handleDirectApproval = async ({
                                      type = "Event Approved",
                                      title = "Your event has been approved ✅",
                                      message = "Congratulations! Your event is now approved and visible."
                                  } = {}) => {
        try {
            // Create notification with custom title & message
            const notification = new Notification({
                title: title,
                message : message,
                type: type,
                objectID: this.eventID ,
                recipientID: this.eventModel.createdBy_uid ,
                isRead: false,
                timestamp: new Date().toLocaleString(),
            });

            // Update event status to "approved"
            await this.service.approve({ eventID: this.eventID});

            // Save notification
            await this.notificationService.createNotification({...notification});

            // Close approval modal if applicable
            this.setApprovalOpen(false);

            // Print or log notification
            notification.printNotification();


            this.setDisplayMode(ADMIN_APPROVAL_DISPLAY_MODE.APPROVED);
            this.setApprovalOpen(false)


            // Use the functional callback to guarantee updated state
            this.setAllEvents((prevEvents) => {
                const updatedEvents = prevEvents.filter(event => event.id !== this.eventID);
                return updatedEvents;
            });

// Update the eventModel and eventID after updating allEvents
            setTimeout(() => {
                const updatedEvents = this.allEvents.filter(event => event.id !== this.eventID);
                if (updatedEvents.length > 0) {
                    this.setEventModel(updatedEvents[0]);
                    this.setEventID(updatedEvents[0].id);
                } else {
                    this.setIsEmpty(true);
                    this.setEventModel(null);
                    this.setEventID("");
                }
            }, 0);


            if(this.allEvents.length > 0) this.setEventModel(this.allEvents[0]);
            else this.setIsEmpty(true);



            console.log('Event Approved');

            return { success: true };
        } catch (error) {
            console.error("Error approving event:", error);
            return { success: false, error };
        }
    };


}
