// models/Question.js
export default class Question {
    constructor({ title, description, mark, difficulty, type, event_uid, createdBy, createdBy_uid }) {
        this.title = title || "";
        this.description = description || "";
        this.mark = mark ?? 0;
        this.difficulty = difficulty || "";
        this.type = type || "";
        this.event_uid = event_uid || "";
        this.createdBy = createdBy || "";
        this.createdBy_uid = createdBy_uid || "";
    }

    isValid() {
        return (
            this.title.trim() &&
            this.description.trim() &&
            this.mark > 0 &&
            this.difficulty.trim() &&
            this.type.trim() &&
            this.event_uid.trim() &&
            this.createdBy.trim() &&
            this.createdBy_uid.trim()
        );
    }
}


export const Question_Model = { title: "", description: "", mark: 0, difficulty: "", type: "", event_uid: "", createdBy: "", createdBy_uid: "", }