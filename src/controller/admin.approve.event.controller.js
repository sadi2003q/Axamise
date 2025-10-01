
import { Admin_ApproveEventService } from "../services/_admin.approve.event.service.js";



export class Admin_ApproveEventController {
    constructor({setAllEvents, setEventModel}) {

        this.service = new Admin_ApproveEventService();
        
        this.setAllEvents = setAllEvents;
        this.setEventModel = setEventModel


    }


    fetchAllPendingEvents = async () => {
        try {
            
            const result = await this.service.GetAllEvents();
            this.setAllEvents(result.data);
            this.setEventModel(result.data[0]);
            // console.log(`All events set in controller:`, result.data);
        } catch (error) {
            console.log("Error fetching events:", error);
            return { success: false, error: error.message };
        }
    }




}
