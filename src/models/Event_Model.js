
// File Path: src/models/Event_Model.js


import { MakerModel } from "./Base_Model.js";

export class Events_Model extends MakerModel {
    constructor(
        title = "",
        description = "",
        date = "",
        startTime = "",
        duration = { hours: 0, minutes: 0 },
        createdBy = "",
        createdBy_uid = "",
        createdAt = Date.now()
    ) {
        super(createdBy, createdBy_uid, createdAt);
        this.title = title;
        this.description = description;
        this.date = date;
        this.startTime = startTime;
        this.duration = duration;
    }



    isValid() {
        return this.title && this.description && this.date && this.startTime;
    }
}










