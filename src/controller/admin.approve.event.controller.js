
import { Admin_ApproveEventService } from "../services/_admin.approve.event.service.js";



export class Admin_ApproveEventController {
    constructor() {
        this.service = new Admin_ApproveEventService();
    }


    fetchAllPendingEvents = async () => {
        try {
            const result = await this.service._Fetch_All_Events();
            return { success: true, data: result.data };
        } catch (error) {
            console.log("Error fetching events:", error);
            return { success: false, error: error.message };
        }
    }




}
