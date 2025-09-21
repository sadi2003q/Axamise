
// File Path: src/models/Base_Model.js


export class MakerModel {
    constructor(createdBy = "", createdBy_uid = "", createdAt = Date.now()) {
        this.createdBy = createdBy;
        this.createdBy_uid = createdBy_uid;
        this.createdAt = createdAt;
    }
}
