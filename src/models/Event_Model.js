
// File Path: src/models/Event_Model.js


import { MakerModel } from "./Base_Model.js";

export class Events_Model extends MakerModel {
    constructor({
                    title = "",
                    description = "",
                    date = "",
                    startTime = "",
                    duration = {hours: 0, minutes: 0},
                    createdBy = "",
                    createdBy_uid = "",
                    createdAt = Date.now(),
                    allQuestions = [],
                    mainFunctionCode = ''
                }) {
        super(createdBy, createdBy_uid, createdAt);
        this.title = title;
        this.description = description;
        this.date = date;
        this.startTime = startTime;
        this.duration = duration;
        this.allQuestions = allQuestions;
        this.mainFunctionCode = mainFunctionCode;
    }
}



export const Event_Question_Model = {
    title: "",
    description: "",
    difficulty: "",
    point: 0,
    type: ""
}







