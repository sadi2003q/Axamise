// File Path: src/controller/event_create.controller.js


import { Events_Model } from "../../models/Event_Model.js";
import { EventCreateService } from "../../services/Events/_event_create.service.js";
// import { routes } from "../Utilities"


export class EventCreateServiceController {


    constructor(event, setEvent, setFieldError, navigate) {
        this.event = event;
        this.service = new EventCreateService(event);
        this.setEvent = setEvent;
        this.setFieldError = setFieldError;
        this.navigate = navigate;
    }


    // upload a new event
    async handleUploadEvent() {
        if (!this.event.isValid()) {
            this.setFieldError({
                field: "general",
                message: "Please fill in all required fields.",
            });
            return;
        }

        const result = await this.service._Upload_Event();
        this.processResult(result);

    }



    async handleUpdateEvent(id) {
        if (!this.event.isValid()) {
            this.setFieldError({
                field: "UnIdentified",
                message: "Something is wrong while U[dating the Event",
            });
            return;
        }
        const result = await this.service._Update_Event(id);
        this.processResult(result, {go_back: true});
    }


    async handleFetchEvent(id) {
        const result = await this.service._Fetch_Event(id);
        if (result.success) {
            const data = result.data;

            // Convert Firestore object into Events_Model instance
            const fetchedEvent = new Events_Model(
                data.title,
                data.description,
                data.date,
                data.startTime,
                { hours: data.hours ?? 0, minutes: data.minutes ?? 0 },
                data.createdBy ?? "",
                data.createdBy_uid ?? "",
                data.createdAt ?? Date.now()
            );

            this.setEvent(fetchedEvent);
        } else {
            this.setFieldError({
                field: "FetchError",
                message: result.error.message || "Failed to fetch event data",
            });
        }
    }



    processResult(result, options = {}) {

        const { go_back = true } = options;

        if (result.success) {
            console.log('Event created/updated successfully');

            if (go_back) this.navigate(-1);


            // console.log('Navigtion to question list');
            // this.navigate(routes.question_list);
        } else {
            this.setFieldError({
                field: "email",
                message: result.error.message || "Signup failed",
            });
        }
    }


}



