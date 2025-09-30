
export class Notification {
    constructor( 
        {   title = "",
            message = "",
            type = "info",
            objectID = null,
            recipientID = "",
            isRead = false,
            timestamp = new Date() 
        } = {}

    ) {
        this.title = title;
        this.message = message;
        this.type = type;
        this.objectID = objectID;
        this.recipientID = recipientID;
        this.isRead = isRead;
        this.timestamp = timestamp;
    }


    printNotification() {
        console.log(`Notification - Title: ${this.title}, \nMessage: ${this.message}, \nType: ${this.type}, \nObjectID: ${this.objectID}, \nRecipientID: ${this.recipientID}, \nIsRead: ${this.isRead}, \nTimestamp: ${this.timestamp}`);
    }
}
